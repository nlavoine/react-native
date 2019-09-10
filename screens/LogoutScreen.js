import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, View, AsyncStorage} from "react-native";
import Text from "react-native-web/dist/exports/Text";

const LogoutScreen = props => {
    _bootstrapAsync = async () => {
        if (AsyncStorage.getItem ('name')!== '') {
            await AsyncStorage.setItem('name', '');
            props.navigation.navigate('SignIn');
        }
    };



    useEffect(() => {
        _bootstrapAsync();
    }, []);

    return (
        <View>
            <Text>Successfully logged out</Text>
            <StatusBar barStyle="default"/>
        </View>
    );
};

LogoutScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired,
};

export default LogoutScreen;