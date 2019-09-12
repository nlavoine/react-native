import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import AddCityScreen from "../screens/AddCityScreen";
//import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import IntroScreen from "../screens/IntroScreen";
import IntroFormScreen from "../screens/IntroFormScreen";
import {Button, Text} from "react-native";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";


const AppStack = createStackNavigator({
        Home: HomeScreen
    }, {
        navigationOptions: {
            title: 'Welcome',
            headerStyle: {
                backgroundColor: 'darkcyan',
            },
            headerMode: "screen",
            headerTintColor: '#fff',
        }
    }
);

const LoginStack = createStackNavigator(
    {
        SignIn: {
            screen: IntroFormScreen,
            navigationOptions: {
                tabBarVisible: false,
                title: 'Login',
                headerLeft: null,
                gesturesEnabled: false,
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
                headerLeft: null,
                gesturesEnabled: false,
                headerStyle: {
                    backgroundColor: 'darkcyan',
                },
                headerTintColor: '#fff',

            }
        }
    }
)

const AuthStack = createStackNavigator(
    {
        AuthLoading: {
            screen: AuthLoadingScreen,
        },
        AuthLogin: {
            screen: LoginStack
        }

    }
);


const TabNav = createBottomTabNavigator(
    {
        App: {
            screen: AppStack,
            navigationOptions: {
                tabBarIcon: ({focused, tintColor}) => {

                    const iconName = 'ios-appstore';

                    return <Ionicons name={iconName} size={25} color={tintColor}/>;
                },
            },
        },
        AddCity: {
            screen: AddCityScreen,
            navigationOptions: {
                tabBarIcon: ({focused, tintColor}) => {
                    const iconName = 'ios-add';
                    //const iconName = `ios-finger-print${focused ? '' : '-outline'}`;
                    return <Ionicons name={iconName} size={25} color={tintColor}/>;
                },
            },
        },
    },
    {
        tabBarOptions: {
            inactiveTintColor: '#ccc',
            activeTintColor: '#ffffff',
            activeBackgroundColor: '#53B5B4',
            style: {
                backgroundColor: 'darkcyan',
            },
        },

    },
)


/*const LogoutStack = createStackNavigator({
        Logout: LogoutScreen
    },
);*/


export default createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthStack,
            Home: TabNav,

        },
        {
            initialRouteName: 'Auth',
            defaultNavigationOptions: {
                tabBarVisible: false,
                headerStyle: {
                    backgroundColor: 'darkcyan',
                },
                headerTintColor: '#fff',
            },
        },
    )
)

