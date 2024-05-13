import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllPlaces from './screens/AllPlaces';
import PlaceDetails from './components/PlaceDetails';
import AddPlace from './screens/AddPlace';
import IconButton from './components/IconButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database';
import Spinner from './components/Spinner';

const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    setDbInitialized(init());
    // init().then(() => setDbInitialized(true));
  }, []);

  if (!dbInitialized) { return <Spinner />; }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Favorite Places',
              headerRight: () => (
                <IconButton
                  icon="add"
                  size={30}
                  color="black"
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace}
            options={{
              title: 'Add a new Place'
            }} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
