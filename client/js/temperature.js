import Images from "./images.js";

export default class Temperature {
    constructor() {
        this.temperatureLevel = document.getElementById("temperature-level");
        this.temperatureWarning = document.getElementById("temperature-warning");
        this.loadTemperature();
    }

    async loadTemperature() {
        this.temperatureIcon = await Images.getTemperature();

        await this.animationTemperature();

        this.setTemperature(50)
        setInterval(() =>  {
            const temp = Math.floor(Math.random() * 80) + 50;
            this.setTemperature(temp)
        }, 5000)
    }

    async animationTemperature() {
        for (let i = 50; i <= 130; i++) {
            this.setTemperature(i);
            await new Promise(resolve => setTimeout(resolve, 20));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        for (let i = 130; i >= 50; i--) {
            this.setTemperature(i);
            await new Promise(resolve => setTimeout(resolve, 20));
        }
    }

    async setTemperature(temp){
        const percentage = Math.floor((temp * 100 ) / 130);
        //console.log(percentage)

        this.temperatureLevel.style.height = `${percentage}%`;
        this.temperatureLevel.setAttribute("aria-valuenow", percentage)
        this.temperatureLevel.innerHTML = `${temp}°C`;

        if(percentage < 80) {
            this.temperatureLevel.className = "progress-bar bg-success w-100 fs-3 fw-bold";
            this.temperatureWarning.innerHTML = this.temperatureIcon.temperature;
        }  else {
            this.temperatureLevel.className = "progress-bar bg-danger w-100 fs-3 fw-bold";
            this.temperatureWarning.innerHTML = this.temperatureIcon.highTemperature;
        }
    }
}