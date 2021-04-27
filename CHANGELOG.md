# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/tru-ID/tru-sdk-react-native/compare/v0.2.0...v0.2.1) (2021-04-20)

* Bump tru-android-sdk dependency to v0.0.3

### Bug Fixes

* getJsonPropertyValue catch `Exception` ([031b55e](https://github.com/tru-ID/tru-sdk-react-native/commit/031b55ebd5007aedd95cbd92ca75a1909eef895f))

### 0.2.0 (2021-03-17)

* Bump tru-ios-sdk dependency to v0.0.11
* Bump tru-android-sdk dependency to v0.0.2

### Features

- `getJsonResponseValue(url: string, key: string): String` to perform a `GET` request to the given `url` over the cellular connection and retrieve the value identified by `key` from the returned JSON response payload.
