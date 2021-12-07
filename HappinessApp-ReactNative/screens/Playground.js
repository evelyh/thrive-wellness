import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { NetworkContext } from "../contexts/Networking";

export default class Playground extends React.Component{
    static contextType = NetworkContext;

    componentDidMount= async() => {
        this._unsubscirbe  = this.props.navigation.addListener("focus", () => {
            
        });
    };

    renderItem = ({item}) => (
        <Card style={[cardStyles.cardContainer]}>
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
          labelStyle={{ fontSize: 16, color: "#63915e"}}
          onPress={() => this.props.navigation.navigate("Quest", {quest: item, journey: null})}
        >
          Start Quest
        </Button>
      </Card.Actions>
        </Card>
    );

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View style={MIStyles.MIContainer}>
                <FlatList
                nestedScrollEnabled
                data={this.props.allQuests}
                keyExtractor = {(item) => item.name}
                renderItem={this.renderItem}
                ></FlatList>
                <Button 
                mode="contained"
                style={{ alignSelf: "center", backgroundColor: "#C9DBC5" }}
                contentStyle={{ minHeight: 50 }}
                labelStyle={{ fontSize: 18, color: "#486b45"}}
                onPress={() => this.props.onBack()}>
                    Back to Daily Quest screen
                </Button>
            </View>
            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    play:{
      opacity: 0.8,
      position: "absolute",
      top: 35,
      left: 185,
      backgroundColor: "transparent",
      color: 'white',
    },
    container: {
      flex: 1,
      alignItems: "center",
    },
    image: {
      width: 425,
      height: 150,
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