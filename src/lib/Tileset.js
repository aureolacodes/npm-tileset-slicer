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

    this._width = config.width || defaults.width;
    this._height = config.height || defaults.height;

    for (let key of Object.keys(defaults)) {
      this['_' + key] = config[key] || defaults[key];
    }

    this._tiles = [];
    for (let y = 0, maxY = this.numTilesY; y < maxY; y++) {
      for (let x = 0, maxX = this.numTilesX; x < maxX; x++) {
        this.tiles.push(new Tile(
          this._calculateTileX(x),
          this._calculateTileY(y),
          this.tileWidth,
          this.tileHeight
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
    let numTilesX = this.width - this.startX + this.paddingX;
    numTilesX /= this.tileWidth + this.paddingX;
    return Math.floor(numTilesX);
  }

  /**
   * Returns the number of tiles in y-direction.
   *
   * @return {number}
   *   Number of tiles in y-direction.
   */
  get numTilesY() {
    let numTilesY = this.height - this.startX + this.paddingY;
    numTilesY /= this.tileHeight + this.paddingY;
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
   * Returns the total width of the tileset / the image.
   *
   * @return {number}
   *   Width of the tileset.
   */
  get width() {
    return this._width || defaults.width;
  }

  /**
   * Returns the total height of the tileset / the image.
   *
   * @return {number}
   *   Height of the tileset.
   */
  get height() {
    return this._height || defaults.height;
  }

  /**
   * Returns width of a single tile.
   *
   * @return {number}
   *   Width of a single tile.
   */
  get tileWidth() {
    return this._tileWidth || defaults.tileWidth;
  }

  /**
   * Returns height of a single tile.
   *
   * @return {number}
   *   Width of a height tile.
   */
  get tileHeight() {
    return this._tileHeight || defaults.tileHeight;
  }

  /**
   * Returns start position in x-direction.
   *
   * @return {number}
   *   Start position in x-direction.
   */
  get startX() {
    return this._startX || defaults.startX;
  }

  /**
   * Returns start position in y-direction.
   *
   * @return {number}
   *   Start position in y-direction.
   */
  get startY() {
    return this._startY || defaults.startY;
  }

  /**
   * Returns horizontal padding between tiles.
   *
   * @return {number}
   *   Horizontal padding between tiles.
   */
  get paddingX() {
    return this._paddingX || defaults.paddingX;
  }

  /**
   * Returns vertical padding between tiles.
   *
   * @return {number}
   *   Vertical padding between tiles.
   */
  get paddingY() {
    return this._paddingY || defaults.paddingY;
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
    return this.startX + x * (this.tileWidth + this.paddingX);
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
    return this.startY + y * (this.tileHeight + this.paddingY);
  }

}

module.exports = Tileset;
