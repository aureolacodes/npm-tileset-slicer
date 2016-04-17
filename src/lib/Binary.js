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
   * @param {string} outputDir
   *   TODO
   */
  constructor(argv, outputDir) {
    this._outputDir = outputDir;

    this._program = program;
    this._program.version(config.version);
    this._program.usage('[options] <filename>');
    this._program.description(config.description);

    let options = this._options();
    for (let i = 0, len = options.length; i < len; i++) {
      this._program.option(
        options[i].name,
        options[i].desc + ' (default: ' + options[i].value + ').',
        options[i].callback,
        options[i].value
      );
    }

    this._program.parse(argv);
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

      this._index = 0;
      this._tiles = tiles;

      this._process();
    });
  }

  /**
   * TODO
   *
   * @param {number} i
   *   TODO
   *
   * @return {string}
   *   TODO
   */
  tilePath(i) {
    return path.resolve(this.outputDir(), 'tile-' +i + '.png');
  }

  /**
   * TODO
   *
   * @return {string}
   *   TODO
   */
  outputDir() {
    return path.resolve(this._outputDir, this._program.output);
  }

  /**
   * TODO
   *
   * @return {Array}
   *   TODO
   *
   * @private
   */
  _options() {
    return [
      {
        name: '-o, --output <directory>',
        desc: 'Output directory',
        callback: null,
        value: this._outputDir
      },
      {
        name: '-f, --format <format>',
        desc: 'Output format',
        callback: null,
        value: defaults.format
      },
      {
        name: '-w, --tileWidth <n>',
        desc: 'Tile width',
        callback: parseFloat,
        value: defaults.tileWidth
      },
      {
        name: '-h, --tileHeight <n>',
        desc: 'Tile height',
        callback: parseFloat,
        value: defaults.tileHeight
      },
      {
        name: '-x, --startX <n>',
        desc: 'Start x-position for slicer',
        callback: parseFloat,
        value: defaults.startX
      },
      {
        name: '-y, --startY <n>',
        desc: 'Start y-position for slicer',
        callback: parseFloat,
        value: defaults.startY
      },
      {
        name: '--paddingX <n>',
        desc: 'Padding between tiles',
        callback: parseFloat,
        value: defaults.paddingX
      },
      {
        name: '--paddingY <n>',
        desc: 'Padding between tiles',
        callback: parseFloat,
        value: defaults.paddingY
      }
    ];
  }

  /**
   * TODO
   *
   * @private
   */
  _process() {
    let tile = this._tiles[this._index] || null;
    if (!tile) {
      console.log(this._index + ' tiles have been created.');
      return;
    }

    tile.writeFile(this.tilePath(this._index), this.format, {}, error => {
      if (error) {
        throw error;
      }

      this._index++;
      this._process();
    });
  }

}

module.exports = Binary;
