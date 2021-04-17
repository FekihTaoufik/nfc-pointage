import { format } from 'fecha';

export const getDate = (date) => format(new Date(date), 'DD-MM-YYYY [à] HH:mm'); 

export const getHour = (date) => format(new Date(date), 'HH:mm'); 