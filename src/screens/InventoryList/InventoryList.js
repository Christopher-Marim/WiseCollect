import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../Modais Inventory/AddInventory';
import Filter from '../Modais Inventory/FilterInventory';

import commonStyles from '../../commonStyles';
import Inventory from '../../components/Inventory';
import EditInventory from '../Modais Inventory/EditInventory';
import getRealm from '../../services/realm';
import styles from './styles'

export default function InventoryList({navigation}) {
  const refresh = useSelector((state) => state.inventorys.refresh);
  const statusModal = useSelector(
    (state) => state.showModal.showModalFILTERINVENTORY,
  );

  const [condition, setCondition] = useState(false);
  const dispatch = useDispatch();

  const [Inventorys, setInventorys] = useState([]);

  function callBackFilter(textFilter) {
    loadInventorys(textFilter);
    onRefresh();
  }

  async function loadInventorys(textFilter = '') {
    const realm = await getRealm();

    const data = realm
      .objects('Inventorys')
      .sorted('dateAt')
      .filtered(`nome CONTAINS[c] "${textFilter}" `);

    setInventorys(data);
  }

  useEffect(() => {
    loadInventorys();
  }, []);

  const onRefresh = () => {
    dispatch({type: 'REFRESH', payload: [true]});
    setInterval(() => {
      dispatch({type: 'REFRESH', payload: [false]});
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal />

      <EditInventory />
      <View style={styles.headerView}>
        <Filter callback={callBackFilter} />

        <TouchableOpacity
          style={styles.buttonOpenDrawer}
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View>
            <FontAwesome name="bars" size={25} color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.Text}>Inventory</Text>

        <TouchableOpacity
          style={styles.buttonFilter}
          onPress={() => {
            if (statusModal == true) {
              dispatch({type: 'SHOW_MODAL_FILTER_INVENTORY_OFF'});
            } else {
              dispatch({type: 'SHOW_MODAL_FILTER_INVENTORY_ON'});
            }
          }}>
          <View>
            <FontAwesome name="search" size={25} color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
      </View>
      {Inventorys.length > 0 && (
        <View style={{flex: 8}}>
          <View style={styles.collectList}>
            <FlatList
              data={Inventorys}
              numColumns={2}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({item}) => (
                <View style={{padding: 3}}>
                  <Inventory
                    id={item.id}
                    dateAt={item.dateAt}
                    nome={item.nome}
                    itens={item.itens}
                    check={item.check ? item.check : false}
                    idGet={item.idGet ? item.idGet : 0}
                    qtdItens={item.qtdItens ? item.qtdItens : 0}
                    navigation={navigation}></Inventory>
                </View>
              )}
              refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
              }
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <FontAwesome
              name="plus"
              size={20}
              color={commonStyles.color.secondary}
            />
          </TouchableOpacity>
        </View>
      )}
      {Inventorys.length == 0 && (
        <View style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.addButtonCenter}
            onPress={() => dispatch({type: 'SHOW_MODAL_ADDINVENTORY_ON'})}
            activeOpacity={0.7}>
            <Text style={styles.Text}>Novo Inventário</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

