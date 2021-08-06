import { NativeModules } from 'react-native';

type TruSdkReactNativeType = {
  openCheckUrl(url: string): Promise<string | null>; // will be deprecated in next revision
  check(url: string): Promise<string | null>;
  checkWithTrace(url: string): Promise<string | null>;
  isReachable(): Promise<string | null>;
  getJsonPropertyValue(url: string, key: string): Promise<string | null>;
};

const { TruSdkReactNative } = NativeModules;

export default TruSdkReactNative as TruSdkReactNativeType;
