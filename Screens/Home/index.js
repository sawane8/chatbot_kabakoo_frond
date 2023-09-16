import * as React from 'react';
import login from './login'
import signup from './signup'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default () => {
  return(
    <Stack.Navigator initialRouteName="login" screenOptions={({route, navigation}) => ({ headerShown: false })}>
      <Stack.Screen name="login" component={login} />
      <Stack.Screen name="signup" component={signup} />
    </Stack.Navigator>
  )
}
