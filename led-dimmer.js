'use strict';
const Tessel = require('tessel-io');
const J5 = require('johnny-five');

const board = new J5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const sensor = new J5.Sensor('a7');
    const led = new J5.Led('b5');

    sensor.on('change', () => {
        led.brightness(sensor.scaleTo(0, 155));
    });
});