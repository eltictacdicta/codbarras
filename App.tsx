import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Alert } from 'react-native';
import { Camera, useCodeScanner, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const [codigoDeBarras, setCodigoDeBarras] = useState<string | null>(null);
  const device = useCameraDevice('back')

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (hasPermission === false) {
      Alert.alert(
        "Permiso de cámara",
        "Necesitamos permiso para acceder a tu cámara para escanear códigos de barras.",
        [
          { text: "OK", onPress: () => requestPermission() }
        ]
      );
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) return <Text > No tienes permisos </Text>
  if (device == null) return <Text > No tienes permisos </Text>
  
  const codeScanner = useCodeScanner({
    codeTypes: ['code-128'],
    onCodeScanned: (codes) => {
      setCodigoDeBarras(codes[0].value);
    }
  })

  return (
    <View style={styles.container}>
      <Camera 
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}     
        codeScanner={codeScanner} />
      <TextInput
        value={codigoDeBarras || ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});