import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store'

const App:React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </Provider>
    );
};

export default App;
