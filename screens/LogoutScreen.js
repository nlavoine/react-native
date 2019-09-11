import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, View, AsyncStorage, Text} from "react-native";

let tempName = AsyncStorage.getItem('name');

const LogoutScreen = props => {
    _bootstrapAsync = async () => {
        if (AsyncStorage.getItem('name') !== '') {
            await AsyncStorage.setItem('name', '');
            //props.navigation.navigate('SignIn');
        }
    };
    useEffect(() => {
        _bootstrapAsync();
    }, []);

    return (
        <View>
            <Text>Successfully logged out</Text>
            <Text>Goodbye </Text>
        </View>
    );
};

LogoutScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

export default LogoutScreen;