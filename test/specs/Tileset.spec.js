'use strict';

const assert = require('chai').assert;
const Tileset = require('../../src/lib/Tileset.js');
const defaults = require('../../src/config/defaults.json');

describe('Tileset', function() {
  describe('#constructor', function () {
    it('should set default values', function () {
      let tileset = new Tileset();

      assert.equal(tileset.width, defaults.width);
      assert.equal(tileset.height, defaults.height);
      assert.equal(tileset.tileWidth, defaults.tileWidth);
      assert.equal(tileset.tileHeight, defaults.tileHeight);
      assert.equal(tileset.startX, defaults.startX);
      assert.equal(tileset.startY, defaults.startY);
      assert.equal(tileset.paddingX, defaults.paddingX);
      assert.equal(tileset.paddingY, defaults.paddingY);
    });

    it('should set custom values', function () {
      let tileset = new Tileset({
        width: 1,
        height: 2,
        tileWidth: 3,
        tileHeight: 4,
        startX: 5,
        startY: 6,
        paddingX: 7,
        paddingY: 8
      });

      assert.equal(tileset.width, 1);
      assert.equal(tileset.height, 2);
      assert.equal(tileset.tileWidth, 3);
      assert.equal(tileset.tileHeight, 4);
      assert.equal(tileset.startX, 5);
      assert.equal(tileset.startY, 6);
      assert.equal(tileset.paddingX, 7);
      assert.equal(tileset.paddingY, 8);
    });
  });

  describe('#tiles', function () {
    it('should create tiles', function () {
      let tileset = new Tileset({
        width: 256,
        height: 256,
        startX: 4,
        startY: 4,
        paddingX: 2,
        paddingY: 2
      });

      assert.equal(tileset.tiles.length, 49);
      assert.equal(tileset.tiles[0].constructor.name, 'Tile');
    });
  });

  describe('#tile', function () {
    it('should return tile when available', function () {
      let tileset = new Tileset({
        width: 256,
        height: 256,
        startX: 4,
        startY: 4,
        paddingX: 2,
        paddingY: 2
      });

      assert.equal(tileset.tile(48).constructor.name, 'Tile');
    });

    it('should return null for invalid index', function () {
      let tileset = new Tileset();

      assert.equal(tileset.tile(0), null);
    });

  });

  describe('#numTilesX', function () {
    it('should calculate x-tiles', function () {
      let tileset = new Tileset({
        width: 64,
        startX: 4,
        paddingX: 2
      });

      assert.equal(tileset.numTilesX, 1);
    });
  });

  describe('#numTilesY', function () {
    it('should calculate y-tiles', function () {
      let tileset = new Tileset({
        height: 64
      });

      assert.equal(tileset.numTilesY, 2);
    });
  });

  describe('#numTiles', function () {
    it('should calculate total tiles', function () {
      let tileset = new Tileset({
        width: 256,
        height: 256,
        startX: 4,
        startY: 4,
        paddingX: 2,
        paddingY: 2
      });

      assert.equal(tileset.numTiles, 49);
    });
  });

  describe('#_calculateTileX', function () {
    it('should calculate x-position', function () {
      let tileset = new Tileset({
        width: 256,
        height: 256,
        startX: 4,
        startY: 4,
        paddingX: 2,
        paddingY: 2
      });

      assert.equal(tileset._calculateTileX(2), 72);
    });
  });

  describe('#_calculateTileY', function () {
    it('should calculate y-position', function () {
      let tileset = new Tileset({
        width: 256,
        height: 256,
        startX: 4,
        startY: 4,
        paddingX: 2,
        paddingY: 2
      });

      assert.equal(tileset._calculateTileY(2), 72);
    });
  });
});
