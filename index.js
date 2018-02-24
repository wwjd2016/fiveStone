class Five {
  constructor(id, col) {
    this.col = col;
    this.id = id;
    this.white = [];
    this.black = [];
    this.champion = '';
    this.player = 'black';
    this.point = {};
    this.initCheckerboard(id)
    this.initClick(id)
  }
  initCheckerboard(id) {
    let dashboard = document.getElementById(id);
    for (let i = 0;i<this.col;i++) {
      for (let j = 0;j<this.col;j++) {
        let li = document.createElement('li')
        li.setAttribute('data-x', j)
        li.setAttribute('data-y', i)
        dashboard.appendChild(li)
      }
    }
  }
  initClick(id) {
    let dashboard = document.getElementById(id);
    let _this = this;
    dashboard.addEventListener('click', function(e){
      let li = e.target;
      if(li.tagName.toLowerCase() !== 'li') return;
      let x = li.getAttribute('data-x');
      let y = li.getAttribute('data-y');
      let p = `x${x}y${y}`;
      if(
        !_this.champion &&
        !_this[_this.player].includes(p)
       ) {
        let a = document.createElement('a');
        a.setAttribute('class', _this.player)
        li.appendChild(a);
        _this.stepOne({x, y})
      }
    })
  }
  decide() {
    let params = [
      {x: -1, y: -1},
      {x: 0, y: -1},
      {x: 1, y: -1},
      {x: 1, y: 0}
    ];
    for(let {x, y} of params) {
      if(this.getSameAxis(x, y)) {
        this.champion = this.player;
        return true;
      }
    }
  }
  getSameAxis(a, b) {
    let countLeft = this.singleDecide(a, b);
    let countRight = this.singleDecide(-a, -b);
    if(countLeft + countRight + 1 >= 5) {
      return true;
    }
    return false;
  }
  singleDecide(a, b) {
    let point = Object.assign({}, this.point);
    let count = 0;
    let result = true;
    while(result) {
      point.x = parseInt(point.x) + a;
      point.y = parseInt(point.y) + b;
      let p = `x${point.x}y${point.y}`;
      if(this[this.player].includes(p)) {
        count ++;
      } else {
        result = false;
      }
    }
    return count;
  }
  stepOne({x, y}) {
    let p = `x${x}y${y}`;
    console.log(`${this.player}: ${p}`)
    this[this.player].push(p);
    this.point={x,y}
    if(this.decide()) {
      alert(this.player + '获胜')
    } else {
      this.player = this.player === 'black' ? 'white' : 'black';
    }
  }
}

const newFive = new Five('myTest', 10)