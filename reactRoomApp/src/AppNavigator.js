import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Appbar} from 'react-native-paper';

import LandingScreen from './Screens/Landing';
import HomeScreen from './Screens/Home';
import TagDetailScreen from './Screens/TagDetail';
import NdefWriteScreen from './Screens/NdefWrite';
import CustomTransceiveScreen from './Screens/CustomTransceive';
import SettingsScreen from './Screens/Settings';
import SavedRecordScreen from './Screens/SavedRecord';
import {ScreenRoom} from './Screens/Room';
import NfcPromptAndroid from './Components/NfcPromptAndroid';
import {ScreenListAttendance} from './Screens/Room/ListAttendence';

const MainStack = createStackNavigator();

function Main(props) {
  return (
    <MainStack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({navigation, scene, previous}) => {
          const excludedScreens = ['Home', 'NdefWrite', 'CustomTransceive'];

          if (
            excludedScreens.findIndex((name) => name === scene?.route?.name) >
            -1
          ) {
            return null;
          }

          return (
            <Appbar.Header style={{backgroundColor: 'white'}}>
              {previous && (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              )}
              <Appbar.Content title={scene.descriptor.options.title || ''} />
            </Appbar.Header>
          );
        },
      }}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'HOME'}}
      />
      <MainStack.Screen
        name="TagDetail"
        options={{title: 'TAG DETAIL'}}
        component={TagDetailScreen}
      />
      <MainStack.Screen
        name="NdefWrite"
        component={NdefWriteScreen}
        options={{title: 'WRITE NDEF'}}
      />
      <MainStack.Screen
        name="Room"
        component={ScreenRoom}
        options={{title: 'Salle'}}
      />
      <MainStack.Screen
        name="Attendances"
        component={ScreenListAttendance}
        options={{title: 'Liste des pr??sences'}}
      />
      <MainStack.Screen
        name="CustomTransceive"
        component={CustomTransceiveScreen}
        options={{title: 'CUSTOM TRANSCEIVE'}}
      />
      <MainStack.Screen
        name="SavedRecord"
        component={SavedRecordScreen}
        options={{title: 'MY SAVED RECORDS'}}
      />
    </MainStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function Settings(props) {
  return (
    <SettingsStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        header: ({navigation, scene, previous}) => {
          return (
            <Appbar.Header style={{backgroundColor: 'white'}}>
              {previous && (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              )}
              <Appbar.Content title={scene.descriptor.options.title || ''} />
            </Appbar.Header>
          );
        },
      }}>
      <SettingsStack.Screen
        name="Settings"
        options={{title: 'A propos'}}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

const RootStack = createStackNavigator();

function Root(props) {
  return (
    <RootStack.Navigator headerMode="none" mode="modal">
      <RootStack.Screen name="Landing" component={LandingScreen} />
      <RootStack.Screen name="Settings" component={Settings} />
      <RootStack.Screen
        name="Main"
        component={Main}
        options={{animationEnabled: false}}
      />
    </RootStack.Navigator>
  );
}

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Root />
      <NfcPromptAndroid />
    </NavigationContainer>
  );
}

export default AppNavigator;
