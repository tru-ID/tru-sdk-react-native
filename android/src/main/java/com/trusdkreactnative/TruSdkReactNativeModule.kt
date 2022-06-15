package com.trusdkreactnative

import android.util.Log
import com.facebook.react.bridge.*
import id.tru.sdk.ReachabilityDetails
import id.tru.sdk.TruSDK
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.net.URL

class TruSdkReactNativeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

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
        promise.resolve(url) // for interface consistency
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
        promise.resolve(url) // for interface consistency
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
            var refId: String? = ""
            if (body.has("reference_id")) {
              refId = body.get("reference_id") as String
            }
            val success: WritableMap = WritableNativeMap()
            success.putString("code", body.get("code") as String)
            success.putString("check_id", body.get("check_id") as String)
            success.putString("reference_id", refId)
            promise.resolve(success) // for interface consistency
          } else if (body.has("error") && body.has("error_description")) {
            var refId: String? = ""
            if (body.has("reference_id")) {
              refId = body.get("reference_id") as String
            }
            val failure: WritableMap = WritableNativeMap()
            failure.putString("error", body.get("error") as String)
            failure.putString("check_id", body.get("check_id") as String)
            failure.putString("error_description", body.get("error_description") as String)
            failure.putString("reference_id", refId)
            promise.resolve(failure) // for interface consistency
          } else {
            throw Exception(
                "There is an issue with response body. Unable to serialise success or error from the dictionary"
            )
          }
        } else {
          // v0.1 endpoint doesn't return any body
          promise.resolve(null)
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
        Log.d(TAG, "checkWithTrace is called")
        val truSdk = TruSDK.getInstance()
        val traceInfo = truSdk.checkWithTrace(URL(url))
        val body = traceInfo.responseBody
        if (body != null) {
          if (body.has("code") && body.has("check_id")) {
            var refId: String? = ""
            if (body.has("reference_id")) {
              refId = body.get("reference_id") as String
            }
            val success: WritableMap = WritableNativeMap()
            success.putString("code", body.get("code") as String)
            success.putString("check_id", body.get("check_id") as String)
            success.putString("reference_id", refId)
            success.putString("trace", traceInfo.trace)
            promise.resolve(success) // for interface consistency
            Log.d("Bridge", "checkWithTrace Promise resolved")
          } else if (body.has("error") && body.has("error_description")) {
            var refId: String? = ""
            if (body.has("reference_id")) {
              refId = body.get("reference_id") as String
            }
            val failure: WritableMap = WritableNativeMap()
            failure.putString("error", body.get("error") as String)
            failure.putString("error_description", body.get("error_description") as String)
            failure.putString("check_id", body.get("check_id") as String)
            failure.putString("reference_id", refId)
            failure.putString("trace", traceInfo.trace)
            promise.resolve(failure) // for interface consistency
            Log.d("Bridge", "checkWithTrace Promise rejection")
          } else {
            throw Exception(
                "There is an issue with response body. Unable to serialise success or error from the dictionary"
            )
          }
        } else {
          // v0.1 endpoint doesn't return any body
          // so we return only the trace
          val responseWithTrace = Arguments.createMap().apply {
            putString("trace", traceInfo.trace)
          }
          promise.resolve(responseWithTrace)
          Log.d(TAG, "responseWithTrace")
        }
      } catch (exception: Exception) {
        Log.d(TAG, "checkWithTrace Promise rejection")
        promise.reject(exception)
      }
    }
    Log.d(TAG, "checkWithTrace method exit")
  }

  @ReactMethod
  fun isReachable(promise: Promise) {
    try {
      Log.d(TAG, "isReachable is called")
      val truSdk = TruSDK.getInstance()
      val reachabilityInfo: ReachabilityDetails? = truSdk.isReachable()
      val payload = reachabilityInfo?.toJsonString()
      promise.resolve(payload)
    } catch (exception: java.lang.Exception) {
      promise.reject(exception)
    }
  }

  @ReactMethod
  fun isReachableWithDataResidency(dataResidency: String?, promise: Promise) {
    try {
      Log.d(TAG, "isReachableWithDataResidency is called")
      val truSdk = TruSDK.getInstance()
      val reachabilityInfo: ReachabilityDetails? = truSdk.isReachable(dataResidency)
      val payload = reachabilityInfo?.toJsonString()
      promise.resolve(payload)
    } catch (exception: java.lang.Exception) {
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
