    import Lights from "./dashboardWarningLights/lights.js";
    import OthersWarnings from "./dashboardWarningLights/otherWarnings.js";
    import TurnSignal from "./dashboardWarningLights/turnSignal.js";
    import RearCamera from "./rearCamera.js";
    import ParkingSensors from "./parkingSensors.js";

    export default class ArduinoClient {
        constructor() {
            this.lights = new Lights();
            this.otherWarnings = new OthersWarnings();
            this.turnSignal = new TurnSignal();
            this.rearCamera = new RearCamera();
            this.parkingSensors = new ParkingSensors();
            this.distances = [10,10,10,10];

            this.events = [
                (status) => this.turnSignal.showHide('turnSx', status),
                (status) => this.turnSignal.showHide('turnDx', status),
                (status) => this.turnSignal.showHide('hazard', status),
                (status) => this.lights.showHide('fogLight', status),
                (status) => this.lights.showHide('highLight', status),
                (status) => this.lights.showHide('lowLight', status),
                (status) => this.lights.showHide('lamp', status),
                (status) => this.otherWarnings.showHide('battery', status),
                (status) => this.otherWarnings.showHide('brakeSystem', status),
                (status) => this.otherWarnings.showHide('candelette', status),
                (status) => this.otherWarnings.showHide('doors', status),
                () => {},
                (status) => this.otherWarnings.showHide('engineOil', status),
                (status) => this.otherWarnings.showHide('hood', status),
                (status) => this.otherWarnings.showHide('injectors', status),
                (status) => this.otherWarnings.showHide('motor',status),
                () => {},
                (status) => this.otherWarnings.showHide('rearDefrost', status),
                (status) => this.otherWarnings.showHide('trunk', status),
                (status) => this.otherWarnings.showHide('warning', status)
            ];

            this.rear = false;      //memorizza sato (true: retromarcia, false: marcia normale)
            this.noLight = true;    //luci spente
            this.dashboard = document.getElementById('dashboard');
            this.rearDashboard = document.getElementById('rear-dashboard');

            this.ws = new WebSocket('ws://localhost:5252');

            this.ws.onmessage = (data) => {
                this.data = JSON.parse(data.data);
                //console.log(this.data)
                switch (this.data.type) {
                    case 'REV':
                        if (this.data.val == 1) { //sto andando in retromarcia
                            if (!this.rear) { //prima non andavo in retromarcia
                                this.dashboard.classList.add('d-none');                           //tolgo visualizzazione tachimetro
                                this.rearDashboard.classList.remove('d-none');             //mostro schermata retromarcia
                                this.rear = true;
                                this.rearCamera.startCamera();
                            }
                        } else {
                            if (this.rear) { //prima andavo in retromarcia
                                this.dashboard.classList.remove('d-none');             //mostro visualizzazione tachimetro
                                this.rearDashboard.classList.add('d-none');                   //tolgo schermata retromarcia
                                this.rear = false;
                                this.rearCamera.stopCamera();
                            }
                        }
                        break;
                    case 'DST':
                        this.distances[this.data.id] = parseInt(this.data.val);
                        this.parkingSensors.setDistance(this.distances);
                        break;
                    case 'PIN':
                        this.events[this.data.id - 23](parseInt(this.data.val));  //ANABBAGLIANTI SEMPRE ACCESI
                        if(this.data.val == 1 && this.data.id >= 26 && this.data.id <= 29) {
                            this.noLight = false;
                        }
                        break;
                    case "TMP":
                        document.getElementById('p-temp-esterna').innerHTML = `${parseFloat(this.data.val).toFixed(1)}°C`;
                        break;
                    case "---":
                        //controllo se ho ricevuto un PIN nel range di quello delle luci (26-29)
                        if(this.noLight) {
                            //this.lights.resetLights();
                            this.lights.showHide('noLight', 1);
                        } else {
                            this.noLight = true;
                            this.lights.showHide('noLight', 0);
                        }
                        break;
                }
            }
        }
    }