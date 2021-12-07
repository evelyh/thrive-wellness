import "react-native-gesture-handler";
import React from "react";
import JourneyCardComponent from "./journey_components/JourneyCard";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { NetworkContext } from "../contexts/Networking";
export default class DailyQuestScreen extends React.Component {
  static contextType = NetworkContext;

  state = {
    journey: {}, 
    completedQuests: [],
    incompleteJourney:[], // This is a list of journeys in progress
    // incompleteJourney: {
    //   description: "",
    //   id: null,
    //   media: null,
    //   name: "",
    //   quests: []
    // } 
  };

  getJourneys = async () => {
    const incomplete = await this.context.getIncompleteJourney();
    if(incomplete != null){
      const journeyProgress = await this.context.getJourneyProgress(incomplete.id);
      this.setState({
        incompleteJourney: {
          description: incomplete.description,
          id: incomplete.id,
          media: incomplete.media,
          name: incomplete.name,
          quests: incomplete.quests
        }
      });
      console.log(this.state.incompleteJourney);
      this.setState({
        completedQuests: journeyProgress.completed,
      });
    }
  };

  handleJourneyTap = (quest) => {
    console.log(quest);
    const { navigate } = this.props.navigation;
    navigate("Quest", { quest });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getJourneys();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  renderItem = ({ item }) => (
    <Card
      style={[
        cardStyles.cardContainer,
        this.state.completedQuests.findIndex(
          (completedQuest) => completedQuest.id === item.id
        ) != -1
          ? { backgroundColor: "#6ff2b1" }
          : { backgroundColor: "#edf7f5" },
      ]}
    >
      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Title style={{ fontSize: 25, flex: 7 }}>{item.name}</Title>
          <Title style={{ fontSize: 20, flex: 1 }}>1 ★ </Title>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Paragraph style={{ fontWeight: "bold" }}>Estimated Time: </Paragraph>
          <Paragraph>1 Minutes </Paragraph>
        </View>

        <Paragraph style={{ fontWeight: "bold" }}>Instructions:</Paragraph>
        <Paragraph numberOfLines={4}>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions
        style={{ margin: 0, padding: 0, justifyContent: "flex-end" }}
      >
        <Button
          labelStyle={{ fontSize: 16 }}
          onPress={() => this.handleJourneyTap(item)}
        >
          Start Quest
        </Button>
      </Card.Actions>
    </Card>
  );

  render() {
    //const { name } = this.props.route.params; // Get name from params which comes from the navigate function from LogIn.js
    const { quests } = this.state.incompleteJourney;
    if(this.state.incompleteJourney.name == ""){
    //if (Object.keys(this.state.journey).length == 0) {
      return <Title style={QuestListStyles.title}>No Quest</Title>;
    }
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            margin: 5,
            backgroundColor: "#ffffff",
            borderWidth: 2,
            borderColor: "#b5bdbb",
            borderRadius: 5,
          }}
        >
          <Title style={QuestListStyles.title}>Your current journey is:</Title>
          <Title style={QuestListStyles.title}>{this.state.incompleteJourney.name}</Title>
        </View>
        <View style={{flex:1}}>
          <FlatList
            nestedScrollEnabled
            data={quests}
            keyExtractor={(item) => item.name}
            renderItem={this.renderItem}
          />
        </View>
        <View style={ButtonStyles.home_primary_buttons}>
          <Button
            mode="contained"
            onPress={() => console.log("not feeling it")}
          >
            Not feeling it?
          </Button>
        </View>
        <View style={ButtonStyles.home_primary_buttons}>
          <Button mode="contained" onPress={() => console.log("playground")}>
            Playground
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const journeyGratitude = {
  id: 0,
  name: "Graditude",
  quests: [
    {
      name: "Practice graditude",
      description: "Write 5 things you are grateful for on paper",
    },
    {
      name: "Meditate",
      description: "Close your eyes for 2-5 mins",
    },
    {
      name: "Enjoy Nature",
      description: "Go for a walk",
    },
  ],
  image: require("../assets/journey_icons/gratitude_icon.png"),
  description: "Learn to appreciate the finer things in life.",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  journeyButton: {
    width: 200,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#C9DBC5",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },

  greenline: {
    backgroundColor: "#BADEDE",
    height: 10,
    width: "100%",
    position: "absolute",
  },

  heading: {
    fontSize: 30,
    color: "#918573",
    textAlign: "center",
    margin: 20,
    // fontFamily: "Comfortaa",
  },
});

const QuestListStyles = StyleSheet.create({
  QLContainer: {
    backgroundColor: "#ffffdc",
    // minHeight: "80%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    color: "black",
    fontSize: 24,
    margin: 5,
    alignSelf: "center",
    textAlign: "center",
  },
});

const ButtonStyles = StyleSheet.create({
  home_primary_buttons: {
    //flex: 1,
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
  },
});

const cardStyles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    marginHorizontal: 10,
    padding: 10,
    shadowRadius: 4,
    backgroundColor: "#edf7f5",
    elevation: 4,
  },
});
