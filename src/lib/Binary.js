/**
 * TODO
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 */
'use strict';

const Slicer = require('../lib/Slicer');

const path = require('path');
const program = require('commander');

const config = require('../../package.json');
const defaults = require('../config/defaults.json');

/**
 * TODO
 */
class Binary {

  /**
   * TODO
   *
   * @param {array} argv
   *   TODO
   */
  constructor(argv) {
    this._program = program
      .version(config.version)
      .usage('[options] <filename>')
      .description(config.description)
      .option(
        '--tileWidth <n>',
        'Tile width (default: ' + defaults.tileWidth + ').',
        parseFloat,
        defaults.tileWidth
      )
      .option(
        '--tileHeight <n>',
        'Tile height (default: ' + defaults.tileHeight + ').',
        parseFloat,
        defaults.tileHeight
      )
      .option(
        '--startX <n>',
        'Start x-position for slicer (default: ' + defaults.startX + ').',
        parseFloat,
        defaults.startX
      )
      .option(
        '--startY <n>',
        'Start y-position for slicer (default: ' + defaults.startY + ').',
        parseFloat,
        defaults.startY
      )
      .option(
        '--paddingX <n>',
        'Padding between tiles (default: ' + defaults.paddingX + ').',
        parseFloat,
        defaults.paddingX
      )
      .option(
        '--paddingY <n>',
        'Padding between tiles (default: ' + defaults.paddingY + ').',
        parseFloat,
        defaults.paddingY
      )
      .option(
        '-o, --output <directory>',
        'Output directory (default: ' + process.cwd() + ').',
        null,
        process.cwd()
      )
      .parse(argv);
  }

  /**
   * TODO
   */
  run() {
    if (typeof this._program.args[0] === 'undefined') {
      console.log('No input image defined.');
      return;
    }

    let slicer = new Slicer();

    let slicerConfig = {};
    for (let key of Object.keys(defaults)) {
      slicerConfig[key] = this._program[key];
    }

    let filepath = this._program.args[0];
    slicer.slice(filepath, slicerConfig, (error, tiles) => {
      if (error) {
        throw error;
      }

      this._outputDir = process.cwd();
      if (this._program.output) {
        this._outputDir = path.resolve(this._outputDir, this._program.output);
      }

      this._index = 0;
      this._tiles = tiles;

      this._process();
    });
  }

  /**
   * TODO
   *
   * @private
   */
  _process() {
    let tile = this._tiles[this._index] || null;
    if (tile) {
      let filename = 'tile-' + this._index + '.png';
      let filepath = path.resolve(this._outputDir, filename);

      tile.writeFile(filepath, 'png', {}, error => {
        if (error) {
          throw error;
        }

        this._index++;
        if (typeof this._tiles[this._index] !== 'undefined') {
          this._process();
        }
        else {
          console.log(this._tiles.length + ' tiles have been created.');
        }
      });
    }
  }

}

module.exports = Binary;
