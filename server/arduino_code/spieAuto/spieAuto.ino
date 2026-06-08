#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// =====================
// ULTRASUONI (4 sensori)
const int NUM_DIST = 4;

const int trigPins[NUM_DIST] = {3, 5, 7, 9};
const int echoPins[NUM_DIST] = {4, 6, 8, 10};

int distanze[NUM_DIST];

// =====================
// PIN DIGITALI
const int PIN_START = 22;
const int PIN_END = 42;

// =====================

void setup() {

  Serial.begin(9600);
  dht.begin();

  // ultrasuoni
  for (int i = 0; i < NUM_DIST; i++) {
    pinMode(trigPins[i], OUTPUT);
    pinMode(echoPins[i], INPUT);
  }

  // input digitali
  for (int i = PIN_START; i <= PIN_END; i++) {
    pinMode(i, INPUT);
  }
}

void loop() {

  leggiTemperatura();
  int retromarcia = leggiRetromarcia();

  leggiDistanze(retromarcia);
  leggiPinDigitali();

  Serial.println("---");

  delay(100);
}

// =====================
// TEMPERATURA
// =====================
void leggiTemperatura() {

  float t = dht.readTemperature();

  if (!isnan(t)) {
    Serial.print("TMP|0|");
    Serial.println(t);
  }
}

// =====================
// RETROMARCIA
// =====================
int leggiRetromarcia() {

  int stato = digitalRead(22);

  Serial.print("REV|0|");
  Serial.println(stato);

  return stato;
}

// =====================
// DISTANZE (CONDIZIONATE)
// =====================
void leggiDistanze(int attivo) {

  if (attivo == HIGH) {
    for (int i = 0; i < NUM_DIST; i++) {
      int valore = -1;

      digitalWrite(trigPins[i], LOW);
      delayMicroseconds(2);

      digitalWrite(trigPins[i], HIGH);
      delayMicroseconds(10);
      digitalWrite(trigPins[i], LOW);

      long durata = pulseIn(echoPins[i], HIGH, 30000);

      if (durata > 0)
        valore = durata * 0.034 / 2; 
      else 
        valore = distanze[0];   

      distanze[i] = valore;

      Serial.print("DST|");
      Serial.print(i);
      Serial.print("|");
      Serial.println(valore);

      delay(30);
    }
  }
}

// =====================
// PIN DIGITALI 22–42
// =====================
void leggiPinDigitali() {

  for (int i = PIN_START+1; i <= PIN_END; i++) {

    int stato = digitalRead(i);
    
    /*if (stato != 0)*/ {
      Serial.print("PIN|");
      Serial.print(i);
      Serial.print("|");
      Serial.println(stato);
    }
  }
}