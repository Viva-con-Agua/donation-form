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
        campaign: null,
        loading: false,
        currentMsg: null
    },
    mutations: {
        init(state, value) {
            state.campaign = value
        }, 
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
        init({commit}, data) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/donations/campaign/' + data.data)
                    .then((response) => {commit('init', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        logout({commit}) {
            //dispatch('user/signout')
            commit('user/session/logout')  
        }
    }
})
