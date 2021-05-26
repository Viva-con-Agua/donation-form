//import api from '../api.js'
//import axios from 'axios'
import session from './session.js'
import profile from './profile.js'
const user = {

namespaced: true,
    modules: {
        session: session,
        profile: profile

    },
    state: () => ({
        current: null,
        profile: null
    }),
    mutations: { 
        login(state, value) {
            state.current = value
            state.profile.current = value.profile
        },
        logout(state) {
            state.current = null
            state.profile.current = null
        },
    },
    getters: { 
        current (state) {
            return state.current
        },
        profile (state) {
            return state.profile
        }
    }
}
export default user
