import {requestGet} from "../utils/requestAPI";

export const app = {
    state: {
        cities:['Valence', 'Paris'],
        informations:[],
        isLoading:true,
    },
    reducers:{
        setCities(state, city){
            const cities = app.state.cities.concat(city);
            return {...state, cities};
        },
        setInformations(state, informations){

            //console.log(informations);
            const newState = state;
            const newInformations = newState.informations.push(informations);
            return{...newState, newInformations}
        }
    },
    effects:(dispatch)=> ({
        async getWeatherInformations(){

            for(let city of  app.state.cities){

                const response = await requestGet('weather', 'q='+ city.toLowerCase());
                if(response) {
                    this.setInformations(response);
                }
            }
        }
    }),
};