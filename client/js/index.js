import DataOra from "./time.js";
import TurnSignal from "./dashboardWarningLights/turnSignal.js";
import Lights from "./dashboardWarningLights/lights.js";
import OthersWarnings from "./dashboardWarningLights/otherWarnings.js";
import Fuel from "./fuel.js";
import Temperature from "./temperature.js";
import Speed from "./speed.js";

//import ObdCommunication from "../../server/obdCommunication.js";

document.addEventListener("DOMContentLoaded", function() {
    const dataOra = new DataOra();
    //dataOra.impostaDataOra();
    const turnSignal = new TurnSignal();
    const lights = new Lights();
    const otherWarnings = new OthersWarnings();
    const fuel = new Fuel();
    const temperature = new Temperature();
    const speed = new Speed();

    //const obdCommunication = new ObdCommunication();
})