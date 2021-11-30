import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import { registerForPushNotificationsAsync } from "./networkingHelpers/notifications";

export const NetworkContext = React.createContext({
  // User Authentication and info
  token: null,
  isAuthenticated: false,
  isLoading: true,
  isAdmin: false,
  signUp: () => {},
  signIn: () => {},
  signOut: () => {},
  loadToken: () => {},
  // Cached data and methods to retrieve it
  incompleteJourney: {
    description: "",
    id: null,
    media: null,
    name: "",
    quests: []
  },
  journeys: [],
  userInfo: {
    firstname: "",
    lastname: "",
    age: -1,
  },

  getJourneys: () => {},
  getIncompleteJourney: () => {},
  // Methods to retrieve non-cached data
  getJourneyInfo: () => {},
  getJourneyProgress: () => {},

  // Methods to complete a quest
  completeQuest: () => {},

  // Alerts
  displayNoConnectionAlert: () => {},
});

const url = "http://localhost:8000";

export class NetworkContextProvider extends React.Component {
  state = {
    token: null,
    isAuthenticated: false,
    isLoading: true,
    isAdmin: false,

    journeys: [],
    incompleteJourney: {
      description: "",
      id: null,
      media: null,
      name: "",
      quests: []
    },
    userInfo: {
      firstname: "",
      lastname: "",
      age: -1,
    },
  };

