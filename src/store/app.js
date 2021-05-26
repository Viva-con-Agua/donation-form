import api from './api.js'

const app = {

    namespaced: true,
    state: () => ({
        list: null,
        create: {
            app_name: '',
            redirect_url: '',
            logout_url: '',
            restriction: [],
        },
        current: null
    }),
    mutations: {
        create (state, value) {
            state.create = value
        },
        current (state, value) {
            state.current = value
        },
        list (state, value) {
            state.list = value
        }
    },
    getters:{
        list (state) {
            return state.list
        },
        current (state) {
            return state.current
        }
    },
    actions: {
        async add ({dispatch}) {
            await dispatch({type: 'create'})
            await dispatch({type: 'list'})
        },
        async update( {dispatch}) {
            await dispatch({type: 'updateReq'})
            await dispatch({type: 'list'})
        },

        create({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.post('/v1/apps', state.create)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        updateReq({commit, state}) {
            return new Promise((resolve, reject) => {
               api.call.put('/v1/apps', state.current)
                    .then((response) => {commit('current', response.data.payload), resolve()})
                    .catch(error => {
                        reject(error)
                    })
            }) 
        },
        list({commit}) {
            return new Promise((resolve, reject) => {
                api.call.get('/v1/apps')
                    .then((response) => {commit('list', response.data.payload), resolve()})
                    .catch((error) => {
                        reject(error)
                    })
            })
        } 
    }
    
}
export default app
