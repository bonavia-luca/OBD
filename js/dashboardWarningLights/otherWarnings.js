import Images from "./images.js";

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
        this.clearOtherWarnings();
        //
        this.battery()
        this.brakeSystem()
        this.engineOil()
        this.injectors()
        this.motor()
        this.candelette()
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

    battery() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.battery}
            </div>`;
    }

    brakeSystem() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.brakeSystem}
            </div>`;
    }

    engineOil() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.engineOil}
            </div>`;
    }

    injectors() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.injectors}
            </div>`;
    }

    motor() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.motor}
            </div>`;
    }

    candelette() {
        this.divOtherWarnings.innerHTML += `
            <div class="col-1 d-flex align-items-center">
                ${this.otherWarnings.candelette}
            </div>`;
    }

    //TODO: spie rimanenti
}