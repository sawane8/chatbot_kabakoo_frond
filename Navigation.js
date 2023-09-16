import * as React from 'react';
import Home from './Screens/Home';
import Account from './Screens/Account';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {

  const isConnected = useSelector( state => state.isConnected )

  return (
    <NavigationContainer>
    { isConnected ?
        <Account />
        :
        <Home />
    }
    </NavigationContainer>
  );
}
