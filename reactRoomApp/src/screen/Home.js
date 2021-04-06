import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, Text, Button } from 'react-native';
import { ScreenConnected } from './Connected';
import { ScreenAuth } from './Auth';
import { storeData, getData, KEY_ROOM, removeData } from '../lib/localstore';
import { postLogin } from '../apiRequest.js/apiRoutes/room';

export const ScreenHome = ({ navigation }) => {
    const [data, setData] = useState();
  
    const handleClickLogin = async(d) => {
      setData(d)
    }

    const handleClickLogout = () => {
      console.log('logout');
      removeData(KEY_ROOM).then(() => {
        setData(null)
      })
    }
    useEffect(() => {
      getData(KEY_ROOM).then((d) => {
        setData(d)
      })
    }, [])
  
    console.log('data', data);
    const render = useMemo(() => data
    ? <ScreenConnected logOut={handleClickLogout} data={data} /> : <ScreenAuth logIn={handleClickLogin} />, [data])
    return (
      render
    );
  }