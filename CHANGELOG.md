# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.1](https://github.com/tru-ID/tru-sdk-react-native/compare/v0.3.0...v0.3.1) (2021-06-22)
* Bump tru-ios-sdk dependency to v0.2.4.
* Bump tru-android-sdk dependency to v0.2.4.
### Features
Two new method are introduced '`isReachable()` and `checkWithTrace(url: string)`.

### [0.3.0](https://github.com/tru-ID/tru-sdk-react-native/compare/v0.2.1...v0.3.0) (2021-04-27)

* Bump tru-ios-sdk dependency to v0.1.1. Now React Native SDK is using an improved version of the iOS SDK, which is more resilient to changing network conditions and provides better error handling.
* Due to the tru-ios-sdk dependency changes upgrading min iOS target to iOS 13.0 as well. 
* Update Pod versions and Podspec
* Example iOS Project disabled Flipper-Folly pod for Xcode 12.5 as it doesn't compile
* Example iOS project min target is updated
* Example React Native code fix for an issue where IP number may not be available

### [0.2.1](https://github.com/tru-ID/tru-sdk-react-native/compare/v0.2.0...v0.2.1) (2021-04-20)

* Bump tru-android-sdk dependency to v0.0.3

### Bug Fixes

* getJsonPropertyValue catch `Exception` ([031b55e](https://github.com/tru-ID/tru-sdk-react-native/commit/031b55ebd5007aedd95cbd92ca75a1909eef895f))

### 0.2.0 (2021-03-17)

* Bump tru-ios-sdk dependency to v0.0.11
* Bump tru-android-sdk dependency to v0.0.2

### Features

- `getJsonResponseValue(url: string, key: string): String` to perform a `GET` request to the given `url` over the cellular connection and retrieve the value identified by `key` from the returned JSON response payload.
