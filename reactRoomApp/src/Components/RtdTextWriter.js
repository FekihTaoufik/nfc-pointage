import React, { useEffect, useState } from 'react';
import {View, Alert, FlatList, StyleSheet} from 'react-native';
import {Button, TextInput, Text, Subheading, Paragraph, Title} from 'react-native-paper'; 

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
  } ${firstName} ${lastName}`;
};

function RtdTextWriter(props, ref) {
  const inputRef = React.useRef();
  const [value, setValue] = React.useState(props.value || '');
  const [demoData, setDemoData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const clickItem = ({universityCardId}) => {
    setValue(`${universityCardId}`)
  }
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
        <Subheading style={{marginTop: 10}}>Pour les démos, utilisez ces numéros :</Subheading>
        <FlatList
          data={demoData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
          <View style={styles.item}>
            <Title style={{ fontSize: 15}} >{renderUser(item)}:</Title>
            <Button onPress={() => clickItem(item)} mode="outlined">{item.universityCardId}</Button>
          </View>}
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
    justifyContent: 'center',
  },
});

export default React.forwardRef(RtdTextWriter);
