# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
### 1.0.7 (2023-06-13)
### Changes
* Example app coverage_access_token to be taken from dev_server
### 1.0.6 (2023-05-03)
### Changes
* mobile_data_ip added to ReachabilityBody
### 1.0.5 (2023-04-24)
### Changes
* Bump tru-android-sdk dependency to v1.0.4.
### 1.0.4 (2023-02-28)
### Changes
* Bump tru-ios-sdk dependency to v1.0.3.
### 1.0.3 (2023-01-26)
### Changes
* Bump tru-android-sdk dependency to v1.0.3.
* Bump tru-ios-sdk dependency to v1.0.2.
* New method openWithDataCellularAndAccessToken 
### 1.0.2 (2022-11-01)
### Changes
* Bump tru-android-sdk dependency to v1.0.2.
* Android target increased to Android 12
* ApiError type amended
### 1.0.1 (2022-09-29)
### Changes
* Bump tru-ios-sdk dependency to v1.0.1.
* Bump tru-android-sdk dependency to v1.0.1.
### 1.0.0 (2022-09-26)
### Bug Fixes
* ErrorResponse type amended
* ReachabilityProduct type added
### Changes
* Bump tru-ios-sdk dependency to v1.0.0.
* Bump tru-android-sdk dependency to v1.0.0.
### 1.0.0-preview (2022-08-16)
### Changes
* Breaking changes from 0.x.x, see README
### 0.5.3 (2022-07-07)
### Bug Fixes
* isReachableWithDataResidency method added to iOS RN Bridge
### 0.5.2 (2022-07-06)
### Bug Fixes
* checkWithTrace method amended
### 0.5.1 (2022-06-15)
### Changes
* Bump tru-ios-sdk dependency to v0.3.4.
* Bump  tru-android-sdk dependency to v0.3.4.
* Changed to v0.2 endpoint for PhoneCheck within the Example app
### 0.5.0 (2022-04-22)
### Changes
* Bump tru-android-sdk dependency to v0.3.3.
* Bump tru-ios-sdk dependency to v0.3.3.
### Bug Fixes
* checkUrlWithResponseBody method amended
* checkWithTrace method amended
### 0.4.3 (2022-03-28)
### Changes
* Bump tru-android-sdk dependency to v0.3.2.
* Bump tru-ios-sdk dependency to v0.3.2.
### 0.4.2 (2022-03-08)
### Changes
* Bump tru-android-sdk dependency to v0.3.1.
* Bump tru-ios-sdk dependency to v0.3.1.
### 0.4.1 (2022-02-22)
### Bug Fixes
* checkUrlWithResponseBody method amended
### 0.4.0 (2022-02-14)
### Changes
* Bump tru-android-sdk dependency to v0.3.0.
* Bump tru-ios-sdk dependency to v0.3.0.
### 0.3.9 (2022-01-12)
### Changes
* Bump tru-android-sdk dependency to v0.2.11.
* Bump tru-ios-sdk dependency to v0.2.10.
### Bug Fixes
* Remove warnings
* Rename blacklist as exclusionList on metro.config.js
### 0.3.8 (2021-11-15)
### Changes
* Bump tru-android-sdk dependency to v0.2.10.
* iOS example App ATS enable
### 0.3.7 (2021-10-08)
### Changes
* Bump tru-ios-sdk dependency to v0.2.9.
* Bump tru-android-sdk dependency to v0.2.8.
### 0.3.6 (2021-09-27)
### Changes
* Bump tru-ios-sdk dependency to v0.2.8.
* Bump tru-android-sdk dependency to v0.2.7.
### 0.3.5 (2021-09-01)
### Changes
* iOS native mapping fixed for `check` method
* Bump tru-ios-sdk dependency to v0.2.7.
* Bump tru-android-sdk dependency to v0.2.6.
### 0.3.4 (2021-08-31)
### Changes
* Published to npm 
### 0.3.3 (2021-08-11)
### Changes
* Bump tru-ios-sdk dependency to v0.2.6.
* Bump tru-android-sdk dependency to v0.2.5.
* iOS target lowered to iOS 12
* `openCheckUrl(checkUrl)` and `getJsonProperty()` methods deprecated, `check(url)` introduced
### Bug Fixes
* Added Products which was missing from the reachabilityInfo

### 0.3.2 (2021-06-28)
* Just updating the version number

### 0.3.1 (2021-06-22)
* Bump tru-ios-sdk dependency to v0.2.4.
* Bump tru-android-sdk dependency to v0.2.4.
### Features
Two new method are introduced '`isReachable()` and `checkWithTrace(url: string)`.

### 0.3.0 (2021-04-27)

* Bump tru-ios-sdk dependency to v0.1.1. Now React Native SDK is using an improved version of the iOS SDK, which is more resilient to changing network conditions and provides better error handling.
* Due to the tru-ios-sdk dependency changes upgrading min iOS target to iOS 13.0 as well. 
* Update Pod versions and Podspec
* Example iOS Project disabled Flipper-Folly pod for Xcode 12.5 as it doesn't compile
* Example iOS project min target is updated
* Example React Native code fix for an issue where IP number may not be available

### 0.2.1 (2021-04-20)

* Bump tru-android-sdk dependency to v0.0.3

### Bug Fixes

* getJsonPropertyValue catch `Exception` ([031b55e](https://github.com/tru-ID/tru-sdk-react-native/commit/031b55ebd5007aedd95cbd92ca75a1909eef895f))

### 0.2.0 (2021-03-17)

* Bump tru-ios-sdk dependency to v0.0.11
* Bump tru-android-sdk dependency to v0.0.2

### Features

- `getJsonResponseValue(url: string, key: string): String` to perform a `GET` request to the given `url` over the cellular connection and retrieve the value identified by `key` from the returned JSON response payload.
