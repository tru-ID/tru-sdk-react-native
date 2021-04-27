

import tru_sdk_ios

@objc(TruSdkReactNative)
class TruSdkReactNative: NSObject {

    @objc(openCheckUrl:withResolver:withRejecter:)
    public func openCheckUrl(url: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {

        let truSdk: TruSDK = TruSDK()

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        truSdk.check(url: nurl) { error in
            if let error = error as NSError? {
                reject("Error", error.localizedDescription, error)
            } else {
                resolve(url)
            }
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

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        truSdk.jsonPropertyValue(for: key, from: nurl) { value in
            resolve(value)
        }
    }
}
