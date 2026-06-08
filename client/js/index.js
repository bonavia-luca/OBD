import DataOra from "./time.js";
//import TurnSignal from "./dashboardWarningLights/turnSignal.js";
//import Lights from "./dashboardWarningLights/lights.js";
//import OthersWarnings from "./dashboardWarningLights/otherWarnings.js";
import Fuel from "./fuel.js";
import Temperature from "./temperature.js";
import Speed from "./speed.js";
//import ParkingSensors from "./parkingSensors.js";
//import RearCamera from "./rearCamera.js";

import ObdClient from "./obdClient.js";
import ArduinoClient from "./arduinoClient.js";

//import ObdCommunication from "../../server/obdCommunication.js";

document.addEventListener("DOMContentLoaded", async function() {
    const dataOra = new DataOra();
    //dataOra.impostaDataOra();
    /*const turnSignal = new TurnSignal();
    const lights = new Lights();
    const otherWarnings = new OthersWarnings();*/
    const fuel = new Fuel();
    const temperature = new Temperature();
    const speed = new Speed();
    //const parkingSensors = new ParkingSensors();
    //const rearCamera = new RearCamera();

    await Promise.all([fuel.loadFuel(), temperature.loadTemperature()])
    await Promise.all([fuel.animationFuel(), temperature.animationTemperature(), speed.animationSpeed()])

    const obdClient = new ObdClient(speed, fuel, temperature);
    const arduinoClient = new ArduinoClient();

    /*parkingSensors.setDistance([1.2, 3, 0.4, 0.9])
    await setTimeout(()=> {parkingSensors.setDistance([0.2, 1, 1.4, 3])}, 1000);
    await setTimeout(()=> {parkingSensors.setDistance([2, 0.1, 1, 0.3])}, 1000);
    rearCamera.startCamera();
    await setTimeout(()=> {rearCamera.stopCamera()}, 8000);*/


    /*fuel.setFuel(12)
    speed.updateSpeed(15)
    speed.updateRPM(1500)
    temperature.setTemperature(95)*/

    //const obdCommunication = new ObdCommunication();
})