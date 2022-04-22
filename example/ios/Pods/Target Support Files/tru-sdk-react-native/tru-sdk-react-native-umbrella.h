#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "TruSdkReactNative-Bridging-Header.h"

FOUNDATION_EXPORT double tru_sdk_react_nativeVersionNumber;
FOUNDATION_EXPORT const unsigned char tru_sdk_react_nativeVersionString[];

