# Mobistudy App

The participants' app of Mobistudy.
The app is developed as an Apache Cordova app using the [quasar framework](https://quasar-framework.org/) as UI frontend.


## Prerequisites

You need to install the following on your system:

- nodejs
- Apache Cordova
- (optional) the [quasar command line tool](https://quasar.dev/quasar-cli/installation)

Install all other dependencies with:

```bash
npm install
cd src-cordova
npm install
```



### Run the app in iOS

To run the app properly in iOS through Cordova, there are a couple of manual settings
to be sorted out with Xcode.

Prepare the Xcode project:

```bash
cd src-cordova
cordova prepare ios
```

This will create a folder under src-cordova/platforms/ios
Open that folder with Xcode. It will contain an iOS project.
You need to make sure there is a valid signing profile for the app, at least for
development. Try compiling the project and see if it works.

Also, you need to add the HealthKit capability.

Open the Mobistudy App-info.plist file located under Resources. Open it as source
file. Then check that NSHealthShareUsageDescription and NSHealthUpdateUsageDescription
are set. For example:

```xml
<key>NSHealthShareUsageDescription</key>
<string>The app needs to read health-related data from your phone</string>
<key>NSHealthUpdateUsageDescription</key>
<string>The app needs to store health-related data from your phone</string>
```

In order to be able to retrieve files that are stored in the app through iTunes,
make sure the following also is present:
```xml
<key>UIFileSharingEnabled</key>
<true/>
```

For the pedometer to work properly:
```xml
<key>NSMotionUsageDescription</key>
<string>The app needs to detect steps</string>
```

## Run

To start the app in development mode (hot-code reloading, error reporting, etc.), run:

```bash
quasar dev
```

This will run in the browser, if you want to run it on a phone (supposing it's an iPhone):

```bash
quasar dev -m ios
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
If you use VS Code, follow the
[recommended settings from Quasar](https://quasar.dev/start/vs-code-configuration#Introduction).

For development, you may want to mock some modules, see project.conf.js to
activate mocked modules.


## Deploy

Run:
```bash
quasar build
```

This will generate the material UI interfaces and make it available under `./dist/`

For the app, run:

```bash
quasar build -m ios
```

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
