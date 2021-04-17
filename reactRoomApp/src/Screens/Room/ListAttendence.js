import React from 'react';
import {Avatar, List} from 'react-native-paper';

import {View, StyleSheet, FlatList} from 'react-native';
import { Text, Title, Subheading, Paragraph, ActivityIndicator, Button } from 'react-native-paper';
import { getDate, getHour} from '../../lib/helper';

const getFullName = ({firstName, lastName}) => `${firstName} ${lastName}`;
const getColor = ({present}) => (present ? 'teal' : 'black');
const getIcon = ({present}) => (present ? 'check' : 'minus');

export const ScreenListAttendance = ({route}) => {
  const {attendances, session} = route.params;
  const sortedAttendances = attendances.sort((a, b) => {
    if (a.present === b.present) {
      return a.present
        ? new Date(a.joined_at) - new Date(b.joined_at)
        : getFullName(a) - getFullName(b);
    }
    return a.present ? -1 : 1;
  });
  console.log('session', session);
  return (
    <View style={styles.container}>
      <View style={{padding: 20}}>
        <Title style={{fontSize: 20}}>
          {session.Group.name} - Professeur {getFullName(session.Teacher)}
        </Title>
        <Subheading>
        {getDate(session.startedAt)} - {getDate(session.endedAt)}
        </Subheading>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={sortedAttendances}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View style={{width: '100%', alignSelf: 'center'}}>
            <List.Item
              title={getFullName(item)}
              left={() => (
                <Avatar.Icon
                  size={50}
                  style={{
                    marginRight: 10,
                    marginLeft: 5,
                    backgroundColor: getColor(item),
                  }}
                  icon={getIcon(item)}
                />
              )}
              description={item.joined_at ? `Pointé à ${getHour(item.joined_at)}` : 'Absent'}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
