import React, { useRef, useState, useEffect} from 'react';
import {Button, Text, View, Alert, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../commonStyles';



export default function ProductScanRNCamera (props) {

  const [scanned, setScanned] = useState(false)
  const cameraRef = useRef(null)
  const StatusScan = useSelector(state => state.showModal.showModalADDITEM);

  const dispatch = useDispatch();

  function onBarCodeRead(scanResult) {   

   setScanned(true)
    if (scanResult.data != null) {
    dispatch({type:'SET_BARCODE', payload: [scanResult.data]})
    dispatch({type:'CALLBACK_CONDITION_TRUE', payload: [true]})
    props.navigation.navigate("InventoryItemList")
  
    }
    else{
      Alert.alert( 'Scann não reconhecido', 'Barcode não reconhecido')

    }
    return;
  }
 
    return (
      
      <View style={styles.container}>
        <View style={styles.headerView}>
        <TouchableOpacity
          style={{marginRight:20}}
          onPress={() => props.navigation.goBack()}>
          <View>
            <FontAwesome
              name="chevron-left"
              size={25}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Scanner</Text>
      </View>
        <RNCamera
          ref={cameraRef}
          defaultTouchToFocus
          flashMode={RNCamera.Constants.FlashMode.auto}
          mirrorImage={false}
          onBarCodeRead={scanned ? undefined : onBarCodeRead}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          onGoogleVisionBarcodesDetected={() =>{
            if (StatusScan != true) {
            setScanned(false)}
          }}
          
        />
        
       
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
          />
        </View>
      </View>
    );
  }


const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 9,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  
  headerView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'black',
    alignItems: 'center',
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
};


