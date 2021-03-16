import * as React from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// @ts-ignore
import { BASE_URL } from '@env';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import TruSdkReactNative from 'tru-sdk-react-native';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// const getIp = async function () {
//   try {
//     const ipAddress = await TruSdkReactNative.getJsonPropertyValue(`${BASE_URL}/my-ip`, 'ip_address');
//     console.log('ipAddress', ipAddress);
//   } catch (ex) {
//     console.error(ex);
//   }
// };

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
    // await getIp();

    setIsLoading(true);
    Keyboard.dismiss();

    let postCheckNumberRes: AxiosResponse;
    try {
      postCheckNumberRes = await client.post('/phone-check', {
        phone_number: phoneNumber,
      });
      console.log('[POST CHECK]:', postCheckNumberRes.data);
    } catch (error) {
      setIsLoading(false);
      showRequestError('Error creating check resource', error);
      return;
    }

    try {
      await TruSdkReactNative.openCheckUrl(postCheckNumberRes.data.check_url);
      const checkStatusRes = await client({
        method: 'get',
        url: `/phone-check?check_id=${postCheckNumberRes.data.check_id}`,
      });
      console.log('[CHECK RESULT]:', checkStatusRes);

      setIsLoading(false);
      if (checkStatusRes.data.match) {
        showMatchSuccess();
      } else {
        showMatchFailure();
      }
    } catch (error) {
      showRequestError('Error retrieving check URL', error);
      return;
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
            <ActivityIndicator size="large" />
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
