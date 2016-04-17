'use strict';

const fs = require('fs');
const assert = require('chai').assert;
const expect = require('chai').expect;
const Command = require('../../src/lib/Command.js');
const defaults = require('../../src/config/defaults.json');

describe('Command', function() {
  describe('#constructor', function () {
    it('should set default values', function () {
      let command = new Command();

      assert.equal(command._program.output, '');
      assert.equal(command._program.format, 'png');
      assert.equal(command._program.tileWidth, defaults.tileWidth);
      assert.equal(command._program.tileHeight, defaults.tileHeight);
      assert.equal(command._program.startX, defaults.startX);
      assert.equal(command._program.startY, defaults.startY);
      assert.equal(command._program.paddingX, defaults.paddingX);
      assert.equal(command._program.paddingY, defaults.paddingY);
    });
  });

  describe('#outputDir', function () {
    it('return correct output directory', function () {
      let command = new Command(['', '', '-o', 'output'], '/test');
      assert.equal(command.outputDir(), '/test/output');
    });
  });

  describe('#tilePath', function () {
    it('return correct tilepath', function () {
      let command = new Command(['', '', '-o', 'output'], '/test');
      assert.equal(command.tilePath(1), '/test/output/tile-1.png');
    });
  });

  describe('#run', function () {
    it('should fail without image', function () {
      let command = new Command();
      assert.equal(command.run(), false);
    });

    it('should create correct number of images', function (done) {
      let command = new Command([
        '',
        '',
        '-o',
        'test/output',
        'test/assets/tileset.png'
      ], process.cwd());

      command.run();

      setTimeout(() => {
        expect(fs.accessSync.bind(null, command.tilePath(63), fs.F_OK))
          .to.not.throw(Error);

        done();
      }, 250);
    });
  });
});
