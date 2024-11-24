import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

export default function SocialMediaScreen() {
  function showAlert() {
    Alert.alert("Opening Application");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Link Your Social Media Account to Share Your Rated Restaurants!
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Instagram" onPress={showAlert} />
        <Text></Text>
        <Button title="Facebook" onPress={showAlert} />
        <Text></Text>
        <Button title="Twitter" onPress={showAlert} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    margin: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginVertical: 10,
  },
});
