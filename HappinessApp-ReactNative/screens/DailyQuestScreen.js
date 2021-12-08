import "react-native-gesture-handler";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView
} from "react-native";
import Playground from "./Playground";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { NetworkContext } from "../contexts/Networking";
import DropJourneyComponent from './DropJourney';
export default class DailyQuestScreen extends React.Component {
  static contextType = NetworkContext;

  state = {
    journey: {}, 
    allQuests: [],
    completedQuests: [],
    incompleteJourney:[], // This is a list of journeys in progress
    showPlayground: false,
    showIcons: true,
  };

  getJourneys = async () => {
    const incomplete = await this.context.getIncompleteJourney();
    console.log(incomplete);
    if(incomplete !== null){
      if(incomplete.length == 1){
        const journeyProgress = await this.context.getJourneyProgress(incomplete[0].id);
        this.setState({
          incompleteJourney: [{
            description: incomplete[0].description,
            id: incomplete[0].id,
            media: incomplete[0].media,
            name: incomplete[0].name,
            quests: incomplete[0].quests
          }]
        });
        this.setState({
          completedQuests: journeyProgress.completed,
        });
      }

      if(incomplete.length == 2){
        const journeyProgress1 = await this.context.getJourneyProgress(incomplete[0].id);
        const journeyProgress2 = await this.context.getJourneyProgress(incomplete[1].id);
        this.setState({
          incompleteJourney: [
            {
              description: incomplete[0].description,
              id: incomplete[0].id,
              media: incomplete[0].media,
              name: incomplete[0].name,
              quests: incomplete[0].quests
            },
            {
            description: incomplete[1].description,
            id: incomplete[1].id,
            media: incomplete[1].media,
            name: incomplete[1].name,
            quests: incomplete[1].quests
          }]
        });
        console.log(this.state.incompleteJourney);
        this.setState({
          completedQuests: journeyProgress1.completed.concat(journeyProgress2.completed),
        });
      }
    }
    if(incomplete.length == 0){
      this.setState({
        incompleteJourney: []
      });
    }
  };

  handleJourneyTap = (quest) => {
    console.log(quest);
    this.props.navigation.navigate("Quest", {
      quest: quest,
      journey: this.props.journey
      }
      );
  };

   // This is when the user hits the back button on the DropJourneyComponent
   handleBackDrop = () => {
    this.setState({ showIcons: true });
    this.setState({ showPopup: false });
  };

  // This function will be used when user clicks on Drop on the Journey Popup to drop a journey
  handleJourneyConfirm = () => {
    this.setState({ showIcons: false }); // Change from showing the icons to showing the tree
    // this.setState({ selectedJourney: journey });
    // console.log(journey)
  };
  handlePlayground = () =>{
    this.setState({
      showPlayground: true,
    })
  }

  handleBack =() =>{
    this.setState({
      showPlayground: false,
    })
  }

  getAllQuests = async() =>{
    const response = await this.context.getAllQuests();
    this.setState({
      allQuests: response
  })
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getJourneys();
      this.getAllQuests();
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
          labelStyle={{ fontSize: 16 , color: "#63915e"}}
          onPress={() => this.handleJourneyTap(item)}
        >
          Start Quest
        </Button>
      </Card.Actions>
    </Card>
  );

  render() {
    //const { name } = this.props.route.params; // Get name from params which comes from the navigate function from LogIn.js
    if(this.state.showIcons && !this.state.showPlayground){
      if(this.state.incompleteJourney.length == 0){
        return (
          <SafeAreaView style={styles.container}>
            <Title style={QuestListStyles.title}>No Quest</Title>
            <View style={ButtonStyles.no_quest_home_buttons}>
              <Button
                mode="contained"
                onPress={() => this.handlePlayground()}
                style={{ alignSelf: "center", backgroundColor: "#C9DBC5" }}
                labelStyle={{ fontSize: 18, color: "#486b45"}} 
              >
                Go to quest playground
              </Button>
            </View>
          </SafeAreaView>
        );
      }
      const { quests } = this.state.incompleteJourney[0];
      
      return (
        <SafeAreaView style={styles.container}>
          <View>
            <Title style={QuestListStyles.title}>Your current journey is:</Title>
            {this.state.incompleteJourney.length >= 1 &&
            <Title style={QuestListStyles.title}>{this.state.incompleteJourney[0].name}</Title>
            }
          </View >
          {this.state.incompleteJourney.length == 1 &&
            <View style={MIStyles.MIContainer}>
              <FlatList
                nestedScrollEnabled
                data={quests}
                keyExtractor={(item) => item.name}
                renderItem={this.renderItem}
              />
            </View>
          }
          {this.state.incompleteJourney.length == 2 &&
            <View style={MIStyles.MIContainer}>
              <FlatList
                nestedScrollEnabled
                data={quests}
                keyExtractor={(item) => item.name}
                renderItem={this.renderItem}
              />
            </View>
          }
          <View>
            {this.state.incompleteJourney.length == 2 &&
            <Title style={QuestListStyles.title}>{this.state.incompleteJourney[1].name}</Title>
            }
          </View>
          {this.state.incompleteJourney.length == 2 &&
            <View style={MIStyles.MIContainer}>
              <FlatList
                nestedScrollEnabled
                data={this.state.incompleteJourney[1].quests}
                keyExtractor={(item) => item.name}
                renderItem={this.renderItem}
              />
            </View>
          }
          
          <View style={ButtonStyles.home_primary_buttons}>
          <Button
              mode="contained"
              onPress={() => this.handleJourneyConfirm()}
              style={{ alignSelf: "center", backgroundColor: "#C9DBC5" }}
              labelStyle={{ fontSize: 18, color: "#486b45"}}
            >
              Drop A Journey
            </Button>
            <Button
              mode="contained"
              onPress={() => this.handlePlayground()}
              style={{ alignSelf: "center", backgroundColor: "#C9DBC5" }}
              labelStyle={{ fontSize: 18, color: "#486b45"}}
            >
              Go to quest playground
            </Button>
          </View>
        </SafeAreaView>
      );
    }else if(this.state.showPlayground){
      return (
        <Playground
        navigation={this.props.navigation}
        onBack={this.handleBack}
        allQuests={this.state.allQuests}
        />
    )}else if(!this.state.showIcons){
      return (
        <DropJourneyComponent
          incompleteJourney={this.state.incompleteJourney}
          navigation={this.props.navigation}
          onBack={this.handleBackDrop}
        />
      );
    }
  }
}

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
  no_quest_home_buttons: {
    marginVertical: 10,
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
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