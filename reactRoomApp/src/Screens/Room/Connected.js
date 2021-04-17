/* eslint-disable react-native/no-unused-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, Alert, StyleSheet} from 'react-native';
import { Title, Subheading, Paragraph, ActivityIndicator, Button } from 'react-native-paper';
import {
  roomGetCurrentSession,
} from '../../apiRequest.js/apiRoutes/room';
import NfcProxy from '../../NfcProxy';
import {rtdValueToName} from '../../Components/NdefMessage';
import {
  sessionGetAttendance,
  sessionPostAttendance,
  sessionPostCreateDemo,
} from '../../apiRequest.js/apiRoutes/session';
import { useQuery } from 'react-query';
import { getDate} from '../../lib/helper';

console.log(rtdValueToName);

const getFullName = ({firstName, lastName}) => `${firstName} ${lastName}`;
const getRoleTitle = ({role}) =>
  `Présence ${role === 'TEACHER' ? 'professeur' : 'étudiante'} validée`;
export const ScreenConnected = ({data, logOut}) => {
  const navigation = useNavigation();

  const { data: currentSession, isFetched, isFetching, refetch } = useQuery(`currentSession${data.id}`, () => roomGetCurrentSession(data.id), {
    initialData: null
  })

  const handleClickLogout = async () => {
    logOut();
  };
  const handleClickCreateDemoSession = () => {
    const body = {roomId: data.id};
    sessionPostCreateDemo(body).then((s) => {
      if (s.error) {
        Alert.alert('Erreur', s.message);
      } else {
        refetch()
      }
    });
  };

  const readTagNFC = useCallback(() => {
    NfcProxy.readTag(readTagNFC).then(({value}) => {
      if (value) {
        const body = {
          userId: value,
          roomId: data.id,
        };
        sessionPostAttendance(body)
          .then((user) => {
            if (user.error) {
              Alert.alert('Pointage', user.message);
            } else {
              Alert.alert(
                getRoleTitle(user),
                `La présence de ${getFullName(user)} a été validée.`,
              );
            }
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    });
  }, [data.id]);

  const readAttendancesTagNFC = useCallback(() => {
    NfcProxy.readTag().then(({value}) => {
      if (value) {
        sessionGetAttendance(currentSession.id, value).then((attendances) => {
          if (attendances.error) {
            Alert.alert("Erreur d'autorisation", attendances.message);
          } else {
            navigation.navigate('Attendances', {
              attendances,
              session: currentSession,
            });
          }
        });
      }
    });
  }, [currentSession, navigation]);
  console.log('currentSession', currentSession);
  return (
    <View style={styles.container}>
      <Title style={{ padding: 20 }}>{data.name}</Title>
      {isFetching && (
        <ActivityIndicator animating={true} />
      )}
      {isFetched && !currentSession && (
        <View style={{marginBottom: 20}}>
          <Paragraph style={{marginBottom: 10}}>
            Aucun cours n'est programmé à cet instant
          </Paragraph>
          <Button
            mode="contained"
            onPress={handleClickCreateDemoSession}
          >Créer un cours démo</Button>
        </View>
      )}
      {isFetched && currentSession && (
        <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 20}}>
          <Title style={{fontSize: 20}}>
          {currentSession.Group.name} - Professeur {getFullName(currentSession.Teacher)}
          </Title>
          <Subheading>
          {getDate(currentSession.startedAt)} - {getDate(currentSession.endedAt)}
          </Subheading>
          <Paragraph style={{marginBottom: 20, paddingVertical: 10, fontSize: 15}}>
            {currentSession.name}
          </Paragraph>
          <View style={{marginBottom: 20}}>
            <Button
              mode="contained"
              onPress={readTagNFC}
            >
              Badger la présence
            </Button>
          </View>
          <View style={{marginBottom: 20}}>
            <Button
              labelStyle={{ width: "100%"}}
              mode="outlined"
              title="Voir les présences (professeur)"
              onPress={readAttendancesTagNFC}
            >Voir les présences (professeur)</Button>
          </View>
        </View>
      )}
      <View style={styles.logout}>
        <Button
          mode="text"
          color="red"
          title="se deconnecter"
          onPress={handleClickLogout}
        >se deconnecter</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
