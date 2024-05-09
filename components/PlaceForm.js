import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { Colors } from "../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "./Button";
import { Place } from "../models/place";

const PlaceForm = ({ onSave }) => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');

  const changeTitleHandler = (text) => {
    setTitle(text);
  }

  const savePlace = () => {
    const place = new Place(title, image, address, location);
    onSave(place);
  }

  const takeImageHandler = (imageUri) => setImage(imageUri);

  const pickLocationHandler = (location, address) => {
    setLocation(location);
    setAddress(address);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={changeTitleHandler} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler}/>
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlace}>ADD PLACE</Button>
    </ScrollView>
  )
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
});