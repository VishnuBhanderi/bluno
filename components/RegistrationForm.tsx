import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Animated, StyleSheet, Dimensions, Text } from 'react-native';
import { Context as UserContext } from '../contexts/UserContext';
import styled from 'styled-components/native'; // Import styled from styled-components
import Camera from './Camera';
import FilePickerScreen from './IDProof';

const StyledView = styled.View`
  padding: 20px;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const StyledButton = styled.Button`
  color: white;
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
`;

const AnimatedView = styled(Animated.View)`
  overflow: hidden;
`;

const screenWidth = Dimensions.get('window').width;

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
  const [rollAnimation] = useState(new Animated.Value(screenWidth)); // Initial value is set to screenWidth for entry from right

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

  const animateForm = (toValue) => {
    Animated.timing(rollAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hadleNameChange = (text) => {  
    setName(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePhoneChange = (text) => {
    setMobileNo(text);
  };

  const handleNameNext = () => {
    if (!isVisibleEmail ) {
      setisVisibleEmail(true);
      setisVisibleName(false);
      animateForm(0); // Translate animation to reveal email field
    }
  };

  const handleEmailNext = () => {
    if (!isVisiblePhone ) {
      setisVisiblePhone(true);
      setisVisibleEmail(false);
      animateForm(0); // Translate animation to reveal phone field
    }
  };

  const handlePhoneNext = () => {
    if (!isVisibleSelfie) {
      setisVisibleSelfie(true);
      setisVisiblePhone(false);
      animateForm(0); // Translate animation to reveal button
    }
  };

  const handleCameraNext = () => {
    if (!isVisibleButton) {
      setisVisibleDoc(true);
      setisVisibleSelfie(false);
      animateForm(0);
    }
  };

  return (
    <StyledView>
      {isVisibleName && ( 
        <View style={styles.inputContainer}>         
          <StyledTextInput
            placeholder="Name"
            value={name}
            onChangeText={hadleNameChange}
          />
          <Button title="Next" onPress={handleNameNext} />
        </View>
      )}
      <AnimatedView style={{ transform: [{ translateX: rollAnimation }] }}>
        {isVisibleEmail && (
          <View style={styles.inputContainer}>
            <StyledTextInput
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
            />
            <Button title="Next" onPress={handleEmailNext} />
          </View>
        )}
      </AnimatedView>
      <AnimatedView style={{ transform: [{ translateX: rollAnimation }] }}>
        {isVisiblePhone && (
          <View style={styles.inputContainer}>
            <StyledTextInput
              placeholder="Mobile Number"
              value={mobileNo}
              onChangeText={handlePhoneChange}
            />
            <Button title="Next" onPress={handlePhoneNext} />
          </View>
        )}
      </AnimatedView>
      <AnimatedView style={{ transform: [{ translateX: rollAnimation }] }}>
        {isVisibleSelfie && (
          <View style={styles.buttonContainer}>
            <Camera/>
            <Button title="Next" onPress={handleCameraNext} />
          </View>
        )}
      </AnimatedView>
      <AnimatedView style={{ transform: [{ translateX: rollAnimation }] }}>
        {isVisibleDoc && (
          <View style={styles.buttonContainer}>
            <FilePickerScreen/>
            <Button title="Register" onPress={handleRegistration} />
          </View>
        )}
      </AnimatedView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default RegistrationForm;
