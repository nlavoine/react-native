import React from 'react';
import {StyleSheet} from 'react-native';
import { init } from "@rematch/core";
import {Provider} from 'react-redux';
import { app}  from './models/appModel';
import AppNavigator from "./navigation/AppNavigator";
import createLoadingPlugin from '@rematch/loading';

const loadingPlugin = createLoadingPlugin()

const store = init({
    plugins: [loadingPlugin],
    models: {app},
});



export default function App() {

    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}



