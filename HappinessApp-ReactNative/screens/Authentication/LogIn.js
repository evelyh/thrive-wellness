import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  SafeAreaView
} from 'react-native'
import { NetworkContext } from '../../contexts/Networking'

export default class SignIn extends React.Component {
  
  static contextType = NetworkContext
  
  // state to keep track of email and password data
  state = { 
    username: '',
    password: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  // Check the input before sending data to the server
  checkInput = () => {
    // i.e. check if the email (unless using login) is valid etc
    const { username, password } = this.state
    if (username === '' || password === '') {
      this.displayEmptyFieldsAlert()
      return
    }
    this.context.signIn(username, password)
  }

  displayEmptyFieldsAlert = () => {
    Alert.alert(
      "Empty input",
      "Please make sure to fill all required fields.",
      [
        {
          text: "Close",
          style: "cancel"
        }
      ]
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor='#BADEDE'
            onChangeText={val => this.onChangeText('username', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={val => this.onChangeText('password', val)}
          />
          <Button
            style = {styles.button}
            title="Sign in"
            onPress={this.checkInput}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: 'white',
    color: 'green',
    margin: 10,
    padding: 8,
    borderRadius: 14,
  },

  container: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },

  button: {
    fontSize: 14,
    color: '#f194ff',
    fontFamily: "Comfortaa",
    letterSpacing: -0.015,
    width: '90%',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'pink',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center'
  }
})