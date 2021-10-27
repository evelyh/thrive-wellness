import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import WelcomeScreen from "./screens/WelcomeScreen";
import SplashScreen from "./screens/Authentication/SplashScreen";
import LoginStackNavigator from "./navigation/LoginStackNavigator";
import { MainStack } from "./navigation/MainStackNavigator";

import { NetworkContext, NetworkContextProvider } from "./contexts/Networking";

export default class App extends React.Component {
  state = {
    welcomeFinished: false,
  };

  onFinishWelcome = () => {
    this.setState({
      welcomeFinished: true,
    });
  };
  render() {
    const { welcomeFinished } = this.state;
    console.log("BRUH MOMENT INBOUND");

    return (
      <NetworkContextProvider>
        <NavigationContainer>
          <NetworkContext.Consumer>
            {(context) =>
              context.isLoading ? (
                <SplashScreen />
              ) : context.isAuthenticated ? (
                welcomeFinished ? (
                  <MainStack />
                ) : (
                  <WelcomeScreen finishWelcome={this.onFinishWelcome} />
                )
              ) : (
                <LoginStackNavigator />
              )
            }
          </NetworkContext.Consumer>
        </NavigationContainer>
      </NetworkContextProvider>
    );
  }
}
