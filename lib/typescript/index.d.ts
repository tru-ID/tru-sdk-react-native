declare type ResponseBodySuccess = {
    code: string;
    check_id: string;
    reference_id?: string;
};
declare type ResponseBodyError = {
    error: string;
    error_description: string;
    check_id: string;
    reference_id?: string;
};
declare type ResponseBodySuccessWithTrace = ResponseBodySuccess & TraceOnlyResponse;
declare type ResponseBodyErrorWithTrace = ResponseBodyError & TraceOnlyResponse;
declare type TraceOnlyResponse = {
    trace: string;
};
declare type TruSdkReactNativeType = {
    checkUrlWithResponseBody(url: string): Promise<ResponseBodySuccess | ResponseBodyError | void>;
    checkWithTrace(url: string): Promise<ResponseBodySuccessWithTrace | ResponseBodyErrorWithTrace | TraceOnlyResponse>;
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
declare const _default: TruSdkReactNativeType;
export default _default;
