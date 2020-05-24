import { Alert, Platform } from 'react-native';

export default function customAlert(title) {
  if (Platform.OS == 'web') {
    alert(title);
  } else {
    Alert.alert(
      title,
      '',
      [
        {
          text: 'Continue',
        },
      ],
      { cancelable: true }
    );
  }
}
