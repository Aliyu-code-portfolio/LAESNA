
import * as Location from 'expo-location';
import * as Device from 'expo-device';

export const getLocation = async (processData, dev, emg) => {
  const userLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  console.log(userLocation)
  processData(userLocation, dev, emg);

}

export const getDeviceID = () => {
  return Device.deviceName + ' ' + Device.modelName
}