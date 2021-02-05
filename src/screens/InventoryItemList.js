import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';
import Item from '../components/InventoryItem';
import EditItem from './Modais Inventory/EditItem';
import AddItem from './Modais/AddItem';
import EllipsisItem from './Modais Inventory/EllipsisItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../services/realm';

export default function ItemList(props) {
  const refresh = useSelector((state) => state.inventorys.refresh);
  const idInventory = useSelector((state) => state.inventorys.currentID);
  const coleta = useSelector((state) => state.barcodes.barcode);

  const [itens, setItens] = useState([]);
  const [auxNome, setAuxNome] = useState('');
  const [qtdProduto, setQtdProduto] = useState('');
  const [codProduto, setCodProduto] = useState(coleta?JSON.stringify(coleta).search(/[{}]/g)==-1?JSON.stringify(coleta):'':'');

  const dispatch = useDispatch(); 

  useEffect(()=>{

    setCodProduto(coleta?JSON.stringify(coleta).search(/[{}]/g)==-1?JSON.stringify(coleta):'':'')
    
  },[coleta])

  // faz o Refresh nos Itens, para atualizar o FlatList
  const onRefresh = () => {
    dispatch({type: 'REFRESH_INVENTORY', payload: [true]});
    setInterval(() => {
      dispatch({type: 'REFRESH_INVENTORY', payload: [false]});
    }, 1000);
  };

  async function addToFlatList(){
    const realm = await getRealm();
      let data = realm.objectForPrimaryKey("Inventorys", idInventory);

      realm.write(() => {
        data.itens.push({
          id: Math.random() * 1000,
          cod: codProduto,
          qtd: qtdProduto,
          desc: codProduto,
          value: "",
          info1:"",
          info2:"",
          info3:""
        });
        dispatch({ type: "REFRESH_INVENTORY", payload: [true] });
        setInterval(() => {
          dispatch({ type: "REFRESH_INVENTORY", payload: [false] });
        }, 1000);
      });

  }

  useEffect(() => {
    async function loadItens() {
      const realm = await getRealm();

      let data = realm.objectForPrimaryKey('Inventorys', idInventory);

      setAuxNome(data.nome);
      setItens(data.itens);
    }
    loadItens();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <EditItem />
      <EllipsisItem navigation={props.navigation} />
      <AddItem navigation={props.navigation} />

      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.buttonGoBack}
          onPress={() => props.navigation.goBack()}>
          <View>
            <FontAwesome
              name="chevron-left"
              size={25}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{auxNome}</Text>

        <TouchableOpacity
          style={styles.buttonOpenEllipsis}
          onPress={() => {
            dispatch({type: 'SHOW_MODAL_ELLIPSIS_ON'});
          }}>
          <View>
            <FontAwesome
              name="ellipsis-v"
              size={25}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
      </View>

      {/*--------------ColetaManual--------------*/}

      <View style={styles.containerAdd}>
        <View style={{paddingHorizontal: 5, justifyContent: 'center'}}>
          <Text style={styles.textBusca}>Qtd</Text>
          <TextInput
            placeholder={'QTD'}
            style={styles.textInputQtd}
            onChangeText={(text) => {
              setQtdProduto(text);
            }}
            value={qtdProduto}
          />
        </View>
        <View>
          <Text style={styles.textBusca}>Código do produto</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder={'Código do produto'}
              style={styles.textInputCod}
              onChangeText={(text) => {
                setCodProduto(text);
              }}
              value={codProduto}
            />
            {qtdProduto.length > 0 && codProduto.length > 0 && (
              <TouchableOpacity onPress={()=>{addToFlatList()}}> 
                <View
                  style={{
                    backgroundColor: commonStyles.color.InventoryPrincipal,
                    borderRadius: 22,
                    height: 45,
                    width: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 50, paddingBottom: 5, color: 'white'}}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {(qtdProduto.length == 0 || codProduto.length == 0) && (
              <TouchableOpacity onPress={()=>{props.navigation.navigate("Scanner"), dispatch({ type: "SET_BARCODE", payload: [{}] });
            }}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={45}
                  color={commonStyles.color.InventoryPrincipal}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {itens.length > 0 && (
        <View style={{flex: 9}}>
          <View style={{flex: 1}}>
            <View style={styles.itemList}>
              <FlatList
                data={itens}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item}) => (
                  <View style={{padding: 3}}>
                    <Item
                      id={item.id}
                      cod={item.cod}
                      qtd={item.qtd}
                      desc={item.desc}></Item>
                  </View>
                )}
                refreshControl={
                  <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
                }
              />
             
            </View>
          </View>
        </View>
      )}
      {itens.length == 0 && (
        <View style={{flex: 9, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
            
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: commonStyles.color.InventoryPrincipal,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    borderBottomColor: '#FFF',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonGoBack: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOpenEllipsis: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.color.InventoryPrincipal,
  },
  addButtonCenter: {
    position: 'absolute',
    width: 200,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.color.InventoryPrincipal,
  },
  textButton: {
    fontSize: 20,
    fontWeight: commonStyles.fontWeight,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.color.secondary,
  },
  textBusca: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
  },
  textInputQtd: {
    backgroundColor: 'white',
    width: 50,
    borderRadius: 5,
  },
  textInputCod: {
    borderRadius: 5,
    backgroundColor: 'white',
    width: Dimensions.get('window').width / 1.5,
    marginRight: 15,
  },
  containerAdd: {
    backgroundColor: '#cdc8cf',
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
