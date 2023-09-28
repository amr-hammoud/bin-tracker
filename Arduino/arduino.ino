#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <ArduinoJson.h>

const char *ssid = "YOUR_WIFI_SSID";
const char *password = "YOUR_WIFI_PASSWORD";
const int trigPin = D5; // TRIG
const int echoPin = D6; // ECHO
const int EMPTY_SIZE = 50;
const int THRESHOLD = 20;
const String SERVER = "http://192.168.1.15:8000";
const String ENDPOINT = "/bins/6512ea9ee1c35ea2107c5ed8/records";

float latitude, longitude;
long duration;
int distance;

SoftwareSerial gpsSerial(D1, D2); // D1=TX | D2=RX
TinyGPSPlus gps;
WiFiClient client;
HTTPClient http;
StaticJsonDocument<200> jsonDoc;

void setup(void)
{
  gpsSerial.begin(9600);
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  if()
  Serial.print("Connecting to Wifi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nWiFi connected at: ");
  Serial.println(WiFi.localIP());
}

void loop()
{

  distance = getDistance();
  Serial.println(distance);
  delay(2000);
  if (distance <= THRESHOLD)
  {
    Serial.print("latitude: ");
    Serial.println(latitude);
    Serial.print("longitude: ");
    Serial.println(longitude);
    int percentage = distance * 100 / EMPTY_SIZE;
    sendData(percentage, latitude, longitude);
  }
}

void sendData(int percentage, float latitude, float longitude)
{
  jsonDoc["id"] = "6512ea9ee1c35ea2107c5ed8";
  jsonDoc["record"] = String(percentage);
  jsonDoc["latitude"] = String(latitude);
  jsonDoc["longitude"] = String(longitude);

  String jsonData;
  serializeJson(jsonDoc, jsonData);

  http.begin(client, SERVER + ENDPOINT);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTAxNzY3MTNlNWZhMDg2M2UyOGM1ODAiLCJmaXJzdF9uYW1lIjoiQW1yIiwibGFzdF9uYW1lIjoiSGFtbW91ZCIsInVzZXJuYW1lIjoiYW1yX2hhbW1vdWQiLCJ1c2VyX3R5cGUiOiIxIiwiY3JlYXRlZEF0IjoiMjAyMy0wOS0xM1QwODo0NDozMy4zNzlaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0xM1QwODo0NDozMy4zNzlaIiwiX192IjowLCJlbWFpbCI6ImFtcmhhbW1vdWQuZGV2QGdtYWlsLmNvbSIsImlhdCI6MTY5NTE5OTg1M30.QOP40Nc8FoddGTp-AKHdJ__oWIIt-xn4wn597g5P-5I");

  int httpResponseCode = http.POST(jsonData);

  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println(response);
  }
  else
  {
    Serial.println("Error during HTTP request. HTTP error code: ");
    Serial.print(httpResponseCode);
  }

  http.end();
}

float getDistance()
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(12);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration / 58;
  return distance;
}

void getlocation()
{
  while (gpsSerial.available())
  {
    int data = gpsSerial.read();
    if (gps.encode(data))
    {
      latitude = (gps.location.lat());
      longitude = (gps.location.lng());
    }
  }
}