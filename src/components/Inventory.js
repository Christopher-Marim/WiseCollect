import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Vibration, Dimensions } from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import {useDispatch } from "react-redux";
import Swipeable from "react-native-gesture-handler/Swipeable";
import commonStyles from "../commonStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


import getRealm from "../services/realm";

export default function Inventory(props) {
  const [borderRadiusCONST, setborderRadius] = useState(10);  
  const [Inventorys, setInventorys] = useState([]);
  const [BaseURL, setBaseURL] = useState('');
  const dispatch = useDispatch();

  const formatteddate = (Inventorys) =>
    moment(Inventorys.dateAt).locale("pt-br").format("D/MM/YYYY");
    
    const getData = async () => {
      try {
        const apiText = await AsyncStorage.getItem('@API')
        
        if(apiText !== null) {
          setBaseURL(apiText)
        }
      } catch(e) {
        // error reading value
      }
    }
    const api = axios.create({
      baseURL:`${BaseURL}`,
      headers:{Authorization:'Basic 1332a3be38efc622d2b7529d9f44a1fbae8236cc9f1f0f865af71c08155a'}
  })

  async function setApi() {
    try {
      const response = await api.get("/ColetaElemento");
      Inventorys.itens.forEach(
        (x) => {
          api.post("/ColetaElemento", {
            ColetaId: x.numberCollect,
            ElementoId: x.element,
            Valor: x.value,
          });
        }
      );
      
        Vibration.vibrate(200)
      console.log(response.data);
      DelInventory()
      Alert.alert("Lote Enviado", `Lote ${props.nome} enviado com sucesso`);
    } catch (error) {
      console.log("deu erro " + error);
      Alert.alert("Post não concluido",`Verificar informações da Api em configurações`)
    }
  }
  async function loadInventorys(){
    const realm = await getRealm();
    let idInventory = props.id;
    let data = realm.objectForPrimaryKey("Inventorys",idInventory)
  setInventorys(data)
}

  useEffect(()=>{
    
    getData()
    

    loadInventorys()

  }, [])

  const getLeftContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          style={styles.left1}
          activeOpacity={0.5}
          onPress={() => {
            setApi();
          }}
        >
          <Icon name="send" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: "SHOW_MODAL_EDTINVENTORY_ON" });
            dispatch({ type: "CURRENT_ID_INVENTORY", payload: [props.id] });
            console.log(props.id)
          }}
          style={styles.left2}
          activeOpacity={0.5}
        >
          <Icon name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  function refresh(){
    dispatch({ type: "REFRESH_INVENTORY", payload: [true] });
    setInterval(() => {
      dispatch({ type: "REFRESH_INVENTORY", payload: [false] });
    }, 1000);
  }
  
  async function DelInventory() {
    const realm = await getRealm();
    let idInventory = props.id;
    let object = realm.objectForPrimaryKey("Inventorys",idInventory)

    realm.write(() => {
      realm.delete(object);
    });
    refresh()
    
  }
  



  const getRightContent = () => {
    return (
      <View style={styles.containerSwipeable}>
        <TouchableOpacity
          onPress={() => {
            DelInventory();
          }}
          style={styles.right}
          activeOpacity={0.5}
        >
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={getLeftContent}
      renderRightActions={getRightContent}
      onSwipeableWillOpen={() => setborderRadius(0)}
      onSwipeableWillClose={() => setborderRadius(10)}
    >
      <View
        style={[
          styles.container,
          {
            borderBottomLeftRadius: borderRadiusCONST,
            borderTopLeftRadius: borderRadiusCONST,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("InventoryItemList");
            dispatch({ type: "CURRENT_ID_INVENTORY", payload: [props.id] });
          }}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <View style={styles.textCollect}>
              <Text style={styles.nomeCollect}>{props.nome}</Text>
              <Text style={{ fontWeight: commonStyles.fontWeight }}>
                Data: {formatteddate(`${props.dateAt}`)}
              </Text>
            </View>
            <View style={{ justifyContent: "center", padding: 8 }}>
              <Text style={{ fontWeight: commonStyles.fontWeight }}>
                Coletas: {props.itens.length}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    elevation: 1,
    borderLeftWidth: 5,
    alignItems: "center",
    flexWrap: "wrap",
    paddingVertical: 10,
    width:Dimensions.get("window").width/2.1,
    borderRadius: 5,
    borderLeftColor: commonStyles.color.InventoryPrincipal,
    backgroundColor: "white",
    
  },
  textCollect: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 10,
  },
  nomeCollect: {
    fontWeight: commonStyles.fontWeight,
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: "space-between",
  },
  left1: {
    backgroundColor: "#194c9e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  left2: {
    backgroundColor: "#4287f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  containerSwipeable: {
    flexDirection: "row",
  },
  right: {
    backgroundColor: "#bf1f1f",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 0,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
