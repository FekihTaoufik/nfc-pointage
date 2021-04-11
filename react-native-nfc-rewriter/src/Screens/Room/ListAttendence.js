import React from 'react';
import {Avatar, List} from 'react-native-paper';

import {View, Text, StyleSheet, FlatList} from 'react-native';

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
  console.log('attendences', attendances);
  return (
    <View style={styles.container}>
      <Text style={{margin: 10, fontSize: 20}}>
        {session.Group.name} - {getFullName(session.Teacher)}
      </Text>
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
              description={item.joined_at || ''}
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
