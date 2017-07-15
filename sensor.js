const Tessel = require('tessel-io');
const J5 = require('johnny-five');

const board = new J5.Board({
    io: new Tessel()
});

board.on('ready', () => {
    const monitor = new J5.Multi({
        controller: 'BME280'
    });

    monitor.on('change', function() {
        console.log('--- Monitor ----');
        console.log(`celsius: ${this.thermometer.celsius}`);
        console.log(`pressure: ${this.barometer.pressure}`);
        console.log(`humidity: ${this.hygrometer.relativeHumidity}`);
        console.log(`meters: ${this.altimeter.meters}`);
        console.log('--- End ----');
    });
});