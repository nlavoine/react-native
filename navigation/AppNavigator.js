import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from "../screens/HomeScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import IntroScreen from "../screens/IntroScreen";
import IntroFormScreen from "../screens/IntroFormScreen";

import LogoutScreen from "../screens/LogoutScreen";
//import {createBottomTabNavigator} from "react-navigation-tabs/src/index";

const AppStack = createStackNavigator({
        Home: HomeScreen
    },
);
const AuthStack = createStackNavigator(
    {
        SignIn: IntroFormScreen,
        Welcome: {
            screen: IntroScreen,
            navigationOptions: {
                header: null
            }
        }
    }
);

export default createAppContainer(
    createBottomTabNavigator(
        {
            App: AppStack,
            Auth: AuthStack,
            Logout: LogoutScreen,
        },
        {
            initialRouteName: 'Auth',
        },
    )
);
