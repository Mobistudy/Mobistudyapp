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

If you're running any task which relates to the cordova plugins, make sure to create an empty 'www' directory under the src-cordova directory;

1. Cd into src-cordova
2. Run; mkdir www

### Run the app in iOS

To run the app properly in iOS through Cordova, there are a couple of manual settings
to be sorted out with Xcode.

Prepare the Xcode project:

```bash
cd src-cordova
cordova prepare ios
```

(if you get an error like "Conflict found, edit-config changes from config.xm
will overwrite plugin.xml changes", repeat `cordova prepare ios`)

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

For the GPS:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>The app needs to estimate your physical activity</string>
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

## iOS

Generate the compiled code.

```bash
quasar build -m ios
```

You need to open the project in Xcode, have a provisioning profile for distribution
on the App Store and Archive then Distribute the app.

## Android

Generate the compiled code.

```bash
quasar build -m android
```

Create a keystore (only once! not for every release).

```bash
keytool -genkey -v -keystore mobistudy-release.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000
```

Write down the password you set for the keystore and the certificate. Let's say
it's "pwdpwd"

Then, inside src-cordova do:

```bash
cordova prepare android
cordova build android --release -- --keystore=mobistudy-release.keystore --alias=upload --storePassword=pwdpwd --password=pwdpwd
```

the APK will be available in `src-cordova/platforms/android/app/build/outputs/apk/release/app-release.apk`

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
