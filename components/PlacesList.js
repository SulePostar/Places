import { StyleSheet, FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../constants/colors";

const PlacesList = ({ places }) => {

  if (!places || places.length === 0) {
    return <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>No places found.</Text>
      <Text style={styles.fallbackText}>Maybe start adding some!</Text>
    </View>
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />} />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
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