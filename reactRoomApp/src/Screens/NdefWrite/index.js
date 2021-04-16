import * as React from 'react';
import {View} from 'react-native';
import {NfcTech, Ndef} from 'react-native-nfc-manager';
import RtdTextWriter from '../../Components/RtdTextWriter';
import RtdUriWriter from '../../Components/RtdUriWriter';
import RtdUriShortcutWriter from '../../Components/RtdUriShortcutWriter';
import WifiSimpleWriter from '../../Components/WifiSimpleWriter';
import ScreenHeader from '../../Components/ScreenHeader';

function NdefWriteScreen(props) {
  const {params} = props.route;
  const handlerRef = React.useRef();

  function getNdefType() {
    const payload = params.savedRecord?.payload;
    if (payload && payload.tech === NfcTech.Ndef) {
      if (payload.tnf === Ndef.TNF_WELL_KNOWN) {
        if (payload.rtd === Ndef.RTD_TEXT) {
          return 'TEXT';
        } else if (payload.rtd === Ndef.RTD_URI) {
          return 'URI';
        }
      } else if (payload.tnf === Ndef.TNF_MIME_MEDIA) {
        if (payload.mimeType === Ndef.MIME_WFA_WSC) {
          return 'WIFI_SIMPLE';
        }
      }
    }

    return params.ndefType;
  }

  function getSavedValue() {
    return params.savedRecord?.payload?.value;
  }

  const ndefType = getNdefType();

  function getRecordPayload() {
    if (handlerRef.current?.getValue) {
      const payload = {
        tech: NfcTech.Ndef,
        tnf: Ndef.TNF_WELL_KNOWN,
        value: handlerRef.current.getValue(),
        rtd: Ndef.RTD_TEXT,
      };
      return payload;
    }
    return null;
  }

  const _renderNdefWriter = () => {
    const value = getSavedValue();
    return <RtdTextWriter ref={handlerRef} value={value} />;
  };

  return (
    <>
      <ScreenHeader
        title="Ecrire sur un tag"
        navigation={props.navigation}
        getRecordPayload={getRecordPayload}
      />
      <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
        {_renderNdefWriter()}
      </View>
    </>
  );
}

export default NdefWriteScreen;
