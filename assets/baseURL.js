import { Platform } from 'react-native';

let baseURL = '';

{
  Platform.OS == 'android'
    ? (baseURL = 'http://192.168.136.115:3000/api/v1/')
    : (baseURL = 'http://192.168.136.115:3000/api/v1/');
}

export default baseURL;
