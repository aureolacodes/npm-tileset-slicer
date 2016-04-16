'use strict';

const assert = require('chai').assert;
const Tile = require('../../src/lib/Tile.js');

describe('Tile', function() {
  describe('#x', function () {
    it('should return given value', function () {
      let tile = new Tile(0);
      assert.equal(tile.x, 0);
    });
  });

  describe('#y', function () {
    it('should return given value', function () {
      let tile = new Tile(1, 2);
      assert.equal(tile.y, 2);
    });
  });

  describe('#width', function () {
    it('should return given value', function () {
      let tile = new Tile(3, 4, 5);
      assert.equal(tile.width, 5);
    });
  });

  describe('#height', function () {
    it('should return given value', function () {
      let tile = new Tile(6, 7, 8, 9);
      assert.equal(tile.height, 9);
    });
  });
});
