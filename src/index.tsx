import { NativeModules } from 'react-native';

type TruSdkReactNativeType = {
  checkUrlWithResponseBody(url: string): Promise<string | null>;
  checkWithTrace(url: string): Promise<string | null>;
  isReachable(): Promise<string | null>;
  isReachableWithDataResidency(dataResidency: string): Promise<string | null>;
   /**
   * @deprecated since version 0.3.3
   */
    check(url: string): Promise<string | null>;
 
  /**
   * @deprecated since version 0.3.3
   */
  openCheckUrl(url: string): Promise<string | null>;
  /**
   * @deprecated since version 0.3.3
   */
  getJsonPropertyValue(url: string, key: string): Promise<string | null>;
};
const { TruSdkReactNative } = NativeModules;

export default TruSdkReactNative as TruSdkReactNativeType;
