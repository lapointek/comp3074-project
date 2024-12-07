import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const restaurantCoordinates = {
  Keg: { latitude: 51.0447, longitude: -114.0719 },
  Mcdonalds: { latitude: 51.045, longitude: -114.059 },
};

const MapScreen = ({ route }) => {
  const { restaurant, location } = route.params;
  const restaurantLocation = restaurantCoordinates[restaurant];
  const initialRegion = restaurantLocation
    ? {
        latitude: restaurantLocation.latitude,
        longitude: restaurantLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {restaurantLocation && (
          <Marker
            coordinate={restaurantLocation}
            title={restaurant}
            description="Restaurant Location"
            pinColor="red"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
