'use strict';

const config = require('./config.json');
const exec = require('child_process').exec;

exec('./node_modules/.bin/jshint ' + config.srcDir, (error, stdout, stderr) => {
  if (stdout || stderr) {
    console.log(stdout + stderr);
  }
});
