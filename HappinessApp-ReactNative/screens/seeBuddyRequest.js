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
import { NetworkContext } from "../contexts/Networking";
//import { Button } from "react-native-paper";

export default class seeBuddyRequest extends React.Component {
  static contextType = NetworkContext;
  state = {
    allRequests: [],
  };

  getBuddyRequests = async () => {
    await this.context.fetchBuddyRequest();
    this.setState({
      allRequests: this.context.buddy_requests,
    });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getBuddyRequests();
    });
    this.renderItem = ({ item }) => (
      <Card style={JourneyStyles.cardContainer}>
        <Card.Content>
          <Title style={{ fontSize: 25 }}>{item.name}</Title>
          <Paragraph numberOfLines={4}>{item.description}</Paragraph>
        </Card.Content>
        <Card.Actions
          style={{ margin: 0, padding: 0, justifyContent: "flex-end" }}
        >
          <Button
            labelStyle={{ fontSize: 16 }}
            onPress={() => this.Accept(item)}
          >
            Accept
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username of accountability buddy"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#BADEDE"
            value={this.state.buddy}
            onChangeText={(val) => this.onChangeText("buddy", val)}
          />
          <TouchableOpacity onPress={() => null}>
            <MaterialIcons name="check" size={28} color="green" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <MaterialIcons name="close" size={28} color="red" />
          </TouchableOpacity>
          <Button
            style={styles.button}
            title="Send Accountability Buddy Request"
            onPress={this.checkInput}
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
  buttoncontainer: {
    margin: 30,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    fontWeight: "bold",
  },
});
