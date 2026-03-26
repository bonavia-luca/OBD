import Images from "./images.js";

export default class Fuel {
    constructor() {
        this.fuelLevel = document.getElementById("fuel-level");
        this.fuelWarning = document.getElementById("fuel-warning");
        this.loadFuel();
    }

    async loadFuel() {
        this.fuelIcon = await Images.getFuel();

        await this.animationFuel();

        this.setFuel(2)
        setInterval(() =>  {
            const percentage = Math.floor(Math.random() * 100)
            //console.log(percentage)
            this.setFuel(percentage)
        }, 5000)
    }

    async animationFuel() {
        for (let i = 0; i <= 100; i++) {
            this.setFuel(i);
            await new Promise(resolve => setTimeout(resolve, 16));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        for (let i = 100; i >= 0; i--) {
            this.setFuel(i);
            await new Promise(resolve => setTimeout(resolve, 16));
        }
    }

    async setFuel(percentage){
        this.fuelLevel.style.height = `${percentage}%`;
        this.fuelLevel.setAttribute("aria-valuenow", percentage)

        if(percentage > 10) {
            if (percentage > 20) {
                this.fuelLevel.className = "progress-bar text-success bg-success w-100 fs-3 fw-bold";
            } else {
                this.fuelLevel.className = "progress-bar text-warning bg-warning w-100 fs-3 fw-bold";
            }
            this.fuelWarning.innerHTML = this.fuelIcon.fuel;
        }  else {
            this.fuelLevel.className = "progress-bar text-danger bg-danger w-100 fs-3 fw-bold";
            this.fuelWarning.innerHTML = this.fuelIcon.outOfFuel;
        }
    }
}