const chai = require('chai');
const assert = chai.assert,
  expect = chai.expect;
const spies = require('chai-spies');
const Mower = require('../src/Mower');
const MowerHandler = require('../src/MowerHandler');
chai.use(spies);

describe('Lawn Mower', function() {
  describe('initialization', function() {
    let mower = new Mower([1, 1], 'N', [5, 5]);

    it('should set x and y coordinates and direction', function () {
      assert.deepEqual([mower.x, mower.y, mower.direction], [1, 1, 'N']);
    });
  });

  describe('movements', function () {
    context('it stays on 1, 1 position and has N direction initially', function () {
      let mower = new Mower([1, 1], 'N', [5, 5]);

      it('should turn right', function () {
        mower.right();
        assert.equal(mower.direction, 'E')
      });

      it('should turn left', function () {
        mower.left();
        assert.equal(mower.direction, 'N')
      });

      it('should move up', function () {
        mower.move();
        assert.equal(mower.y, 2)
      });
    });

    it('should not move beyond boundary', function () {
      mower = new Mower([1, 1], 'N', [1, 1]);
      mower.move();
      assert.equal(mower.y, 1)
    })
  });
});
describe('Lawn Mower Handler', function () {
  describe('operate commands', function () {
    const mower = new Mower([1, 1], 'N', [5, 5]);
    const handler = new MowerHandler(mower);
    it('should operate properly with R command', function () {
      const spy = chai.spy.on(mower, 'right');
      handler.operate(['R']);
      expect(spy).to.have.been.called();
      chai.spy.restore(mower, 'right')
    });

    it('should operate properly with L command', function () {
      const spy = chai.spy.on(mower, 'left');
      handler.operate(['L']);
      expect(spy).to.have.been.called();
      chai.spy.restore(mower, 'left')
    });

    it('should operate properly with F command', function () {
      const spy = chai.spy.on(mower, 'move');
      handler.operate(['F']);
      expect(spy).to.have.been.called();
      chai.spy.restore(mower, 'move')
    });

    it('should not call left, right or move methods if command is unknown', function () {
      const spy1 = chai.spy.on(mower, 'move');
      const spy2 = chai.spy.on(mower, 'left');
      const spy3 = chai.spy.on(mower, 'right');
      handler.operate(['X']);
      expect(spy1).to.not.have.been.called();
      expect(spy2).to.not.have.been.called();
      expect(spy3).to.not.have.been.called();
      chai.spy.restore();
    })
  })
});
