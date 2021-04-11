/* eslint-disable react-native/no-unused-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Ndef} from 'react-native-nfc-manager';

import {View, Text, Button, TextInput, Alert, StyleSheet} from 'react-native';
import {
  postLogin,
  roomGetCurrentSession,
} from '../../apiRequest.js/apiRoutes/room';
import {getData, storeData, KEY_ROOM} from '../../lib/localstore';
import NfcProxy from '../../NfcProxy';
import {rtdValueToName} from '../../Components/NdefMessage';
import {
  sessionPostAttendance,
  sessionPostCreateDemo,
} from '../../apiRequest.js/apiRoutes/session';
console.log(rtdValueToName);
const KEY = 'room';

const getFullName = ({firstName, lastName}) => `${firstName} ${lastName}`;
export const ScreenConnected = ({data, logOut}) => {
  const navigation = useNavigation();
  const [currentSession, setCurrentSession] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  const handleClickLogout = async () => {
    logOut();
  };
  const handleClickCreateDemoSession = () => {
    const body = {roomId: data.id};
    sessionPostCreateDemo(body).then((s) => {
      if (s.error) {
        Alert.alert('Erreur', s.message);
      } else {
        setIsFetched(false);
      }
    });
  };
  useEffect(() => {
    if (!isFetched) {
      getData(KEY).then(({id}) => {
        roomGetCurrentSession(id).then((session) => {
          if (session) {
            setCurrentSession(session);
          }
          setIsFetched(true);
        });
      });
    }
  }, [isFetched]);
  const readTagNFC = useCallback(() => {
    NfcProxy.readTag(readTagNFC).then(({value}) => {
      if (value) {
        const body = {
          userId: value,
          roomId: data.id,
        };
        sessionPostAttendance(body).then((user) => {
          console.log('user', user);
          Alert.alert(
            'Présence étudiante validée',
            `La présence de ${getFullName(user)} a été validée.`,
          );
        });
      }
    });
  }, [data.id]);
  return (
    <View style={styles.container}>
      <Text style={{padding: 10, fontSize: 42}}>{data.name}</Text>
      {isFetched && !currentSession && (
        <View style={{marginBottom: 20}}>
          <Text style={{marginBottom: 10}}>
            Aucun cours n'est programmé à cet instant
          </Text>
          <Button
            title="Créer un cours démo"
            onPress={handleClickCreateDemoSession}
          />
        </View>
      )}
      {currentSession && (
        <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 20}}>
          <Text style={{marginBottom: 10, fontSize: 20}}>
            {currentSession.Group.name} - {getFullName(currentSession.Teacher)}
          </Text>
          <Text style={{marginBottom: 20, paddingVertical: 10, fontSize: 15}}>
            {currentSession.name}
          </Text>
          <Button title="Badger la présence" onPress={readTagNFC} />
        </View>
      )}
      <View style={styles.logout}>
        <Button
          style={styles.logout}
          color="red"
          title="se deconnecter"
          onPress={handleClickLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logout: {
    position: 'absolute',
    bottom: '15%',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
