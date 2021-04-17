import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import NfcProxy from '../../NfcProxy';
import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen(props) {
  const {navigation} = props;
  const [supported, setSupported] = React.useState(null);
  const [enabled, setEnabled] = React.useState(null);
  const padding = 40;
  const width = Dimensions.get('window').width - 2 * padding;

  React.useEffect(() => {
    async function initNfc() {
      try {
        setSupported(await NfcProxy.init());
        setEnabled(await NfcProxy.isEnabled());
      } catch (ex) {
        Alert.alert('ERROR', 'fail to init NFC', [{text: 'OK'}]);
      }
    }

    initNfc();
  }, []);
  console.log('home');
  function renderNfcButtons() {
    return (
      <View
        style={{
          flex: 2,
          alignItems: 'stretch',
          alignSelf: 'center',
          width,
        }}>
        <Button
          mode="contained"
          onPress={async () => {
            console.log('room');
            navigation.navigate('Room');
          }}
          style={{marginBottom: 10}}>
          Salle
        </Button>

        <Button
          mode="contained"
          onPress={async () => {
            navigation.navigate('NdefWrite', {ndefType: 'TEXT'});
          }}
          style={{marginBottom: 10}}>
          Utilisateur
        </Button>
      </View>
    );
  }

  function renderNfcNotEnabled() {
    return (
      <View
        style={{
          flex: 2,
          alignItems: 'stretch',
          alignSelf: 'center',
          width,
        }}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          Your NFC is not enabled. Please first enable it and hit CHECK AGAIN
          button
        </Text>

        <Button
          mode="contained"
          onPress={() => NfcProxy.goToNfcSetting()}
          style={{marginBottom: 10}}>
          GO TO NFC SETTINGS
        </Button>

        <Button
          mode="outlined"
          onPress={async () => {
            setEnabled(await NfcProxy.isEnabled());
          }}>
          CHECK AGAIN
        </Button>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <View style={{flex: 1, padding}}>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../images/nfc-rewriter-icon.png')}
            style={{width: 250, height: 250}}
            resizeMode="contain"
          />
        </View>
        {supported && !enabled && renderNfcNotEnabled()}
        {supported && enabled && renderNfcButtons()}
        <Button
          icon={() => <Icon name="info" style={{color: 'grey'}} size={20} />}
          color="grey"
          style={styles.settingIcon}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          A propos
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 20 : 0,
    right: 20,
  },
});

export default HomeScreen;
