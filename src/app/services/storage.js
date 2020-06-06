import { AsyncStorage } from 'react-native';

async function get(key) {
  try {
    const authCache = await AsyncStorage.getItem(key);
    if (authCache) {
      return JSON.parse(authCache);
    }
  } catch (e) {
    alert('Get Error: ', e);
  }
}

async function set(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    alert('Set Error: ', e);
  }
}

async function reset(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    alert('Reset Error: ', e);
  }
}

export default {
  get,
  set,
  reset,
};
