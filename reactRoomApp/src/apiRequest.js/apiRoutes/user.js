import {requestApi} from '../request';

export const userPostLogin = (universityCardId) =>
  requestApi('/user/login', {
    method: 'POST',
    body: {universityCardId},
  });

export const userGetDemo = () => requestApi('/user/demo');
