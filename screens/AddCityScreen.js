import React, {useState, useEffect} from 'react';
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
        color: 'darkcyan',
        fontSize: 25,
        fontWeight: 'bold'
    },
};

const AddCityScreen = props => {

    return (
        <View style={styleSheet.container}>
            <Text style={styleSheet.textStyle}>AddCity</Text>

        </View>
    )
}


export default connect()(AddCityScreen);