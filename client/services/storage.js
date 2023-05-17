import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorageItem = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('Error when set storage data:', e);
  }
};

export const getStorageItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('Error when get storage data:', e);
  }
};

export const removeStorageItem = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error when removeItem storage data:', e);
  }
};
