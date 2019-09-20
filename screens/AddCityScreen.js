import React, {useState, useEffect} from 'react';
import {View, Button, Text, Dimensions, AsyncStorage, TextInput} from 'react-native';
import {connect} from 'react-redux';
import CircleCities from "./CircleCities";
import SearchBar from 'react-native-searchbar';
import Toast from "react-native-root-toast";

const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
    },
    textStyle: {
        color: 'darkcyan',
        fontSize: 25,
        fontWeight: 'bold'
    },
    searchBar: {
        width: width,
    }
};

const AddCityScreen = props => {
    async function handleSubmit() {
        if (name !== '') {
            await AsyncStorage.setItem('name', name);
            navigation.navigate('Welcome');
        }
    };


    useEffect(() => {
        props.navigation.setParams({showSearch: _showSearch});
    }, []);



    function _showSearch() {
        this.searchBar.show();
    }

    function storeSearch(input) {
        setSearch(input)
    }

    function handleResults() {
        dispatch({type: 'app/getWeatherInformations', payload: search})
            .then(async function (response) {
                if(response == 404){
                    let toast = Toast.show('No city found', {
                        duration: 3000,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        /*backgroundColor:'darkcyan',*/
                        delay: 0,
                    })
                }else {
                    console.log(response);
                    const cityDatas = [response]
                    await dispatch({type: 'app/setInformationsSearch', payload: cityDatas}).then(function () {
                        props.navigation.navigate('Search');
                    })
                }
            });
    }
    const {dispatch, app: {informationsSearch}} = props;
    const [search, setSearch] = useState('');


    return (
        <View style={styleSheet.container}>
            <SearchBar
                ref={(ref) => this.searchBar = ref}
                handleChangeText={storeSearch}
                onSubmitEditing={handleResults}
            />
            <CircleCities {...props}/>
        </View>
    )
}


export default connect(({app}) => ({app}))(AddCityScreen);