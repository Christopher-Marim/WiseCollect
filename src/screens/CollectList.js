import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
  BackHandler
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch,useSelector } from "react-redux";
import Modal from "./Modais/AddCollect";
import Filter from "./Modais/Filter";
import {useRoute, useFocusEffect} from '@react-navigation/native';


import commonStyles from "../commonStyles";
import Collect from "../components/Collect";
import EditCollect from "../screens/Modais/EditCollect";
import getRealm from '../services/realm'

export default function CollectList({ navigation }) {
  const refresh = useSelector((state) => state.collects.refresh);
  const statusModal = useSelector(
    (state) => state.showModal.showModalFILTERCOLLECT,
  );

  const dispatch = useDispatch();

  const [collects, setCollects] = useState([]);

  function callBackFilter(textFilter){
    loadCollects(textFilter)
    onRefresh()
  }

  async function loadCollects(textFilter=''){
    const realm = await getRealm();
 
    const data = realm.objects('Collects').sorted('dateAt').filtered(`nome CONTAINS[c] "${textFilter}" `)
    
  setCollects(data)
}


  useEffect(()=>{
    loadCollects()
   
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, [])
  
  const route = useRoute();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'CollectList') {
          return true;
        } else {
          return false;
        }
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route])      
  )
  

  const onRefresh = () =>{
    dispatch({type: 'REFRESH', payload:[true]})
        setInterval(() => {
          dispatch({type: 'REFRESH', payload:[false]})
         }, 1000)
  }

  return (
    <SafeAreaView style={styles.container}>

<Modal/>

      
      <EditCollect/>
      <View style={styles.headerView}>
      <Filter callback={callBackFilter} />

        <TouchableOpacity style={styles.buttonOpenDrawer} onPress={()=>{navigation.openDrawer()}}>
            <View>
              <FontAwesome name="bars" size={25} color="white"></FontAwesome>
            </View>
          </TouchableOpacity>
        <Text style={styles.Text}>Unax</Text>

          <TouchableOpacity style={styles.buttonFilter}
              onPress={() => { 
                if (statusModal==true) {
                  dispatch({ type: "SHOW_MODAL_FILTER_COLLECT_OFF" });
                }
                else{

                  dispatch({ type: "SHOW_MODAL_FILTER_COLLECT_ON" });}}
                }
            >
              <View>
                <FontAwesome name="search" size={25} color="white"></FontAwesome>
              </View>
            </TouchableOpacity>
           
      </View>
      {collects.length > 0 && (
        <View style={{ flex: 8 }}>
          <View style={styles.collectList}>
            <FlatList
              data={collects}
              numColumns={2}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <View style={{ padding: 3, }}>
                  
                  <Collect id ={item.id} dateAt={item.dateAt} nome={item.nome} itens={item.itens} navigation={navigation}></Collect>
                  

                </View>

              )}
              refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch({ type: "SHOW_MODAL_ADDCOLLECT_ON" })}
            activeOpacity={0.7}
          >
            <FontAwesome name="plus" size={20} color={commonStyles.color.secondary} />
          </TouchableOpacity>
        </View>
      )}
      {collects.length == 0 && (
        <View
          style={{ flex: 9, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({ type: "SHOW_MODAL_ADDCOLLECT_ON" })}
            activeOpacity={0.7}
          >
            <Text style={styles.Text}>Nova Coleta</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: commonStyles.color.principal,
    alignItems: "center",
    justifyContent: "space-between",
  },
  collectList: {
    padding: 5,
  },
  Text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
    fontSize: 25,
    color: "white",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
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
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyles.color.principal,
  },
  buttonOpenDrawer: {
    padding:10,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonFilter: {

    padding:10,
    alignItems: "center",
    justifyContent: "center",
  },
 
  
});
