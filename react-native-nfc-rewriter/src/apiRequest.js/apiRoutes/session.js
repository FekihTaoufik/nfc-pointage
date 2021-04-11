import {requestApi} from '../request';

export const sessionPostAttendance = (body) =>
  requestApi('/attendance', {
    method: 'POST',
    body,
  });

export const sessionPostCreateDemo = (body) =>
  requestApi('/session/create-demo', {
    method: 'POST',
    body,
  });

export const sessionGetAttendance = (sessionId) =>
  requestApi(`/session/${sessionId}/attendances`);
