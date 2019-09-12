import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, Dimensions, AsyncStorage} from 'react-native';

const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameStyle: {
        color: 'darkcyan',
        fontSize: 18,
        fontWeight: 'bold'
    },
    baseLine: {
        color: '#999',
        fontSize: 12,
        fontWeight: 'bold'
    },
};

const IntroScreen = props => {
    useEffect(() => {
        async function getName() {
            const temp = await AsyncStorage.getItem('name');
            setName(temp);
        }
        getName();
    }, []);
    useEffect(() => {
        let timer = setTimeout(() => {
            props.navigation.navigate('App');
        }, 5000)
    }, []);


    const [name, setName] = useState('');

    return (
        <View style={styleSheet.container}>
            <Text style={styleSheet.nameStyle}>Successfully logged in</Text>
            <Text style={styleSheet.baseLine}>Please wait</Text>
        </View>
    )
};
IntroScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired
};

export default connect()(IntroScreen);