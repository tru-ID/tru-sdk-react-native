package com.trusdkreactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import id.tru.sdk.TruSDK

class TruSdkReactNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
      TruSDK.initializeSdk(reactContext)
    }

    override fun getName(): String {
        return "TruSdkReactNative"
    }

    @ReactMethod
    fun openCheckUrl(url: String, promise: Promise) {
      try {
        val truSdk = TruSDK.getInstance()
        truSdk.openCheckUrl(url)
        promise.resolve(url)
      }
      catch(exception: Exception) {
        promise.reject(exception)
      }
    }

    // @ReactMethod
    // fun getJsonResponse(url: String, promise: Promise) {
    //   try {
    //     val truSdk = TruSDK.getInstance()
    //     val json = truSdk.getJsonResponse(url)
    //     promise.resolve(json)
    //   }
    //   catch(exception: Exception) {
    //     promise.reject(exception)
    //   }
    // }

    @ReactMethod
    fun getJsonPropertyValue(url: String, key: String, promise: Promise) {
      try {
        val truSdk = TruSDK.getInstance()
        val value = truSdk.getJsonPropertyValue(url, key)
        promise.resolve(value)
      }
      catch(exception: Error) {
        promise.reject(exception)
      }
    }
 
}
