import { requestApi } from "../request";

export const postLogin = (uuid) => requestApi('/room/login', {
    method: 'POST',
    body: { uuid }
})