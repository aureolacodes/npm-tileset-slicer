/**
 * Contains a class responsible for managing tiles in a tileset.
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 * @license MIT
 */
'use strict';

const Tile = require('./Tile');
const defaults = require('../config/defaults.json');

/**
 * Defines a class responsible for managing tiles in a tileset.
 */
class Tileset {

  /**
   * Sets up and calculates the tileset.
   *
   * @param {object} config
   *   Config object. Check defaults.json for details.
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
          this._calculateTileX(x),
          this._calculateTileY(y),
          this._tileWidth,
          this._tileHeight
        ));
      }
    }
  }

  /**
   * Returns the tile with the given index.
   *
   * @param {number} index
   *   Index of the tile in the tiles array.
   *
   * @return {Tile|null}
   *   Either the requested tile or null if not found.
   */
  tile(index) {
    return this._tiles[index] || null;
  }

  /**
   * Returns an array of all tiles of this tileset.
   *
   * @return {Array}
   *   Array of tiles.
   */
  get tiles() {
    return this._tiles;
  }

  /**
   * Returns the number of tiles in x-direction.
   *
   * @return {number}
   *   Number of tiles in x-direction.
   */
  get numTilesX() {
    let numTilesX = this._width - this._startX + this._paddingX;
    numTilesX /= this._tileWidth + this._paddingX;
    return Math.floor(numTilesX);
  }

  /**
   * Returns the number of tiles in y-direction.
   *
   * @return {number}
   *   Number of tiles in y-direction.
   */
  get numTilesY() {
    let numTilesY = this._height - this._startY + this._paddingY;
    numTilesY /= this._tileHeight + this._paddingY;
    return Math.floor(numTilesY);
  }

  /**
   * Returns the total number of tiles in the tileset.
   *
   * @return {number}
   *   Total number of tiles.
   */
  get numTiles() {
    return this.numTilesX * this.numTilesY;
  }

  /**
   * Calculates the pixel value of a tile's relative x-position.
   *
   * @param {number} x
   *   Relative x-position.
   *
   * @return {number}
   *   Absolute x-position of tile.
   *
   * @private
   */
  _calculateTileX(x) {
    return this._startX + x * (this._tileWidth + this._paddingX);
  }

  /**
   * Calculates the pixel value of a tile's relative y-position.
   *
   * @param {number} y
   *   Relative y-position.
   *
   * @return {number}
   *   Absolute y-position of tile.
   *
   * @private
   */
  _calculateTileY(y) {
    return this._startY + y * (this._tileHeight + this._paddingY);
  }

}

module.exports = Tileset;
