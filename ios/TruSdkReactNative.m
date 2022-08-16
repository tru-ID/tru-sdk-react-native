#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TruSdkReactNative, NSObject)

RCT_EXTERN_METHOD(openWithDataCellularWithDebug:(NSString)url
                  debug:(BOOL)debug
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(openWithDataCellular:(NSString)url
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)
@end
