import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home/index';
import Descricao from './pages/Descricao';

const MainStack = createStackNavigator();

const Routes: React.FC = () => {
  const { Navigator, Screen } = MainStack;
  return (
    <Navigator>
      <Screen name="Inicio" component={Home} />
      <Screen name="Descricao" component={Descricao} />
    </Navigator>
  );
};

export default Routes;
