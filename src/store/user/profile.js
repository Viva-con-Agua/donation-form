import api from '../api.js'
const profile = {
    namespaced: true,
    state: () => ({
        current: null,
        msg: {
            update: {
                success: {
                    updated: {
                        title: "messages.title.success",
                        body: "messages.profile.success.updated",
                        type: "success"
                    }

                },
            },
            avatar: {
                success: {
                    confirmed: {
                        title: "messages.title.success",
                        body: "messages.files.success.created",
                        type: "success"
                    }
                },
                errors: {                    
                    unknown: {
                        title: "messages.title.error",
                        body: "messages.files.error.size",
                        type: "error"
                    }
                }
            },
            defaults: {
                errors: {
                    unauth: {
                        title: "messages.title.warn",
                        body: "messages.defaults.error.unauth",
                        type: "warn"
                    },
                    unknown: {
                        title: "messages.title.error",
                        body: "messages.defaults.error.unknown",
                        type: "error"
                    }
                }
            }

       }
    }),
    getters: {
        current(state) {
            return state.current
        }
    },
    mutations: {
        set(state, value) {
            state.current = value
            state.avatar = value.avatar
        },
        clean(state) {
            state.current = null
            state.avatar = null
        },
        avatarURL(state, value) {
            state.current.avatar.url = process.env.VUE_APP_BACKEND_URL + "/v1/avatar/img/" + value
            state.avatar.url = process.env.VUE_APP_BACKEND_URL + "/v1/avatar/img/" + value
        }
    },
    actions: {
        async upload({state, dispatch}, data) {
            await dispatch({type: "uploadAvatar", data: data.data})
            await dispatch({type: "updateReq"})
            await dispatch("user/session/refresh", {root: true})
            return state.msg.update.success.updated
        },
        async update({state, dispatch}) {
            await dispatch({type: "updateReq"})
            await dispatch("user/session/refresh", {root: true})
            return state.msg.update.success.updated
        },
        uploadAvatar({state, commit}, data) {
            return new Promise((resolve, reject) =>{
                api.call.post('/v1/avatar/upload', 
                    data.data, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }, 
                        withCredentials: true
                    })
                    .then(response => {
                        if (response.status === 201) {
                            commit("avatarURL", response.data.payload.file_id)
                            resolve(state.msg.avatar.success.confirmed)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.status === 400) {
                            reject(state.msg.defaults.errors.unknown)
                        }
                        if (error.status == 413) {
                            reject(state.msg.avatar.errors.to_big)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })
        },
        updateReq({state}) {
            return new Promise((resolve, reject) =>{
                api.call.put("/v1/profiles", state.current)
                    .then(response => {
                        if (response.status === 201) {
                           // commit("avatarURL", response.data.payload.file_id)
                            resolve(state.msg.update.success.updated)
                        }
                        resolve()
                    })
                    .catch(error => {
                        if (error.status === 400) {
                            reject(state.msg.default.errors.unknown)
                        }
                        reject(state.msg.defaults.errors.unknown)
                    })
            })

        }
    }
}
export default profile
