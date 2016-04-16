/**
 * TODO
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 * @license MIT
 */
'use strict';

const Tileset = require('./Tileset');
const lwip = require('lwip');
const path = require('path');

/**
 * TODO
 */
class Slicer {

  /**
   * TODO
   *
   * @param {string} filepath
   *   TODO
   * @param {object} config
   *   TODO
   * @param {function} callback
   *   TODO
   */
  slice(filepath, config, callback) {
    this._callback = callback || function() {};

    lwip.open(path.resolve(filepath), (error, image) => {
      if (error) {
        this._callback(error);
      }
      else {
        config.width = image.width();
        config.height = image.height();

        this._tileset = new Tileset(config);

        this._index = 0;
        this._tiles = [];
        this._image = image;

        this._nextTile();
      }
    });
  }

  /**
   * TODO
   *
   * @private
   */
  _nextTile() {
    let tile = this._tileset.tile(this._index);
    if (tile === null) {
      this._callback(null, this._tiles);
    }
    else {
      // For some reason this is necessary for lwip to
      // calculate the extracted tile correctly.
      let correction = 1;

      let left = tile.x;
      let top = tile.y;
      let right = tile.x + tile.width - correction;
      let bottom = tile.y + tile.height - correction;

      this._image.extract(left, top, right, bottom, (error, newImage) => {
        if (error) {
          this._callback(error);
        }
        else {
          this._tiles.push(newImage);
          this._index++;

          this._nextTile();
        }
      });
    }
  }

}

module.exports = Slicer;
