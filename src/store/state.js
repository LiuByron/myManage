import { getStore } from '@/utils/storage';
import { getToken } from '@/utils/cookie';

const state = {
  user: null,
  routers: [],
  token: getToken(),
  isLock: getStore({ name: 'isLock' }) || false,
  lockPasswd: getStore({ name: 'lockPasswd' }) || ''
}

export default state;
