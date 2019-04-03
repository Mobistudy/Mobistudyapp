# Mobistudy App

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtS2V5IjoiMTUwMCIsImlhdCI6MTU1NDI4NDY0MCwiZXhwIjoxNTU0ODg5NDQwfQ.X7LpUcA-BP-SVia2YCNBEzqrDO4Bi8ISqHzh6EBO6sA

his repository contains the patient app for Mobistudy.
The app is developed with Cordova and uses Quasar framework.

## Pre requisites

- nodejs
- [Apache Cordova](https://cordova.apache.org/)
- [quasar command line tool](https://quasar-framework.org/guide/quasar-cli.html)

In the project folder, run `npm install` to download the dependencies.

## Run it

To start the interface, run `quasar dev`, this will spawn a web browser emulating the app.
The web environment is handy for developing and testing, but some modules are mocked there.

To run it on an Android device: `quasar dev -m cordova -T android`.

You will need the MobistudyAPI running in parallel (see MobistudyAPI docs), or use the mockAPI.


## Develop it

The app is based on quasar framework mostly, please use its programming conventions.

## Test it

There are some variables that you can use to set a mock environment or test server.
Check the quasar.conf.js under build.env, particularly:

- API_ENDPOINT: use 'MOCK' for mock api, '' for local server or 'https://ibme-linuxdev.eng.ox.ac.uk:7777/' for test server
- HEALTHSTORE: use 'MOCK' for mock healthstore or 'cordova-health' for the cordova health plugin


## Deploy it

Run `quasar build`.
This will generate the material UI interfaces and make it available under `./dist/`
