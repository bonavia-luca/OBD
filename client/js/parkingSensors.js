export default class ParkingSensors {
    constructor() {
        this.segments = [
            [
                document.getElementById("rear-r0-s0"),
                document.getElementById("rear-r1-s0"),
                document.getElementById("rear-r2-s0"),
            ],
            [
                document.getElementById("rear-r0-s1"),
                document.getElementById("rear-r1-s1"),
                document.getElementById("rear-r2-s1"),
            ],
            [
                document.getElementById("rear-r0-s2"),
                document.getElementById("rear-r1-s2"),
                document.getElementById("rear-r2-s2"),
            ],
            [
                document.getElementById("rear-r0-s3"),
                document.getElementById("rear-r1-s3"),
                document.getElementById("rear-r2-s3"),
            ],
        ];
    }

    async resetDistance() {
        for (let i = 0; i < this.segments.length; i++) {
            for (let j = 0; j < this.segments[i].length; j++) {
                this.segments[i][j].setAttribute("class", "sensor-segment status-off");
            }
        }
    }

    async setDistance(distances) {
        //console.log(distances)
        this.resetDistance();
        for (let i = 0; i < this.segments.length; i++) {
            //console.log(distances[i]);
            if(distances[i] < 170) {
                this.segments[i][2].setAttribute("class","sensor-segment status-safe");
            }
            if(distances[i] < 100) {
                this.segments[i][1].setAttribute("class","sensor-segment status-warn");
            }
            if(distances[i] < 50) {
                this.segments[i][0].setAttribute("class","sensor-segment status-danger");
            }
        }
    }
}