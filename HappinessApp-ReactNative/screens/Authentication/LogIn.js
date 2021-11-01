import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
  Text,
  CheckBox,
  Linking,
} from "react-native";
import { NetworkContext } from "../../contexts/Networking";
import AsyncStorage from "@react-native-community/async-storage";

export default class SignIn extends React.Component {
  static contextType = NetworkContext;

  // state to keep track of email and password data
  state = {
    username: "",
    password: "",
    rememberMe: false,
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  // Check the input before sending data to the server
  checkInput = () => {
    // i.e. check if the email (unless using login) is valid etc
    const { username, password } = this.state;
    if (this.state.username === "" || this.state.password === "") {
      this.displayEmptyFieldsAlert();
      return;
    }
    if (this.state.rememberMe) {
      AsyncStorage.setItem("user", this.state.username);
      AsyncStorage.setItem("pw", this.state.password);
      AsyncStorage.setItem("option", "true");
    } else {
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("pw");
      AsyncStorage.setItem("option", "false");
    }
    this.context.signIn(username, password);
  };

  displayEmptyFieldsAlert = () => {
    Alert.alert(
      "Empty input",
      "Please make sure to fill all required fields.",
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  // async componentDidMount() {
  //   const username = await this.getRememberedUser();
  //   this.setState({
  //     username: username || "",
  //     rememberMe: username ? true : false,
  //   });
  // }

  async componentDidMount() {
    const username = await this.getRememberedUser();
    const password = await this.getRememberedPassword();
    const remember = await this.getRememberedOption();
    this.setState({
      username: username,
      password: password,
    });
    if (remember === "true") {
      this.setState({
        rememberMe: true,
      });
    }
    // if (username != "" && password != "" ) {
    //   this.checkInput();
    // }
  }

  getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem("user");
      if (username !== null) {
        return username;
      }
    } catch (error) {}
  };

  getRememberedPassword = async () => {
    try {
      const password = await AsyncStorage.getItem("pw");
      if (password !== null) {
        return password;
      }
    } catch (error) {}
  };

  getRememberedOption = async () => {
    try {
      const option = await AsyncStorage.getItem("option");
      if (option !== null) {
        return option;
      }
    } catch (error) {}
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#BADEDE"
            value={this.state.username}
            onChangeText={(val) => this.onChangeText("username", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(val) => this.onChangeText("password", val)}
          />
          <Button
            style={styles.button}
            title="Sign in"
            onPress={this.checkInput}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              value={this.state.rememberMe}
              onValueChange={() =>
                this.setState({ rememberMe: !this.state.rememberMe })
              }
            />
            <Text style={styles.label}>Remember Me</Text>
          </View>
          <Button
            style={styles.button}
            title="Forgot Username or Password?"
            onPress={() =>
              Linking.openURL(
                "https://intezzz.pythonanywhere.com/api/auth/reset_password/"
              )
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    fontSize: 18,
    fontWeight: "500",
    height: 55,
    backgroundColor: "white",
    color: "green",
    margin: 10,
    padding: 8,
    borderRadius: 14,
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },

  button: {
    fontSize: 14,
    color: "#f194ff",
    fontFamily: "Comfortaa",
    letterSpacing: -0.015,
    width: "90%",
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "pink",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    fontWeight: "bold",
  },
});
