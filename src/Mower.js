const DIRECTIONS = ['N', 'E', 'S', 'W'];

module.exports = class Mower {
  constructor(coordinates, direction, lawn) {
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.direction = direction;
    this.horizontalLim = lawn[0];
    this.verticalLim = lawn[1];
  }

  get position() {
    return `${this.x} ${this.y} ${this.direction}`
  }

  _rotate(direction) {
    let index = DIRECTIONS.indexOf(this.direction);
    if (direction === 'left') return index > 0 ? DIRECTIONS[index - 1] : DIRECTIONS[DIRECTIONS.length - 1];
    if (direction === 'right') return index === DIRECTIONS.length - 1 ? DIRECTIONS[0] : DIRECTIONS[index + 1];
  }

  left() {
    this.direction = this._rotate('left')
  }
  right() {
    this.direction = this._rotate('right')
  }

  _validateMove(x, y) {
    return x >= 0 && x <= this.horizontalLim && y >= 0 && y <= this.verticalLim
  }

  move() {
    switch(this.direction) {
      case 'N':
        if (this._validateMove(this.x, this.y + 1)) { this.y += 1 }
        break;
      case 'E':
        if (this._validateMove(this.x + 1, this.y)) { this.x += 1 }
        break;
      case 'S':
        if (this._validateMove(this.x, this.y - 1)) { this.y -= 1 }
        break;
      case 'W':
        if (this._validateMove(this.x - 1, this.y)) { this.x -= 1 }
        break;
    }
  }
};
