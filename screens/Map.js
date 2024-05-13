// import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/IconButton';

const Map = ({navigation, route}) => {

  const initialLocation = route.params ? {
    lat: route.params.lat,
    lng: route.params.lng
  } : null;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 43.86,
    longitude: initialLocation ? initialLocation.lng : 18.41,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if(initialLocation) return; // If initial location is set, don't allow selecting new location
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
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
    if(initialLocation) return;
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


