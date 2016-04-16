#!/usr/bin/env node

/**
 * TODO
 *
 * @author Chris Han <support@aureola.codes>
 * @copyright 2016, Aureola
 * @license MIT
 */
'use strict';

const Binary = require('../lib/Binary.js');

let binary = new Binary(process.argv);
binary.run();
