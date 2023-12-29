import axios from 'axios';
import { BASE_URL } from 'helpers/constants';

export function leaveMessage(body) {
  return axios.post(`${BASE_URL}/message`, body, {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    },
  });
}
