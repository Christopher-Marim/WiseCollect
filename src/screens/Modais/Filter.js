import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  InteractionManager,
  Dimensions,
  BackHandler
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import commonStyles from '../../commonStyles';
import getRealm from '../../services/realm';

export default function Filter({callback}) {
  const statusModal = useSelector(
    (state) => state.showModal.showModalFILTERCOLLECT,
  );
  const [textFilter, setTextFilter] = useState('');
  let Visible = 0;

  const dispatch = useDispatch();

  const inputRef = useRef(null);
  if (statusModal == true) {
    setTimeout(() => inputRef.current.focus(), 150);
    Visible = Dimensions.get('window').width;
  }

 
  

  function closeModal() {
    dispatch({type: 'SHOW_MODAL_FILTER_COLLECT_OFF'});
    console.warn('Dale');
  }

  return (
    <View
      style={{
        marginTop: 20,
        flex: 18,
        backgroundColor: 'rgba(0,0,0,0.0)',
        alignItems: 'flex-start',
        position: 'absolute',
        elevation: 1,
        width: Visible,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.container}>
          <TextInput
            placeholder={'Buscar...'}
            ref={inputRef}
            value={textFilter}
            autoFocus={false}
            focusable={false}
            onChangeText={(text) => (setTextFilter(text), callback(text))}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay0: {
    width: '100%',
    flex: 1,
  },
  overlay1: {
    width: '100%',
    flex: 1,
  },
  overlay2: {
    width: '100%',
    flex: 9,
  },
  container: {
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#FFF',
    width: '80%',
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  Button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  TextButton: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 16,
    color: commonStyles.color.mainText,
  },
});
