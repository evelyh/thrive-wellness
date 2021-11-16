import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export default class QuestScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      answer: ''
    }
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { quest } = this.props.route.params;
    // const{ journey } = quest;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view1}>
        {quest.media && (
            <Image
            style={styles.image}
            source={{uri: 'http://localhost:8000/'+ quest.media, }}
            />
          )}
          {quest.media == null && journey.media &&(
            <Image
              style={styles.image}
              source={{uri: 'http://localhost:8000/'+ journey.media, }}
            />
          )}
          {quest.media == null && (journey == null || journey.media == null) &&(
            <Image
            style={styles.image}
            source={require('../assets/placeholder_journey_image.png')}
            />
          )}
        </View>
        <View style={styles.view2}>
          <ScrollView>
            <Text style={styles.heading2}>{quest.name} Quest</Text>
            <View style={styles.line} />
            <Text style={styles.heading3}> Directions </Text>
            <View style={styles.line2} />

            <Text style={styles.heading3}>{quest.description}</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="How did doing the quest make you feel? Type here."
              autoCapitalize="none"
              onChangeText={val => this.onChangeText('answer', val)}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.journeyButton}
            onPress={() => {
              this.props.navigation.navigate("Feedback", {
                answer: this.state.answer,
                quest: quest,
              })
            }}
          >
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BADEDE",
  },
  view1: {
    flex: 1.3,
    flexDirection: "row",
  },
  image: {
    width: 420,
    height: 110,
    resizeMode: 'stretch',
  },
  view2: {
    flex: 7,
    backgroundColor: "white",
    borderTopRightRadius: 23,
    borderTopLeftRadius: 23,
  },

  buttonsView: {
    flex: 1,
    flexDirection: "row",
  },

  journeyButton: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#C9DBC5",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#efefef",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  heading: {
    fontSize: 24,
    color: "#918573",
    //fontFamily: "Comfortaa-Regular"
  },
  heading2: {
    fontSize: 24,
    color: "#918573",
    //fontFamily: "Comfortaa-Regular"
    marginLeft: 25,
    marginTop: 16,
  },

  heading3: {
    fontSize: 20,
    color: "#27214D",
    //fontFamily: "Comfortaa-Regular"
    marginLeft: 25,
    marginTop: 16,
  },

  question_body: {
    fontSize: 20,
    color: "#27214D",
    marginLeft: 25,
    marginTop: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    margin: 10,
    padding: 8,
    color: "#918573",
    fontSize: 18,
  },

  line: {
    backgroundColor: "#F3F3F3",
    height: 1,
    marginTop: 8,
  },

  line2: {
    backgroundColor: "#6C9191",
    height: 1,
    width: 100,
    marginLeft: 26,
    marginTop: 8,
  },
});
