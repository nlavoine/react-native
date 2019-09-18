import React, {useState, useEffect} from 'react';
import {View, Button, Text, Dimensions, AsyncStorage, TextInput} from 'react-native';
import {connect} from 'react-redux';
import CircleCities from "./CircleCities";

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
        color: 'darkcyan',
        fontSize: 25,
        fontWeight: 'bold'
    },
};

const AddCityScreen = props => {

    async function handleSubmit() {
        if (name !== '') {
            await AsyncStorage.setItem('name', name);
            navigation.navigate('Welcome');
        }
    };
    const [cityToAdd, setCityToAdd] = useState('');

    return (
        <View style={styleSheet.container}>
            <CircleCities {...props}/>
        </View>
    )
}


export default connect()(AddCityScreen);