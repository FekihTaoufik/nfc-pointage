import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenHome } from './screen/Home';
import { ScreenDetails } from './screen/Details';
import { ScreenAuth } from './screen/Auth';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Connection à une salle" component={ScreenAuth} />
        <Stack.Screen name="Details" component={ScreenDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;