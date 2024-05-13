import { useState, useEffect } from "react";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }) => {

  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchPlaces()
        .then(data => { setPlaces(data.rows._array); })
        .catch(err => console.log(err));
    }
  }, [isFocused]);

  return <PlacesList places={places} />
};

export default AllPlaces;