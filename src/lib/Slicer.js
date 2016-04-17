/**
 * Contains the main slicer class.
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
 * Defines the main slicer class.
 */
class Slicer {

  /**
   * Sets up the slicer.
   *
   * @param {string} filepath
   *   Filepath of the input image / tileset.
   * @param {object} config
   *   Configuration object. Check defaults.json for options.
   * @param {function} callback
   *   Callback function, called after slicing has finished or error occured.
   */
  slice(filepath, config, callback) {
    this._callback = callback || this._fallback;

    try {
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
    catch(error) {
      this._callback(error);
    }
  }

  /**
   * Processes the next tile in the queue.
   *
   * @private
   */
  _nextTile() {
    let t = this._tileset.tile(this._index);
    if (t === null) {
      this._callback(null, this._tiles);
    }
    else {
      this._image.extract(t.left, t.top, t.right, t.bottom, (error, tile) => {
        if (error) {
          this._callback(error);
        }
        else {
          this._tiles.push(tile);
          this._index++;

          this._nextTile();
        }
      });
    }
  }

  /**
   * Fallback callback, used if user did not define one.
   *
   * @param {Error|null} error
   *   Error message.
   * @param {Array} tiles
   *   Array of created tiles (lwip images).
   *
   * @private
   */
  _fallback(error, tiles) {
    if (error) {
      throw error;
    }

    console.log(tiles);
  }

}

module.exports = Slicer;
