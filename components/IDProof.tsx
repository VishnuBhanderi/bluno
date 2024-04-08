import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { MaterialIcons } from '@expo/vector-icons';

const FilePickerScreen = () => {
  const [pickedFile, setPickedFile] = useState<{ name: string; size: number; uri: string } | null>(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // You can specify the file type here, for example 'image/*' for images
      });
      if (!result.canceled) {
        const { name, size, uri } = result.assets[0];
        setPickedFile({ name, size, uri });
        console.log('Picked file:', pickFile);
      } else {
        console.log('User cancelled the file picker');
      }
    } catch (err) {
      console.error('Error while picking the file', err);
    }
  };

  return (
    <View style={styles.container}>
    <Button title="Pick a file" onPress={pickFile} />
    {pickedFile && (
      <View style={styles.fileInfoContainer}>
        <MaterialIcons name="attach-file" size={24} color="#5b5b5b" />
        <Text style={styles.fileName}>{pickedFile.name}</Text>
        <Text style={styles.fileSize}>Size: {pickedFile.size} bytes</Text>
        <Text style={styles.fileUri}>URI: {pickedFile.uri}</Text>
      </View>
    )}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    fileInfoContainer: {
      marginTop: 20,
      backgroundColor: '#f0f0f0',
      padding: 20,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    fileName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    fileSize: {
      marginTop: 5,
      fontSize: 14,
      marginLeft: 34,
    },
    fileUri: {
      marginTop: 5,
      fontSize: 14,
      marginLeft: 34,
    },
  });
  
  export default FilePickerScreen;
  