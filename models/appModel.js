import {requestGet, requestGetCircle} from "../utils/requestAPI";
import {AsyncStorage} from 'react-native'


export const app = {

    state: {
        cities: ['Valence'],
        //informations: {},
        informationsCircle: null,
    },
    reducers: {

        setCities(state, {cities}) {
            return {...state, cities};
        },
        setInformations(state, informations) {
            return {...state, informations}
        },
        setInformationsCircle(state, informationsCircle) {
            return {...state, informationsCircle}
        }
    },
    effects: (dispatch) => ({
        async getWeatherInformations(city, state) {
            const response = await requestGet('weather', 'q=' + city.toLowerCase());
            return response
        },
        /*async getWeatherInformations(_, state) {
            const newInformations = {};
            for (let city of state.app.cities) {
                const response = await requestGet('weather', 'q=' + city.toLowerCase());
                if (response) {
                    newInformations[city] = response;
                }
            }
            this.setInformations(newInformations);
        },*/

        async getWeatherInformationsCircle() {
            let position = await this.getLocation();

            let response = await requestGetCircle('find', 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&cnt=5');
            let seenCities = {};

            response.list = response.list.filter(function(currentCity){
                //if (currentCity.name in seenCities || currentCity.name in state.app.cities) {
                if (currentCity.name in seenCities) {
                    return false;
                } else {
                    seenCities[currentCity.name] = true;
                    return true;
                }
            })
            if (response) {
                this.setInformationsCircle(response);
            }
        },


        getLocation() {
            return new Promise(resolve => {
                navigator.geolocation.getCurrentPosition((position) => {
                        resolve(position);
                    },
                    (error) => alert(error.message),
                    {enableHighAccuracy: false, timeout: 10000, maximumAge: 30000000}
                );
            });

        },
        async addCity(payload, state) {
            const newCities = state.app.cities.slice();
            newCities.push(payload.city);
            await this.setCities({cities: newCities})
            //await this.getWeatherInformations()
            await AsyncStorage.setItem('favCities', JSON.stringify(newCities));

        },
        async deleteCity(payload, state) {
            const newCities = state.app.cities.filter(function (value) {
                return value !== payload.city.item;
            });
            this.setCities({cities: newCities})
            await AsyncStorage.setItem('favCities', JSON.stringify(newCities));
        }


    }),
};