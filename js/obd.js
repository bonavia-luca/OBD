const { SerialPort } = require('serialport');

export default class Obd {
    constructor() {
        //this.fuelLevel = document.getElementById("fuel-level");
        this.creaConnessione();
        this.eventi();
        this.statoConnessione = this.controllaConnessione();

    }

    async eventi() {
        this.port.on('open', () => {
            console.log(`Connessione aperta sulla porta seriale ${this.port.path}`)
            this.impostaConnessione();
        });
        this.port.on('close', () => {
            console.log(`Connessione chiusa sulla porta seriale ${this.port.path}`)
        });
        this.port.on('error', (err) => {
            console.log(`Errore sulla porta seriale ${this.port.path}: ${err.message}`)
        });

        this.port.on('data', (data) => {

        })
    }

    async send(cmd) {
        console.log(`Invio il comando ${cmd}`);
        this.port.write(cmd + '\r');
    }

    async pausa(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async impostaConnessione() {
        //reset
        this.send('ATZ');
        await this.pausa(1000);

        //spegne echo
        this.send('ATE0');
        await this.pausa(1000);

        //spegne linefeed (\n)
        this.send('ATL0');
        await this.pausa(1000);

        //spegne spazi vuoti
        this.send('ATS0');
        await this.pausa(1000);

        //imposta autimaticamente il protocollo
        this.send('ATSP0');
        await this.pausa(1000);
    }

    async creaConnessione() {
        this.port = new SerialPort({
            path: 'COM6',   //DIPENDE
            baudRate: 38400,
            autoOpen: false
        });

        this.port.open((err) => {
            if (err) console.log(`Errore in fase di apertura della porta: ${err.message}`);
        })
    }

    async controllaConnessione() {
        return this.port.isOpen;
    }
}