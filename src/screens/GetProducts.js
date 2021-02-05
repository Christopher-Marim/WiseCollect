import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
  BackHandler,
  Dimensions,
  Vibration
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch,useSelector } from "react-redux";

import commonStyles from "../commonStyles";
import getRealm from '../services/realm'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function GetProducts({ navigation }) {
  const [BaseURL, setBaseURL] = useState('');


  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    try {
      console.log("Dale")
      const apiText = await AsyncStorage.getItem('@API')
     
      if(apiText !== null ) {
        setBaseURL(apiText)
      }
    } catch(e) {
      console.error(e)
    }
  }
  const api = axios.create({
    baseURL:`${BaseURL}`,
    headers:{Authorization:'Basic 1332a3be38efc622d2b7529d9f44a1fbae8236cc9f1f0f865af71c08155a'}
})

async function getApi() {
  try {

    let arr= []

    for (let index = 1; index < 1000; index++) {
      let response = await api.get(`/produto/${index}`)
      arr.push(response.data);
      
    }
    
    console.log(arr[756])

    const realm = await getRealm();


    
      Vibration.vibrate(200)
    
    Alert.alert("Lote Recebido", `Lote recebido com sucesso`);
  } catch (error) {
    console.log("deu erro " + error);
    Alert.alert("Recebimento não concluido",`Verificar informações da Api em configurações ou conexão com a internet`)
  }
}
 
  

  const onRefresh = () =>{
    dispatch({type: 'REFRESH', payload:[true]})
        setInterval(() => {
          dispatch({type: 'REFRESH', payload:[false]})
         }, 1000)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>

        <TouchableOpacity style={styles.buttonOpenDrawer} onPress={()=>{navigation.goBack()}}>
            <View>
              <FontAwesome name="chevron-left" size={25} color="white"></FontAwesome>
            </View>
          </TouchableOpacity>
        <Text style={styles.Text}>Baixar Produtos</Text>
           <View></View>
      </View>
      <View style={{flex:8, alignItems:'center',justifyContent:'flex-start'}}>
        <View style={{alignItems:'center', paddingTop:50}}>
        <Text style={styles.TextInformation}>{`Produtos carregados:`}</Text>
        <TouchableOpacity style={styles.Button} onPress={()=>{getApi()}}>
          <Text style={styles.TextButton}>Baixar</Text>
        </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e3e3e3'
  },
  headerView: {
    flex: 1,
    flexDirection:'row',
    paddingHorizontal:20,
    backgroundColor: commonStyles.color.InventoryPrincipal,
    alignItems: "center",
    justifyContent: "space-between",
  },
  Text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
    fontSize: 25,
    color: "white",
  },
  TextInformation:{
    fontFamily: commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
    fontSize: 18,
    marginBottom:25
  },
 
  addButtonCenter: {
    position: "absolute",
    width: Dimensions.get("window").width/1.5,
    height: 50,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.InventoryPrincipal,
  },
  Button:{
    height:50,
    width:100,
    backgroundColor:commonStyles.color.InventoryPrincipal,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  TextButton:{
    fontFamily: commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
    fontSize: 18,
    color:'white',
  }
});
