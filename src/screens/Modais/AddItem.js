import React, { useRef, useEffect } from "react";
import { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "../../commonStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CheckBox from "@react-native-community/checkbox";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import getRealm from "../../services/realm";

export default function AddList({ navigation }) {
  const [NumberCollectText, setNumberCollectText] = useState("");
  const [CheckBoxCollect, setCheckBoxCollect] = useState(false);
  const [CheckBoxEquipament, setCheckBoxEquipament] = useState(false);
  const [CheckBoxElement, setCheckBoxElement] = useState(false);
  const [NumberEquipamentText, setNumberEquipamentText] = useState("");
  const [Element, setElement] = useState("");
  const [Value, setValue] = useState("");

  const statusModal = useSelector((state) => state.showModal.showModalADDITEM);
  const idCollect = useSelector((state) => state.collects.currentID);
  const coleta = useSelector((state) => state.barcodes.barcode);
  const Condition = useSelector((state) => state.barcodes.callback);

  const dispatch = useDispatch();
  useEffect(()=>{

    if (coleta != undefined && Condition == true&&navigation.isFocused()) {
      if (coleta.numberCollect) {
        if (
          (NumberCollectText.length == 0 ||
            NumberCollectText != coleta.numberCollect) &&
          CheckBoxCollect == false
        ) {
          setNumberCollectText(coleta.numberCollect);
        }
      }
  
      if (coleta.numberEquipament) {
        if (
          (NumberEquipamentText.length == 0 ||
            NumberEquipamentText != coleta.numberEquipament) &&
          CheckBoxEquipament == false
        ) {
          setNumberEquipamentText(coleta.numberEquipament);
        }
      }
  
      if (coleta.element) {
        if (
          (Element.length == 0 || Element != coleta.element) &&
          CheckBoxElement == false
        ) {
          setElement(coleta.element);
        }
      }
  
      dispatch({ type: "CALLBACK_CONDITION_FALSE", payload: [false] });
    }
  },[Condition])

  const ref_input2 = useRef();

  async function addItem() {
    if (
      !NumberCollectText ||
      !NumberCollectText.trim() ||
      !NumberEquipamentText ||
      !NumberEquipamentText.trim() ||
      !Element ||
      !Element.trim() ||
      !Value ||
      !Value.trim()
    ) {
      Alert.alert("Dados Inválidos", "Verifique se todas os campos foram devidamente preenchidos.");
    } else {
      const realm = await getRealm();
      let data = realm.objectForPrimaryKey("Collects", idCollect);

      realm.write(() => {
        data.itens.push({
          id: Math.random() * 1000,
          numberCollect: NumberCollectText,
          numberEquipament: NumberEquipamentText,
          element: Element,
          value: Value,
        });
        dispatch({ type: "REFRESH", payload: [true] });
        setInterval(() => {
          dispatch({ type: "REFRESH", payload: [false] });
        }, 1000);
      });

      clearInput();
      dispatch({ type: "REFRESH", payload: [true] });
      setInterval(() => {
        dispatch({ type: "REFRESH", payload: [false] });
      }, 1000);
    }
  }
  
  function clearInput() {
    if (CheckBoxCollect == false) {
      setNumberCollectText("");
    }

    if (CheckBoxEquipament == false) {
      setNumberEquipamentText("");
    }
    if (CheckBoxElement == false) {
      setElement("");
    }
    setValue();
  }
  function closeModal() {
    dispatch({ type: "SHOW_MODAL_ADDITEM_OFF" });
    dispatch({ type: "SET_BARCODE", payload: [{}] });

    clearInput();
    navigation.navigate("ItemList");
  }

  return (
    <Modal
      transparent={true}
      visible={statusModal}
      onRequestClose={closeModal}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <KeyboardAwareScrollView style={styles.container}>
          <Text style={styles.headerModal}>Coletas</Text>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.text}>Número da Coleta</Text>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  value={CheckBoxCollect}
                  onValueChange={(value) => setCheckBoxCollect(value)}
                ></CheckBox>
                <Text style={styles.checkBoxText}>Manter Valor</Text>
              </View>
            </View>
            <TextInput
              style={styles.input}
              ref={ref_input2}
              placeholder="Collect Number"
              onChangeText={(text) => setNumberCollectText(text)}
              value={NumberCollectText}
              keyboardType="number-pad"
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.text}>Número do Equipamento</Text>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  value={CheckBoxEquipament}
                  onValueChange={(value) => setCheckBoxEquipament(value)}
                ></CheckBox>
                <Text style={styles.checkBoxText}>Manter Valor</Text>
              </View>
            </View>

            <TextInput
              style={styles.input}
              ref={ref_input2}
              placeholder="Equipament Number"
              onChangeText={(text) => setNumberEquipamentText(text)}
              value={NumberEquipamentText}
              keyboardType="default"
            />
          </View>

          <View style={styles.buttonOpenScanner}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Scanner"), clearInput();
                dispatch({ type: "SET_BARCODE", payload: [{}] });

                dispatch({ type: "SHOW_MODAL_ADDITEM_OFF" });
              }}
            >
              <View>
                <FontAwesome name="qrcode" size={45} color="white"></FontAwesome>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.text}>Elemento</Text>
              <View
                style={{
                  paddingTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <CheckBox
                  value={CheckBoxElement}
                  onValueChange={(value) => setCheckBoxElement(value)}
                ></CheckBox>
                <Text style={styles.checkBoxText}>Manter Valor</Text>
              </View>
            </View>

            <TextInput
              style={styles.input}
              ref={ref_input2}
              placeholder="Element"
              onChangeText={(text) => setElement(text)}
              value={Element}
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={[styles.text, { paddingLeft: 20 }]}>Valor</Text>
            <TextInput
              style={styles.input}
              ref={ref_input2}
              placeholder="Value"
              onChangeText={(text) => setValue(text)}
              value={Value}
              keyboardType="default"
            />
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.button}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addItem}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </View>
    

    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    flex: 4,
  },
  container: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    width: "95%",
  },
  headerModal: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    backgroundColor: commonStyles.color.principal,
    color: commonStyles.color.secondary,
    fontSize: 18,
    textAlign: "center",
    padding: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginRight: 30,
    color: commonStyles.color.today,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    paddingHorizontal: 5,
    fontWeight: commonStyles.fontWeight,
    height: 40,
    marginTop: 10,
    margin: 15,
    borderBottomWidth: 2,
    borderColor: "grey",
    borderRadius: 6,
    backgroundColor: "#f1f2f4",
  },
  text: {
    marginTop: 10,

    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 14,
  },
  checkBoxText: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 14,
  },
  buttonOpenScanner: {
    position: "absolute",
    right: 10,
    height: 60,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenScanner2: {
    position: "absolute",
    right: 10,
    height: 240,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
