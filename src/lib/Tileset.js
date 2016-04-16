/**
 * TODO
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 * @license MIT
 */
'use strict';

const Tile = require('./Tile');
const defaults = require('../config/defaults.json');

/**
 * TODO
 */
class Tileset {

  /**
   * TODO
   *
   * @param {object} config
   *   TODO
   */
  constructor(config) {
    config = config || {};

    this._width = config.width || 0;
    this._height = config.height || 0;

    for (let key of Object.keys(defaults)) {
      this[key] = config[key] || defaults[key];
    }

    this._tiles = [];
    for (let y = 0, maxY = this.numTilesY; y < maxY; y++) {
      for (let x = 0, maxX = this.numTilesX; x < maxX; x++) {
        this.tiles.push(new Tile(
          this._calculateX(x),
          this._calculateY(y),
          this._tileWidth,
          this._tileHeight
        ));
      }
    }
  }

  /**
   * TODO
   *
   * @param {number} index
   *   TODO
   *
   * @return {Tile|null}
   *   TODO
   */
  tile(index) {
    return this._tiles[index] || null;
  }

  /**
   * TODO
   *
   * @return {Array}
   *   TODO
   */
  get tiles() {
    return this._tiles;
  }

  /**
   * TODO
   *
   * @return {number}
   *   TODO
   */
  get numTilesX() {
    let numTilesX = this._width - this._startX + this._paddingX;
    numTilesX /= this._tileWidth + this._paddingX;
    return Math.floor(numTilesX);
  }

  /**
   * TODO
   *
   * @return {number}
   *   TODO
   */
  get numTilesY() {
    let numTilesY = this._height - this._startY + this._paddingY;
    numTilesY /= this._tileHeight + this._paddingY;
    return Math.floor(numTilesY);
  }

  /**
   * TODO
   *
   * @return {number}
   *   TODO
   */
  get numTiles() {
    return this.numTilesX * this.numTilesY;
  }

  /**
   * TODO
   *
   * @param {number} x
   *   TODO
   *
   * @return {number}
   *   TODO
   *
   * @private
   */
  _calculateX(x) {
    return this._startX + x * (this._tileWidth + this._paddingX);
  }

  /**
   * TODO
   *
   * @param {number} y
   *   TODO
   *
   * @return {number}
   *   TODO
   *
   * @private
   */
  _calculateY(y) {
    return this._startY + y * (this._tileHeight + this._paddingY);
  }

}

module.exports = Tileset;
