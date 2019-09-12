import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, AsyncStorage, SafeAreaView, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {ListItem} from "react-native-elements";
import {Ionicons} from '@expo/vector-icons';


const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',

    },
    textName: {
        color: 'darkcyan',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        flexDirection: 'row',
    },
    textBaseLine:{
        color: '#aaa',
        fontSize: 14,
        display:'flex',
        flex: 1,
        flexDirection: 'row',
    },
    list: {
        width: '100%'

    },
    item: {
        padding:10,
        //backgroundColor: '#aaa',
        borderBottomWidth:1,
        borderColor:'#ccc',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    listIcon:{
        marginRight:10,
        marginTop:4,
    },
    weatherIcon:{
        width:50,
        height:50,
    }
};


function Item(item) {
    return (
        <View style={styleSheet.item}>
            <Ionicons  style={styleSheet.listIcon} name='ios-reorder' size={25} color='#999'/>
            <Text style={styleSheet.textName}>{item.data.name}</Text>
            <Text style={styleSheet.textBaseLine}>{item.data.main.temp}°C</Text>
            <Image
                style={styleSheet.weatherIcon}
                source={{uri: `http://openweathermap.org/img/wn/${item.data.weather[0].icon}.png`}}
            />
        </View>
    );
}

const HomeScreen = props => {
    useEffect(() => {
        dispatch({type: 'app/getWeatherInformations'})
    }, []);

    useEffect(() => {
            if (informations.length > 0) {
                setCityInfos(informations);
                /*console.log("useEffect");
                console.log(informations);*/
            }
        }
    );


    const {dispatch, app: {informations}} = props;
    const [cityInfos, setCityInfos] = useState('');
    /*const [nameCity, setNameCity] = useState('');
    const [temp, setTemp] = useState('');*/

    return (

        <SafeAreaView style={styleSheet.container}>
            <FlatList
                style={styleSheet.list}
                data={cityInfos}
                renderItem={({item}) => <Item data={item}/>}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

HomeScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.shape({
        informations: PropTypes.array,
    }).isRequired
};


export default connect(({app}) => ({app}))(HomeScreen);