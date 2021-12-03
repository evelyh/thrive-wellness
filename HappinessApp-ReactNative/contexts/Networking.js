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
  journeys: [],
  userInfo: {
    firstname: "",
    lastname: "",
    age: -1,
  },

  getJourneys: () => {},
  // Methods to retrieve non-cached data
  getJourneyInfo: () => {},
  getJourneyProgress: () => {},

  // Methods to complete a quest
  completeQuest: () => {},

  // submit a journey or quest
  uploadJourney: () => {},
  submitQuest: () => {},

  // Alerts
  displayNoConnectionAlert: () => {},
  displayInvalidInfoAlert: () => {},
});

const url = "http://xxx.xxx.x.xxx:8050";

export class NetworkContextProvider extends React.Component {
  state = {
    token: null,
    isAuthenticated: false,
    isLoading: true,
    isAdmin: false,

    journeys: [],
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
      // this.state.journeys = await respJson
      this.setState({
        journeys: respJson,
      });
    } catch (e) {
      this.displayNoConnectionAlert();
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

  // submit journey
  uploadJourney = async (
      journeyName,
      journeyDescription,
      quests,
      emaill,
      namae
  ) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.token,
      },
      body: JSON.stringify({
        name: journeyName,
        description: journeyDescription,
        email: emaill,
        user_name: namae,
        quests: quests
      }),
    };
    console.log(emaill)
    console.log(namae)
    console.log(data)
    try{
      let fetchResponse = await fetch(
          url + "/api/journeys/submit-journeys", data
      );
      const respJson = await fetchResponse.json();
      if (!fetchResponse.ok){
        throw new Error();
      }
      else {
        this.displaySuccessAlert();
      }
      return respJson;
    } catch (e){
      console.log(e);
      this.displayInvalidInfoAlert();
      return [];
    }
  };

  // submit quest
  submitQuest = async (
      quests,
      user_name,
      email
  ) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Token " + this.state.token,
      },
      body: JSON.stringify({
        quests: quests,
        user_name: user_name,
        email: email
      }),
    };
    try{
      let fetchResponse = await fetch(
          url + "/api/journeys/submit-quests", data
      );
      const respJson = await fetchResponse.json();
      if (!fetchResponse.ok){
        throw new Error();
      }
      else {
        this.displaySuccessAlert();
      }
      return respJson;
    } catch (e){
      console.log(e);
      this.displayInvalidInfoAlert();
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

  displayInvalidInfoAlert = () => {
    Alert.alert("Error", "Provided information incorrect, please try again", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  displaySuccessAlert = () => {
    Alert.alert("Success!", "Your journey/quest is submitted successfully", [
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

          // Methods to retrieve non-cached data
          getJourneyInfo: this.getJourneyInfo,
          getJourneyProgress: this.getJourneyProgress,

          // Method to complete quest
          completeQuest: this.completeQuest,

          // methods to submit user-defined quest / journey
          uploadJourney: this.uploadJourney,
          submitQuest: this.submitQuest,

          // Alerts
          displayNoConnectionAlert: this.displayNoConnectionAlert,
          displayInvalidInfoAlert: this.displayInvalidInfoAlert,
        }}
      >
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
