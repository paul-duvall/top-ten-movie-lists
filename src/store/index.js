import { createStore } from 'vuex'

// firebase imports
import { auth } from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

export default createStore({
  state: {
    authIsReady: false,
    user: null
  },
  mutations: {
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    setUser(state, payload) {
      state.user = payload
      console.log('user state channged:', state.user)
    }
  },
  actions: {
    async signup(context, {email, password}) {
      console.log('signup action')
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (res) {
          context.commit('setUser', res.user)
      } else {
          throw new Error('could not complete signup')
      }
    },
    async login(context, { email, password }) {
      console.log('login action')

      const res = await signInWithEmailAndPassword(auth, email, password)

      if (res) {
          context.commit('setUser', res.user)
      } else {
          throw new Error('could not complete login')
      }
    }, 
    async logout(context) {
      console.log('logging out')

      await signOut(auth)
      context.commit('setUser', null)
    }
  },
  modules: {
  }
})
