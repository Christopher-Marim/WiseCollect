import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import getRealm from '../../services/realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import axios from 'axios';
import {ProgressBar, Colors} from 'react-native-paper';

import styles from './styles';

export default function GetProducts({navigation}) {
  const [BaseURL, setBaseURL] = useState('');
  const [SystemUnitId, setSystemUnitId] = useState('');
  const [LoaderVisible, setVisible] = useState(false);
  const [LengthProducts, setLengthProducts] = useState(0);
  let Offset = 0;

  useEffect(() => {
    getParmsAPI();
    getSystemUnitId();
  }, []);

  const getParmsAPI = async () => {
    try {
      const realm = await getRealm();
      let dataStorage = realm.objects('StorageProducts');
      setLengthProducts(dataStorage.length);

      const apiText = await AsyncStorage.getItem('@API');

      if (apiText !== null) {
        setBaseURL(apiText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  async function getSystemUnitId() {
    const realm = await getRealm();
    const store = realm.objects('User');
    console.log('store: ' + store[0].system_unit_id);
    setSystemUnitId(store[0].system_unit_id);
  }

  const api = axios.create({
    baseURL: `${BaseURL}`,
    headers: {
      Authorization:
        'Basic 1332a3be38efc622d2b7529d9f44a1fbae8236cc9f1f0f865af71c08155a',
    },
  });

  async function saveProductsStorage(response) {
    try {
      const realm = await getRealm();
      let dataStorageProducts = realm.objects('StorageProducts');
      setLengthProducts(dataStorageProducts.length);

      realm.write(() => {
        response.data.data.forEach((element) => {
          realm.create(
            'StorageProducts',
            {
              id: parseInt(element.id, 10),
              cod: element.codProduto.trim(),
              desc: element.descricaoProduto,
              info1: element.informacao01,
              info2: element.informacao02,
              info3: element.informacao03,
              info4: element.informacao04,
              system_user_id: element.system_user_id,
              system_unit_id: element.system_unit_id,
            },
            'modified',
          );
        });
      });
    } catch (error) {
      console.error(error);
      setVisible(false);
    }
  }

  async function getProductsAPI() {
    try {
      Offset = 0;
      console.log('UNIT ID: ' + SystemUnitId);
      let response = await api.get(
        `/produto?limit=1000&offset=${Offset}&method=loadAll&systemunitid=${SystemUnitId}`,
      );
      let resultado = response.data.data;

      while (resultado.length != 0) {
        saveProductsStorage(response);
        Offset += 1000;
        response = await api
          .get(
            `/produto?limit=1000&offset=${Offset}&method=loadAll&systemunitid=${SystemUnitId}`,
          )
          .finally(() => {
            setVisible(false);
          });
      }
      setVisible(false);
    } catch (error) {
      console.log('deu erro ' + error);
      setVisible(false);
      Alert.alert(
        'Recebimento não concluido',
        `Verificar informações da Api em configurações ou conexão com a internet`,
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={LoaderVisible} />
      <View style={styles.headerView}>
        <TouchableOpacity
          style={styles.buttonOpenDrawer}
          onPress={() => {
            navigation.goBack();
          }}>
          <View>
            <FontAwesome
              name="chevron-left"
              size={25}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.Text}>Baixar Produtos</Text>
        <View></View>
      </View>
      <View
        style={{flex: 8, alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={{alignItems: 'center', paddingTop: 50}}>
          <Text
            style={
              styles.TextInformation
            }>{`Produtos carregados:${LengthProducts}`}</Text>
          <View style={{paddingVertical: 5}}>
            <ProgressBar
              progress={1}
              color={'green'}
              style={{height: 10, width: 200, borderRadius: 5}}
            />
          </View>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              getProductsAPI(), setVisible(true);
            }}>
            <Text style={styles.TextButton}>Baixar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
