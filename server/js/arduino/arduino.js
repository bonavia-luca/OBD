const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { EventEmitter } = require('events');
const { WebSocket } = require('ws');

class Arduino extends EventEmitter {
    constructor() {
        super();
        this.createConnection();
        this.events();
        this.wss = new WebSocket.Server({ port: 5252});
        this.wss.on('connection', (ws) => {
            this.ws = ws;

            ws.on('close', () => {
                this.ws = null;
            })
        })
    }

    async events() {
        this.port.on('open', () => {
            console.log(`Connessione aperta sulla porta seriale ${this.port.path}`)
            //this.setConnection();
            this.emit('open');
        });
        this.port.on('close', () => {
            console.log(`Connessione chiusa sulla porta seriale ${this.port.path}`)
        });
        this.port.on('error', (err) => {
            console.log(`Errore sulla porta seriale ${this.port.path}: ${err.message}`)
        });

        this.parser.on('data', (res) => {
            res = res.trim();
            if (!res) return;
            console.log(res);
            this.send

            const parts = res.split("|");

            const type = parts[0];
            const id = parts[1];
            const value = parts[2];

            if(!type) return;
            //if (!type || value === undefined) return; //errore in fase di ricezione

            this.sendData(type, id, value);
        });
    }

    sendData(type, id, val) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({ type, id, val }));
        }
    }

    async send(cmd) {
        //console.log(`Invio il comando ${cmd}`);
        this.port.write(cmd + '\r');
    }

    async createConnection() {
        this.port = new SerialPort({
            path: 'COM3',   //DIPENDE
            baudRate: 9600,
            autoOpen: false
        });
        this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r' }));

        this.port.open((err) => {
            if (err) console.log(`Errore in fase di apertura della porta: ${err.message}`);
        })
    }
}

module.exports = Arduino;