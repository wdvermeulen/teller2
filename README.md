# SSR-Leiden Teller server

NodeJS websockets server om de communicatie van teller.ssr-leiden.nl te regelen. Het doel is de hoeveelheid leden in het pand bij te houden. 

## Om te beginnen

Met de volgende instructies kan je het project lokaal draaien. 

### Vereisten

* `npm` versie 3.10.10
* `node` versie 6.11.3

### Installeren

Navigeer met de terminal naar de server folder. Voer het volgende commando uit om `node_modules` te ontvangen:

```
npm i
```

Om de server te activeren en te debuggen voer het volgende commando uit:

```
node --inspect server.js
```

Daarmee draait de server op `localhost` (127.0.0.1) op port 8001 en het inspecteerbare gedeelte draait op hetzelfde adres op port 9229

## Deployment

Moet nog gebeuren.

Pas in de file `/client/js/index.js` de `serverUrl` aan naar de locatie waar de server draait en doe dit bij voorkeur over `wss`

## To-do
* Inloggen veiliger maken
* Logging bijhouden in de server
* Opsplitsen `/client/js/index.js` in meerdere bestanden

## Schrijvers

* **Ewout Vermeulen** - *Eerste versie* - [mail](wdvermeulen@gmail.com)

## Erkenningen

* Geïnspireerd op een andere teller gemaakt door Joost van Someren
