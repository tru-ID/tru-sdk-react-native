package com.trusdkreactnative

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import id.tru.sdk.ReachabilityDetails

import id.tru.sdk.TruSDK
import id.tru.sdk.network.TraceInfo
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import java.net.URL
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.bridge.WritableNativeMap




class TruSdkReactNativeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

  init {
    TruSDK.initializeSdk(reactContext)
  }

  override fun getName(): String {
    return "TruSdkReactNative"
  }

  @ReactMethod // deprecated as of version 0.3.3
  fun openCheckUrl(url: String, promise: Promise) {
    CoroutineScope(context = Dispatchers.IO).launch {
      try {
        val truSdk = TruSDK.getInstance()
        truSdk.check(url)
        promise.resolve(url) //for interface consistency
      } catch (exception: Exception) {
        promise.reject(exception)
      }
    }
  }

  @ReactMethod // deprecated as of version 0.4.0
  fun check(url: String, promise: Promise) {
    CoroutineScope(context = Dispatchers.IO).launch {
      try {
        val truSdk = TruSDK.getInstance()
        truSdk.check(url)
        promise.resolve(url) //for interface consistency
      } catch (exception: Exception) {
        promise.reject(exception)
      }
    }
  }

  @ReactMethod
  fun checkUrlWithResponseBody(url: String, promise: Promise) {
    CoroutineScope(context = Dispatchers.IO).launch {
      try {
        val truSdk = TruSDK.getInstance()
        val body = truSdk.checkUrlWithResponseBody(url)
        if (body != null) {
          if (body.has("code") && body.has("check_id")) {
            val success = mutableMapOf("code" to body.get("code"), "check_id" to body.get("check_id"), "reference_id" to body.get("reference_id"))
            promise.resolve(success) //for interface consistency
          } else if (body.has("error") && body.has("error_description")) {
            val failure = mutableMapOf("error" to body.get("error"),
              "error_description" to body.get("error_description"),
              "check_id" to body.get("check_id") ,
              "reference_id" to body.get("reference_id"))
            promise.resolve(failure) //for interface consistency
          } else {
            throw Exception("There is an issue with response body. Unable to serialise success or error from the dictionary")
          }
        } else {
          //val map: WritableMap = WritableNativeMap()
          promise.resolve(WritableNativeMap())
        }
      } catch (exception: Exception) {
        promise.reject(exception)
      }
    }
  }

  @ReactMethod
  fun checkWithTrace(url: String, promise: Promise) {
    CoroutineScope(context = Dispatchers.IO).launch {
      try {
        Log.d(TAG,"checkWithTrace is called")
        val truSdk = TruSDK.getInstance()
        val traceInfo = truSdk.checkWithTrace(URL(url))
        val body = traceInfo.responseBody
        if (body != null) {
          if (body.has("code") && body.has("check_id")) {
            val success = mutableMapOf(
              "code" to body.get("code"),
              "check_id" to body.get("check_id"),
              "reference_id" to body.get("reference_id"),
              "trace" to traceInfo.get("trace")
            )
            promise.resolve(success) //for interface consistency
            Log.d("Bridge","checkWithTrace Promise resolved")
          } else if (body.has("error") && body.has("error_description")) {
            val failure = mutableMapOf(
              "error" to body.get("error"),
              "error_description" to body.get("error_description"),
              "check_id" to body.get("check_id") ,
              "reference_id" to body.get("reference_id"),
              "trace" to traceInfo.get("trace")
            )
            promise.resolve(failure) //for interface consistency
            Log.d("Bridge","checkWithTrace Promise rejection")
          } else {
            throw Exception("There is an issue with response body. Unable to serialise success or error from the dictionary")
          }
        } else {
          //val map: WritableMap = WritableNativeMap()
          promise.resolve(WritableNativeMap())
        }

      } catch (exception: java.lang.Exception) {
        Log.d(TAG,"checkWithTrace Promise rejection")
        promise.reject(exception)
      }
    }
    Log.d(TAG,"checkWithTrace method exit")
  }

  @ReactMethod
  fun isReachable(promise: Promise) {
    try {
      Log.d(TAG,"isReachable is called")
      val truSdk = TruSDK.getInstance()
      val reachabilityInfo: ReachabilityDetails? = truSdk.isReachable()
      val payload = reachabilityInfo?.toJsonString()
      promise.resolve(payload)
    }catch (exception: java.lang.Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun isReachableWithDataResidency(dataResidency: String?, promise: Promise) {
    try {
      Log.d(TAG,"isReachableWithDataResidency is called")
      val truSdk = TruSDK.getInstance()
      val reachabilityInfo: ReachabilityDetails? = truSdk.isReachable(dataResidency)
      val payload = reachabilityInfo?.toJsonString()
      promise.resolve(payload)
    }catch (exception: java.lang.Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun getJsonPropertyValue(url: String, key: String, promise: Promise) {
    try {
      val truSdk = TruSDK.getInstance()
      val value = truSdk.getJsonPropertyValue(url, key)
      promise.resolve(value)
    } catch (exception: Exception) {
      promise.reject(exception)
    }
  }

  companion object {
    private const val TAG = "tru.ID RN Bridge"
  }
}
