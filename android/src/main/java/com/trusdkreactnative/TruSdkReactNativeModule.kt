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

class TruSdkReactNativeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {

  init {
    TruSDK.initializeSdk(reactContext)
  }

  override fun getName(): String {
    return "TruSdkReactNative"
  }

  @ReactMethod
  fun openCheckUrl(url: String, promise: Promise) {
    CoroutineScope(context = Dispatchers.IO).launch {
      try {
        val truSdk = TruSDK.getInstance()
        val isOnCellular = truSdk.openCheckUrl(url)
        promise.resolve(isOnCellular)
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
        promise.resolve(traceInfo.trace)
        Log.d("Bridge","checkWithTrace Promise resolved")
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
      val payload = serialiseReachability(reachabilityInfo)
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

  private fun serialiseReachability(reachabilityDetails: ReachabilityDetails?): String {
    var buffer = StringBuffer()
    buffer.append("{")

    reachabilityDetails?.let {
      val countryCode = it.countryCode ?: ""
      val link = it.link ?: ""
      val networkId = it.networkId ?: ""
      val networkName = it.networkName ?: ""
      val errorDetail = it.error?.detail ?: ""
      val errorTitle = it.error?.title ?: ""
      val errorType = it.error?.type ?: ""
      val errorStatus = it.error?.status ?: 0

      buffer.append(quote("countryCode", countryCode))
      buffer.append(quote("link", link))
      buffer.append(quote("networkId", networkId))
      buffer.append(quote("networkName", networkName))
      buffer.append(quote("errorDetail", errorDetail))
      buffer.append(quote("errorTitle", errorTitle))
      buffer.append(quote("errorType", errorType))
      buffer.append(quote("errorStatus", errorStatus))
    }

    buffer.append("}")
    return buffer.toString()
  }

  private fun quote(key: String, value: String, comma: String = ","): String {
    return "\"${key}\" : \"${value}\"${comma}"
  }

  private fun quote(key: String, value: Int): String {
    return "\"${key}\" : ${value}"
  }

  companion object {
    private const val TAG = "tru.ID RN Bridge"
  }
}
