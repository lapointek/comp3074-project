import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/map.png")}
        style={styles.mapImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
