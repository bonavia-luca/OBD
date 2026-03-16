import DataOra from "./time.js";
import TurnSignal from "./dashboardWarningLights/turnSignal.js";
import Lights from "./dashboardWarningLights/lights.js";
import OthersWarnings from "./dashboardWarningLights/otherWarnings.js";

document.addEventListener("DOMContentLoaded", function() {
    const dataOra = new DataOra();
    //dataOra.impostaDataOra();
    const turnSignal = new TurnSignal();
    const lights = new Lights();
    const otherWarnings = new OthersWarnings();
})