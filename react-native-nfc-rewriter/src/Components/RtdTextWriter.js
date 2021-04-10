import React from 'react';
import {View, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {userPostLogin} from '../apiRequest.js/apiRoutes/room';
import NfcProxy from '../NfcProxy';

const messageUserSuccess = ({firstName, lastName, role}) => {
  return `L'${
    role === 'TEACHER' ? 'enseignant' : 'étudiant'
  } ${firstName} ${lastName} à bien été inséré dans le tag`;
};

function RtdTextWriter(props, ref) {
  const inputRef = React.useRef();
  const [value, setValue] = React.useState(props.value || '');

  if (ref) {
    ref.current = {
      getValue: () => value,
    };
  }

  const writeNdef = async () => {
    userPostLogin(value)
      .then(async (u) => {
        if (u.error) {
          Alert.alert("Erreur d'identification", u.message);
        } else {
          inputRef.current && inputRef.current.blur();
          if (!value) {
            return;
          }
          let result = await NfcProxy.writeNdef({type: 'TEXT', value});
          if (result) {
            Alert.alert('Success', messageUserSuccess(u));
          } else {
            Alert.alert(
              "Echec de l'opération",
              "L'écriture sur le tag a échoué",
            );
          }
        }
      })
      .catch((err) => {
        Alert.alert(err);
      });
  };

  return (
    <View>
      <TextInput
        ref={inputRef}
        keyboardType="phone-pad"
        mode="outlined"
        label="Numéro carte universitaire"
        multiline={true}
        value={value}
        autoCapitalize={false}
        onChangeText={setValue}
        style={{marginBottom: 10}}
        autoFocus={true}
      />

      <Button mode="contained" labelStyle={{fontSize: 20}} onPress={writeNdef}>
        Ecrire dans un tag
      </Button>
    </View>
  );
}

export default React.forwardRef(RtdTextWriter);
