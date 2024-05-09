import { useState, useEffect } from "react";
import PlacesList from "../components/PlacesList";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = ({ route }) => {

  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces([...places, route.params.place]);
    }
  }, [isFocused, route.params]);

  return <PlacesList places={places} />
};

export default AllPlaces;