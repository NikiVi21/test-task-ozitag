import { LoginType, GetProfileType } from './apiTypes';
import axios from "axios";

export const login = (clientId: number | null, email: string, password: string) => {
  return axios.post<LoginType>(`https://tager.dev.ozitag.com/api/auth/user`, {
    clientId,
    email,
    password,
  });
};

export const getUser = (accessToken: string) => {
  return axios.get<GetProfileType>(`https://tager.dev.ozitag.com/api/tager/user/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
