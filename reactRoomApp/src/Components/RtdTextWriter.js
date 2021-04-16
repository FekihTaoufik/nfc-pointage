import React, { useEffect, useState } from 'react';
import {View, Alert, FlatList, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Text} from 'react-native-paper';
import {userGetDemo, userPostLogin} from '../apiRequest.js/apiRoutes/user';
import NfcProxy from '../NfcProxy';

const messageUserSuccess = ({firstName, lastName, role}) => {
  return `L'${
    role === 'TEACHER' ? 'enseignant' : 'étudiant'
  } ${firstName} ${lastName} à bien été inséré dans le tag`;
};

const renderUser = ({firstName, lastName, role, universityCardId}) => {
  return `${
role === 'TEACHER' ? 'Professeur' : 'Etudiant'
  } ${firstName} ${lastName}: ${universityCardId}`;
};

function RtdTextWriter(props, ref) {
  const inputRef = React.useRef();
  const [value, setValue] = React.useState(props.value || '');
  const [demoData, setDemoData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      userGetDemo().then((session) => {
        if (!session.error) {
          setDemoData(session);
        }
        else {
          Alert.alert('Erreur de la requête', 'Activez votre connection internet ou contactez Swabahadine au 0669407370 !')
        }
        setIsFetched(true);
      });
    }
  }, [isFetched]);

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
          let result = await NfcProxy.writeNdef({type: 'TEXT', value: u.id});
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
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        keyboardType="phone-pad"
        mode="outlined"
        label="Numéro carte universitaire"
        multiline={true}
        placeholder="Exemple: 129672"
        value={value}
        autoCapitalize={false}
        onChangeText={setValue}
        style={{marginBottom: 10}}
        // autoFocus={true}
      />

      <Button
        disabled={!value}
        mode="contained"
        labelStyle={{fontSize: 20}}
        onPress={writeNdef}>
        Ecrire dans un tag
      </Button>
      <View style={styles.demoView}>
        <Text>Pour les démos, utilisez ces numéros :</Text>
        <FlatList
          data={demoData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <Text style={styles.item}>- {renderUser(item)}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    paddingTop: 5,
  },
  demoView: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    padding: 10,
  },
});

export default React.forwardRef(RtdTextWriter);
