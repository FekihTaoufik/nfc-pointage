import React, {useEffect, useMemo, useState} from 'react';

import {ScreenConnected} from './Connected';
import {ScreenAuth} from './Auth';
import {getData, KEY_ROOM, removeData} from '../../lib/localstore';

export const ScreenRoom = () => {
  const [data, setData] = useState();

  const handleClickLogin = async (d) => {
    setData(d);
  };

  const handleClickLogout = () => {
    console.log('logout');
    removeData(KEY_ROOM).then(() => {
      setData(null);
    });
  };
  useEffect(() => {
    getData(KEY_ROOM).then((d) => {
      setData(d);
    });
  }, []);

  const render = useMemo(
    () =>
      data ? (
        <ScreenConnected logOut={handleClickLogout} data={data} />
      ) : (
        <ScreenAuth logIn={handleClickLogin} />
      ),
    [data],
  );
  return render;
};
