import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
  View,
  TouchableOpacity, Alert,
} from "react-native";
import { NetworkContext } from "../contexts/Networking";

export default class Profile extends React.Component {
  static contextType = NetworkContext;

  render() {
    const { navigate } = this.props.navigation
    const user = this.context.userInfo

    const { profile_picture } = "../assets/sampleprofilepicture.png";

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../assets/sampleprofilepicture.png")}
        />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}> {user.firstname} {user.lastname}</Text>
            <Text style={styles.info}>Tree Owner</Text>
            <Text style={styles.description}>
              Welcome to your personal space. How has your day been?
            </Text>

            {this.context.isAdmin &&
              (<TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigate("Manage Journeys")}
              >
                <Text>Manage Journeys</Text>
              </TouchableOpacity>)
            }

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.context.signOut}
            >
              <Text>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: "#BADEDE",
    flex: 1,
    height: 180,
  },
  avatar: {
    flex: 1,
    width: "33%",
    height: "50%",
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#4F4F4F",
    alignSelf: "center",
    position: "absolute",
    resizeMode: "cover",
    marginTop: "10%",
  },
  body: {
    flex: 2,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    // Gives error on iOS
    // fontFamily: "Comfortaa-Regular",
    color: "#918573",
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
    color: "#22AAAA",
  },
  description: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 8,
    height: 45,
    width: '48%',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 30,
    textAlign: "center",  
    backgroundColor: "#22AAAA",
  },
});
