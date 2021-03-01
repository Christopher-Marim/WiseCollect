import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import InventoryItemList from "../screens/ItemList/InventoryItemList";
import GetProducts from "../screens/GetProducts/GetProducts";
import Login from "../screens/LoginScreen/Login";
import Scanner from "../screens/ScannerScreen/Scanner";
import Configs from "../screens/SettingsScreen/index";
import Profile from "../screens/ProfileScreen/Profile";
import Drawer from './Drawer'

const Stack = createStackNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="InventoryList" component={Drawer} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Configs" component={Configs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="InventoryItemList" component={InventoryItemList} />
        <Stack.Screen name="GetProducts" component={GetProducts} />
      </Stack.Navigator>
    </View>
  );
};
