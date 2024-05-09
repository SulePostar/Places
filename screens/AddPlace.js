import PlaceForm from "../components/PlaceForm";

const AddPlace = ({ navigation }) => {

  const createPlace = (place) => {
    navigation.navigate("AllPlaces", { place })
  };

  return <PlaceForm onSave={createPlace} />;
}

export default AddPlace;