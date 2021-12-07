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

export default class seeBuddyRequest extends React.Component {
  static contextType = NetworkContext;
  state = {
    br: "",
  };

  getBuddyRequests = async () => {
    await this.context.fetchBuddyRequest();
    this.setState({
      br: this.context.buddy_requests,
    });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getBuddyRequests();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  close = () => {
    this.setState({ opened: false });
  };

  render() {
    var b_requests = [];

    for (let i = 0; i < this.state.br.length; i++) {
      b_requests.push(<BR key={i} name={this.state.br[i]} />);
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.body}>
          {b_requests}
          <Button
            title="Refresh Buddy invitation list"
            color="green"
            onPress={this.getBuddyRequests}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

class BR extends React.Component {
  static contextType = NetworkContext;
  state = {
    opened: true,
  };
  accept = (b) => {
    this.setState({ opened: false });
    this.context.acceptBuddyRequest(b);
  };

  reject = (b) => {
    this.setState({ opened: false });

    this.context.rejectBuddyRequest(b);
  };
  render() {
    return (
      this.state.opened && (
        <View>
          <View flexDirection="row" alignItems="stretch">
            <Ionicons name="ios-people" size={40} color="black" />

            <View alignItems="flex-start" width="75%" textAlign="justify">
              <View flexDirection="row">
                <Text style={styles.name}> {this.props.name} </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonM}
              onPress={() => this.accept(this.props.name)}
            >
              <MaterialIcons name="check" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonL}
              onPress={() => this.reject(this.props.name)}
            >
              <MaterialIcons name="close" size={30} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.line} />
        </View>
      )
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
    left: -35,
    marginTop: 8,
    paddingRight: 10,
  },
  buttonL: {
    left: -20,
    marginTop: 8,
  },

  line: {
    backgroundColor: "#E5E5E5",
    height: 1,
    marginTop: 8,
  },
});
