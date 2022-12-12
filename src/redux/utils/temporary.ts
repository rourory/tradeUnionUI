import axios from 'axios';
import { LOCAL_HOST } from '../../URLs';

export const temporaryAuthenticate = async () => {
  let token: string = '';
  await axios
    .post(LOCAL_HOST + 'auth/login', { username: 'user1', password: 'user1' })
    .then((res) => {
      token = res.data.jwt_token;
    })
    .catch((err) => console.log('AUTHENTICATION ERROR: ', err));
  return token;
};
