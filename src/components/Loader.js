import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

export default function Loader(props) {
    return (
      <AnimatedLoader
        visible={props.visible}
        overlayColor="rgba(255,255,255,0.5)"
        source={require("../../assets/5350-loading-12.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text style={{fontSize:20}}>Carregando...</Text>
      </AnimatedLoader>
    );
}

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300
  }
});