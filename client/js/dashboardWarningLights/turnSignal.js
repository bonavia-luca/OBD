import Images from "../images.js";

export default class TurnSignal {
    constructor() {
        this.turn = null;
        this.turnSx = document.getElementById('turnSx');
        this.turnDx = document.getElementById('turnDx');
        this.hazard = document.getElementById('hazard');

        this.caricaTurnSignals();
    }

    async caricaTurnSignals() {
        this.turn = await Images.getTurnSignals();
        //this.lampeggiaHazard()
    }

    //SE CORRENTE CONTINUA, ALTRIMENTI GESTISCO ATTRAVERSO LETTURA SPIA

    /*lampeggiaDx() {
        const turnDx = document.getElementById("turnDx");
        let isOn = false;
        setInterval(() => {
            isOn = !isOn;
            turnDx.innerHTML = isOn ? this.turn.turnDx : this.turn.turnDxOff;
        }, 500);
    }

    lampeggiaSx() {
        const turnSx = document.getElementById("turnSx");
        let isOn = false;
        setInterval(() => {
            isOn = !isOn;
            turnSx.innerHTML = isOn ? this.turn.turnSx : this.turn.turnSxOff;
        }, 500);
    }

    lampeggiaHazard() {
        this.lampeggiaSx();
        this.lampeggiaDx();
        const hazard = document.getElementById("hazard");
        let isOn = false;
        setInterval(() => {
            isOn = !isOn;
            hazard.innerHTML = isOn ? this.turn.hazard : this.turn.hazardOff;
        }, 500);
    }*/

    /*showHide(id, status) {
        if(status == 1) {
            console.log(this[id]);
        }
    }*/
    showHide(id, status) {
        //console.log(id)
        this[id].innerHTML = status ? this.turn[id] : this.turn[id + "Off"];
    }
}