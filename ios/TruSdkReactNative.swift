import tru_sdk_ios

@objc(TruSdkReactNative)
class TruSdkReactNative: NSObject {
    
    // deprecated as of version 0.3.3
    @objc(openCheckUrl:withResolver:withRejecter:)
    public func openCheckUrl(
        url: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
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
    public func check(
        url: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
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
    public func checkUrlWithResponseBody(
        url: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }
        
        let truSdk: TruSDK = TruSDK()
        truSdk.checkUrlWithResponseBody(url: nurl) { error, body in
            if let error = error as NSError? {
                reject("Error", error.localizedDescription, error)
            } else {
                if let body = body {
                    if body["code"] != nil && body["check_id"] != nil {
                    //return a dictionary with the successful response
                    let success = [
                        "code": body["code"],
                        "check_id": body["check_id"],
                        "reference_id": body["reference_id"],
                    ]
                    resolve(success)  //body is a dictionary
                } else if body["error"] != nil && body["error_description"] != nil {
                    //return a dictionary with the error response
                    let failure = [
                        "error": body["error"],
                        "error_description": body["error_description"],
                        "check_id": body["check_id"],
                        "reference_id": body["reference_id"],
                    ]
                    resolve(failure)
                } else {
                    reject(
                        "Error",
                        "There is an issue with response body. Unable to serialise success or error from the dictionary",
                        error)
                }
                } else {
                    resolve(nil)
                }
                
            }
        }
    }
    
    @objc(checkWithTrace:withResolver:withRejecter:)
    public func checkWithTrace(
        url: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
        guard let nurl = URL(string: url) else {
            reject("Error", "Unable to create a URL with \(url)", nil)
            return
        }
        
        let truSdk: TruSDK = TruSDK()
        
        truSdk.checkWithTrace(url: nurl) { error, traceInfo in
            if let error = error {
                reject("Error", "Error from checkWithTrace =>\(error)", nil)
                return
            } else {
                guard let trace = traceInfo else {
                    reject("Error", "There is no 'trace' property in TraceInfo", nil)
                    return
                }
                
                guard let body = traceInfo?.responseBody else {
                    reject("Error", "There is no 'responseBody' property in TraceInfo", nil)
                    return
                }
                if let body = traceInfo?.responseBody {
                    if body["code"] != nil && body["check_id"] != nil {
                        //return a dictionary with the successful response
                        let success = [
                            "code": body["code"],
                            "check_id": body["check_id"],
                            "reference_id": body["reference_id"],
                            "trace": traceInfo?.trace,
                        ]
                        resolve(success)  //body is a dictionary
                        print("Bridge", "checkWithTrace Promise resolved")
                    } else if body["error"] != nil && body["error_description"] != nil {
                        //return a dictionary with the error response
                        let failure = [
                            "error": body["error"],
                            "error_description": body["error_description"],
                            "check_id": body["check_id"],
                            "reference_id": body["reference_id"],
                            "trace": traceInfo?.trace,
                        ]
                        resolve(failure)
                        print("Bridge", "checkWithTrace Promise rejection")
                    } else {
                        reject(
                            "Error",
                            "There is an issue with response body. Unable to serialise success or error from the dictionary",
                            error)
                    }
                } else {
                    // v0.1 endpoint doesn't return any body so we just return the trace
                    let responseWithTrace = [
                        "trace": traceInfo?.trace,
                    ]
                    resolve(responseWithTrace)
                }
            }
            
        }
    }
    
    @objc(isReachable:withRejecter:)
    public func isReachable(
        _ resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
        let truSdk: TruSDK = TruSDK()
        truSdk.isReachable { result in
            switch result {
            case .success(let reachabilityDetails):
                do {
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
    public func isReachable(
        dataResidency: String?,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
        let truSdk: TruSDK = TruSDK()
        truSdk.isReachable(dataResidency: dataResidency) { result in
            switch result {
            case .success(let reachabilityDetails):
                do {
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
    public func getJsonPropertyValue(
        url: String,
        key: String,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        
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
