import { Alert, StyleSheet, View, Text, Image } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
import Button from "./Button";
import { Colors } from "../constants/colors";
import { useState } from "react";
import { getMapPreview } from "../util/location";

const LocationPicker = () => {

  const [location, setLocation] = useState(null);
  const [locationPresmission, requestPermission] = useForegroundPermissions();

  const verifyPermissions = async () => {
    if (locationPresmission.status !== 'undetermined') {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPresmission.status !== 'granted') {
      Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.', [{ text: 'OK' }]);
      return false;
    }
    return true;
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setLocation({ 
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
    // console.log(JSON.stringify(location, null, 2));
  }

  let locationPreview = <View><Text>No location chosen yet.</Text></View>;

  if(!!location) locationPreview = <Image source={{ uri: getMapPreview(location.lat, location.lng) }} style={styles.image} />;

  const pickOnMapHandler = () => {}

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <Button onPress={getLocationHandler}>Locate User</Button>
        <Button onPress={pickOnMapHandler}>Pick on Map</Button>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 8,
    width: 320,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  }
});