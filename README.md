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

## Run

To start the app in development mode (hot-code reloading, error reporting, etc.), run:

```bash
quasar dev
```

## Test

The repository contains some unit tests, to run them:
```bash
npm run test:unit
```

If you want to have quasar and the tests running in parallel and watching for code changes:
```bash
npm run concurrently:dev:jest
```

## Develop

The code is consistent with how projects are structured in Quasar.
If you use VS Code, follow the [recommended settings from Quasar](https://quasar.dev/start/vs-code-configuration#Introduction).

For development, you may want to mock some modules, see quasar.conf.js to activate mocked modules.

## Deploy

Run:
```bash
quasar build
```

This will generate the material UI interfaces and make it available under `./dist/`

## Credits

Original idea: [Dario Salvi](https://github.com/dariosalvi78) and [Carmelo Velardo](https://github.com/2dvisio).

Coordination: [Dario Salvi](https://github.com/dariosalvi78) and [Carl Magnus Olsson](https://github.com/Trasselkalle).

Development:
- [Dario Salvi](https://github.com/dariosalvi78)
- [Arvind Goburdhun](https://github.com/arvgo)
- [Jameson Lee](https://github.com/jamtholee)
- [Lennart Czienskowski](https://github.com/lencz)
- [Elin Forsnor](https://github.com/elinforsnor)
- [Felix Morau](https://github.com/femosc2)

## License

See [license file](LICENSE)
