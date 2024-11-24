import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";

const Data = [
  { id: "1", title: "Keg" },
  { id: "2", title: "Thai-One-on" },
  { id: "3", title: "Mcdonalds" },
  { id: "4", title: "Mandarin" },
  { id: "5", title: "JoesBurgers" },
  { id: "6", title: "Port" },
  { id: "7", title: "Sakura" },
  { id: "8", title: "PizzaHut" },
];

const altSearch = {
  Keg: ["BBQ", "Steak", "Diner"],
  Mcdonalds: ["fastfood", "hamburger"],
  JoesBurgers: ["hamburger"],
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = Data.filter((item) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const itemTitle = item.title.toLowerCase();

    if (itemTitle.includes(normalizedQuery)) {
      return true;
    }
    const alternatives = altSearch[item.title] || [];
    return alternatives.some((term) =>
      term.toLowerCase().includes(normalizedQuery)
    );
  });

  const handleButtonPress = (title) => {
    Alert.alert(`Showing Details for ${title}`);
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
              <Button
                style={styles.button}
                title="Details"
                onPress={() => handleButtonPress(item.title)}
              />
            </View>
          )}
        />
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
});
