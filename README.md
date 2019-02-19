# Mobistudy App

his repository contains the patient app for Mobistudy.
The app is developed with Cordova and uses Quasar framework.

## Pre-requisites

- nodejs with npm
- [Apache Cordova](https://cordova.apache.org/)
- [quasar command line tool](https://quasar-framework.org/guide/quasar-cli.html)


## Develop

In the project folder, run `npm install` to download the dependencies.

To start the interface, run `quasar dev`, this will spawn a web browser emulating the app.
The web environment is handy for developing and testing, but some modules are mocked there.

To run it on an Android device: `quasar dev -m cordova -T android`.

You will need the MobistudyAPI running in parallel (see MobistudyAPI docs), or use the mockAPI.

## Test

There are some variables that you can use to set a mock environment or test server.
Check the quasar.conf.js under build.env, particularly:

- API_ENDPOINT: use 'MOCK' for mock api, '' for local server or 'https://ibme-linuxdev.eng.ox.ac.uk:7777/' for test server
- HEALTHSTORE: use 'MOCK' for mock healthstore or 'cordova-health' for the cordova health plugin


## Deploy

Run `quasar build`.
This will generate the material UI interfaces and make it available under `./dist/`
