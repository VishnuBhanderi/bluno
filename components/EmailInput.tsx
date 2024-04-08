import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StyledTextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({ placeholder, value, onChangeText }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

interface EmailInputProps {
  email: string;
  handleEmailChange: (text: string) => void;
  handleEmailNext: () => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ email, handleEmailChange, handleEmailNext }) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />
    </View>
    <Button title="Next" onPress={handleEmailNext} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmailInput;
