import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import commonStyles from "../commonStyles";
import Item from "../components/Item";
import EditItem from "./Modais/EditItem";
import AddItem from "./Modais/AddItem";
import EllipsisItem from './Modais/EllipsisItem'

import getRealm from "../services/realm";


export default function ItemList(props) {
  const refresh = useSelector((state) => state.collects.refresh);
  const idCollect = useSelector((state) => state.collects.currentID);

  const [itens, setItens] = useState([]);
  const [auxNome, setAuxNome] = useState("");
  
  const dispatch = useDispatch();

  // faz o Refresh nos Itens, para atualizar o FlatList
  const onRefresh = () => {
    dispatch({ type: "REFRESH", payload: [true] });
    setInterval(() => {
      dispatch({ type: "REFRESH", payload: [false] });
    }, 1000);
  };


  useEffect(()=>{
    async function loadItens(){
        const realm = await getRealm();
     
        let data = realm.objectForPrimaryKey('Collects', idCollect)
        
        setAuxNome(data.nome)
      setItens(data.itens)

    }
    loadItens()

  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <EditItem />
      <EllipsisItem/>
      <AddItem navigation={props.navigation} />
     
      <View style={styles.headerView}>
        
          <TouchableOpacity style={styles.buttonGoBack} onPress={() => props.navigation.goBack()}>
            <View>
              <FontAwesome name="chevron-left" size={25} color="white"></FontAwesome>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>{auxNome}</Text>
        
            <TouchableOpacity style={styles.buttonOpenEllipsis}
              onPress={() => {dispatch({type:'SHOW_MODAL_ELLIPSIS_ON'})}}
            >
              <View>
                <FontAwesome name="ellipsis-v" size={25} color="white"></FontAwesome>
              </View>
            </TouchableOpacity>
    
      </View>
      {itens.length > 0 && (
        <View style={{ flex: 9 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.itemList}>
              
              <FlatList
                data={itens}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                  <View style={{ padding: 3 }}>
                    <Item id={item.id} numberCollect={item.numberCollect} numberEquipament={item.numberEquipament} element={item.element} value={item.value}></Item>
                  </View>
                )}
                refreshControl={
                  <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
              />
              <TouchableOpacity
              style={styles.addButton}
              onPress={() => dispatch({ type: "SHOW_MODAL_ADDITEM_ON" })
            }
              activeOpacity={0.7}
            >
              <Text style={{fontSize:45, color:'white', marginBottom:5}}>+</Text>
            </TouchableOpacity>
            </View>
            
          </View>
        </View>
      )}
      {itens.length == 0 && (
        <View
          style={{ flex: 9, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ flex: 8, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={styles.addButtonCenter}
              onPress={() => dispatch({ type: "SHOW_MODAL_ADDITEM_ON" })
            }
              activeOpacity={0.7}
            >
              <Text style={styles.textButton}>Coletar</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flex: 1,
    flexDirection:'row',
    paddingHorizontal:20,
    backgroundColor: commonStyles.color.principal,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemList: {
    flex: 8,
    padding: 5,
  },
  text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 25,
    color: commonStyles.color.secondary,
    borderBottomWidth: 2,
    borderBottomColor: "#FFF",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonGoBack: {
    padding:10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenEllipsis: {
    padding:10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.principal,
  },
  addButtonCenter: {
    position: "absolute",
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.principal,
  },
  textButton: {
    fontSize: 20,
    fontWeight: commonStyles.fontWeight,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.secondary,
  },

});
