const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

export default class Obd {
    constructor() {
        this.createConnection();
        this.events();
    }

    async events() {
        this.port.on('open', () => {
            console.log(`Connessione aperta sulla porta seriale ${this.port.path}`)
            this.setConnection();
        });
        this.port.on('close', () => {
            console.log(`Connessione chiusa sulla porta seriale ${this.port.path}`)
        });
        this.port.on('error', (err) => {
            console.log(`Errore sulla porta seriale ${this.port.path}: ${err.message}`)
        });

        this.parser.on('data', (res) => {
            res = res.trim();
            console.log(res);
            if (!res || res === '>' || res === 'OK' || res.startsWith('ELM327')) return;  //Escludo linee vuote o linee di comando
            if (res === 'NO DATA') {
                console.log("⚠️ L'auto non supporta questo sensore o il motore è spento.");
                return;
            }
            if (res === 'SEARCHING...') {
                console.log("⏳ Ricerca protocollo in corso...");
                return;
            }
            if(res.startsWith('41')) { //risposta positiva (codice 01 + 40)
                const pid = res.substring(2, 4);    //contiene PID richiesta (per sapere cosa mi sta dicendo)
                const data = res.substring(4);      //raccoglie dati in esadecimale

                switch (pid) {
                    case '0C':  //RPM
                        this.calculateRPM(data);
                        break;
                    case '0D':  //Velocità
                        this.calculateSpeed(data);
                        break;
                    case '05':  //Temperatura liquido raffreddamento
                        this.calculateTemperature(data)
                        break;
                    case '2F':  //Livello carburante
                        this.calculateFuel(data);
                        break;
                    default:
                        console.log(`PID ${pid} non supportato: ${data}`);
                        break;
                }
            } else {
                console.log(`Messaggio sconosciuto: ${res}`)
            }
        })
    }

    calculateRPM(hex) {
        const A = parseInt(hex.substring(0, 2), 16);
        const B = parseInt(hex.substring(2, 4), 16);
        const rpm = ((A * 256) + B) / 4;

        console.log(`Giri Motore: ${rpm} RPM`);
    }

    calculateSpeed(hex) {
        const A = parseInt(hex.substring(0, 2), 16);
        const velocita = A;

        console.log(`Velocità: ${velocita} km/h`);
    }

    calculateTemperature(hex) {
        const A = parseInt(hex.substring(0, 2), 16);
        const gradi = A - 40;

        console.log(`Temperatura Motore: ${gradi} °C`);
    }

    calculateFuel(hex) {
        const A = parseInt(hex.substring(0, 2), 16);
        const percentuale = Math.round((A * 100) / 255);

        console.log(`Livello Carburante: ${percentuale}%`);
    }

    async send(cmd) {
        console.log(`Invio il comando ${cmd}`);
        this.port.write(cmd + '\r');
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async setConnection() {
        //reset
        this.send('ATZ');
        await this.wait(1000);

        //spegne echo
        this.send('ATE0');
        await this.wait(200);

        //spegne linefeed (\n)
        this.send('ATL0');
        await this.wait(200);

        //spegne spazi vuoti
        this.send('ATS0');
        await this.wait(200);

        //imposta autimaticamente il protocollo
        this.send('ATSP0');
        await this.wait(200);
    }

    async createConnection() {
        this.port = new SerialPort({
            path: 'COM6',   //DIPENDE
            baudRate: 38400,
            autoOpen: false
        });
        this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r' }));

        this.port.open((err) => {
            if (err) console.log(`Errore in fase di apertura della porta: ${err.message}`);
        })
    }

    async isConnected() {
        return this.port.isOpen;
    }
}