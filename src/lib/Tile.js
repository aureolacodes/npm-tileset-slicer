/**
 * Contains the class for a single tile.
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 * @license MIT
 */
'use strict';

/**
 * Used to correct tile position by one pixel.
 * @type {number}
 */
const PIXEL = 1;

/**
 * Defines the class for a single tile.
 */
class Tile {

  /**
   * Sets up necessary values for a tile.
   *
   * @param {number} x
   *   X-position of the tile.
   * @param {number} y
   *   Y-position of the tile.
   * @param {number} width
   *   Width of the tile.
   * @param {number} height
   *   Height of the tile.
   */
  constructor(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  /**
   * Returns the x-position of the tile.
   *
   * @return {number}
   *   X-position of the tile.
   */
  get x() {
    return this._x;
  }

  /**
   * Returns the y-position of the tile.
   *
   * @return {number}
   *   Y-position of the tile.
   */
  get y() {
    return this._y;
  }

  /**
   * Returns the width of the tile.
   *
   * @return {number}
   *   Width of the tile.
   */
  get width() {
    return this._width;
  }

  /**
   * Returns the height of the tile.
   *
   * @return {number}
   *   Height of the tile.
   */
  get height() {
    return this._height;
  }

  /**
   * Returns top position of the tile.
   *
   * @return {number}
   *   Top position of tile.
   */
  get top() {
    return this.y;
  }

  /**
   * Returns right position of the tile.
   *
   * @return {number}
   *   Right position of tile.
   */
  get right() {
    return this.x + this.width - PIXEL;
  }

  /**
   * Returns bottom position of the tile.
   *
   * @return {number}
   *   Bottom position of tile.
   */
  get bottom() {
    return this.y + this.height - PIXEL;
  }

  /**
   * Returns left position of the tile.
   *
   * @return {number}
   *   Left position of tile.
   */
  get left() {
    this.x;
  }

}

module.exports = Tile;
