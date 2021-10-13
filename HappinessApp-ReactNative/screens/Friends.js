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
  Alert,
} from "react-native";

export default class Friends extends React.Component {
  render() {
	var friends = [];
	var num_friends = 15;

	for(let i = 0; i < num_friends; i++){
		friends.push(<Friend key={i}/>)

	}

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.body}>

			{friends}

        </ScrollView>
      </SafeAreaView>
    );
  }
}

class Friend extends React.Component {
  render() {
    return (
      <View>
        <View flexDirection="row" alignItems= 'stretch'>
          <Ionicons name="ios-people" size={40} color="black"/>

          <View alignItems= 'flex-start' width='75%' textAlign= "justify">
            <View flexDirection="row">
              <Text style={styles.name}> Ray Cambell </Text>
              <Text style={styles.info}> Giant Tree Owner</Text>
            </View>
            <Text style={styles.description}> Information of your friend.</Text>
          </View>

          <TouchableOpacity style={styles.buttonM}  onPress={() => null}>
            <MaterialIcons name="message" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.line}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "#C9DBC5",
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
	textAlign: "justify"
  },
  info: {
    fontSize: 15,
	color: "#22AAAA",
	textAlign: "justify"
 
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 8,
    textAlign: "justify",
  },
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
