import { Alert, Platform } from 'react-native';

export default function customAlert(title, text = '') {
  if (Platform.OS == 'web') {
    alert(title, text);
  } else {
    Alert.alert(
      title,
      text,
      [
        {
          text: 'Continue',
        },
      ],
      { cancelable: true }
    );
  }
}
