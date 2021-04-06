import React, { useCallback, useEffect, useState } from 'react';

import { View, Text, Button, TextInput } from 'react-native';
import { postLogin } from '../apiRequest.js/apiRoutes/room';
import { getData, storeData } from '../lib/localstore';

const KEY = "room";
export const ScreenConnected = ({ data, logOut }) => {
  const [text, setText] = useState('');
  getData(KEY).then((data) => {
    console.log({data});
  })
  const handleClickLogout = async () => {
    logOut()
  }
  return (
    <View style={{padding: 10}}>
      <Text style={{padding: 10, fontSize: 42}}>
        {data.name}
      </Text>
      <Button
          title="se deconnecter"
          onPress={handleClickLogout}
        />
    </View>
  );
  }