#!/usr/bin/env node

/**
 * Entry point for tileset slicer command line interface.
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 * @license MIT
 */
'use strict';

const Command = require('../lib/Command.js');

let command = new Command(process.argv, process.cwd());
command.run();
