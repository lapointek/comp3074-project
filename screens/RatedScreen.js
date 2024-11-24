import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

const Data = [
  { id: "1", title: "Keg", rated: "5" },
  { id: "2", title: "Thai-One-on", rated: "3" },
  { id: "3", title: "Mcdonalds", rated: "2" },
  { id: "4", title: "Mandarin", rated: "4" },
  { id: "5", title: "Sakura", rated: "5" },
];
const altSearch = {
  Keg: ["BBQ", "Steak", "Diner"],
  Mcdonalds: ["fastfood", "hamburger"],
  JoesBurgers: ["hamburger"],
};
export default function RatedScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleButtonPress = (item) => {
    Alert.alert(`Share Button Pressed on ${item.title}`);
  };

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

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.rating}>Rating: {item.rated}</Text>
      <Button title="Share" onPress={() => handleButtonPress(item)} />
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 10,
  },
  item: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 18,
    margin: 5,
  },
});
