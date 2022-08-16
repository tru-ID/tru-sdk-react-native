# tru_sdk_react_native_example

Demonstrates how to use the tru_sdk_react_native plugin.

## Getting Started

Before you begin, you will need:

- For iOS: Xcode 12+ required
- For Android: 
    - Require JDK 14 (Java version 14.02 / Gradle v6.3).
    - Android Studio or Android SDK manager via [Android developer downloads](https://developer.android.com/studio).
    - Set `ANDROID_HOME` environment variable (ie `export ANDROID_HOME=~/Library/Android/sdk`). Although `$ANDROID_HOME` is apparently deprecated it is still required.
    - Accepted the SDK licenses `$ANDROID_HOME/tools/bin/sdkmanager --licenses` or `$ANDROID_SDK_ROOT/tools/bin/sdkmanager --licenses`
- For metro bundler, require node version > 10
- A mobile phone with mobile data connection.
- A [tru.ID account](https://developer.tru.id/signup) and to [setup you environment](https://developer.tru.id/docs/environment-setup)

## Configure & Run

Copy the `.env.example` file into `.env` and update the BASE_URL with your **tru.ID** dev server URL.

```
yarn bootstrap && cd example
```

### Android
```
 yarn android
```

### iOS
```
yarn ios
```

or

Open TruSdkReactNativce.xcworkspace with xcode

Don't forget to make sure Cocoapods installed on your machine and install pods to example.
```
cd ios
pod install
```