const http = require('http');
const os = require('os');
const path = require('path');

const Tessel = require('tessel-io');
const J5 = require('johnny-five');
const board = J5.Board({
    io: new Tessel()
});

const Express = require('express');
const SocketIO = require('socket.io');

const app = new Express();
const server = new http.Server(app);
const io = new SocketIO(server);

const assertPath = path.join(__dirname, 'app');
const vendorPath = path.join(__dirname, 'node_modules');

app.use(Express.static(assertPath));
app.use('/vendor', Express.static(vendorPath));

board.on('ready', () => {
    const clients = new Set();
    const monitor = new J5.Multi({
        controller: 'BME280',
        elevation: 2
    });
    let update = Date.now() - 5000;

    monitor.on('change', () => {
        const now = Date.now();
        if(now - update >= 5000) {
            update = now;

            clients.forEach(client => {
                client.emit('report', {
                    thermometer: monitor.thermometer.celsius,
                    barometer: monitor.barometer.pressure,
                    hygrometer: monitor.hygrometer.relativeHumidity,
                    altimeter: monitor.altimeter.meters
                });
            });
        }
    });

    io.on('connection', socket => {
        if(clients.size < 5) {
            clients.add(socket);
            socket.on('disconnect', () => clients.delete(socket));
        }
    });

    const port = 80;
    server.listen(port, () => {
        console.log(`Server started, go to http://${os.hostname()}`);

        process.on('SIGINT', () => {
            server.close();
        });
    });
});