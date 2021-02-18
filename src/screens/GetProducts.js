import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Vibration
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import commonStyles from "../commonStyles";
import getRealm from '../services/realm'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader'
import axios from 'axios'

export default function GetProducts({ navigation }) {
  const [BaseURL, setBaseURL] = useState('');
  const [LoaderVisible, setVisible] = useState(false);
  const [LengthProducts, setLengthProducts] = useState(0);


  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    try {
      const realm = await getRealm();
      let dataStorage = realm.objects("StorageProducts");
      setLengthProducts(dataStorage.length)

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

      let response = await api.get(`/produto?limit=1000&order=codProduto`)
    
    console.log(response.data.data[1].codProduto)
    setLengthProducts(1000)

    const realm = await getRealm();

    realm.write(()=>{
      for (let index = 0; index < 1000; index++) {
        
        realm.create("StorageProducts",{
          id: parseInt(response.data.data[index].id,10),
          cod:  response.data.data[index].codProduto.trim() ,
          desc: response.data.data[index].descricaoProduto,
          info1:response.data.data[index].informacao01,
          info2:response.data.data[index].informacao02,
          info3:response.data.data[index].informacao03,
          info4:response.data.data[index].informacao04,
          system_user_id:response.data.data[index].system_user_id,
          system_unit_id:response.data.data[index].system_unit_id,
        },"modified")
        
      }
    })

    
      Vibration.vibrate(200)
      setVisible(false)
    Alert.alert("Lote Recebido", `Lote recebido com sucesso`);
  } catch (error) {
    console.log("deu erro " + error);
    setVisible(false)
    Alert.alert("Recebimento não concluido",`Verificar informações da Api em configurações ou conexão com a internet`)
  }
}
 

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={LoaderVisible}/>
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
        <Text style={styles.TextInformation}>{`Produtos carregados:${LengthProducts}`}</Text>
        <TouchableOpacity style={styles.Button} onPress={()=>{getApi(), setVisible(true)}}>
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
