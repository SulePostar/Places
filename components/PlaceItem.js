import { StyleSheet, Image, Text, Pressable, View } from "react-native";
import { Colors } from "../constants/colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable style={styles.container} onPress={onSelect}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <View>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.text}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  },
  title: {
    fontSize: 18,
    color: Colors.primary50
  },
  text: {
    fontSize: 12,
    color: Colors.primary50
  },
  image: {
    width: 90,
    height: 45,
    marginRight: 12
  }
});