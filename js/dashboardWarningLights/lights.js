import Images from "../images.js";

export default class Lights {
    constructor() {
        this.lights = null;
        this.divLights = document.getElementById("lights");
        this.caricaLights();
    }

    async caricaLights() {
        this.lights = await Images.getLights();
        this.highLight()
        // this.noLight();
        this.lamp();
        this.fogLight();
    }

    highLight() {
        this.divLights.innerHTML = this.lights.highLight;
    }

    lamp() {
        document.getElementById("errorLights").innerHTML = this.lights.lamp;
    }

    lowLight() {
        this.divLights.innerHTML = this.lights.lowLight;
    }

    noLight() {
        this.divLights.innerHTML = this.lights.noLight;
    }

    fogLight() {
        document.getElementById("fogLights").innerHTML = this.lights.fogLight;
    }
}