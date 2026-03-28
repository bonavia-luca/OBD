class Images {
    constructor() {
        this.ready = this.loadImages();
    }

    async loadImages() {
        const response = await fetch("../json/images.json");
        this.images = await response.json();
    }

    async getTurnSignals() {
        await this.ready;
        return this.images.turnSignals;
    }

    async getLights() {
        await this.ready;
        return this.images.lights;
    }

    async getOtherWarnings() {
        await this.ready;
        return this.images.otherWarnings;
    }

    async getFuel() {
        await this.ready;
        return this.images.fuelWarnings;
    }

    async getTemperature() {
        await this.ready;
        return this.images.temperatureWarnings;
    }
}

export default new Images();