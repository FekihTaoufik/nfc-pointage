import React, {useCallback, useEffect, useState} from 'react';

import {View, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { useMutation } from 'react-query';
import {roomPostLogin} from '../../apiRequest.js/apiRoutes/room';
import {KEY_ROOM, storeData} from '../../lib/localstore';

export const ScreenAuth = ({logIn}) => {
  const [text, setText] = useState('');

  const { mutate } = useMutation(roomPostLogin, {
    onSuccess: async (room) => {
      if (room) {
        await storeData(KEY_ROOM, room);
        await logIn(room);
      } else {
        Alert.alert('Une erreur est survenue', "L'identifiant de la salle est incorrecte")
      }
    },
  });
  const handleClickConnect = useCallback(() => {
    console.log('braaa');
    mutate(text);
  }, [text]);
  return (
    <View style={{padding: 10}}>
      <TextInput
        mode="flat"
        style={{marginBottom: 10}}
        placeholder="Identifiant de la salle (uuid)"
        onChangeText={(t) => setText(t)} 
        value={text}
      />
      <Button
        mode="outlined"
        style={{ margin: 10 }}
        onPress={() => {
          setText('b1388d74-fb8c-4cd1-9f9b-9602189f165b');
        }}
      >Demo uuid</Button>
      {/* <Text style={{padding: 10, fontSize: 42}}>
        {text}
      </Text> */}
      <Button
        mode="contained"
        style={{ margin: 10 }}
        disabled={!text}
        onPress={handleClickConnect}
      >se connecter</Button>
    </View>
  );
};
