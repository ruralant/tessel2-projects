'use strict';
const Tessel = require('tessel-io');
const J5 = require('johnny-five');

const board = new J5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const led = new J5.Led('a5');
    const button = new J5.Button('a2');

    button.on('press', () => led.blink(100));
    button.on('release', () => led.off());
});