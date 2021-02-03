import React, { useRef, useState} from 'react';
import {Button, Text, View, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';

import AddItem from './Modais/AddItem'


export default function ProductScanRNCamera (props) {

  const [barcodeCodes, setBarcode] = useState('')
  const [scanned, setScanned] = useState(false)
  const cameraRef = useRef(null)
  const StatusScan = useSelector(state => state.showModal.showModalADDITEM);

  const dispatch = useDispatch();

  function onBarCodeRead(scanResult) {
    console.warn(scanResult.data);
   setScanned(true)
    if (scanResult.data != null) {
    setBarcode(scanResult.data)
    dispatch({type:'SET_BARCODE', payload: [JSON.parse(scanResult.data)]})
    dispatch({type:'CALLBACK_CONDITION_TRUE', payload: [true]})
      dispatch({type:'SHOW_MODAL_ADDITEM_ON'})
    
  
    }
    else{
      Alert.alert( 'Scann não reconhecido', 'Barcode não reconhecido')

    }
    return;
  }
 
    return (
      
      <View style={styles.container}>
        <AddItem navigation={props.navigation}/>
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
        
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
        </View>
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
    flex: 1,
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
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

