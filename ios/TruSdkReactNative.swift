import tru_sdk_ios

@objc(TruSdkReactNative)
class TruSdkReactNative: NSObject {

    // deprecated as of version 0.3.3
    @objc(openCheckUrl:withResolver:withRejecter:)
    public func openCheckUrl(url: String,
                             resolve: @escaping RCTPromiseResolveBlock,
                             reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        let truSdk: TruSDK = TruSDK()
        truSdk.check(url: nurl) { error in
            if let error = error as NSError? {
                reject("Error", error.localizedDescription, error)
            } else {
                resolve(url)
            }
        }
    }
    // deprecated as of version 0.4.0
    @objc(check:withResolver:withRejecter:)
    public func check(url: String,
                             resolve: @escaping RCTPromiseResolveBlock,
                             reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        let truSdk: TruSDK = TruSDK()
        truSdk.check(url: nurl) { error in
            if let error = error as NSError? {
                reject("Error", error.localizedDescription, error)
            } else {
                resolve(url)
            }
        }
    }

    @objc(checkUrlWithResponseBody:withResolver:withRejecter:)
    public func checkUrlWithResponseBody(url: String,
                             resolve: @escaping RCTPromiseResolveBlock,
                             reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        let truSdk: TruSDK = TruSDK()
        truSdk.checkUrlWithResponseBody(url: nurl) { error, body  in
            if let error = error as NSError? {
                reject("Error", error.localizedDescription, error)
            } else {
                resolve(url)
            }
        }
    }

    @objc(checkWithTrace:withResolver:withRejecter:)
    public func checkWithTrace(url: String,
                               resolve: @escaping RCTPromiseResolveBlock,
                               reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        let truSdk: TruSDK = TruSDK()
        truSdk.checkWithTrace(url: nurl) { error, traceInfo in
            if let error = error {
                reject("Error", "Error from checkWithTrace =>\(error)", nil)
                return
            }

            guard let trace = traceInfo else {
                reject("Error", "There is not error received, however TraceInfo is not available", nil)
                return
            }

            resolve(trace.trace)
        }
    }

    @objc(isReachable:withRejecter:)
    public func isReachable(_ resolve: @escaping RCTPromiseResolveBlock,
                            reject: @escaping RCTPromiseRejectBlock) -> Void {

        let truSdk: TruSDK = TruSDK()
        truSdk.isReachable{ result in
            switch(result) {
            case .success(let reachabilityDetails):
                do{
                    let jsonData = try JSONEncoder().encode(reachabilityDetails)
                    let jsonString = String(data: jsonData, encoding: .utf8)!
                    resolve(jsonString)
                } catch {
                    reject("Error", "Unable to decode reachability details to json", nil)
                }
            case .failure(let error):
                reject("Error", "\(error)", nil)
            }
        }

    }

    @objc(isReachableWithDataResidency:withResolver:withRejecter:)
    public func isReachable(dataResidency: String?, 
                            resolve: @escaping RCTPromiseResolveBlock,
                            reject: @escaping RCTPromiseRejectBlock) -> Void {

        let truSdk: TruSDK = TruSDK()
        truSdk.isReachable(dataResidency: dataResidency){ result in
            switch(result) {
            case .success(let reachabilityDetails):
                do{
                    let jsonData = try JSONEncoder().encode(reachabilityDetails)
                    let jsonString = String(data: jsonData, encoding: .utf8)!
                    resolve(jsonString)
                } catch {
                    reject("Error", "Unable to decode reachability details to json", nil)
                }
            case .failure(let error):
                reject("Error", "\(error)", nil)
            }
        }

    }

    //deprecated as of version 0.3.3
    @objc(getJsonPropertyValue:key:withResolver:withRejecter:)
    public func getJsonPropertyValue(url: String,
                                     key: String,
                                     resolve: @escaping RCTPromiseResolveBlock,
                                     reject: @escaping RCTPromiseRejectBlock) -> Void {

        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }

        let truSdk: TruSDK = TruSDK()
        truSdk.jsonPropertyValue(for: key, from: nurl) { value in
            resolve(value)
        }
    }
}
