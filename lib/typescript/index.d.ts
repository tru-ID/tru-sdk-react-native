export declare type ErrorResponse = {
    error: string;
    error_description: string;
    debug?: DebugResponse;
};
export declare type ApiError = {
    status: string;
    type: string;
    title: string;
    detail: string;
};
export declare type DebugResponse = {
    device_info: string;
    url_trace: string;
};
export declare type ReachabilitySuccessResponse = {
    http_status: number;
    response_body?: ReachabilityResponseBody;
    debug?: DebugResponse;
};
export declare type ReachabilityBody = {
    network_id: string;
    network_name: string;
    country_code: string;
    products?: ReachabilityProduct[];
};
export declare type ReachabilityProduct = {
    product_id: string;
    product_name: string;
};
export declare type CheckSuccessResponse = {
    http_status: number;
    response_body?: CheckResponseBody;
    debug?: DebugResponse;
};
export declare type CheckErrorBody = {
    error: string;
    error_description: string;
    check_id: string;
    reference_id?: string;
};
export declare type CheckSuccessBody = {
    code: string;
    check_id: string;
    reference_id?: string;
};
export declare type ReachabilityResponseBody = ReachabilityBody | ApiError;
export declare type ReachabilityResponse = ReachabilitySuccessResponse | ErrorResponse;
export declare type CheckResponse = CheckSuccessResponse | ErrorResponse;
export declare type CheckResponseBody = CheckSuccessBody | CheckErrorBody | ApiError;
declare type TruSdkReactNativeType = {
    openWithDataCellular<T>(url: string): Promise<T>;
    openWithDataCellularWithDebug<T>(url: string, debug: boolean): Promise<T>;
};
declare const _default: TruSdkReactNativeType;
export default _default;
