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

## Usage

```js
import TruSdkReactNative from "@tru_id/tru-sdk-react-native";

// ...

// Make a GET request using the cellular connection to the check URL
await TruSdkReactNative.openCheckUrl(checkUrl);

// Make a GET request using the cellular connection supplied URL
// Expects a JSON response and the value for the key identified by the second parameter
// will be returned. e.g. "ip_address" in the example below.
const ipAddress = await TruSdkReactNative.getJsonPropertyValue(
    `https://${BASE_URL}/my-ip`,
    'ip_address'
  );
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
- `yarn bootstrap && cd examples`
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
