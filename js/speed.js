// 1. Peschiamo gli elementi dall'HTML
const speedRing = document.getElementById('speed-ring');
const speedVal = document.getElementById('speed-val');

// 2. Impostiamo il fondo scala del tuo tachimetro (es. 220 km/h)
const MAX_SPEED = 220;
const MAX_ARC = 353; // È la lunghezza fisica massima dell'arco in SVG, non toccarla

// 3. Funzione che chiamerai quando ricevi il dato dall'OBD
function updateSpeedometer(currentSpeed) {
    // Sicurezza: blocchiamo la lancetta se la velocità è sotto 0 o sopra il limite
    if (currentSpeed < 0) currentSpeed = 0;
    if (currentSpeed > MAX_SPEED) currentSpeed = MAX_SPEED;

    // Calcoliamo la proporzione matematica per riempire l'arco
    const fillAmount = (currentSpeed / MAX_SPEED) * MAX_ARC;

    // Magia pura: cambiamo l'attributo SVG e il CSS inline farà l'animazione fluida
    speedRing.setAttribute('stroke-dasharray', `${fillAmount} 471`);

    // Aggiorniamo il numero gigante al centro
    speedVal.textContent = Math.round(currentSpeed);
}

// 1. Peschiamo gli elementi del contagiri dall'HTML
const rpmRing = document.getElementById('rpm-ring');
const rpmVal = document.getElementById('rpm-val');

// 2. Impostiamo il fondo scala dei giri (es. 8000 RPM, tipico delle auto a benzina)
const MAX_RPM = 8000;

// 3. Funzione per aggiornare i giri motore
function updateRPM(currentRPM) {
    // Sicurezza: teniamo il valore dentro i limiti
    if (currentRPM < 0) currentRPM = 0;
    if (currentRPM > MAX_RPM) currentRPM = MAX_RPM;

    // MAX_ARC è sempre 353 (definito prima per la velocità, non serve ridichiararlo)
    const fillAmount = (currentRPM / MAX_RPM) * MAX_ARC;

    // Aggiorniamo l'anello visivo
    rpmRing.setAttribute('stroke-dasharray', `${fillAmount} 471`);

    // Aggiorniamo il numero testuale
    rpmVal.textContent = Math.round(currentRPM);
}

// PROVA SUL BROWSER: Aggiungi queste righe temporanee per testarlo!
setInterval(() => {
    const randomSpeed = Math.floor(Math.random() * 150);
    updateSpeedometer(randomSpeed);
    updateRPM(randomSpeed * 40 + Math.floor(Math.random() * 54) - Math.floor(Math.random() * 54));
}, 1000);
