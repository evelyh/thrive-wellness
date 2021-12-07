import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import HappinessTree from "../screens/HappinessTree";
import JourneyScreen from "../screens/JourneyScreen";
import QuestScreen from "../screens/QuestScreen";
import QuestFeedbackScreen from "../screens/QuestFeedbackScreen";
import DailyQuestScreen from "../screens/DailyQuestScreen";
import Friends from "../screens/Friends";
import Profile from "../screens/Profile";
import Playground from "../screens/Playground";
import CreateJourneyScreen from "../screens/JourneyManagement/CreateJourneyScreen";
import CreateQuestScreen from "../screens/JourneyManagement/CreateQuestScreen";
import ManageAllJourneysScreen from "../screens/JourneyManagement/ManageAllJourneysScreen";
import ManageJourneyScreen from "../screens/JourneyManagement/ManageJourneyScreen";
import ManageQuestScreen from "../screens/JourneyManagement/ManageQuestScreen";
import { NetworkContext } from "../contexts/Networking";
import { TouchableOpacity, Image, Button, Modal } from "react-native";
import { Icon } from "react-native-elements";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Stackk = createStackNavigator();



export class MainStackNavigator extends React.Component {
  static contextType = NetworkContext;

  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const modules = {
              Tree: "MaterialComm",
              Journey: "Entypo",
              Daily: "MaterialIcons",
              Friends: "FontAwesome",
              Profile: "FontAwesome",
            };
            const icons = {
              Tree: "tree",
              Journey: "flower", // or Leaf, rainbow,
              Daily: "today",
              Friends: "user-friends",
              Profile: "user-alt",
            };

            if (modules[route.name] === "MaterialComm")
              return (
                <MaterialCommunityIcons
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            else if (modules[route.name] === "MaterialIcons")
              return (
                <MaterialIcons
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            else if (modules[route.name] === "FontAwesome")
              return (
                <FontAwesome5
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            else if (modules[route.name] === "Entypo")
              return (
                <Entypo name={icons[route.name]} color={color} size={size} />
              );
          },
        })}
      >
        <Tab.Screen name="Tree" component={HappinessTree} />
        <Tab.Screen name="Journey" component={JourneyScreen} />
        <Tab.Screen
          name="Daily"
          component={DailyQuestScreen}
          options={{
            title: "Daily Quest",
          }}
        />
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}



export class MainStack extends React.Component {
  handleSettings = () => {
    navigation.goBack
    console.log("Settings button")
  };

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainStackNavigator}
          options={({ route, navigation }) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <Icon
                reverse
                name= 'ios-settings'
                type='ionicon'
                color='#517fa4'
                // onPress={this.handleSettings}
              />
            ),
          })}
        />
        <Stack.Screen name="Quest" component={QuestScreen} />
        <Stack.Screen name={"Feedback"} component={QuestFeedbackScreen} />
        <Stack.Screen name="Create Journey" component={CreateJourneyScreen} />
        <Stack.Screen
          name="Create Quest"
          component={CreateQuestScreen}
          initialParams={{
            journeys: [],
          }}
        />
        <Stack.Screen
          name="Manage Journeys"
          component={ManageAllJourneysScreen}
        />
        <Stack.Screen name="Manage Journey" component={ManageJourneyScreen} />
        <Stack.Screen name="Manage Quest" component={ManageQuestScreen} />
      </Stack.Navigator>
    );
  }
}

export class OtherStack extends React.Component {
  render() {
    return (
      <Stackk.Navigator>
        <Stack.Screen name="Daily" component={DailyQuestScreen}/>
        <Stackk.Screen name="Playground" component={Playground}/>
      </Stackk.Navigator>
    )
  }
}

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Tree";

  switch (routeName) {
    case "Tree":
      return "Happiness Tree";
    case "Journey":
      return "Journey";
    case "Daily":
      return "Daily Quest";
    case "Friends":
      return "Friends";
    case "Profile":
      return "Profile";
  }
}
