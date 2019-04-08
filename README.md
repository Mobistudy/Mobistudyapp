# Mobistudy App

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtS2V5IjoiMTUwMCIsImlhdCI6MTU1NDI4NDY0MCwiZXhwIjoxNTU0ODg5NDQwfQ.X7LpUcA-BP-SVia2YCNBEzqrDO4Bi8ISqHzh6EBO6sA

his repository contains the patient app for Mobistudy.
The app is developed with Cordova and uses Quasar framework.

## Pre requisites

- nodejs
- [Apache Cordova](https://cordova.apache.org/)
- [quasar command line tool](https://quasar-framework.org/guide/quasar-cli.html)

In the project folder, run `npm install` to download the dependencies.
Then go to the `src-cordova` folder and run `npm install` there too.

## Run it

To start the interface, run `quasar dev`, this will spawn a web browser emulating the app.
The web environment is handy for developing and testing, but some modules are mocked there.

To run it on an Android device: `quasar dev -m cordova -T android`,
or on an iPhone: `quasar dev -m cordova -T ios -t ios`.
You can run this command from both the root project folder or the `src-cordova` folder.
The `src-cordova` is a cordova project folder, so you can also run standard cordova commands,
but you need quasar to prepare the content of the app first.

On iPhones, you will need a provisioning profile that allows access to HealthKit
and configure your Xcode environment to use that profile.
An easy way for doing it is by launching the `quasar dev` command once, it will fail,
then open the project with Xcode and set the provisioning profiles and then run
quasar dev again.

Either if you are running on the browser of the phone, you will need to set the API to
`MOCK` or to `''` for using a local server.
If you want to use a local server, you need to have the MobistudyAPI running in parallel
(see MobistudyAPI docs).

## Develop it

The app is based on quasar framework mostly, please use its programming conventions.

It is recommendable to develop using `quasar dev` with a running API on the same computer.
For real-world UI, it's better to deploy the app using cordova.

## Test it

There are some variables that you can use to set a mock environment or test server.
Check the quasar.conf.js under build.env, particularly:

- API_ENDPOINT: use 'MOCK' for mock api, '' for local server or 'https://ibme-linuxdev.eng.ox.ac.uk:7777/' for test server
- HEALTHSTORE: use 'MOCK' for mock healthstore or 'cordova-health' for the cordova health plugin
- NOTIFICATIONS: use 'MOCK' for browser notifications or 'cordova-notification-local' for the cordova plugin


## Deploy it

Run `quasar build -m cordova -T android` or `quasar build -m cordova -T ios -t ios`.

This will generate the installable apps and make them available for upload to the app stores.
