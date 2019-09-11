import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
//import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import IntroScreen from "../screens/IntroScreen";
import IntroFormScreen from "../screens/IntroFormScreen";
import LogoutScreen from "../screens/LogoutScreen";
import {Text} from "react-native";

const AppStack = createStackNavigator({
        Home: HomeScreen
    },
);

const AuthStack = createStackNavigator(
    {
        SignIn: {
            screen: IntroFormScreen,
            navigationOptions: {
                title: 'Login',
                headerStyle: {
                    backgroundColor: 'darkcyan',
                },
                headerTintColor: '#fff',
            }
        },
        Welcome: {
            screen: IntroScreen,
            navigationOptions: {
                title: 'Welcome',
                headerStyle: {
                    backgroundColor: 'darkcyan',
                },
                headerTintColor: '#fff',
                headerLeft : null,
            }
        }
    }
);

const LogoutStack = createStackNavigator({
        Logout: LogoutScreen
    },
);

export default createAppContainer(
    createBottomTabNavigator(
        {
            App: {
                screen: AppStack,
                navigationOptions: {
                    tabBarIcon: ({focused, tintColor}) => {

                        const iconName = 'ios-appstore';
                        /*if(focused){
                            iconName += '-outline';
                        }*/
                        //const iconName = `ios-appstore${focused ? '' : '-outline'}`;
                        return <Ionicons name={iconName} size={25} color={tintColor}/>;
                    },
                },
            },
            Auth: {
                screen: AuthStack,
                navigationOptions: {
                    tabBarIcon: ({focused, tintColor}) => {
                        const iconName = 'ios-finger-print';
                        //const iconName = `ios-finger-print${focused ? '' : '-outline'}`;
                        return <Ionicons name={iconName} size={25} color={tintColor}/>;
                    },
                },
            },
            /*Logout: {
                screen: LogoutStack,
                navigationOptions: {
                    tabBarIcon: ({focused, tintColor}) => {
                        const iconName = 'ios-log-out';

                        //const iconName = `ios-log-out${focused ? '' : '-outline'}`;
                        return <Ionicons name={iconName} size={25} color={tintColor}/>;
                    },
                },
            },*/
        },
        {
            initialRouteName: 'Auth',
            tabBarOptions: {
                inactiveTintColor: '#ccc',
                activeTintColor: '#fffffc',
                activeBackgroundColor: '#53B5B4',
                style: {
                    backgroundColor: 'darkcyan',
                },
            }
        },
    )
)
;
