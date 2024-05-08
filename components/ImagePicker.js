import { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image } from 'react-native';
import Button from './Button';
import { Colors } from '../constants/colors';
import { launchCameraAsync, useCameraPermissions } from 'expo-image-picker';

export default function ImagePicker() {

  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status !== 'undetermined') {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === 'denied') {
      Alert.alert('Permission Denied', 'You need to grant camera permissions to use this feature.');
      return false;
    }
    return true;
  }

  const imageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    setPickedImage(image.assets[0].uri);
    console.log(JSON.stringify(image, null, 2)); //.assets[0].uri
  }

  let imagePreview = <View style={styles.imagePreview}><Text>No image taken yet.</Text></View>;

  if (!!pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.imagePreview} />;
  }

  return (
    <View style={styles.container}>
      <View>
        {imagePreview}
      </View>
      <Button onPress={imageHandler}>Take image</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24
  },
  imagePreview: {
    marginVertical: 8,
    width: 320,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  }
});