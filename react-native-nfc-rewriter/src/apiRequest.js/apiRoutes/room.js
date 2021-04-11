import {requestApi} from '../request';

export const roomPostLogin = (uuid) =>
  requestApi('/room/login', {
    method: 'POST',
    body: {uuid},
  });

export const roomGetCurrentSession = (roomId) =>
  requestApi('/room/current-session/' + roomId, {
    method: 'GET',
  });
