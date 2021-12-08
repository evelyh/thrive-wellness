import "react-native-gesture-handler";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { NetworkContext } from "../contexts/Networking";
//import { Button } from "react-native-paper";

export default class Friends extends React.Component {
  static contextType = NetworkContext;
  state = {
    buddies: "",
  };

  getBuddies = async () => {
    await this.context.fetchBuddy();
    this.setState({
      buddies: this.context.buddies,
    });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getBuddies();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  addBuddy = () => {
    this.props.navigation.navigate("addBuddy");
  };

  seeBuddyRequest = () => {
    this.props.navigation.navigate("seeBuddyRequest");
  };
  render() {
    var friends = [];

    for (let i = 0; i < this.state.buddies.length; i++) {
      friends.push(<Friend key={i} name={this.state.buddies[i]} />);
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.body}>
          {friends}
          <View style={styles.buttoncontainer}>
            <Button
              style={styles.button3}
              title="Refresh Buddy List"
              color="green"
              onPress={this.getBuddies}
            />
            <View style={styles.button1}>
              <Button
                style={styles.button1}
                title="Check Buddy Request"
                onPress={this.seeBuddyRequest}
              />
            </View>
            <View style={styles.button2}>
              <Button
                style={styles.button2}
                color="black"
                title="Send Accountability Buddy Request"
                onPress={this.addBuddy}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Friend extends React.Component {
  state = {
    name: "React",
  };
  render() {
    return (
      <View>
        <View flexDirection="row" alignItems="stretch">
          <Ionicons name="ios-people" size={40} color="black" />

          <View alignItems="flex-start" width="75%" textAlign="justify">
            <View flexDirection="row">
              <Text style={styles.name}> {this.props.name} </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonM} onPress={() => null}>
            <MaterialIcons name="message" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignItems: "center",
  },

  body: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 20,
  },

  name: {
    fontSize: 16,
    // Gives error on iOS
    // fontFamily: "Comfortaa-Regular",
    color: "#918573",
    fontWeight: "bold",
    textAlign: "justify",
  },
  info: {
    fontSize: 15,
    color: "#22AAAA",
    textAlign: "justify",
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 8,
    textAlign: "justify",
  },
  button1: {
    paddingTop: 10,
  },
  button2: { paddingTop: 10 },
  buttoncontainer: { padding: 10 },
  buttonM: {
    marginTop: 8,
    height: 40,
    width: "15%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    textAlign: "center",
    backgroundColor: "#22AAAA",
  },

  line: {
    backgroundColor: "#E5E5E5",
    height: 1,
    marginTop: 8,
  },
});
