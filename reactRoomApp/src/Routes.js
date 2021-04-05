import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenHome } from './screen/Home';
import { ScreenDetails } from './screen/Details';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={ScreenHome} />
        <Stack.Screen name="Details" component={ScreenDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;