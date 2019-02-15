import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { AppNavigator } from '../../routing';
import version from "../../version"

class App extends Component {
    componentDidMount() {
        console.disableYellowBox = true;
        console.log(`@@Version: `,{version});
        
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0)"
                    translucent
                    barStyle="light-content"
                />

                <Provider store={store}>
                    <AppNavigator/>
                </Provider>
            </View>
        );
    }
}

export default App;
