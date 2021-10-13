// SignUp1.js
import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView, Alert
} from 'react-native'

import {NetworkContext} from '../../contexts/Networking'

export default class SignUp1 extends React.Component {
  
  static contextType = NetworkContext

  state = {
    firstName: '',
    lastName: '',
    email: '',
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  // Check if email is correct format
  // check if phone number is correct format
  // etc
  checkNewUserData = () => {
    const { firstName, lastName, email } = this.state

    if (firstName === '' || lastName === '' || email === '') {
      this.displayEmptyFieldsAlert()
      return
    }

    this.props.navigation.navigate('SignUp2', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    })
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
            placeholder='First Name'
            onChangeText={val => this.onChangeText('firstName', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Last Name'
            onChangeText={val => this.onChangeText('lastName', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize="none"
            onChangeText={val => this.onChangeText('email', val)}
          />
          <Button
            title='Continue'
            onPress={this.checkNewUserData}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    margin: 10,
    padding: 8,
    borderRadius: 14,
    color: 'green',
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  }
})