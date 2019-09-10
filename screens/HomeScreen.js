import React from 'react';
import {View, Button, Text, Dimensions, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold'
    },
};

const HomeScreen = props => {
    async function removeStorage() {
        if (AsyncStorage.getItem ('name')!== '') {
            await AsyncStorage.setItem('name', '');
            props.navigation.navigate('SignIn');
        }
    }

    return (
        <View style={styleSheet.container}>
            <Text style={styleSheet.textStyle}>Hello ! </Text>
            <Button onPress={removeStorage} title="Remove Storage !"/>
        </View>
    )
}


export default connect()(HomeScreen);