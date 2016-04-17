'use strict';

const assert = require('chai').assert;
const expect = require('chai').expect;
const Slicer = require('../../src/lib/Slicer.js');

describe('Slicer', function() {
  describe('#slice', function () {
    it('should throw an error with missing file', function (done) {
      let slicer = new Slicer();
      slicer.slice(null, {}, (error, tiles) => {
        assert.equal(error.constructor.name, 'TypeError');
        done();
      });
    });

    it('should create correct number of tiles', function (done) {
      let slicer = new Slicer();

      slicer.slice('./test/assets/tileset.png', {}, (error, tiles) => {
        assert.equal(tiles.length, 64);
        done();
      });
    });

    it('should slice correctly', function (done) {
      let slicer = new Slicer();

      slicer.slice('./test/assets/tileset.png', {
        startX: 1,
        startY: 1
      }, (error, tiles) => {
        let tile = tiles[0];

        assert.equal(tile.getPixel(0, 0).r, 255);
        assert.equal(tile.getPixel(0, 31).r, 0);
        assert.equal(tile.getPixel(31, 0).r, 0);
        assert.equal(tile.getPixel(31, 31).r, 255);

        done();
      });
    });
  });
});
