import React from 'react';
import {
    Text,
    Dimensions,
    Image,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Card, Divider} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";


const {width} = Dimensions.get('window');

const styleSheet = {
    container: {
        width: width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
    },
    title: {
        color: 'darkcyan',
        fontSize: 28,
    },
    baseline: {
        color: '#bbb',
        fontSize: 14,
    },
    mainInfos: {
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    weatherIcon: {
        width: 100,
        height: 100,
        marginRight: 20,
        marginTop: 15,
    },
    mainTextContainer: {
        padding: 15,
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
    },
    mainText: {
        fontSize: 80,

    },
    degrees: {
        fontSize: 20,
        marginTop: 15,
    },
    footer: {
        padding: 15,
        flex: 1,
        flexDirection: 'row',
    }
};


const DetailScreen = props => {

    const {app: {details}} = props;


    function convertDateTime(time) {
        const dateObj = new Date(time * 1000,);
        let options = {weekday: 'long', hour12: true, hour: 'numeric', minute: '2-digit'};
        const formattedDate = dateObj.toLocaleDateString('en-UK', options)
        return formattedDate;
    }

    function convertTemp(temp) {
        return Math.floor(temp);
    }

    return (

        <Card
            title={
                <View>
                    <Text style={styleSheet.title}>{details.name}</Text>
                    <Text
                        style={styleSheet.baseline}>{convertDateTime(details.dt)}, {details.weather[0].description}</Text>
                    <Divider style={{backgroundColor: '#ccc'}}/>
                </View>
            }
        >
            <View
                style={styleSheet.mainInfos}>

                <View style={styleSheet.mainTextContainer}>
                    <Text style={styleSheet.mainText}>{convertTemp(details.main.temp)}</Text>
                    <Text style={styleSheet.degrees}>C°</Text>
                </View>
                <Image
                    style={styleSheet.weatherIcon}
                    source={
                        {
                            uri: `http://openweathermap.org/img/wn/${details.weather[0].icon}.png`
                        }
                    }
                />
            </View>
            <Divider style={{backgroundColor: '#ccc'}}/>
            <View style={styleSheet.mainInfos}>
                <View>
                    <View style={{marginTop:15, alignContent:'flex-end', flexDirection:'row'}}>
                        <Ionicons name='ios-water' size={25} color='#bbb'/>
                        <Text style={{marginLeft:10, paddingTop:5}}>{details.main.humidity}%</Text>
                    </View>
                </View>
                <View>
                    <View style={{marginTop:15, alignContent: 'center',flexDirection:'row'}}>
                        <Ionicons name='ios-navigate' size={25} color='#bbb'/>
                        <Text style={{marginLeft:10, paddingTop:5}}>{details.wind.speed}km/h</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

DetailScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    app: PropTypes.shape({
        details: PropTypes.object,
    }).isRequired
};

const mapState = (state) => ({
    app: state.app,

})

export default connect(mapState)(DetailScreen);