import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
} from "react-native";
import JourneyIconComponent from "./journey_components/JourneyIcon";
import JourneyPopupComponent from "./journey_components/JourneyPopup";
import JourneyTreeComponent from "./journey_components/JourneyTree";
import { NetworkContext } from "../contexts/Networking";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default class JourneyScreen extends React.Component {
  static contextType = NetworkContext;

  state = {
    // Create a list of all the journey icons to be displayed
    allJourneys: [],
    activeJourneys: [], // A list of active journeys
    showIcons: true, // If false, then show the journey tree
    selectedJourney: null, // This will be used to pass down what journey the user has selected
    showPopup: false, // This will determine whether we show the modal popup for JourneyPopupComponent
  };

  getJourneys = async () => {
    await this.context.getJourneys();
    this.setState({
      allJourneys: this.context.journeys,
    });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getJourneys();
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
            onPress={() => this.handleJourneyConfirm(item)}
          >
            Tap to see more
          </Button>
        </Card.Actions>
      </Card>
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // This function will be used to pass down the selected journey object from parent to child
  handleJourney = (journey) => {
    this.setState({ selectedJourney: journey });
    this.setState({ showPopup: true });
  };

  // This function will be used when player clicks on Begin Journey on the Journey Popup
  handleJourneyConfirm = (journey) => {
    this.setState({ showIcons: false }); // Change from showing the icons to showing the tree
    this.setState({ selectedJourney: journey });
    console.log(journey)
  };

  // Handle whether we show the modal popup for JourneyPopupComponent
  handlePopup = () => {
    const showPopup = !this.state.showPopup;
    this.setState({ showPopup: false });
  };

  // This is when the user hits the back button on the JourneyTreeComponent
  handleBack = () => {
    this.setState({ showIcons: true });
    this.setState({ showPopup: false });
  };

  render() {
    const { allJourneys, showIcons, showPopup, selectedJourney } = this.state; // Get properties from the state
    // If showIcons is true then show all the journey icons

    if (showIcons) {
      return (
        <SafeAreaView
          style={[
            styles.container,
            !showPopup
              ? { backgroundColor: "rgba(0,0,0,0)" }
              : { backgroundColor: "rgba(0,0,0,0.5)" },
          ]}
        >
          <View style={styles.line} />
          <Text
            style={[
              styles.Heading,
              !showPopup ? { color: "#918573" } : { color: "#655d50" },
            ]}
          >
            All Journeys
          </Text>
          <FlatList
            nestedScrollEnabled
            data={allJourneys}
            keyExtractor={(item) => item.name}
            renderItem={this.renderItem}
          ></FlatList>
        </SafeAreaView>
      );
    }
    // If it is false then we are showing the journey card
    else {
      return (
        <JourneyTreeComponent
          journey={selectedJourney}
          navigation={this.props.navigation}
          onBack={this.handleBack}
        />
      );
    }
  }
}

// Journey styles
const JourneyStyles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    padding: 10,
    shadowRadius: 15,
    backgroundColor: "#edf7f5",
    elevation: 4,
  },
});

// Journey Objects that will be used to get passed around
const journeyGratitude = {
  id: 0,
  name: "Graditude",
  quests: [
    {
      name: "Practice graditude",
      directions: "Write 5 things you are grateful for right now",
    },
    {
      name: "Meditate",
      directions: "Close your eyes for 2-5 mins",
    },
  ],
  image: require("../assets/journey_icons/gratitude_icon.png"),
  description: "Learn to appreciate the finer things in life.",
};

const journeyExercise = {
  id: 1,
  name: "Exercise",
  quests: [
    {
      name: "Cardio",
      directions: "Go for a walk around the block",
    },
    {
      name: "Stretch",
      directions: "Try touching your toes for a minute",
    },
  ],
  image: require("../assets/journey_icons/exercise_icon.png"),
  description: "Improve your health through physical exercise.",
};

const journeyKindness = {
  id: 2,
  name: "Kindness",
  quests: [
    {
      name: "Pay it forward",
      directions: "Do a kind deed for someone you care about",
    },
    {
      name: "Helping hand",
      directions: "Offer to help someone who might not expect it",
    },
  ],
  image: require("../assets/journey_icons/kindness_icon.png"),
  description: "Draw others closer to you through kindness.",
};

const journeyMindfulness = {
  id: 3,
  name: "Mindfulness",
  quests: [
    {
      name: "Deep breathing",
      directions: "Inhale for 10 seconds, exhale for 10 seconds, 5 times",
    },
    {
      name: "Surroundings",
      directions: "Take in and appreciate your surroundings for 30 seconds",
    },
  ],
  image: require("../assets/journey_icons/mindfulness_icon.png"),
  description: "Live in the present.",
};

const journeyOptimism = {
  id: 4,
  name: "Optimism",
  quests: [
    {
      name: "Learn from the best",
      directions: "Watch an episode of spongebob",
    },
    {
      name: "Brighter future",
      directions: "Visualize positive goals for the future",
    },
  ],
  image: require("../assets/journey_icons/optimism_icon.png"),
  description: "Achieve positive results through thinking positively.",
};

const journeyProductivity = {
  id: 5,
  name: "Productivity",
  quests: [
    {
      name: "Planning",
      directions: "Make a todo list",
    },
    {
      name: "Chip away",
      directions: "Start a project you may have been putting off for a while",
    },
  ],
  image: require("../assets/journey_icons/productivity_icon.png"),
  description: "Develop good work habits.",
};

const journeyRelationships = {
  id: 6,
  name: "Relationships",
  quests: [
    {
      name: "Get out there",
      directions: "Download tinder",
    },
    {
      name: "Go for it bro",
      directions: "Send that DM",
    },
  ],
  image: require("../assets/journey_icons/relationships_icon.png"),
  description: "Work on developing closer bonds with people.",
};

const journeySleep = {
  id: 7,
  name: "Sleep",
  quests: [
    {
      name: "Recharge",
      directions: "Take a 20 minute nap",
    },
    {
      name: "Schedule",
      directions: "Sleep 8 hours tonight",
    },
  ],
  image: require("../assets/journey_icons/sleep_icon.png"),
  description: "Go through the day feeling energized.",
};

// Styles for views, cards, buttons, etc.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  Heading: {
    fontSize: 30,
    textAlign: "center",
    margin: 15,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    flexWrap: "wrap",
  },
  line: {
    backgroundColor: "#C9DBC5",
    height: 10,
    width: "100%",
    position: "absolute",
  },
});
