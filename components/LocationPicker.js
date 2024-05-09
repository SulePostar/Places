import { Alert, StyleSheet, View, Text, Image } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions } from "expo-location";
import Button from "./Button";
import { Colors } from "../constants/colors";
import { useState, useEffect } from "react";
import { getAddress, getMapPreview } from "../util/location";
import { useNavigation, useRoute } from "@react-navigation/native";

const LocationPicker = ({ onPickLocation }) => {

  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPresmission, requestPermission] = useForegroundPermissions();

  const pickedLocation = route.params ? { lat: route.params.pickedLat, lng: route.params.pickedLng } : { lat: 0, lng: 0 };

  useEffect(() => {
    if (!!pickedLocation) {
      setLocation(pickedLocation);
    }
  }, [pickedLocation.lat, pickedLocation.lng]);

  useEffect(() => {
    const handleLocation = async () => {
      const address = await getAddress(location.lat, location.lng);
      onPickLocation(location, address);
    }
    if(location.lat !== 0 && location.lng !== 0) handleLocation();
  }, [location.lat, location.lng]);

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

  if (!!location)
    locationPreview = <Image source={{ uri: getMapPreview(location.lat, location.lng) }}
      style={styles.image} />;

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  }

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
    width: 310,
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
    height: '100%',
    borderRadius: 4
  }
});