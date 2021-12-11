import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView, TextInput, ScrollView, TouchableOpacity, Alert,
} from "react-native";

import { NetworkContext } from "../contexts/Networking";

export default class SubmitQuest extends React.Component {
  static contextType = NetworkContext;

  constructor(props) {
    super(props)

    this.state = {
      journey_name: "",
      journey_description: "",
      email: "",
      name: "",
      only_quest: false,
      quests: [],
      q1: {},
      q2: {},
      q3: {},
      alert: 0,
    }
  }

  onValueChange = (key, val) => {
    this.setState({
      [key]: val,
    })
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  questOnChangeText = (key, value, dict) => {
    dict[key] = value;
  }

  addQuest = (dict) => {
    this.state.quests.push(dict);
  }

  onSubmit = async() => {
    if (this.state.journey_name === "" || this.state.journey_description === ""){
      this.state.only_quest = true
    }
    this.state.quests = []
    this.addQuest(this.state.q1)
    this.addQuest(this.state.q2)
    this.addQuest(this.state.q3)
    const { journey_name, journey_description, email, name, only_quest, quests} = this.state
    if (only_quest){
      await this.context.submitQuest(quests, name, email);
      this.state.alert = 0
      this.props.navigation.navigate("Home")
    }
    else{
      await this.context.uploadJourney(journey_name, journey_description, quests, email, name);
      this.state.alert = 0
      this.props.navigation.navigate("Home")
    }
  }

  displayInstructionAlert = () => {
    Alert.alert("Create your own journeys and quests!", "You can submit journeys and quests you design here! " +
        "Your suggested quests and journeys will be evaluated by admin, and they will contact you if needed.", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  render() {
    if (this.state.alert === 0){
      this.displayInstructionAlert()
      this.state.alert += 1;
    }
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>If you want to submit a quest on its own, leave this part blank</Text>
            <TextInput
              style={styles.input}
              placeholder="Journey Name"
              autoCapitalize = "none"
              onChangeText={val => this.onChangeText('journey_name', val)}
            />
            <TextInput
                style={styles.input}
                placeholder="Journey Description"
                autoCapitalize = "none"
                onChangeText={val => this.onChangeText('journey_description', val)}
            />
            <Text style={styles.heading2}>Input quests below. Quest order is necessary if the quests are in a journey</Text>
            <Text style={styles.heading3}>Quest #1</Text>
            <TextInput
                style={styles.input}
                placeholder="Quest #1 Name*"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('name', val, this.state.q1)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #1 Description*"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('description', val, this.state.q1)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #1 Order"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('order', parseInt(val), this.state.q1)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #1 Survey Question"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('survey_question', val, this.state.q1)}
            />
            <Text style={styles.heading3}>Quest #2</Text>
            <TextInput
                style={styles.input}
                placeholder="Quest #2 Name"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('name', val, this.state.q2)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #2 Description"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('description', val, this.state.q2)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #2 Order"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('order', parseInt(val), this.state.q2)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #2 Survey Question"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('survey_question', val, this.state.q2)}
            />
            <Text style={styles.heading3}>Quest #3</Text>
            <TextInput
                style={styles.input}
                placeholder="Quest #3 Name"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('name', val, this.state.q3)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #3 Description"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('description', val, this.state.q3)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #3 Order"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('order', parseInt(val), this.state.q3)}
            />
            <TextInput
                style={styles.input}
                placeholder="Quest #3 Survey Question"
                autoCapitalize = "none"
                onChangeText={val => this.questOnChangeText('survey_question', val, this.state.q3)}
            />
            <Text style={styles.heading3}>Your Info</Text>
            <TextInput
                style={styles.input}
                placeholder="Your Name*"
                autoCapitalize = "none"
                onChangeText={val => this.onChangeText('name', val)}
            />
            <TextInput
                style={styles.input}
                placeholder="An email where we can reach you*"
                autoCapitalize = "none"
                onChangeText={val => this.onChangeText('email', val)}
            />
          </View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
                style={styles.journeyButton}
                onPress={this.onSubmit}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    alignItems: "flex-start"
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
    justifyContent:"center",
    alignSelf: "center",
    marginBottom: 25
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

  heading: {
    fontSize: 18,
    color: "#27214D",
    padding: 5,
    marginTop: 25,
    marginLeft: 3,
    textAlign: "left",
    alignSelf: "center"
  },

  heading2: {
    fontSize: 20,
    color: "#27214D",
    padding: 5,
    marginLeft: 3,
    textAlign: "left",
    alignSelf: "center",
    marginTop: 25
  },

  heading3: {
    fontSize: 18,
    color: "#27214D",
    padding: 5,
    marginTop: 5,
    marginLeft: 3,
    textAlign: "left",
    alignSelf: "center"
  },

  input: {
    fontSize: 20,
    padding: 5,
    marginLeft: 20
  }
});
