import React, { useState } from 'react';

import { View, Text, Button, TextInput } from 'react-native';
import { postLogin } from '../apiRequest.js/apiRoutes/room';

export const ScreenAuth = ({ navigation }) => {
  const [text, setText] = useState('');
  console.log({ text: { text : { text }} });
  postLogin(text).then((res) => {
    console.log({res});
  }).catch((err) => {
    console.log({ err });
  })
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Identifiant de la salle (uuid)"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Button color="black" title="Demo uuid" onPress={() => {
        setText('23ed0b0a-270d-4aff-a0d0-e2ac77a73626')
      }} />
      {/* <Text style={{padding: 10, fontSize: 42}}>
        {text}
      </Text> */}
      <Button
          title="se connecter la salle"
          onPress={() => {
            postLogin(text).then((res) => {
              console.log({res});
            }).catch((err) => {
              console.log(err);
            })
          }}
        />
    </View>
  );
  }