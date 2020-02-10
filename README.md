# Mobistudy App

The participants' app of Mobistudy.
The app is developed as an Apache Cordova app using the [quasar framework](https://quasar-framework.org/) as UI frontend.


## Pre requisites

You need to install the following on your system:

- nodejs
- Apache Cordova
- (optional) the [quasar command line tool](https://quasar.dev/quasar-cli/installation)

Install all other dependencies with:

```bash
npm install
```

## Run it

To start the app in development mode (hot-code reloading, error reporting, etc.), run:

```bash
quasar dev
```

## Develop it

The code is consistent with how projects are structured in Quasar.
If you use VS Code, follow the [recommended settings from Quasar](https://quasar.dev/start/vs-code-configuration#Introduction).

For development, you may want to mock some modules, see quasar.conf.js to activate mocked modules.


## Test it

```bash
npm run test:unit
```

If you want to have quasar and the tests running in parallel and watching for code changes:

```bash
npm run concurrently:dev:jest
```

## Deploy it

Run:
```bash
quasar build
```

This will generate the material UI interfaces and make it available under `./dist/`
