import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { Appbar } from "react-native-paper";

const RatedScreen = ({ route, navigation }) => {
  const { ratedData } = route.params ?? {};

  if (!ratedData || ratedData.length === 0) {
    return (
      <View style={styles.container}>
        <Appbar>
          <Appbar.Content title="Rated Restaurants" />
        </Appbar>
        <View style={styles.noRatingsContainer}>
          <Text>No rated restaurants found.</Text>
          <Button
            title="Go back to Search"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar>
        <Appbar.Content title="Rated Restaurants" />
      </Appbar>

      <FlatList
        data={ratedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Rating: {item.rated} stars</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noRatingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default RatedScreen;
