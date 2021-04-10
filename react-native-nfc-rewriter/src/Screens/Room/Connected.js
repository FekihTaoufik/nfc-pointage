import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Ndef} from 'react-native-nfc-manager';

import {View, Text, Button, TextInput, Alert} from 'react-native';
import {postLogin} from '../../apiRequest.js/apiRoutes/room';
import {getData, storeData, KEY_ROOM} from '../../lib/localstore';
import NfcProxy from '../../NfcProxy';
import {rtdValueToName} from '../../Components/NdefMessage';

const KEY = 'room';

const decodeTagNDEF = (tag) => {
  console.log({rtdValueToName});
  const ndef =
    Array.isArray(tag.ndefMessage) && tag.ndefMessage.length > 0
      ? tag.ndefMessage[0]
      : null;
  if (ndef?.type && rtdValueToName(ndef?.type) === 'TEXT') {
    return Ndef.text.decodePayload(ndef.payload);
  }
  return null;
};
export const ScreenConnected = ({data, logOut}) => {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  getData(KEY).then((data) => {
    console.log({data});
  });
  const handleClickLogout = async () => {
    logOut();
  };
  useEffect(() => {
    NfcProxy.readTag().then((tag) => {
      if (tag) {
        const value = decodeTagNDEF(tag);
        if (value) {
          Alert.alert('Tag', decodeTagNDEF(tag));
        } else {
          Alert.alert(
            'Mauvais tag',
            "Le format de ce tag n'est pas supporté par l'application",
          );
        }
      }
    });
  }, [navigation]);
  return (
    <View style={{padding: 10}}>
      <Text style={{padding: 10, fontSize: 42}}>{data.name}</Text>
      <Button title="se deconnecter" onPress={handleClickLogout} />
    </View>
  );
};
