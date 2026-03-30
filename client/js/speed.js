export default class Speed {
    constructor() {
        this.speedRing = document.getElementById("speed-ring");
        this.lblSpeed = document.getElementById('speed-val');
        this.rpmRing = document.getElementById("rpm-ring");
        this.lblRpm = document.getElementById('rpm-val');

        this.MAX_SPEED = 220;
        this.MAX_RPM = 8000;
        this.MAX_ARC = 353;    //Lunghezza massima arco

        //this.animationSpeed();
    }

    updateSpeed(speed) {
        if (speed < 0) speed = 0;
        if (speed > this.MAX_SPEED) speed = this.MAX_SPEED;

        this.fillSpeed = (speed / this.MAX_SPEED) * this.MAX_ARC;

        this.speedRing.setAttribute('stroke-dasharray', `${this.fillSpeed} 471`);

        this.lblSpeed.textContent = Math.round(speed);
    }

    updateRPM(rpm) {
        if (rpm < 0) rpm = 0;
        if (rpm > this.MAX_RPM) rpm = this.MAX_RPM;

        this.fillRpm = (rpm / this.MAX_RPM) * this.MAX_ARC;

        this.rpmRing.setAttribute('stroke-dasharray', `${this.fillRpm} 471`);

        this.lblRpm.textContent = Math.round(rpm);
    }

    async animationSpeed() {
        //const dt = new Date();
        for (let i = 0; i <= 2500; i+=25) {
            this.updateSpeed(Math.floor(this.MAX_SPEED*i)/2500)
            this.updateRPM(Math.floor(this.MAX_RPM*i)/2500);
            await new Promise(resolve => setTimeout(resolve, 12));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        for (let i = 2500; i >= 0; i-=25) {
            this.updateSpeed(Math.floor(this.MAX_SPEED*i)/2500)
            this.updateRPM(Math.floor(this.MAX_RPM*i)/2500);
            await new Promise(resolve => setTimeout(resolve, 12));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
        //console.log((new Date())-dt);

        /*setInterval(() => {     //Utile solo in fase di test
            const rndSpeed = Math.floor(Math.random() * 150);
            this.updateSpeed(rndSpeed);
            this.updateRPM(rndSpeed * 40 + Math.floor(Math.random() * 54) - Math.floor(Math.random() * 54));
        }, 1000);*/
    }
}

/*
const speedRing = document.getElementById('speed-ring');
const lblSpeed = document.getElementById('speed-val');
const rpmRing = document.getElementById('rpm-ring');
const lblRpm = document.getElementById('rpm-val');

const MAX_SPEED = 220;
const MAX_RPM = 8000;
const MAX_ARC = 353;    //Lunghezza massima arco

function updateSpeedometer(speed) {
    if (speed < 0) speed = 0;
    if (speed > MAX_SPEED) speed = MAX_SPEED;

    const fillAmount = (speed / MAX_SPEED) * MAX_ARC;

    speedRing.setAttribute('stroke-dasharray', `${fillAmount} 471`);

    lblSpeed.textContent = Math.round(speed);
}

function updateRPM(rpm) {
    if (rpm < 0) rpm = 0;
    if (rpm > MAX_RPM) rpm = MAX_RPM;

    const fillAmount = (rpm / MAX_RPM) * MAX_ARC;

    rpmRing.setAttribute('stroke-dasharray', `${fillAmount} 471`);

    lblRpm.textContent = Math.round(rpm);
}

setInterval(() => {     //Utile solo in fase di test
    const randomSpeed = Math.floor(Math.random() * 150);
    updateSpeedometer(randomSpeed);
    updateRPM(randomSpeed * 40 + Math.floor(Math.random() * 54) - Math.floor(Math.random() * 54));
}, 1000);
*/