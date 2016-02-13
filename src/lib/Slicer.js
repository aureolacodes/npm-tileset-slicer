/**
 * TODO
 *
 * @author Christian Hanne <support@aureola.codes>
 * @license MIT
 */
'use strict';

let lwip = require('lwip');
let path = require('path');
let options = require('../config/slicer.json');

export default class Slicer {
  constructor(source, target, settings, callback) {
    this._source = path.resolve(source);
    this._target = path.resolve(target);
    this._options = options;

    if (typeof settings === 'object') {
      for (let i in settings) {
        if (settings.hasOwnProperty(i) && typeof this.options[i] !== 'undefined') {
          this.options[i] = settings[i];
        }
      }
    }

    lwip.open(this.source, (error, image) => {
      this._image = image;
      if (typeof callback === 'function') {
        callback(error, image);
      }
    });
  }

  get image() {
    return this._image || null;
  }

  get source() {
    return this._source || null;
  }

  get target() {
    return this._target || null;
  }

  get options() {
    return this._options || {};
  }

  get imageWidth() {
    return this.image.width();
  }

  get imageHeight() {
    return this.image.height();
  }

  get numTilesX() {
    let numTilesX = this.imageWidth - this.options.startX + this.options.marginX;
    numTilesX /= this.options.tileWidth + this.options.marginX;
    return Math.floor(numTilesX);
  }

  get numTilesY() {
    let numTilesY = this.imageHeight - this.options.startY + this.options.marginY;
    numTilesY /= this.options.tileHeight + this.options.marginY;
    return Math.floor(numTilesY);
  }

  get numTiles() {
    return this.numTilesX * this.numTilesY;
  }

  tilepath(x, y) {
    let matches = this.source.match(/^.*\/(.*)(\.[a-z]+)$/i);
    let tilename = matches[1] + '-' + x + '-' + y + matches[2];
    return path.resolve(this.target, tilename);
  }

  createTile(x, y) {
    let left   = this.options.startX + x * (this.options.tileWidth + this.options.marginX);
    let top    = this.options.startY + y * (this.options.tileHeight + this.options.marginY);
    let right  = left + this.options.tileWidth;
    let bottom = top + this.options.tileHeight;

    this.image.extract(left, top, right, bottom, (error, image) => {
      image.writeFile(this.tilepath(x, y), error => {
        if (error) {
          throw(error);
        }
      });
    });
  }

  slice() {


    for (let y = 0, numTilesX = this.numTilesX; y < numTilesX; y++) {
      for (let x = 0, numTilesY = this.numTilesY; x < numTilesY; x++) {
        this.createTile(x, y);
      }
    }
  }
}
