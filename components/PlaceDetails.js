import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, Text, View, Alert } from 'react-native';
import Button from './Button';
import { Colors } from '../constants/colors';
import { fetchPlaceDetails, removePlace } from '../util/database';
import IconButton from './IconButton';

const PlaceDetails = ({ route, navigation }) => {

  const [place, setPlace] = useState({});
  const placeId = route.params.placeId;

  useEffect(() => {
    fetchPlaceDetails(placeId)
      .then(data => setPlace(data.rows._array[0]))
      .catch(err => console.log(err));
  }, [placeId]);

  const showOnMap = () => {
    navigation.navigate("Map", { lat: place.lat, lng: place.lng });
  };

  const deletePlace = () => {
    removePlace(place.id);
    navigation.navigate("AllPlaces");
  }

  const onRemove = () => {
    Alert.alert("Delete place", "Are you sure you want to delete this place?", [
      { text: "Cancel" },
      { text: "Delete", onPress: () => deletePlace() }
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{place.title}</Text>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <Text style={styles.address}>{place.address}</Text>
      <View style={styles.buttons}>
        <Button onPress={showOnMap}>View on Map</Button>
        <IconButton icon="trash" size={30} color="red" onPress={onRemove} />
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray700,
    padding: 24
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: Colors.primary50,
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary50,
    textAlign: 'center',
    fontSize: 24
  },
  address: {
    color: Colors.primary50,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20
  }
});