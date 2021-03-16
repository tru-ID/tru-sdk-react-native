

import tru_sdk_ios

@objc(TruSdkReactNative)
class TruSdkReactNative: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve: RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc(openCheckUrl:withResolver:withRejecter:)
    public func openCheckUrl(url: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        let trusdk: TruSDK = TruSDK()
        
        trusdk.openCheckUrl(url: url) { (_) in
            resolve(url)
        }
    }
}