  // Send new user registration date to the server, get new token
  signUp = async (username, password, email, firstName, lastName, age, sex) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        username: username,
        email: email,
        password: password,
        age: age,
        sex: sex,
      }),
    };
    try {
      let fetchResponse = await fetch(url + "/api/auth/register/", data);
      let respJson = await fetchResponse.json();
      if (respJson.token) {
        this.setState({
          token: respJson.token,
          isAuthenticated: true,
        });
        await this.setToken(respJson.token);
        this.checkIfAdmin();
        this.getUserMeta();
        registerForPushNotificationsAsync();
      }
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
    }
  };

  // Send username/password to the server, get token
  signIn = async (login, password) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    };
    try {
      let fetchResponse = await fetch(url + "/api/auth/login/", data);
      let respJson = await fetchResponse.json();

      if (respJson.token) {
        console.log("Authenticated!");
        this.setState({
          token: respJson.token,
          isAuthenticated: true,
        });
        await this.setToken(respJson.token);
        this.checkIfAdmin();
        this.getUserMeta();
        registerForPushNotificationsAsync();
      } else {
        console.log("Authentication Failed!");
      }
    } catch (e) {
      this.displayNoConnectionAlert();
    }
  };

  // SignOut
  signOut = async () => {
    this.setState({
      token: null,
      isAuthenticated: false,
      isAdmin: false,
    });

    await this.removeToken();
  };

  // Load token
  loadToken = async () => {
    await AsyncStorage.getItem("token").then((value) => {
      console.log("Retrieved token: ", value);
      if (value == null) {
        this.setState({
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      } else {
        this.setState({
          token: value,
          isAuthenticated: true,
          isLoading: false,
        });
        registerForPushNotificationsAsync();
      }
    });
    await this.checkIfAdmin();
  };

  // Set token
  setToken = async (token) => {
    await AsyncStorage.setItem("token", token);
  };

  // Remove token from the storage
  removeToken = async () => {
    await AsyncStorage.removeItem("token");
  };

  // Check if user is an Admin
  checkIfAdmin = async () => {
    const data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.token,
      },
    };
    try {
      let response = await fetch(url + "/api/auth/is_admin/", data);
      let respJson = await response.json();
      if (respJson.status) {
        this.setState({
          isAdmin: true,
        });
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
      return false;
    }
  };

  getUserMeta = async () => {
    const data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.token,
      },
    };
    try {
      let response = await fetch(url + "/api/auth/get_user_meta/", data);
      let respJson = await response.json();
      this.setState({
        userInfo: {
          firstname: respJson.firstname,
          lastname: respJson.lastname,
          age: respJson.age,
        },
      });
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
    }
  };

  // Get journeys from the server
  getJourneys = async () => {
    console.log("Beginning journeys fetch");
    const data = {
      method: "GET",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    try {
      let fetchResponse = await fetch(url + "/api/journeys/", data);
      let respJson = await fetchResponse.json();
      this.setState({
        journeys: respJson,
      });
    } catch (e) {
      this.displayGetJourneyAlert();
    }
  };

 // Get the information of the incomplete journey
 getIncompleteJourney = async () => {
  console.log("Beginning daily quests fetch");
  const data = {
    method: "GET",
    headers: {
      Authorization: "Token " + this.state.token,
    },
  };
  try {
    let fetchResponse = await fetch(url + "/api/progress/incompleteJourney/", data);
    if(fetchResponse == null) {return null;}
    let respJson = await fetchResponse.json();
    this.setState({
      incompleteJourney: {
        description: respJson.description,
        id: respJson.id,
        media: respJson.media,
        name: respJson.name,
        quests: respJson.quests
      }
    });
    return respJson;
  } catch (e) {
    console.log(e);
    this.displayNoDailyQuestAlert();
    return null;
  }
};

  // Get info of a particular journey with given id
  getJourneyInfo = async (journeyId) => {
    const data = {
      method: "GET",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    try {
      let fetchResponse = await fetch(
        url + "/api/journeys/" + journeyId + "/",
        data
      );
      const respJson = await fetchResponse.json();
      // let Response = await fetch(
      //    url + "api/journeys/" + journeyId + "/quests/", data);
      
      // const Json = await Response.json();
      // respJson.quests = Json;
      return respJson;
    } catch (e) {
      this.displayNoConnectionAlert();
      return [];
    }
  };

  // Get progress of a particular journey with given id
  getJourneyProgress = async (journeyId) => {
    const data = {
      method: "GET",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    try {
      let fetchResponse = await fetch(
        url + "/api/progress/getJourneyProgress/" + journeyId + "/",
        data
      );
      const respJson = await fetchResponse.json();
      return respJson;
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
      return [];
    }
  };

  // Drop a journey based on the given jid
  dropJourney = async (journeyId) => {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    try {
      let fetchResponse = await fetch(
        url + "/api/progress/dropJourney/" + journeyId + "/",
        data
      );
      const respJson = await fetchResponse.json();
      return respJson;
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
      return [];
    }
  };

  // Set a particular quest to be complete with given id
  completeQuest = async (
    questId,
    answer,
    feelingRating,
    questRating,
    surveyAnswer
  ) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.token,
      },
      body: JSON.stringify({
        answer: answer,
        feeling_rating: feelingRating,
        quest_rating: questRating,
        survey_answer: surveyAnswer,
      }),
    };
    try {
      let fetchResponse = await fetch(
        url + "/api/progress/completeQuest/" + questId + "/",
        data
      );
      const respJson = await fetchResponse.json();
      return respJson;
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
      return [];
    }
  };

  // Alerts
  displayNoConnectionAlert = () => {
    Alert.alert("Connection Error", "Failed to connect to the server", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };


  displayGetJourneyAlert = () => {
    Alert.alert("Connection Error", "Failed to get journeys", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  displayNoDailyQuestAlert = () => {
    Alert.alert("No Daily Quests", "Please start a new journey", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };


  render() {
    return (
      <NetworkContext.Provider
        value={{
          // User auth and info
          token: this.state.token,
          isAuthenticated: this.state.isAuthenticated,
          isLoading: this.state.isLoading,
          isAdmin: this.state.isAdmin,
          signUp: this.signUp,
          signIn: this.signIn,
          signOut: this.signOut,
          loadToken: this.loadToken,
          // Cached data and methods to retrieve them
          journeys: this.state.journeys,
          userInfo: this.state.userInfo,

          getJourneys: this.getJourneys,
          getIncompleteJourney: this.getIncompleteJourney,
          // Methods to retrieve non-cached data
          getJourneyInfo: this.getJourneyInfo,
          getJourneyProgress: this.getJourneyProgress,
          

          // Method to complete quest
          completeQuest: this.completeQuest,

          // Alerts
          displayNoConnectionAlert: this.displayNoConnectionAlert,
        }}
      >
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
