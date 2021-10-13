import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp1 from "../screens/Authentication/SignUp1";
import SignUp2 from "../screens/Authentication/SignUp2";
import LogIn from "../screens/Authentication/LogIn";
import Authentication from "../screens/Authentication/Authentication";

const Stack = createStackNavigator();

export default class LoginStackNavigator extends React.Component {	
	render() {
		return (
			<Stack.Navigator>
				<Stack.Screen name="Authentication" component={Authentication} />
				<Stack.Screen name="SignUp1" component={SignUp1} />
				<Stack.Screen name="SignUp2" component={SignUp2} />
				<Stack.Screen name="LogIn" component={LogIn} />
			</Stack.Navigator>
		)
	}
}
