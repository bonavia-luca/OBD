export default class DataOra {
    constructor() {
        this.aggiornaOra();
        setInterval(() => this.aggiornaOra(), 1000);
    }

    ottieniDataOra() {
        let giornoSet = this.classData.toLocaleDateString("it-IT", { weekday: "long" });
        const giorno = this.classData.toLocaleDateString("it-IT", { day: "numeric" });
        let mese = this.classData.toLocaleDateString("it-IT", { month: "long"});
        const anno = this.classData.toLocaleDateString("it-IT", { year: "numeric" });

        giornoSet = this.toCamelCase(giornoSet);
        mese = this.toCamelCase(mese);

        this.dataOggi = `${giornoSet}, ${giorno} ${mese} ${anno}`;
        this.oraAttuale = this.classData.toLocaleTimeString("it-IT"/*, {hour: "numeric", minute: "numeric"}*/);
    }

    impostaDataOra() {
        const pData = document.getElementById("p-data");
        const pOra = document.getElementById("p-ora");

        if (pData) pData.textContent = this.dataOggi;
        if (pOra) pOra.textContent = this.oraAttuale;
    }

    toCamelCase(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    aggiornaOra() {
        this.classData = new Date();
        this.ottieniDataOra();
        this.impostaDataOra()
    }
}