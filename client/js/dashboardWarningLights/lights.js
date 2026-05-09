import Images from "../images.js";

export default class Lights {
    constructor() {
        this.lights = null;
        this.divLights = document.getElementById("lights");
        this.divFogLight = document.getElementById("fogLights");
        this.divErrorLight = document.getElementById("errorLights");
        this.caricaLights();
    }

    async caricaLights() {
        this.lights = await Images.getLights();
        //this.popolaLights();
    }

    /*highLight() {
        this.divLights.innerHTML = this.lights.highLight;
    }

    lamp() {
        this.divErrorLight.innerHTML = this.lights.lamp;
    }

    lowLight() {
        this.divLights.innerHTML = this.lights.lowLight;
    }

    noLight() {
        this.divLights.innerHTML = this.lights.noLight;
    }

    fogLight() {
        this.divFogLight.innerHTML = this.lights.fogLight;
    }*/

    resetLights(){
        this.divLights.innerHTML = '';
        this.divFogLight.innerHTML = '';
        this.divErrorLight.innerHTML = '';
    }

    showHide(id, status) {
        if(status == 1) {
            if(id == "lamp") {
                this.divErrorLight.innerHTML = this.lights[id];
            } else if (id == "fogLight") {
                this.divFogLight.innerHTML = this.lights[id];
            } else {
                this.divLights.innerHTML = this.lights[id]
            }
        } else {
            const img = document.getElementById(id);
            if (img) {
                img.parentNode.removeChild(img);
            }
        }
    }
}