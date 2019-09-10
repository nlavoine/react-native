export const app = {
    state: {
        name:'',
    },
    reducers:{
        setName(state, name){
            return {...state, name};
        },
    },
    effects:{},
};