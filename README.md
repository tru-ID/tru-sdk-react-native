# tru.ID SDK for React Native

[![License][license-image]][license-url]


## Installation

```sh
npm install @tru_id/tru-sdk-react-native
```

For Android, add the following to your application's `build.gradle`:

```groovy
maven {
    url "https://gitlab.com/api/v4/projects/22035475/packages/maven"
}
```

Note: we'll begin publishing our Android SDK to Maven central shortly.

## Compatibility

- Minimum Android SDK: TruSDK requires a minimum API level of 21 (Android 5)

- Compile Android SDK: TruSDK requires you to compile against API 30  (Android 11) or later.

- Minimum deployment target for iOS is iOS 12

## Usage

```js
import TruSdkReactNative from "@tru_id/tru-sdk-react-native";

// ...

// Test if the device mobile network is currently supported 
const details = await TruSdkReactNative.isReachable();

// ...

// Make a GET request using the cellular connection to the check URL
await TruSdkReactNative.checkUrlWithResponseBody(url);

```

## Run example

The SDK contains an embedded example to make building and testing the SDK bridge easier.

- For iOS: Require Xcode 12+
- For Android:
    - Require JDK 14 (Java version 14.02 / Gradle v6.3).
    - Android Studio or Android SDK manager via [Android developer downloads](https://developer.android.com/studio).
    - Set `ANDROID_HOME` environment variable (ie `export ANDROID_HOME=~/Library/Android/sdk`). Although `$ANDROID_HOME` is apparently deprecated it is still required.
    - Accepted the SDK licenses `$ANDROID_HOME/tools/bin/sdkmanager --licenses` or `$ANDROID_SDK_ROOT/tools/bin/sdkmanager --licenses`
- For metro bundler, require node version > 10
- Setup and run the [tru.ID example server](https://github.com/tru-ID/dev-server/blob/main/README.md)
- Create configuration cp .env.example .env and update the BASE_URL value in the .env file to point to your running example server
- `yarn bootstrap && cd example`
    - Run Android: `yarn android`
    - Run iOS: `yarn ios`
   
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Development

### Releasing

Update `CHANGELOG.md` and finesse.

```
$ yarn run changelog
```

Commit the changes:

```
$ git commit -m 'chore(release): v{version}'
```

Tag:

```
$ git tag v{version}
```

Publish a new canary build to test.

```
$ yarn run publish:canary
```

Publish a full version:

```
$ yarn run publish:latest
```

## Meta

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/tru-ID](https://github.com/tru-ID)

[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
