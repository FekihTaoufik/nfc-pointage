import {requestApi} from '../request';

export const roomPostLogin = (uuid) =>
  requestApi('/room/login', {
    method: 'POST',
    body: {uuid},
  });
