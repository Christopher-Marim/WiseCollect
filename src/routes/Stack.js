import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import InventoryItemList from "../screens/InventoryItemList";
import GetProducts from "../screens/GetProducts";
import Login from "../screens/LoginScreen/Login";
import Scanner from "../screens/Scanner";
import Configs from "../screens/SettingsScreen/index";
import Profile from "../screens/Profile";
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
