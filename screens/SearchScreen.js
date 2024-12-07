import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput as PaperInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Data = [
  { id: "1", title: "Keg", rated: null },
  { id: "2", title: "Thai-One-on", rated: null },
  { id: "3", title: "Mcdonalds", rated: null },
  { id: "4", title: "Mandarin", rated: null },
  { id: "5", title: "JoesBurgers", rated: null },
  { id: "6", title: "Port", rated: null },
  { id: "7", title: "Sakura", rated: null },
  { id: "8", title: "PizzaHut", rated: null },
];

const altSearch = {
  Keg: ["BBQ", "Steak", "Diner"],
  Mcdonalds: ["fastfood", "hamburger"],
  JoesBurgers: ["hamburger"],
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const navigation = useNavigation();
  const [data, setData] = useState(Data);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setLocationPermission(true);
      } else {
        Alert.alert("Permission denied", "Location permission is required.");
      }
    })();
  }, []);

  const filterData = data.filter((item) => {
    const normalizedQuery = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      (altSearch[item.title] || []).some((term) =>
        term.toLowerCase().includes(normalizedQuery)
      )
    );
  });

  const handleButtonPress = (title) => {
    setSelectedRestaurant(title);
  };

  const handleRatePress = (item) => {
    setSelectedRestaurant(item.title);
    setModalVisible(true);
  };

  const handleSubmitRating = () => {
    const numericRating = parseInt(rating, 10);
    if (!isNaN(numericRating) && numericRating >= 1 && numericRating <= 5) {
      const newData = data.map((restaurant) => {
        if (restaurant.title === selectedRestaurant) {
          return { ...restaurant, rated: numericRating.toString() };
        }
        return restaurant;
      });
      setData(newData);
      setRating("");
      setModalVisible(false);
      Alert.alert(`Rated ${selectedRestaurant} with ${numericRating} stars!`);
    } else {
      Alert.alert("Invalid rating", "Please enter a number between 1 and 5.");
    }
  };

  const handleDirectionsPress = () => {
    if (location) {
      navigation.navigate("Directions", {
        restaurant: selectedRestaurant,
        location: location.coords,
      });
      setSelectedRestaurant(null);
    } else {
      Alert.alert(
        "Location not available",
        "Unable to fetch your current location."
      );
    }
  };

  const handleViewRated = () => {
    const ratedRestaurants = data.filter(
      (restaurant) => restaurant.rated !== null
    );
    navigation.navigate("RatedScreen", { ratedData: ratedRestaurants });
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Appbar>
          <Appbar.Content title="Search for a Restaurant" />
        </Appbar>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={filterData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.rating}>
                Rating: {item.rated ? item.rated : "Not rated yet"}
              </Text>
              <Button
                title="Details"
                onPress={() => handleButtonPress(item.title)}
              />
              {selectedRestaurant === item.title && (
                <View>
                  <Button
                    title="Get Directions"
                    onPress={handleDirectionsPress}
                  />
                  <Button
                    title="Rate Restaurant"
                    onPress={() => handleRatePress(item)}
                  />
                </View>
              )}
            </View>
          )}
        />
        <Button title="View Rated Restaurants" onPress={handleViewRated} />

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Rate {selectedRestaurant}</Text>
                <PaperInput
                  label="Enter your rating (1-5)"
                  keyboardType="numeric"
                  value={rating}
                  onChangeText={setRating}
                />
                <Button title="Submit" onPress={handleSubmitRating} />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "90%",
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  title: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
});
