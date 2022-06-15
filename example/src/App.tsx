// @ts-ignore
import { BASE_URL } from '@env';
import TruSdkReactNative from '@tru_id/tru-sdk-react-native';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  GestureResponderEvent,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

const isReachable = async function () {
  console.log('[isReachable called]');
  try {
    const details = await TruSdkReactNative.isReachable();
    console.log('[isReachable complete]');
    return details;
  } catch (ex) {
    console.log('[isReachable error]');
    console.error(ex);
    return 'Unknown';
  }
};

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

    setProgress('Checking if on a Mobile IP');
    let details = await isReachable();
    console.log('Is Reachable result =>' + details);
    setProgress(`Is Reachable: ${details}`);
    console.log(`Moving on with Creating PhoneCheck...`);
    let postCheckNumberRes: AxiosResponse;
    let exchangeCheckRes: AxiosResponse;
    // Step 1: Create a PhoneCheck/Send phone number to Backend Server (For v0.1 use '/v0.1/phone-check')
    try {
      setProgress(`Creating PhoneCheck for ${phoneNumber}`);
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
    //Step 2 for v0.2 Only: Process the PhoneCheck/ Open check_url over cellular
    try {
      setProgress(`Requesting PhoneCheck URL`);
      console.log(`PhoneCheck [Start] ->`);
      const checkUrlWithResponseBody =
        await TruSdkReactNative.checkUrlWithResponseBody(
          postCheckNumberRes.data.check_url
        );

      if ('code' in checkUrlWithResponseBody) {
        // ResponseBodySuccess
        setProgress('checkUrlWithResponseBody success');
        console.log('[checkUrlWithResponseBody success]');
        exchangeCheckRes = await client.post(
          '/v0.2/phone-check/exchange-code',
          {
            check_id: checkUrlWithResponseBody.check_id,
            code: checkUrlWithResponseBody.code,
            reference_id: checkUrlWithResponseBody.reference_id,
          }
        );
        setProgress(`Getting PhoneCheck result`);
        console.log('Getting PhoneCheck result');
        try {
          console.log('[CHECK RESULT]:', exchangeCheckRes.data);
          setProgress(`Got PhoneCheck result`);
          setIsLoading(false);
          if (exchangeCheckRes.data.match) {
            setProgress(`✅ successful PhoneCheck match`);
            console.log(`✅ successful PhoneCheck match`);
            showMatchSuccess();
          } else {
            setProgress(`❌ failed PhoneCheck match`);
            console.log(`❌ failed PhoneCheck match`);
            showMatchFailure();
          }
          setProgress('check status');
        } catch (error) {
          setProgress('exchangeCheck error: ${error.message}');
          console.log('[exchangeCheck error]');
        }
      } else if ('error' in checkUrlWithResponseBody) {
        //ResponseBodyError
        setProgress(
          `checkUrlWithResponseBody Error: ${checkUrlWithResponseBody.error_description}`
        );
        console.log(
          `checkUrlWithResponseBody: -> ${checkUrlWithResponseBody.error}`
        );
      }
    } catch (error: any) {
      setProgress(`Error: ${error.message}`);
      console.log(`Error Description: ${JSON.stringify(error, null, 2)}`);
      showRequestError('Error retrieving check URL', error.message);
      return;
    }
    // TO BE USED WITHIN v0.1 endpoint
    // As checkWithUrlResponse method does not return any body within v0.1 endpoint you will need to add
    // type void as a return type to the checkWithUrlResponse method description at the index.tsx file.
    //
    // Step 2 for v0.1
    // try {
    //   setProgress(`Requesting PhoneCheck URL`);
    //   console.log(`PhoneCheck [Start] ->`);
    //   await TruSdkReactNative.checkUrlWithResponseBody(
    //     postCheckNumberRes.data.check_url
    //   );
    //   console.log(`PhoneCheck [Done] ->`);
    
    //   setProgress(`Requesting PhoneCheck URL`);
    // } catch (error: any) {
    //   setProgress(`Error: ${error.message}`);
    //   console.log(`Error Description: ${JSON.stringify(error, null, 2)}`);
    //   showRequestError('Error retrieving check URL', error.message);
    //   return;
    // }
    
    // Step 3 for v0.1
    //  try {
    //   setProgress(`Getting PhoneCheck result`);
    //   const checkStatusRes = await client({
    //     method: 'get',
    //     url: `/v0.1/phone-check?check_id=${postCheckNumberRes.data.check_id}`,
    //   });
    //   console.log('[CHECK RESULT]:', checkStatusRes);
    //   setProgress(`Got PhoneCheck result`);

    //   setIsLoading(false);
    //   if (checkStatusRes.data.match) {
    //     setProgress(`✅ successful PhoneCheck match`);
    //     showMatchSuccess();
    //   } else {
    //     setProgress(`❌ failed PhoneCheck match`);
    //     showMatchFailure();
    //   }
    // } catch (error: any) {
    //   setProgress(`Error: ${error.message}`);
    //   console.log(JSON.stringify(error, null, 2));
    //   showRequestError('Error retrieving check result', error.message);
    //   return;
    // }
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
