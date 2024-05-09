import { Colors } from "../constants/colors";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={ ({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    padding: 8,
    backgroundColor: Colors.primary500,
    borderRadius: 5,
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  flatText: {
    color: Colors.primary200
  },
  pressed: {
    opacity: 0.75,
    borderRadius: 5,
    backgroundColor: Colors.primary100
  }
});