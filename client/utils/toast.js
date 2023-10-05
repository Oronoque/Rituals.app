import Toast from 'react-native-toast-message';

export const showToast = ({ type = 'success', title, subtitle, duration = 4000 }) => {
  Toast.show({
    type,
    text1: title,
    text2: subtitle,
    visibilityTime: duration,
  });
};
