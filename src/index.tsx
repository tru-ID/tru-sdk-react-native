import { NativeModules } from 'react-native';

type TruSdkReactNativeType = {
  multiply(a: number, b: number): Promise<number>;
};

const { TruSdkReactNative } = NativeModules;

export default TruSdkReactNative as TruSdkReactNativeType;
