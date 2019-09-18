import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Dimensions,
    FlatList,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    ToastAndroid, AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Ionicons} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';


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
    },
    textBaseLine: {
        flex: 1,
        width: '100%',
        color: '#aaa',
        padding: 0,
        margin: 0,
        fontSize: 14,
    },
    list: {
        width: '100%',
    },
    item: {
        padding: 10,
        //backgroundColor: '#aaa',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listIcon: {
        marginRight: 15,
        marginTop: 4,
    },
    weatherIcon: {
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
    },
    addCityIcon: {
        padding: 5,
        margin: 0,
    }
};


function Item(props) {

    return (
        <View style={styleSheet.item}>
            <Ionicons style={styleSheet.listIcon} name='ios-reorder' size={25} color='#999'/>
            <View style={styleSheet.textContainer}>
                <Text style={styleSheet.textName}>{props.item.name}</Text>
                <Text style={styleSheet.textBaseLine}>Temp. :{props.item.main.temp}°C</Text>
            </View>
            <AddBtn name={props.item.name} {...props}/>
        </View>
    );
}


function AddBtn(props) {

    const {app: {cities}} = props;

    function addCity() {
        console.log("added city");
        props.dispatch({type: 'app/addCity', payload: {city: props.name}})
            .then(() => {
                let toast = Toast.show('City successfully added', {
                    duration: 3000,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    /*backgroundColor:'darkcyan',*/
                    delay: 0,
                    onShow: () => {
                        // calls on toast\`s appear animation start
                        props.navigation.navigate('App');
                    },
                    onShown: () => {
                        // calls on toast\`s appear animation end.

                    },
                    onHide: () => {
                        // calls on toast\`s hide animation start.
                    },
                    onHidden: () => {
                        // calls on toast\`s hide animation end.

                    }
                })

            })
    }


return (
    <View>

        <Icon style={styleSheet.addCityIcon} name="plus-circle" onPress={addCity} backgroundColor="#3b5998"
              size={24} color="darkcyan">
        </Icon>
    </View>
)
}

connect(({app}) => ({app}))(AddBtn)


const CircleCities = props => {

    const fetchData = async () => {
        await dispatch({type: 'app/getWeatherInformationsCircle'})
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
            setCityInfosCircle(informationsCircle);
            if (cityInfosCircle) {
                setShowActivityIndicator(false);
            }
        }
    );

    function _onRefresh() {
        setRefreshing(true);
        fetchData().then(() => {
            setRefreshing(false);
        });
    }

    const {dispatch, app: {informationsCircle}} = props;
    const [cityInfosCircle, setCityInfosCircle] = useState(null);
    const [showActivityIndicator, setShowActivityIndicator] = useState(true);
    const [refreshing, setRefreshing] = useState(false);


    if (showActivityIndicator) {
        return <ActivityIndicator size="small" color="darkcyan"/>
    }
    return (

        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
            />
        }>
            <View style={styleSheet.container}>
                <FlatList
                    style={styleSheet.list}
                    data={cityInfosCircle.list}
                    renderItem={({item}) => <Item item={item} {...props} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </ScrollView>
    )
}

CircleCities.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.shape({
        informationsCircle: PropTypes.object,
    }).isRequired
};


export default connect(({app}) => ({app}))(CircleCities);