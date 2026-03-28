const Obd = require("./obd.js");

class ObdCommunication {
    constructor() {
        this.obd = new Obd();
        this.loop = [() => this.getRpm, () => this.getSpeed, () => this.getTemperature, () => this.getFuel];
        this.indice = 0;

        this.obd.on('ready', () => {
            this.sendNext();
        })

        /*setInterval(async () => {
            this.getRpm();
            await this.obd.next;
            this.getSpeed();
            await this.obd.next;
            this.getTemperature();
            //this.getFuel();
        }, 1500);*/
    }

    async sendNext() {
        this.loop[this.indice]();
        this.indice = (this.indice + 1) % this.loop.length;
    }

    async getRpm() {
        this.obd.send('010C');
    }

    async getSpeed(){
        this.obd.send('010D');
    }

    async getTemperature() {
        this.obd.send('0105');
    }

    async getFuel() {
        this.obd.send('012F');
    }

    async setReset(){
        this.obd.send('ATZ');
    }

    async setEchoOff(){
        this.obd.send('ATE0');
    }
    async setLinefeedOff(){ // toglie \n
        this.obd.send('ATL0');
    }

    async setEmptySpaceOff(){
        this.obd.send('ATS0');
    }

    async setAutofindProtocol(){
        this.obd.send('ATP0');
    }
}
module.exports = ObdCommunication;