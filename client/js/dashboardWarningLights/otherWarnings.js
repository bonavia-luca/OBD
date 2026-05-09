import Images from "../images.js";

export default class OtherWarnings {
    constructor() {
        this.otherWarnings = null;

        this.divFuel = document.getElementById("fuel");
        this.divTemperature = document.getElementById("temperature");
        this.divOtherWarnings = document.getElementById("otherWarnings");
        this.caricaOtherWarnings();
    }

    async caricaOtherWarnings() {
        this.otherWarnings = await Images.getOtherWarnings();

        //this.highTemperature();
        //this.outOfFuel();
        this.popolaOtherWarnings();
        //this.clearOtherWarnings();
        //
        /*this.battery()
        this.brakeSystem()
        this.engineOil()
        this.injectors()
        this.motor()
        this.candelette()
        this.doors()
        this.hood()
        this.rearDefrost()
        this.trunk()
        this.warning()*/
    }

    popolaOtherWarnings(){
        //console.log(this.otherWarnings)
        Array.from(Object.keys(this.otherWarnings)).forEach((key) => {
            //console.log(this.otherWarnings[key]);
            this.divOtherWarnings.innerHTML += `
            <div id="${key}" class="col-1 d-flex align-items-center d-none">
                ${this.otherWarnings[key]}
            </div>`;
            //console.log(this.divOtherWarnings.innerHTML)
        })
    }

    fuel() {
        this.divFuel.innerHTML = this.otherWarnings.fuel;
    }

    outOfFuel() {
        this.divFuel.innerHTML = this.otherWarnings.outOfFuel;
    }

    temperature() {
        this.divTemperature.innerHTML = this.otherWarnings.temperature;
    }

    highTemperature() {
        this.divTemperature.innerHTML = this.otherWarnings.highTemperature;
    }

    clearOtherWarnings() {
        this.divOtherWarnings.innerHTML = '';
    }

    /*battery(status) {
        const div = document.getElementById('battery');
        if (status) {
            div.classList.remove('d-none');
        } else {
            div.classList.add('d-none')
        }
    }

    brakeSystem(status) {
        const div = document.getElementById('brakeSystem');
        if (status) {
            div.classList.remove('d-none');
        } else {
            div.classList.add('d-none')
        }
    }

    engineOil(status) {
        this.showHide('engineOil', status);
    }

    injectors(status) {
        const div = document.getElementById('injectors');
        if (status) {
            div.classList.remove('d-none');
        } else {
            div.classList.add('d-none')
        }
    }

    motor(status) {
        const div = document.getElementById('motor');
        if (status) {
            div.classList.remove('d-none');
        } else {
            div.classList.add('d-none')
        }
    }

    candelette() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.candelette}
            </div>`;
    }

    doors() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.doors}
            </div>`;
    }

    hood() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.hood}
            </div>`;
    }

    rearDefrost() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.rearDefrost}
            </div>`;
    }

    trunk() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.trunk}
            </div>`;
    }

    warning() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.warning}
            </div>`;
    }*/

    showHide(id, status) {
        const div = document.getElementById(id);
        if (status) {
            div.classList.remove('d-none');
        } else {
            div.classList.add('d-none')
        }
    }
}