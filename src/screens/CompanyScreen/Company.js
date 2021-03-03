import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import getRealm from '../../services/realm';
import commonStyles from '../../commonStyles';

import PickerCompany from '../../components/Modal/ModalEmpresas/ModalEmpresas';
import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from './styles';

export default function Company(props) {
  const [UserName, setUserName] = useState();
  const [UserSystemUserId, setUserSystemUserId] = useState();
  const [UserId, setUserId] = useState();
  const [borderColor, setBorderColer] = useState(commonStyles.color.principal);
  const [PickerVisible, setPickerVisible] = useState(false);
  const [Empresa, setEmpresa] = useState('');
  const [EmpresaId, setEmpresaId] = useState('')
  const [EmpresaURL, setEmpresaUrl] = useState('')

  function callbackPicker(statusPicker, empresa,IdEmpresa,UrlEmpresa ) {
    setPickerVisible(statusPicker);
    setEmpresa(empresa?empresa:Empresa);
    setBorderColer('blue');

    setEmpresaId(IdEmpresa)
    setEmpresaUrl(UrlEmpresa)
  }

  async function changeEmpresa(IdEmpresa){
    const realm = await getRealm()
    realm.write(()=>{
      realm.create('User',{
        id:UserId,
        system_unit_id:parseInt(IdEmpresa)
      },'modified')
    })
  }

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const realm = await getRealm();
    const userAux = realm.objects('User');
    setUserId(userAux[0].id)
    setUserName(userAux[0].nome);
    setUserSystemUserId(userAux[0].system_user_id);
  }

  function ActionButtonProsseguir() {
    if(Empresa.length==0){
      Alert.alert("Empresa não selecionada","Seleciona sua empresa antes de prosseguir.")
    }
    else{
      changeEmpresa(EmpresaId)
      SetEmpresaAsyncStorage()
      props.navigation.replace('InventoryList')
    }
    
  }

  async function SetEmpresaAsyncStorage() {
    try {
      await AsyncStorage.setItem('@Empresa', Empresa)
      console.log(EmpresaURL)
      await AsyncStorage.setItem('@API', `${EmpresaURL}`)
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <PickerCompany visible={PickerVisible} callback={callbackPicker} userId={UserSystemUserId} />
      <View style={styles.container1}>
        <View style={styles.decorationTop}></View>

        <View style={styles.container1Texts}>
          <Text style={styles.textETM}>{UserName}</Text>
          <Text style={styles.subtextETM}>
            Informe a baixo a empresa ou departamento para dar prosseguimento
          </Text>
        </View>
        <View style={styles.decorationBotton}></View>
      </View>
      <View style={styles.container2}>
        <View style={{paddingHorizontal: 40, alignItems: 'center'}}>
          <Text style={styles.subtext}>Qual sua empresa?</Text>
          <TouchableOpacity
            style={[styles.picker, {borderColor: borderColor}]}
            onPress={() => {
              setPickerVisible(true);
            }}>
            <Text style={styles.textEmpresa}>{Empresa}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{ActionButtonProsseguir()}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginHorizontal: 30,
                justifyContent: 'center',
                fontWeight:'bold'
              }}>
              Prosseguir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
