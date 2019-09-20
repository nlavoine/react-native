import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Dimensions,
    AsyncStorage,
    SafeAreaView,
    FlatList,
    TouchableHighlight,
    Image,
    RefreshControl,
    ScrollView, TouchableOpacity, ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {ListItem} from "react-native-elements";
import {Ionicons} from '@expo/vector-icons';
import {SwipeListView} from 'react-native-swipe-list-view';


const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',

    },
    textContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },

    textName: {
        flex: 1,
        color: 'darkcyan',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop:10,
    },
    textBaseLine: {
        flex: 1,
        width: '100%',
        color: '#aaa',
        padding: 0,
        fontSize: 14,
    },
    list: {
        width: '100%',
    },
    item: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:60,
        backgroundColor: '#FFF',
    },
    listIcon: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 8,
        padding:6,
    },
    weatherIcon: {
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
    },
    deleteIcon: {
        marginRight: 15,
        marginTop: 8,
        padding: 10,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#cc0000',
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        height:60,
    },
    iconContainer:{
        padding:10,
        paddingLeft:15,
        paddingRight:15,
        marginRight:10,
    }
};


function Item(props) {
    const {dispatch} = props;

    const [information, setInformation] = useState(null);

    async function getDatas() {
        await dispatch({type: 'app/getWeatherInformations', payload: props.data})
            .then(async function (response) {
                setInformation(response);
            });
    }

    useEffect(() => {
        getDatas();
    }, []);


    if (information) {
        return (
            <View style={styleSheet.item} >
                <Ionicons style={styleSheet.listIcon} name='ios-reorder' size={25} color='#999'/>
                <Image
                    style={styleSheet.weatherIcon}
                    source={{uri: `http://openweathermap.org/img/wn/${information.weather[0].icon}.png`}}
                />
                <View style={styleSheet.textContainer}>
                    <Text style={styleSheet.textName}>{information.name}</Text>
                    <Text style={styleSheet.textBaseLine}>Temp. :{information.main.temp}°C</Text>
                </View>
                <TouchableHighlight style={styleSheet.iconContainer} onPress={() => {dispatch({type: 'app/setDetails', payload: information}); props.navigation.navigate('Details');}}>
                    <Ionicons  name='ios-arrow-forward' size={25} color='#999'/>
                </TouchableHighlight>

            </View>
        );
    } else {
        return (
            <View style={styleSheet.item}>
                <ActivityIndicator size="small" color="darkcyan" style={styleSheet.textName}/>
            </View>
        )
    }
}

const HomeScreen = props => {


    useEffect(() => {
        //_bootstrapAsync();
        AsyncStorage.getItem('favCities')
            .then(req => JSON.parse(req))
            .then(json => {
                //return json
                dispatch({type: 'app/setCities', payload: {cities: json}})
                //dispatch({type: 'app/getWeatherInformations'})
            })
    }, [cities]);

    function _onRefresh() {
        console.log("refresh");
        setRefreshing(true);
    }

    function _deleteCity(cityName) {
        dispatch({type: 'app/deleteCity', payload: {city: cityName}});
    }

    const {dispatch, app: {informations, cities}, loading} = props;
    const [refreshing, setRefreshing] = useState(false);
    //console.log(props);
    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={_onRefresh}
            />
        }>
            <SafeAreaView style={styleSheet.container}>
                {!loading ?

                    <SwipeListView
                        style={styleSheet.list}
                        data={cities}
                        renderItem={({item}) => <Item data={item} {...props}/>}
                        renderHiddenItem={(data, rowMap) => (
                            <View style={styleSheet.rowBack}>
                                <Text>Delete</Text>
                                <Ionicons style={styleSheet.deleteIcon} name='ios-trash' size={25} color='#fff'
                                          onPress={_ => _deleteCity(data)}/>
                            </View>
                        )}
                        disableRightSwipe={true}
                        rightOpenValue={-86}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    :

                    <Text>No city to display</Text>

                }

            </SafeAreaView>
        </ScrollView>
    )
}

HomeScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.shape({
        informations: PropTypes.object,
        cities: PropTypes.array,
    }).isRequired
};

const mapState = (state) => ({
    loading: state.loading.effects.app.getWeatherInformations, // true when the `login/submit` effect is running
    app: state.app,

})

export default connect(mapState)(HomeScreen);