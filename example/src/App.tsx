import * as React from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// @ts-ignore
import { BASE_URL, RTA_KEY, RTA_URL } from '@env';
import { sha256 } from 'react-native-sha256';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

import TruSdkReactNative, {
  ReachabilityResponse,
  CheckResponse,
  CheckErrorBody,
  CheckSuccessBody,
  ApiError,
  ReachabilityBody,
} from '@tru_id/tru-sdk-react-native';

import axios, { AxiosInstance, AxiosResponse } from 'axios';

import type { TokenResponse } from './TokenResponse';

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

const clientCoverage: AxiosInstance = axios.create({
  baseURL: RTA_URL,
  timeout: 30000,
});

const AppButton = ({
  onPress,
  title,
}: {
  onPress: (event: GestureResponderEvent) => void;
  title: string;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

const getCoverageAccessToken = async (): Promise<
  AxiosResponse<TokenResponse>
> => {
  const signature = await sha256(RTA_KEY);
  return clientCoverage.get('/coverage_access_token', {
    headers: {
      'x-rta': signature,
    },
  });
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [progress, setProgress] = React.useState<string>('');

  const showError = (error: string) =>
    Alert.alert('Something went wrong', `Error: ${error};`, [{ text: 'OK' }], {
      cancelable: false,
    });

  const showMatchSuccess = () =>
    Alert.alert(
      'Verification Successful',
      'The phone number verification succeeded',
      [{ text: 'OK' }],
      {
        cancelable: false,
      }
    );

  const showMatchFailure = () =>
    Alert.alert(
      'Verification Failed',
      'The phone number verification failed',
      [{ text: 'OK' }],
      {
        cancelable: false,
      }
    );

  const showRequestError = (errorPrefix: string, error: any) => {
    let msg = JSON.stringify(error);
    if (error.response) {
      msg = JSON.stringify(error.response);
    }
    setIsLoading(false);
    showError(`${errorPrefix}: ${msg}`);
  };

  const triggerPhoneCheck = async () => {
    setIsLoading(true);
    Keyboard.dismiss();

    //As simulators do not have a mobile connection, it is best to use isReachable on a physical device
    var canMoveToNextStep = false;
    setProgress('Checking if on a Mobile IP');
    
    const tokenResponse = await getCoverageAccessToken();
    const token = tokenResponse.data.access_token;
    
    if (token) {
      const res =
        await TruSdkReactNative.openWithDataCellularAndAccessToken<ReachabilityResponse>(
          'https://eu.api.tru.id/coverage/v0.1/device_ip',
          true,
          token
        );

      console.log('------- openWithDataCellular -------');
      console.log('Is Reachable result =>' + JSON.stringify(res));
      console.log('------------------------------------');

      if ('error' in res) {
        setProgress(`Is Reachable: ${res.error_description}`);
      } else if ('http_status' in res) {
        let httpStatus = res.http_status;
        if (httpStatus === 200 && res.response_body !== undefined) {
          let body = res.response_body as ReachabilityBody;
          setProgress(`Is Reachable: ${body.network_name}`);
          console.log('product => ' + JSON.stringify(body.products![0]));
          canMoveToNextStep = true;
        } else if (httpStatus === 400 && res.response_body !== undefined) {
          let body = res.response_body as ApiError;
          setProgress(`Is Reachable: ${body.detail}`);
        } else if (httpStatus === 412 && res.response_body !== undefined) {
          let body = res.response_body as ApiError;
          setProgress(`Is Reachable: ${body.detail}`);
        } else if (res.response_body !== undefined) {
          let body = res.response_body as ApiError;
          setProgress(`Is Reachable: ${body.detail}`);
        }
      }
      if (canMoveToNextStep) {
        console.log(`Moving on with Creating PhoneCheck...`);
        let postCheckNumberRes: AxiosResponse;
        try {
          setProgress(`Creating PhoneCheck`);
          postCheckNumberRes = await client.post('/v0.2/phone-check', {
            phone_number: phoneNumber,
          });
          console.log('[POST CHECK]:', postCheckNumberRes.data);
          setProgress(`PhoneCheck created`);
        } catch (error) {
          setProgress(`An error occured creating PhoneCheck`);
          setIsLoading(false);
          showRequestError('Error creating check resource', error);
          return;
        }
        setProgress(`Requesting PhoneCheck URL`);
        console.log(`PhoneCheck [Start] ->`);
        const resp =
          await TruSdkReactNative.openWithDataCellular<CheckResponse>(
            postCheckNumberRes.data.check_url
          );
        console.log(`PhoneCheck [Done] ->`);
        if ('error' in resp) {
          setProgress(
            `Error in openWithDataCellular: ${resp.error_description}`
          );
        } else if ('http_status' in resp) {
          const httpStatus = resp.http_status;
          if (httpStatus === 200 && resp.response_body !== undefined) {
            setProgress(`Requesting PhoneCheck URL`);
            canMoveToNextStep = true;
            if ('error' in resp.response_body) {
              const body = resp.response_body as CheckErrorBody;
              setProgress(`Error: ${body.error_description}`);
            } else {
              const body = resp.response_body as CheckSuccessBody;
              // send ${body.code}, ${body.check_id} and ${body.reference_id} to back-end
              // to trigger a PATCH /checks/{check_id}
              try {
                const checkStatusRes = await client.post(
                  `/v0.2/phone-check/exchange-code`,
                  {
                    check_id: postCheckNumberRes.data.check_id,
                    code: body.code,
                    reference_id: body.reference_id,
                  }
                );
                console.log('[CHECK RESULT]:', checkStatusRes);
                setProgress(`Got PhoneCheck result`);
                setIsLoading(false);
                if (checkStatusRes.data.match) {
                  setProgress(`✅ successful PhoneCheck match`);
                  showMatchSuccess();
                } else {
                  setProgress(`❌ failed PhoneCheck match`);
                  showMatchFailure();
                }
              } catch (error: any) {
                setProgress(`Error: ${error.message}`);
                console.log(JSON.stringify(error, null, 2));
                showRequestError(
                  'Error retrieving check result',
                  error.message
                );
                return;
              }
            }
          } else {
            const body = resp.response_body as ApiError;
            setProgress(`Error: ${body.detail}`);
          }
        }
      }
    } else {
      setProgress(`Error in getCoverageAccessToken: No accessToken`);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Image
          source={require('./images/tru-id-logo.png')}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 300, height: 300 }}
        />
        <TextInput
          keyboardType="phone-pad"
          placeholder="Phone number"
          placeholderTextColor="#d3d3d3"
          style={styles.input}
          value={phoneNumber}
          onChangeText={(phone) => setPhoneNumber(phone.replace(/\s+/g, ''))}
          focusable={!isLoading}
        />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              color={styles.loadingContainer.color}
              size="large"
            />
            <Text>{progress}</Text>
          </View>
        ) : (
          <View>
            <AppButton
              title="Verify my phone number"
              onPress={triggerPhoneCheck}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  companyName: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 100,
  },
  input: {
    height: 40,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginTop: 40,
    width: '60%',
    borderRadius: 2,
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    marginTop: 40,
    justifyContent: 'center',
    color: '#00B4FF',
  },
  appButtonContainer: {
    elevation: 8,
    marginTop: 10,
    backgroundColor: '#00B4FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
