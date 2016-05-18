#!/usr/bin/node --harmony_destructuring
var util = require('util');
var fs = require('fs');
var semantic = require('./lib/semantic.js')
var PEG = require("./lib/pl0.js");
var fileName = process.argv[2] || 'input1.pl0';

fs.readFile(fileName, 'utf8', function (err,input) {
  if (err) {
    return console.log(err);
  }
  console.log(`Processing <***\n${input}\n***>`);
  try {
    var r = PEG.parse(input);
    semantic.semantic(r);
    console.log(util.inspect(r, {depth: null}));
  } catch (e) {
    console.log(`Error en línea ${e.location.start.line} columna ${e.location.start.column}`);
    console.log(e);
  }
});