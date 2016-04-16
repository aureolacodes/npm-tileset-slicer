'use strict';

const path = require('path');
const exec = require('child_process').exec;

let configPath = path.resolve(__dirname, './config.json');

exec('./node_modules/.bin/esdoc -c ' + configPath, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }

  if (stdout || stderr) {
    console.log(stdout + stderr);
  }
});
