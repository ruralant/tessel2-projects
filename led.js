'use strict';

// Import the interface to Tessel hardware
const Tessel = require('tessel-io');
const J5 = require('johnny-five');

const board = new J5.Board({
  io: new Tessel()
});

board.on('ready', () => {
  const led = new J5.Led('a5');
  led.pulse(500);
});