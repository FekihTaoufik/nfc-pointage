import React, {useCallback, useEffect, useState} from 'react';

import {View, Text, Button, TextInput} from 'react-native';
import {roomPostLogin} from '../../apiRequest.js/apiRoutes/room';
import {KEY_ROOM, storeData} from '../../lib/localstore';

export const ScreenAuth = ({logIn}) => {
  const [text, setText] = useState('');

  const handleClickConnect = useCallback(async () => {
    console.log('clicli');
    const res = await roomPostLogin(text);
    console.log(res);
    await storeData(KEY_ROOM, res);
    await logIn(res);
  }, [logIn, text]);
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Identifiant de la salle (uuid)"
        onChangeText={(t) => setText(t)}
        defaultValue={text}
      />
      <Button
        color="black"
        title="Demo uuid"
        onPress={() => {
          setText('23ed0b0a-270d-4aff-a0d0-e2ac77a73626');
        }}
      />
      {/* <Text style={{padding: 10, fontSize: 42}}>
        {text}
      </Text> */}
      <Button
        title="se connecter"
        disabled={!text}
        onPress={handleClickConnect}
      />
    </View>
  );
};
