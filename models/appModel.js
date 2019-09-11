export const app = {
    state: {
        name:'',
        isLoading:true,
    },
    reducers:{
        setName(state, name){
            return {...state, name};
        },
    },
    effects:{},
};