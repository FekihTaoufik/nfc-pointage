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
          setText('b1388d74-fb8c-4cd1-9f9b-9602189f165b');
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
