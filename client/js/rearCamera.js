export default class RearCamera {
    constructor() {
        this.setCamera();
    }

    async setCamera() {
        this.rearCamera = document.getElementById("rear-camera");
        this.constraints = {
            video: true,
            audio: false
        };
    }

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);

            this.rearCamera.srcObject = this.stream;

        } catch (error) {
            console.error("Errore nell'accesso alla webcam: ", error);
            alert("Impossibile accedere alla webcam. Assicurati di aver concesso i permessi al browser.");
        }
    }

    async stopCamera() {
        this.stream.getTracks().forEach(track => {
            track.stop();
        })
        this.rearCamera.srcObject = null;
    }
}