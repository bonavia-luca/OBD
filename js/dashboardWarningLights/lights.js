import Images from "./images.js";

export default class Lights {
    constructor() {
        this.lights = null;
        this.divLights = document.getElementById("lights");
        this.divOtherLights = document.getElementById("otherLights");
        this.caricaLights();
    }

    async caricaLights() {
        this.lights = await Images.getLights();
        this.noLight();
        this.lamp();
    }

    highLight() {
        this.divLights.innerHTML = this.lights.highLight;
    }

    lamp() {
        this.divOtherLights.innerHTML = this.lights.lamp;
    }

    lowLight() {
        this.divLights.innerHTML = this.lights.lowLight;
    }

    noLight() {
        this.divLights.innerHTML = this.lights.noLight;
    }

    fogLight() {
        this.divOtherLights.innerHTML = this.lights.fogLight;
    }
}