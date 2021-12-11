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
  buddies: "",
  buddy_requests: "",
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
  checkThirdJourney: () => {},
  dropJourney: () => {},

  getAllQuests: () => {},
  
  // BuddyRequest
  sendBuddyRequest: () => {},
  acceptBuddyRequest: () => {},
  rejectBuddyRequest: () => {},

  // submit a journey or quest
  uploadJourney: () => {},
  submitQuest: () => {},

  // Alerts
  displayNoConnectionAlert: () => {},
  displayInvalidInfoAlert: () => {},
});


const url = "https://intezzz.pythonanywhere.com/";
// const url = "http://localhost:8000";

export class NetworkContextProvider extends React.Component {
  state = {
    token: null,
    isAuthenticated: false,
    isLoading: true,
    isAdmin: false,
    username: "",
    journeys: [],
    incompleteJourney: {
      description: "",
      id: null,
      media: null,
      name: "",
      quests: []
    },

    buddies: [],
    buddy_requests: [],

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
      if (respJson.response == "Unsuccessful") {
        this.registerFailAlert();
      } else {
        this.registerSuccessAlert();
      }
    } catch (e) {
      console.log(e);
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
          username: login,
        });
        await this.setToken(respJson.token);
        this.checkIfAdmin();
        this.getUserMeta();
        registerForPushNotificationsAsync();
      } else {
        console.log("Authentication Failed!");
        this.WrongPasswordAlert();
        this.fetchBuddy();
        this.fetchBuddyRequest();
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
      username: "",
      buddies: [],
      buddy_requests: [],
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
    // this.setState({
    //   incompleteJourney: {
    //     description: respJson.description,
    //     id: respJson.id,
    //     media: respJson.media,
    //     name: respJson.name,
    //     quests: respJson.quests
    //   }
    // });
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
      this.displayDropJourneyAlert();
      if (respJson.success == "Success") {
        return respJson;
      }else{
        return null;
      }
    } catch (e) {
      console.log(e);
      this.displayNoConnectionAlert();
      return [];
    }
  };

  // Set a particular quest to be complete with given id
  completeQuest = async (
    journeyId,
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
        jid: journeyId,
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

  
  checkThirdJourney = async (jid) => {
    const data = {
      method: "GET",
      headers:{
        Authorization: "Token " + this.state.token,
      }
    };
    try{
      let fetchResponse = await fetch(
        url + "/api/progress/incompleteJourney/", data
      );
      const respJson = await fetchResponse.json();
      const respLis = [];
      for(let i = 0; i < respJson.length; i++){
        respLis.push(respJson[i].id);
      }
      if(respLis.length == 2 && !(respLis.includes(jid)) ){
        this.displayThirdJourneyAlert();
        return null;
      }
      return respJson;
    } catch(e){
      console.log(e);
      this.displayNoConnectionAlert();
      return null;
    }
  };

  getAllQuests = async () => {
    const data = {
      method: "GET",
    };
    try{
      let fetchResponse = await fetch(
        url + "/api/journeys/allquests/", data
      );
      const respJson = await fetchResponse.json();
      return respJson;
    } catch(e){
      console.log(e);
      this.displayNoConnectionAlert();
      return null;
      };
  };

  sendBuddyRequest = async (buddy) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
         Authorization: null,
      },
      body: JSON.stringify({
        from: this.state.username,
        to: buddy,
      }),
    };
    if (buddy == this.state.username) {
      this.SameNameAlert();
    } else {
      try {
        let fetchResponse = await fetch(
          url + "/api/auth/send_buddy_request/",
          data
        );
        let respJson = await fetchResponse.json();
        if (respJson.response == "Buddy request sent!") {
          this.buddyRequestSuccessAlert();
        } else if (respJson.response == "Buddy request already sent!") {
          this.buddyRequestSuccessAlert();
        } else if (respJson.response == "Same User") {
          this.SameNameAlert();
        } else if (respJson.response == "Already buddy!") {
          this.alreadyBuddyRequestSuccessAlert();
        } else if (respJson.response == "No such user") {
          this.noUserAlert();
        } else if (respJson.response == "Buddies") {
          this.nowBuddiesAlert();
        }
      } catch (e) {
        console.log(e);
      }
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

  acceptBuddyRequest = async (buddy) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
      body: JSON.stringify({
        from: buddy,
        to: this.state.username,
      }),
    };
    try {
      let fetchResponse = await fetch(
        url + "/api/auth/accept_buddy_request/",
        data
      );
    } catch (e) {
      console.log(e);
    }
  };

  rejectBuddyRequest = async (buddy) => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
      body: JSON.stringify({
        from: buddy,
        to: this.state.username,
      }),
    };
    try {
      let fetchResponse = await fetch(
        url + "/api/auth/reject_buddy_request/",
        data
      );
    } catch (e) {
      console.log(e);
    }
  };

  fetchBuddyRequest = async () => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
      body: JSON.stringify({
        user: this.state.username,
      }),
    };
    try {
      fetch(url + "/api/auth/fetch_buddy_request/", data)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            buddy_requests: data.requests,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  fetchBuddy = async () => {
    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: null,
      },
      body: JSON.stringify({
        user: this.state.username,
      }),
    };
    try {
      fetch(url + "/api/auth/fetch_buddy/", data)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            buddies: data.requests,
          });
        });
    } catch (e) {
      console.log(e);
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


  displayGetJourneyAlert = () => {
    Alert.alert("Connection Error", "Failed to get journeys", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

      
  WrongPasswordAlert = () => {
    Alert.alert("Login Unsuccessful", "Wrong Username and/or Password", [
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

  displayThirdJourneyAlert = () => {
    Alert.alert("Third Journey", "You've already had two journeys in progress, please finish them before you start a new one",
    [
      {
      text: "Close",
      style: "cancel",
      },
      {text:"Drop a journey"
      }
    ]);
  }

  displayDropJourneyAlert = () => {
    Alert.alert("Drop Journey", "Successfully",
    [
      {
      text: "Close",
      style: "cancel",
      },
    ]);
  }

  registerSuccessAlert = () => {
    Alert.alert(
      "Registration Successful",
      "Please check your email inbox for a confirmation email",
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  registerFailAlert = () => {
    Alert.alert(
      "Registration Unsuccessful",
      "An account is already registered with your email and/or username",
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  buddyRequestSuccessAlert = () => {
    Alert.alert(
      "Buddy Request Successful",
      "An accountability buddy request has been sent!",
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  alreadyBuddyRequestSuccessAlert = () => {
    Alert.alert("Already Buddies", "You two are already buddies!", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  noUserAlert = () => {
    Alert.alert("Buddy Request Unsuccessful", "The user does not exist", [
      {
        text: "Close",
        style: "cancel",
      },
    ]);
  };

  nowBuddiesAlert = () => {
    Alert.alert(
      "Buddy Request Successful",
      "Your buddy also sent you a buddy request so you two are officially buddy!",
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
  };

  SameNameAlert = () => {
    Alert.alert(
      "Buddy Request Unsuccessful",
      "You can't send a buddy request to yourself",
      [
        {
          text: "Close",
          style: "cancel",
        },
      ]
    );
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
          sendBuddyRequest: this.sendBuddyRequest,
          acceptBuddyRequest: this.acceptBuddyRequest,
          rejectBuddyRequest: this.rejectBuddyRequest,
          loadToken: this.loadToken,
          // Cached data and methods to retrieve them
          journeys: this.state.journeys,
          userInfo: this.state.userInfo,

          getJourneys: this.getJourneys,
          getIncompleteJourney: this.getIncompleteJourney,

          buddies: this.state.buddies,
          buddy_requests: this.state.buddy_requests,

          // Methods to retrieve non-cached data
          getJourneyInfo: this.getJourneyInfo,
          getJourneyProgress: this.getJourneyProgress,


          // Method to complete quest
          completeQuest: this.completeQuest,
          checkThirdJourney: this.checkThirdJourney,
          getAllQuests: this.getAllQuests,
          dropJourney: this.dropJourney,

          // methods to submit user-defined quest / journey
          uploadJourney: this.uploadJourney,
          submitQuest: this.submitQuest,

          // Alerts
          displayNoConnectionAlert: this.displayNoConnectionAlert,
          displayInvalidInfoAlert: this.displayInvalidInfoAlert,
          displayDropJourneyAlert: this.displayDropJourneyAlert,
          WrongPasswordAlert: this.WrongPasswordAlert,
          registerFailAlert: this.registerFailAlert,
          registerSuccessAlert: this.registerSuccessAlert,
          buddyRequestSuccessAlert: this.buddyRequestSuccessAlert,
          SameNameAlert: this.SameNameAlert,
          nowBuddiesAlert: this.nowBuddiesAlert,
          noUserAlert: this.noUserAlert,
          alreadyBuddyRequestSuccessAlert: this.alreadyBuddyRequestSuccessAlert,

          fetchBuddyRequest: this.fetchBuddyRequest,
          fetchBuddy: this.fetchBuddy,
        }}
      >
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
