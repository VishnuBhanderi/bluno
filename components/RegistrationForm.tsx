import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Animated, StyleSheet, Dimensions, Text } from 'react-native';
import { Context as UserContext } from '../contexts/UserContext';
import Camera from './Camera';
import FilePickerScreen from './IDProof';
import EmailInput from './EmailInput';

const screenHeight = Dimensions.get('window').height;

const RegistrationForm = () => {
  const { addUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [docUri, setDocUri] = useState('');
  const [isVisibleName, setisVisibleName] = useState(true);
  const [isVisibleEmail, setisVisibleEmail] = useState(false);
  const [isVisiblePhone, setisVisiblePhone] = useState(false);
  const [isVisibleButton, setisVisibleButton] = useState(false);
  const [isVisibleSelfie, setisVisibleSelfie] = useState(false);
  const [isVisibleDoc, setisVisibleDoc] = useState(false);
  const [rollAnimation] = useState(new Animated.Value(screenHeight)); // Initial value is set to screenHeight for entry from bottom

  const handleRegistration = () => {
    // Validate inputs here if needed

    // Call the addUser action with the user data
    addUser({ name, email, mobileNo, docUri });

    // Clear input fields after registration
    setName('');
    setEmail('');
    setMobileNo('');
    setDocUri('');
  };

  // const animateForm = (toValue) => {
  //   Animated.timing(rollAnimation, {
  //     toValue,
  //     duration: 500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const hadleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePhoneChange = (text: string) => {
    setMobileNo(text);
  };

  const handleNameNext = () => {
    if (!isVisibleEmail) {
      setisVisibleEmail(true);
      setisVisibleName(false);
    }
  };

  const handleEmailNext = () => {
    if (!isVisiblePhone) {
      setisVisiblePhone(true);
      setisVisibleEmail(false);
    }
  };

  const handlePhoneNext = () => {
    if (!isVisibleSelfie) {
      setisVisibleSelfie(true);
      setisVisiblePhone(false);
    }
  };

  const handleCameraNext = () => {
    if (!isVisibleButton) {
      setisVisibleDoc(true);
      setisVisibleSelfie(false);
    }
  };

  return (
    <View style={styles.container}>
      {isVisibleName && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={hadleNameChange}
          />
          <Button title="Next" onPress={handleNameNext} />
        </View>
      )}

      {isVisibleEmail && (
        <View style={styles.inputContainer}>
          <EmailInput
            email={email}
            handleEmailChange={handleEmailChange}
            handleEmailNext={handleEmailNext}
          />
        </View>
      )}
      {isVisiblePhone && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNo}
            onChangeText={handlePhoneChange}
          />
          <Button title="Next" onPress={handlePhoneNext} />
        </View>
      )}

      {isVisibleSelfie && (
        <View style={styles.buttonContainer}>
          <Camera />
          <Button title="Next" onPress={handleCameraNext} />
        </View>
      )}

      {isVisibleDoc && (
        <View style={styles.buttonContainer}>
          <FilePickerScreen />
          <Button title="Register" onPress={handleRegistration} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default RegistrationForm;
