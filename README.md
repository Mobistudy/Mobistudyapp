# Mobistudy App

The participants' app of Mobistudy.
The app is developed as an Apache Cordova app using the [quasar framework](https://quasar-framework.org/) as UI frontend.

## Prerequisites

You need to install the following on your system:

- nodejs
- Apache Cordova
- (optional) the [quasar command line tool](https://quasar.dev/quasar-cli/installation)
- XCode
- Android SDK and build tools

Install all other dependencies with:

```bash
npm install
```

Before running the app on a phone, create an empty 'www' directory under the src-cordova directory:

```bash
cd src-cordova
mkdir www
npm install
```

Create a file named `project.config.js`, use `project.config.template.js` for an example and guidance.


### Setup for Android

You need to have Java, gradle, a recent version of Android SDK and the build tools installed on your computer.
The easiest thing to do is to install Android Studio and use the SDK manager to download the SDK and build tools.

The actual versions to download should match the ones specified inside src-cordova/platforms/android/build.gradle (look for defaultBuildToolsVersion and defaultTargetSdkVersion).

If that file hasn't been created yet, run:

```bash
cd src-cordova
cordova prepare android
```


### Setup for iOS

Prepare the Xcode project:

```bash
cd src-cordova
cordova prepare ios
```

(if you get an error like "Conflict found, edit-config changes from config.xml
will overwrite plugin.xml changes", repeat `cordova prepare ios`)

This will create a folder under src-cordova/platforms/ios
Open that folder with Xcode. It will contain an iOS project.
Add the HealthKit capability.

You need to make sure there is a valid signing profile for the app, at least for
development. Try compiling the project and see if it works.


Open the Mobistudy App-info.plist file located under Resources. Open it as source
file. Then check that the following flags are set:

For US export compliance:
```xml
<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

For accessing HealthKit:
```xml
<key>NSHealthShareUsageDescription</key>
<string>The app needs to read health-related data from your phone</string>
<key>NSHealthUpdateUsageDescription</key>
<string>The app needs to store health-related data from your phone</string>
```

In order to be able to retrieve files that are stored in the app through iTunes,
make sure the following also is present (needed for testing only):
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
<string>The app needs your position to estimate activity or the environment</string>
<key>NSLocationAlwaysUsageDescription</key>
<string>The app needs your position to estimate activity or the environment</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>The app needs your position to estimate activity or the environment</string>
```


### Peak Flow Meter plugin

The peak flow meter requires a plugin that can only be installed manually.
See https://github.com/kevinchtsang/cordova-plugin-spf for instructions.


## Develop

The code is consistent with how projects are structured in Quasar.
If you use VS Code, follow the
[recommended settings from Quasar](https://quasar.dev/start/vs-code-configuration#Introduction).

For development, you may want to mock some modules, see project.conf.js to
activate mocked modules.

## Test

### Test in the broswer

Before you run `quasar dev` create the project.config.js file using the available template
To start the app in development mode (hot-code reloading, error reporting, etc.), run:

```bash
quasar dev
```

or from npm (it's the same):
```bash
npm run dev
```

### Test in the phone

If you want to run it on a phone (supposing it's an iPhone):

```bash
quasar dev -m cordova -T ios
```
for automatic reload, but may not always work (needs phone and computer to be on the same network)

Otherwise, for final builds, but with debugging information
```bash
quasar build --debug -m cordova -T ios --ide
```

Use `android` instead of `ios` for android. The ```--ide``` parameter will open the project in the IDE (Android Studio or XCode) so that you can run it from there.

If you want to use your development computer as server, as it needs to be served on https, you can use something like [localtunnel](https://theboroer.github.io/localtunnel-www/) and use the test address in the project.config.js file.

Additional setup may be required if you use cordova plugins instead of mocks. Check the deploy section for details.

### Automatic tests

The repository contains some unit tests, to run them:

```bash
npm run test
```

If you want to have quasar and the tests running in parallel and watching for code changes:

```bash
npm run dev:test
```

## Deploy

Setup `project.config.js` to use cordova plugins and the official API endpoint.

### iOS

Generate the compiled code.

```bash
quasar build -m cordova -T ios --ide
```

Open Xcode to compile the project and sign the app with a provisioning profile prepared for distribution on the App Store.

### Android

Generate the compiled code.

```bash
quasar build -m cordova -T android
```

To sign the APK for the Play store: create a keystore (only once! not for every release).

```bash
keytool -genkey -v -keystore mobistudy-release.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000
```

Write down the password you set for the keystore and the certificate. Let's say it's "pwdpwd"

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
- [Milo Bengtsson](https://github.com/palladog)
- [Jacky Tu](https://github.com/jackytu99)
- [Elliott Hellstrand](https://github.com/Elliott0121)
- [Andreas Holm](https://github.com/HeyOooh)
- [Moustafa Allouhaibi](https://github.com/af9593)
- [John Håkansson](https://github.com/JohnHakansson)
- [Daniel Abella](https://github.com/assimilate)
- [Kevin Tsang](https://github.com/kevinchtsang)
- [Gent Ymeri](https://github.com/gentymeri)
- [Shreyas Rana](https://ranashreyas.github.io/)

Graphic design and illustations:
- [Matilda Thorwaldsson](https://www.behance.net/matildathorwaldsson)

## License

See [license file](LICENSE)
