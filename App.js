import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "./screens/MapScreen";
import SearchScreen from "./screens/SearchScreen";
import RatedScreen from "./screens/RatedScreen";
import SocialMediaScreen from "./screens/SocialMediaScreen";
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Search">
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Rated Restaurants" component={RatedScreen} />
        <Tab.Screen name="Directions" component={MapScreen} />
        <Tab.Screen name="Social" component={SocialMediaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
