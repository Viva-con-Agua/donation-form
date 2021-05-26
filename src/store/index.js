import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import navigation from './navigation.js'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        navigation: navigation,
        user: user
    },
    state: {
        loading: false,
        currentMsg: null
    },
    mutations: {
        currentMsg (state, value) {
            state.currentMsg = value
        },
        loadingFlow(state) {
            state.loading = !state.loading
        }
    },
    getters: {
        session(state) {
            console.log(state.user)
            if ( state.user.current !== null ) {
                return true
            } 
            return false
        },
        currentMsg (state) {
            return state.currentMsg
        },
        loadingFlow (state) {
            return state.loading
        }
    },
    actions: {
        logout({commit}) {
            //dispatch('user/signout')
            commit('user/session/logout')  
        }
    }
})
