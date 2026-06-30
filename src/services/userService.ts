import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';

export type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

const client = axios.create({ timeout: 10000 });

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await client.get<User[]>(API_ENDPOINTS.USERS);
  return data;
};
