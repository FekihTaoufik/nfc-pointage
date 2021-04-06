import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, Button } from 'react-native';

export const ScreenHome = () => {
    const navigation = useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }