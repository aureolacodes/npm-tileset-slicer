/**
 * Contains the class responsible for command line operations.
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
 * Defines the class responsible for command line operations.
 */
class Command {

  /**
   * Setup command line interface using commander.
   *
   * @param {array} argv
   *   Raw array of command line arguments.
   * @param {string} outputDir
   *   Working directory: process.cwd().
   */
  constructor(argv, outputDir) {
    argv = argv || [];
    this._outputDir = outputDir || '';

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
   * Starts the tileset slicing process.
   *
   * @return {boolean}
   *   True, if process could be started.
   */
  run() {
    if (typeof this._program.args[0] === 'undefined') {
      console.log('No input image defined.');
      return false;
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

    return true;
  }

  /**
   * Returns the full path of a single tile.
   *
   * @param {number} i
   *   Index of the tile.
   *
   * @return {string}
   *   Full path of single tile.
   */
  tilePath(i) {
    return path.resolve(this.outputDir(), 'tile-' +i + '.png');
  }

  /**
   * Returns the full output directory path.
   *
   * @return {string}
   *   Output directory.
   */
  outputDir() {
    return path.resolve(this._outputDir, this._program.output);
  }

  /**
   * Array of options for the command line interface.
   *
   * @return {Array}
   *   Array of command line options.
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
   * Processes the next tile in the queue.
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

module.exports = Command;
