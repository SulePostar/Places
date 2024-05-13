import { StyleSheet, FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {

  const navigation = useNavigation();

  const handleSelect = (id) => {
    navigation.navigate('PlaceDetails', { placeId: id });
  };

  if (!places || places.length === 0) {
    return <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>No places found.</Text>
      <Text style={styles.fallbackText}>Maybe start adding some!</Text>
    </View>
  }

  return (
    <FlatList
      style={styles.container}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={handleSelect} />} />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  container: {
    margin: 18
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primary50
  }
});