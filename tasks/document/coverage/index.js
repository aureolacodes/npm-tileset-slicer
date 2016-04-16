'use strict';

const path = require('path');
const exec = require('child_process').exec;

let command = ([
  './node_modules/.bin/istanbul',
  'cover',
  '--dir ./documentation/coverage',
  './node_modules/.bin/_mocha',
  '-- -R spec'
]).join(' ');

exec(command, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }

  if (stdout || stderr) {
    console.log(stdout + stderr);
  }
});
