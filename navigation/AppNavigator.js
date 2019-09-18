import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import AddCityScreen from "../screens/AddCityScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import IntroScreen from "../screens/IntroScreen";
import IntroFormScreen from "../screens/IntroFormScreen";
import {Button, Text} from "react-native";



const AppStack = createStackNavigator({
        Home: HomeScreen
    }, {
    defaultNavigationOptions: {
            title: 'Welcome',
            headerStyle: {
                backgroundColor: 'darkcyan',
            },
            headerMode: "screen",
            headerTintColor: '#fff',
        }
    }
);
const AddCityStack = createStackNavigator({
        Home: AddCityScreen
    }, {
        defaultNavigationOptions: {
            title: 'Add a city',
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
            defaultNavigationOptions: {
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
            defaultNavigationOptions: {
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

                    const iconName = 'ios-star';

                    return <Ionicons name={iconName} size={25} color={tintColor}/>;
                },
            },
        },
        AddCity: {
            screen: AddCityStack,
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
            showLabel: false,
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
            AuthLoading:AuthLoadingScreen,
            Auth: AuthStack,
            App: TabNav,


        },
        {
            initialRouteName: 'AuthLoading',
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

