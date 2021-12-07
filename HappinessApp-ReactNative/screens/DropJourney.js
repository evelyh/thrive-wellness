import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
  } from "react-native";
  import { NetworkContext } from "../contexts/Networking";
  import { Card, Title, Paragraph, Button } from "react-native-paper";

class DropJourneyComponent extends Component {
    static contextType = NetworkContext;


    handleJourneyDrop = async(item) => {
        const resp = await this.context.dropJourney(item.id);
        if (resp != null) {
            if (this.state.incompleteJourney.length == 1 && item.id == this.state.incompleteJourney[0]) {
                this.setState({
                    incompleteJourney: []
                });
            }else if(this.state.incompleteJourney.length == 2 && item.id == this.state.incompleteJourney[0]){
                const j = this.state.incompleteJourney[1];
                this.setState({
                    incompleteJourney: [j]
                });
            }else if (this.state.incompleteJourney.length == 2 && item.id == this.state.incompleteJourney[1]){
                const j = this.state.incompleteJourney[0];
                this.setState({
                    incompleteJourney: [j]
                });
            };
        };
    };

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener("focus", () => {
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    renderItem = ({ item }) => (
        <Card style={JourneyStyles.cardContainer}>
          <Card.Content>
            <View> 
            <Title style={{ fontSize: 25 }}>{item.name}</Title>
            </View>

            <View> 
            <Paragraph numberOfLines={4}>{item.description}</Paragraph>
            </View>
          </Card.Content>
          <Card.Actions
            style={{ margin: 0, padding: 0, justifyContent: "flex-end" }}
          >
            <Button
              labelStyle={{ fontSize: 16 , color: "#63915e"}}
              onPress={() => this.handleJourneyDrop(item)}
            >
              Drop
            </Button>
          </Card.Actions>
        </Card>
      );

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={MIStyles.MIContainer}>
                    <View style={styles.line} />
                    <Text style={styles.Heading}>
                        Current Journeys
                    </Text>
                    <FlatList
                        nestedScrollEnabled
                        data={this.props.incompleteJourney}
                        keyExtractor={(item) => item.name}
                        renderItem={this.renderItem}
                    />
                    <Button
                        mode="contained"
                        style={{ alignSelf: "center", backgroundColor: "#C9DBC5" }}
                        contentStyle={{ minHeight: 50 }}
                        labelStyle={{ fontSize: 18, color: "#486b45"}}
                        onPress={() => this.props.onBack()}
                    >
                        Back To Daily Quest
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}

// Journey styles
const JourneyStyles = StyleSheet.create({
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

  export default DropJourneyComponent;
  