import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { QuestListItem } from "../JourneyManagement/ManageJourneyScreen";
import { NetworkContext } from "../../contexts/Networking";
import { Card, Title, Paragraph, Button } from "react-native-paper";

class JourneyTreeComponent extends Component {
  // Function to navigate to quest screen and hand over quest object to it
  static contextType = NetworkContext;

  state = {
    completedQuests: [],
    updated: false,
  };

  // handleJourneyTap = (quest, journey) => {
  //   console.log(quest);
  //   this.props.navigation.navigate("Quest", {q: quest, j: journey});
  // };

  // onSelect = (quest, journey) => {
  //   setTimeout(() => {
  //     this.setState({ updated: false });
  //   }, 2000);
  //   this.props.navigation.navigate("Quest", { q: quest, j: journey });
  // };

  getQuestProgress = async () => {
    const { journey } = this.props;
    const journeyProgress = await this.context.getJourneyProgress(journey.id);
    console.log(journeyProgress);
    this.setState({
      completedQuests: journeyProgress.completed,
    });
  };

  componentDidMount = async () => {
    // const { journey } = this.props;
    // const journeyProgress = await this.context.getJourneyProgress(journey.id);
    // this.setState({
    //   completedQuests: journeyProgress.completed,
    // });
    this._unsubscribe = this.props.navigation.addListener("didFocus", () =>
      this.getQuestProgress()
    );
  };

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
          onPress={() => {
            this.props.navigation.navigate("Quest", {
              quest: item,
              journey: this.props.journey
            });
          }}
        >
          Start Quest
        </Button>
      </Card.Actions>
    </Card>
  );

  render() {
    const { journey } = this.props; // Get journey object from parent
    const { name, quests } = journey; // Get name and quest from journey object
    const { completedQuests } = this.state; // Get completed quests from state

    return (
      // Loop through and display each individual quest from journey object
      <SafeAreaView style={styles.container}>
      <View style={MIStyles.MIContainer}>
            <View style={MIStyles.MIPictureContainer}>
            {journey.media &&(
                <Image
                style={styles.image}
                source={{uri: 'http://localhost:8000/'+ journey.media, }}
                />
              )}
              {journey.media == null &&(
                <Image
                style={styles.image}
                source={require('../../assets/placeholder_journey_image.png')}
                />
              )}
            </View>
            <View style={MIStyles.MITextContainer}>
                <Text style={MIStyles.MIDescriptionText}>
                    {journey.description}
                </Text>

            </View>
            <FlatList
						nestedScrollEnabled
            data={journey.quests}
            keyExtractor={(item) => item.name}
            renderItem={this.renderItem}
          />
          <Button
            mode="contained"
            style={{ alignSelf: "center" }}
            contentStyle={{ minHeight: 50 }}
            labelStyle={{ fontSize: 18 }}
            onPress={() => this.props.onBack()}
          >
            Back To Journey List
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

// Styles for button, etc.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 440,
    height: 130,
    resizeMode: "stretch",
  },
  journeyButton: {
    width: 200,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#BADEDE",
    borderRadius: 30,
    borderColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    width: 200,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 2,
    marginBottom: 2,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
  },
  centerView: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 9,
    flexDirection: "column",
    width: "100%",
  },
  scrollContents: {
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    color: "#6A8099",
    textAlign: "center",
    fontWeight: "bold",
    margin: 15,
  },

  heading2: {
    fontSize: 16,
    color: "#7E6847",
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    color: "#27214D",
    textAlign: "center",
    margin: 2,
  },
});

const MIStyles = StyleSheet.create({
  MIContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffdc",
  },
  MITextContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  MIDescriptionText: {
    fontSize: 20,
    textAlign: "center",
  },
  MIPicture: {
    width: "100%",
    height: 200,
  },
  MIPictureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  MIButtonContainer: {
    // justifyContent: "center",
    marginBottom: 15,
    flex: 1,
    justifyContent: "flex-end",
  },
  MIButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "blue",
  },
});

const cardStyles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    marginHorizontal: 10,
    padding: 10,
    shadowRadius: 15,
    backgroundColor: "#edf7f5",
    elevation: 4,
    minWidth: "90%",
  },
});

export default JourneyTreeComponent;
