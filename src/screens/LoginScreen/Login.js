import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/Loader'
import getRealm from '../../services/realm';
import api from '../../services/api';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [Condition, setCondition] = useState(false);
  const [internet, setInternet] = useState(null);
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [LoaderVisible, setVisible] = useState(false);

  const dispatch = useDispatch();
  //ao iniciar a aplicação fará a validação se a chave registrada no storage é igual a do banco de dados, caso seja entrará na
  //aplicação, caso não solicitará que faça o login
  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    //consulta no storage
    getUsuario();
    connectivity();
  }, []);

  function connectivity() {
    if (Platform.OS === 'android') {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          setInternet(true);
        } else {
          Alert.alert('Desconectado', 'Você está desconectado a internet');
          setInternet(false);
        }
      });
    } else {
    }
  }

  function acessar() {
    setCondition(true);
    getUsuario();
  }
  async function clearStore() {
    const realm = await getRealm();
    const store = realm.objects('User');

    let object = realm.objectForPrimaryKey('User', store[0].id);
    console.log(object);
    realm.write(() => {
      realm.delete(object);
    });
  }
  async function getUsuario() {
    try {
      if (internet == true) {
        const response = await api.get('/Acessoappcoleta');
        const data = response.data.data;

        const realm = await getRealm();
        const store = realm.objects('User');
        console.log('1 Store' + store[0]);

        if (store[0] != undefined) {
          //Logado
          if (store[0].logado == true) {
            const index = data.findIndex(
              (x) =>
                x.email == store[0].email &&
                x.senha == store[0].senha &&
                x.chave == store[0].token,
            );
            console.log('FILTER 1 : ' + data[index]);

            if (data[index]) {
              navigation.replace('CollectList');
            } else {
              clearStore();
            }
          } //Deslogado
          else {
            try {
              const index = data.findIndex(
                (x) => x.email == email && x.senha == senha,
              );
              console.log('FILTER 2 : ' + data[index]);
              
                clearStore();
                setUser(data[index]);
                setVisible(false)
            } catch (error) {
              setVisible(false)
              Alert.alert(
                'Email e Senha incorretos',
                'Verifique o email e senha digitados',
              );
            }
             
          }
        } //Sem Storage
        else {
          try {
            const index = data.findIndex(
              (x) => x.email == email && x.senha == senha,
            );
            console.log('FILTER INTERNET DESLOGADO : ' + data[index].email);

            setUser(data[index]);
          } catch (error) {
            setVisible(false)
            Alert.alert(
              'Email e Senha incorretos',
              'Verifique o email e senha digitados',
            );
          }
        }
      } else {
        const realm = await getRealm();
        const store = realm.objects('User');
        if (store[0].logado == true) {
          navigation.replace('CollectList');
        } else {
          if (Condition == true) {
            if (store[0].email == email && store[0].senha == senha) {
              const realm = await getRealm();

              realm.write(() => {
                realm.create(
                  'User',
                  {id: store[0].id, logado: true},
                  'modified',
                );
              });
              setVisible(false)
              navigation.repalce('CollectList');
            } else {
              Alert.alert(
                'Sem Internet',
                'Por favor conecte-se a internet para fazer o login de um novo usuário',
              );
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function setUser(usuario) {
    console.log('USUARIO' + usuario.nomeUsuario);
    if (usuario.length != 0) {
      const realm = await getRealm();

      realm.write(() => {
        realm.create('User', {
          id: parseInt(usuario.id),
          nome: usuario.nomeUsuario,
          email: usuario.email,
          senha: usuario.senha,
          token: usuario.chave,
          logado: true,
        });
      });
      dispatch({
        type: 'USER_LOGGED_IN',
        payload: [
          usuario.nomeUsuario,
          usuario.email,
          usuario.senha,
          usuario.chave,
        ],
      });
      setEmail('');
      setSenha('');
    }
    setVisible(false)
    navigation.replace('CollectList');
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <Loader visible={LoaderVisible}></Loader>
      <View style={styles.containerLogo}>
        <Image
          style={{
            width: 170,
            height: 170,
            borderRadius: 10,
          }}
          source={require('../../../assets/icon.png')}
        />
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{translateY: offset.y}],
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCorrect={false}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          value={senha}
          onChangeText={(text) => setSenha(text)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.btnSubmit} onPress={() => {acessar(), setVisible(true)}
  }>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSolicit}>
          <Text style={styles.solicitText}>Solicitar criação de conta</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
