import tru_sdk_ios

@objc(TruSdkReactNative)
class TruSdkReactNative: NSObject {


    
    @objc(openWithDataCellularWithDebug:debug:withResolver:withRejecter:)
    public func openWithDataCellularWithDebug(url: String,
                                     debug: Bool,
                                     resolve: @escaping RCTPromiseResolveBlock,
                                     reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let u = URL(string: url) else {
            let failure = [
                "error":"sdk_error",
                "error_description":"invalid url"]
            resolve(failure)
            return
        }
        
        let truSdk: TruSDK = TruSDK()
        truSdk.openWithDataCellular(url: u, debug: debug) { res in
            resolve(res)
        }
    }

     @objc(openWithDataCellular:withResolver:withRejecter:)
     public func openWithDataCellular(url: String,
                                     resolve: @escaping RCTPromiseResolveBlock,
                                     reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let u = URL(string: url) else {
            let failure = [
                "error":"sdk_error",
                "error_description":"invalid url"]
            resolve(failure)
            return
        }
        
        let truSdk: TruSDK = TruSDK()
        truSdk.openWithDataCellular(url: u, debug: false) { res in
            resolve(res)
        }
    }
     
    @objc(openWithDataCellularAndAccessToken:debug:accessToken:withResolver:withRejecter:)
    public func openWithDataCellularAndAccessToken(url: String,
                                                   debug: Bool,
                                                   accessToken: String,
                                                   resolve: @escaping RCTPromiseResolveBlock,
                                                   reject: @escaping RCTPromiseRejectBlock) -> Void {

       print("checking if there is url")
       guard let u = URL(string: url) else {
            let failure = [
                "error":"sdk_error",
                "error_description":"invalid url"]
           print("resolving with failure")
           resolve(failure)
           return
       }

       let truSdk: TruSDK = TruSDK()
        truSdk.openWithDataCellularAndAccessToken(url: u, accessToken: accessToken, debug: debug) { res in
           resolve(res)
       }
   }
    
  
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
