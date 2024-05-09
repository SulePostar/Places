import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/IconButton';

const Map = () => {

  const navigation = useNavigation();

  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 43.86,
    longitude: 18.41,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log(lat, lng);
    setSelectedLocation({ lat, lng });
  }

  const saveLocation = () => {
    if (!selectedLocation) {
      Alert.alert("No location selected", "Please select a location on the map.", [{ text: 'OK' }]);
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="save"
          size={30}
          color="black"
          onPress={saveLocation} />
      )
    });
  }, [navigation, saveLocation]);
   
  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      {!!selectedLocation &&
        <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} />
      }
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});


