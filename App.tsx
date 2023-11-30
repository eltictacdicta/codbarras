import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { Camera, useCodeScanner,useCameraPermission,useCameraDevice } from 'react-native-vision-camera';

export default function App() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const [codigoDeBarras, setCodigoDeBarras] = useState<string | null>(null);
  const device = useCameraDevice('back')

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) return <Text > No tienes permisos </Text>
  if (device == null) return <Text > No tienes permisos </Text>
  
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes[0].value} codes!`)
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
        //onChangeText={text => setCodigoDeBarras(text)}
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