import PlaceForm from "../components/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {

  const createPlace = (place) => {
    insertPlace(place);
    navigation.navigate("AllPlaces", { place })
  };

  return <PlaceForm onSave={createPlace} />;
}

export default AddPlace;