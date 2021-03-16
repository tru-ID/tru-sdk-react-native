#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TruSdkReactNative, NSObject)

RCT_EXTERN_METHOD(openCheckUrl:(NSString)url
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
