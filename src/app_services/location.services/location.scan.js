
import * as Location from 'expo-location';
import * as Device from 'expo-device';

export const getLocation = async () => {
  const userLocation = await Location.getCurrentPositionAsync();
  return userLocation
}

export const getDeviceID = (props) => {
  return Device.deviceName + ' ' + Device.modelName
}