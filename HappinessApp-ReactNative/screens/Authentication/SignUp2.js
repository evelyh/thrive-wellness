// SignUp1.js
import React from 'react'
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView, Alert
} from 'react-native'

import {NetworkContext} from '../../contexts/Networking'

export default class SignUp2 extends React.Component {

  static contextType = NetworkContext

  constructor(props) {
    super(props);

    const {email, firstName, lastName} = this.props.route.params
    this.state = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      username: '',
      password: '',
      age: -1,
      sex: '',
      displaySexInputWarning: false, // display text above input if
                                     // wrong character was entered
      displayAgeInputWarning: false, // display text above input if
                                     // age entered is invalid (less then 0...)
    }
  }

  onSetSex = (val) => {
    if (val !== 'M' && val !== 'F') {
      this.setState({
        displaySexInputWarning: true,
        sex: val
      })
    } else {
      this.setState({
        displaySexInputWarning: false,
        sex: val
      })
    }
  }

  onSetAge = (val) => {

    const intAge = parseInt(val, 10)

    if (!intAge || intAge < 0) {
      this.setState({
        displayAgeInputWarning: true,
        age: intAge
      })
    } else {
      this.setState({
        displayAgeInputWarning: false,
        age: intAge
      })
    }
  }

  onChangeText = (key, val) => {
    if (key === 'sex') {
      this.onSetSex(val)
    } else if (key === 'age') {
      this.onSetAge(val)
    } else {
      this.setState({ [key]: val })
    }
  }

  // Check if email is correct format
  // check if phone number is correct format
  // etc
  checkNewUserData = () => {
    const {
      username,
      firstName,
      lastName,
      password,
      email,
      age,
      sex,
    } = this.state

    if (username === '' || password === '' || age === '' || sex === '') {
      this.displayEmptyFieldsAlert()
      return
    }

    this.context.signUp(username, password, email,
                        firstName, lastName, age, sex)
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
            onChangeText={val => this.onChangeText('username', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={val => this.onChangeText('password', val)}
          />
          {this.state.displayAgeInputWarning && (
            <Text style={{color: 'red'}}>
              Please make sure to enter a positive number for the age
            </Text>
          )}
          <TextInput
            style={styles.input}
            placeholder='Age'
            autoCapitalize="none"
            onChangeText={val => this.onChangeText('age', val)}
          />
          {this.state.displaySexInputWarning && (
            <Text style={{color: 'red'}}>Please make sure to enter either M, or F</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder='Sex (enter M for male, F for female)'
            onChangeText={val => this.onChangeText('sex', val)}
          />
          <Button
            title='Sign Up'
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