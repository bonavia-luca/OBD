import Obd from "./obd.js";

export default class ObdCommunication {
    constructor() {
        this.obd = new Obd();
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
}