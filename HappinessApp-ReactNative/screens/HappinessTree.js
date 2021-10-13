import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from "react-native";

export default class HappinessTree extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style = {styles.greenline}/>
        <Text style={styles.Heading}>HappinessTree</Text>
        <Tree navigation={this.props.navigation} />
      </SafeAreaView>
    );
  }
}

class Tree extends React.Component {
  render() {
    // The tree is different depending on whihc level the user is at
    const { navigate } = this.props.navigation;
    return (      
      <Image style={styles.image} source={require("../assets/tree2.png")} />
   );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  greenline: {
    backgroundColor: "#BADEDE",
    height: 10,
    width: '100%',
    position: 'absolute'

  },

  journeyButton: {
    width: 200,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#C9DBC5",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent:"center"
  },

  Heading: {
    fontSize: 30,
    color: "#918573",
    textAlign: "center",
    margin: 20,
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
  },
});
