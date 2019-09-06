import { setStore, removeStore } from '@/utils/storage'

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SER_ROUTERS(state, routers) {
    state.routers = routers
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOCK: (state) => {
    state.isLock = true
    setStore({
      name: 'isLock',
      content: state.isLock,
      type: 'session'
    })
  },
  SET_LOCK_PASSWD: (state, lockPasswd) => {
    state.lockPasswd = lockPasswd
    setStore({
      name: 'lockPasswd',
      content: state.lockPasswd,
      type: 'session'
    })
  },
  CLEAR_LOCK: (state) => {
    state.isLock = false
    state.lockPasswd = ''
    removeStore({
      name: 'lockPasswd'
    })
    removeStore({
      name: 'isLock'
    })
  }
}

export default mutations;
