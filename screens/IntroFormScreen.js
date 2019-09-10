import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, TextInput, Button, Dimensions, AsyncStorage} from "react-native";

const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: 'black',
        fontSize: 18,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
    }
};

const IntroFormScreen = props => {
    async function handleSubmit() {
        if (name !== '') {
            await AsyncStorage.setItem('name', name);
            navigation.navigate('Welcome');
        }
    };


    const [name, setName] = useState('');
    const {dispatch, navigation} = props;

    return (
        <View style={styleSheet.container}>
            <Text style={styleSheet.label}>Prénom</Text>
            <TextInput
                style={styleSheet.input}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <Button
                onPress={handleSubmit}
                title="OK"
                color={"#841584"}
            />
        </View>
    )
};

IntroFormScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }).isRequired
};

export default connect()(IntroFormScreen);