import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CollectList from "../screens/CollectList";
import InventoryList from "../screens/InventoryList";
import DrawerContent from '../components/DrawerContent'

const Drawer = createDrawerNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        initialRouteName="CollectList"
        screenOptions={{ headerShown: false }}
        drawerContent={props => <DrawerContent {...props}/>}

      >
        <Drawer.Screen name="CollectList" component={CollectList}/>
        <Drawer.Screen name="InventoryList" component={InventoryList}/>
      </Drawer.Navigator>
    </View>
  );
};
