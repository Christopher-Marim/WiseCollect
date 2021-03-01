import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import InventoryList from "../screens/InventoryList/InventoryList";
import DrawerContent from '../components/DrawerContent'

const Drawer = createDrawerNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="InventoryList"
        screenOptions={{ headerShown: false }}
        drawerContent={props => <DrawerContent {...props}/>}

      >
        <Drawer.Screen name="InventoryList" component={InventoryList}/>
      </Drawer.Navigator>
    </View>
  );
};
