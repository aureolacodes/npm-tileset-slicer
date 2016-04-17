'use strict';

const assert = require('chai').assert;
const Tile = require('../../src/lib/Tile.js');

describe('Tile', function() {
  describe('#constructor', function () {
    it('should return initial params', function () {
      let tile = new Tile(0, 1, 2, 3);
      assert.equal(tile.x, 0);
      assert.equal(tile.y, 1);
      assert.equal(tile.width, 2);
      assert.equal(tile.height, 3);
    });
  });

  describe('#top', function () {
    it('should return same value as y', function () {
      let tile = new Tile(3, 4, 5, 6);
      assert.equal(tile.y, tile.top);
    });
  });

  describe('#right', function () {
    it('should calculate correct value', function () {
      let tile = new Tile(2, 4, 8, 16);
      assert.equal(9, tile.right);
    });
  });

  describe('#bottom', function () {
    it('should calculate correct value', function () {
      let tile = new Tile(3, 6, 12, 24);
      assert.equal(29, tile.bottom);
    });
  });

  describe('#left', function () {
    it('should return same value as x', function () {
      let tile = new Tile(3, 4, 5, 6);
      assert.equal(tile.x, tile.left);
    });
  });
});
