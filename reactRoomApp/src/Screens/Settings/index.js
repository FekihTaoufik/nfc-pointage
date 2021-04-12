import React from 'react';
import {Linking, View, ScrollView, Text, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {Avatar, Title} from 'react-native-paper';
const generalText = `
Ce projet consiste a mettre en place un système de pointage pour les étudiants et les enseignants du département M2 MBDS.
`;

function SettingsScreen(props) {
  return (
    <ScrollView style={[styles.wrapper]}>
      <View
        style={{
          paddingTop: 0,
        }}>
        <Title style={{padding: 15, paddingBottom: 0}}>
          Projet NFC - M2 MBDS
        </Title>
        <Text
          style={{
            padding: 15,
            paddingTop: 0,
            paddingBottom: 0,
            lineHeight: 20,
          }}>
          {generalText}
        </Text>

        <List.Section>
          <List.Item
            onPress={() => {
              Linking.openURL('https://github.com/FekihTaoufik/nfc-pointage');
            }}
            title="Dépot Github"
            description="https://github.com/FekihTaoufik/nfc-pointage"
            left={() => (
              <Avatar.Icon
                size={60}
                color="grey"
                style={{
                  marginRight: 10,
                  marginLeft: 5,
                  backgroundColor: 'rgba(255,255,255,.9)',
                }}
                icon="github"
              />
            )}
          />
          <List.Subheader>Encadré par</List.Subheader>
          <List.Item
            title="Edouard Amosse"
            left={() => (
              <Avatar.Icon
                size={60}
                style={{
                  marginRight: 10,
                  marginLeft: 5,
                  backgroundColor: 'teal',
                }}
                icon="account"
              />
            )}
            description="Super professeur"
          />
          <List.Subheader>Equipe de travail</List.Subheader>
          <List.Item
            title="Abdallah Swabahadine"
            left={() => (
              <Avatar.Icon
                size={60}
                style={{
                  marginRight: 10,
                  marginLeft: 5,
                  backgroundColor: 'lightgrey',
                }}
                icon="account"
              />
            )}
            description="Développeur React Native, Nodejs et un excellent chef de projet"
          />
          <List.Item
            title="Taoufik Fekih"
            left={() => (
              <Avatar.Icon
                size={60}
                style={{
                  marginRight: 10,
                  marginLeft: 5,
                  backgroundColor: 'lightgrey',
                }}
                icon="account"
              />
            )}
            description="Développeur Full Stack et bidouilleur agréé"
          />
          <List.Item
            title="Diallo Foula"
            left={() => (
              // <Image
              //   source={require('../../../images/washow_icon.png')}
              //   style={styles.maintainerIcon}
              //   resizeMode="contain"
              // />
              <Avatar.Icon
                size={60}
                style={{
                  marginRight: 10,
                  marginLeft: 5,
                  backgroundColor: 'lightgrey',
                }}
                icon="account"
              />
            )}
            description="Développeur React Native et délégué a plein temps"
          />
          <List.Item
            title="Nassim"
            left={() => (
              // <Image
              //   source={require('../../../images/washow_icon.png')}
              //   style={styles.maintainerIcon}
              //   resizeMode="contain"
              // />
              <Avatar.Icon
                size={60}
                style={{
                  marginRight: 10,
                  marginLeft: 5,
                  backgroundColor: 'lightgrey',
                }}
                icon="account"
              />
            )}
            description="Grand maitre du temps"
          />
        </List.Section>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
  },
  topBanner: {
    borderRadius: 6,
    margin: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  maintainerIcon: {
    width: 54,
    height: 54,
    overflow: 'hidden',
    borderRadius: 4,
  },
});

export default SettingsScreen;
