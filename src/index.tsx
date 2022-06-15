import { NativeModules } from 'react-native';

type ResponseBodySuccess = {
  code: string;
  check_id: string;
  reference_id?: string;
};

type ResponseBodyError = {
  error: string;
  error_description: string;
  check_id: string;
  reference_id?: string;
};

type ResponseBodySuccessWithTrace = ResponseBodySuccess & TraceOnlyResponse;
type ResponseBodyErrorWithTrace = ResponseBodyError & TraceOnlyResponse;

type TraceOnlyResponse = {
  trace: string;
};

type TruSdkReactNativeType = {
  checkUrlWithResponseBody(
    url: string
  ): Promise<ResponseBodySuccess | ResponseBodyError /* v0.2 */
      //| void /* v0.1 */
  >;
  checkWithTrace(
    url: string
  ): Promise<
    | ResponseBodySuccessWithTrace /* v0.2 */
    | ResponseBodyErrorWithTrace /* v0.2 */
    | TraceOnlyResponse /* v0.1 */
  >;
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
