import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as Device from 'expo-device';

export const getLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION)
  if (status !== 'granted') {
    //Pop up showing a warning here and checks for null below.
    console.log('PERMISSION NOT GRANTED')
    return null;
  }
  else {
    const userLocation = await Location.getCurrentPositionAsync();
    return userLocation

  }
}

export const getDeviceID = (props) => {
  return Device.deviceName + ' ' + Device.modelName
}