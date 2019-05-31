module.exports =  class MowerHandler {
  constructor(mower) {
    this.mower = mower
  }

  operate(commands) {
    commands.forEach(function(c) {
      switch(c) {
        case 'L':
          this.mower.left();
          break;
        case 'R':
          this.mower.right();
          break;
        case 'F':
          this.mower.move();
          break;
      }
    }.bind(this))
  }
};
