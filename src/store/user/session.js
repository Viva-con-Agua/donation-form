import api from '../api.js'
//import createPersistedState from "vuex-persistedstate";
const session = {
    namespaced: true,
    state: () => ({
        error: ""
    }),
    mutations: {
        error (state, value) {
            state.error = value
        },
        logout () {
            localStorage.clear()
        }
    },
    getters: {
        session() {
            if (JSON.parse(localStorage.getItem("access")) === null ) {
                return false
            } else {
                return true
            }
        }

    },
    actions:{
        loadSession ({commit}){
            return new Promise((resolve, reject) => {
                var token = JSON.parse(localStorage.getItem("access"))
                try {
                    if (token !== null) {
                        var user = api.parseJwt(token).user
                        commit('user/login', user, {root: true})
                        resolve()
                    } else {
                        reject()
                    }                    
                } catch(err) {
                    console.log(err)
                    reject()
                }
            })
        },
        get({commit}, code) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/auth/login/token?code=' + code.code)
                    .then(response => {
                        api.storeJWT("access", response.data.access_token)
                        api.storeJWT("refresh", response.data.refresh_token)
                        var user = api.parseJwt(response.data.access_token).user
                        commit("user/login", user, {root: true})
                        resolve("fine")
                      })
                    .catch(error => {
                        commit('error', error)
                        //commit('logout')
                        reject()
                    })
            })

        },
        refresh({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/auth/refresh')
                    .then(response => {
                        api.storeJWT("access", response.data.access_token)
                        api.storeJWT("refresh", response.data.refresh_token)
                        var user = api.parseJwt(response.data.access_token).user
                        commit("user/login", user, {root: true})
                        resolve("fine")
                      })
                    .catch(error => {
                        commit('error', error)
                        //commit('logout')
                        reject()
                    })
            })

        }
        
    }
}
export default session

