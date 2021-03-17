

import tru_sdk_ios

@objc(TruSdkReactNative)
class TruSdkReactNative: NSObject {

    @objc(openCheckUrl:withResolver:withRejecter:)
    public func openCheckUrl(url: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        let truSdk: TruSDK = TruSDK()
        
        truSdk.openCheckUrl(url: url) { (_) in
            resolve(url)
        }
    }

    // @objc(getJsonResponse:withB:withResolver:withRejecter:)
    // public func getJsonResponse(url: string, resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {
    //     let truSdk: TruSDK = TruSDK()
    //     truSdk.getJsonResponse(url: url, key: key) { (json) in
    //         resolve(json)
    //     }
    // }

    @objc(getJsonPropertyValue:key:withResolver:withRejecter:)
    public func getJsonPropertyValue(url: String, key: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        let truSdk: TruSDK = TruSDK()
        truSdk.getJsonPropertyValue(url: url, key: key) { (value) in
            resolve(value)
        }
    }
}
