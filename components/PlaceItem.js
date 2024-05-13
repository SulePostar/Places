import { StyleSheet, Image, Text, Pressable, View } from "react-native";
import { Colors } from "../constants/colors";

const PlaceItem = ({ place, onSelect }) => {
  return (
    <Pressable style={({pressed}) => [styles.container, pressed && styles.pressed]} onPress={() => onSelect(place.id)}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginTop: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.15
  },
  pressed: {
    opacity: 0.9
  },
  info: {
    flex: 2,
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.gray700
  },
  address: {
    fontSize: 14,
    color: Colors.gray700
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 6,
    height: 100
  }
});