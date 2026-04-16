//const WebSocket = require('ws');

import Fuel from "./fuel.js";
import Temperature from "./temperature.js";
import Speed from "./speed.js";

export default class WebSocketClient {
    constructor() {
        this.speed = new Speed();
        this.temperature = new Temperature();
        this.fuel = new Fuel();

        this.ws = new WebSocket('ws://localhost:5254');

        this.ws.onmessage = (data) => {
            this.data = JSON.parse(data.toString());
            switch (this.data.type) {
                case 'rpm':
                    this.speed.updateRPM(this.data.val);
                    break;
                case 'speed':
                    this.speed.updateSpeed(this.data.val);
                    break;
                case 'temperature':
                    this.temperature.setTemperature(this.data.val);
                    break;
                case "fuel":
                    this.fuel.setFuel(this.data.val);
                    break;
            }
        }
    }
}