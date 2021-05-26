const navigation = {
    namespaced: true,
    state: () => ({
        current: "Home",
        tabs: [
            { title: 'navigation.tabs.home', route: { name: "Home" }},
            { title: 'navigation.tabs.logout', route: { name: "Logout" }, needSession: true},
            { title: 'navigation.tabs.signin', route: { name: "Sign" }, needSession: false},
        ]
    }),
    mutations: {
        current(state, value) {
            state.current = value
        }
    },
    getters: {
        current(state) {
            return state.current
        },
        tabs(state) {
            return state.tabs
        }
    },
    actions: {
        current({commit}, data) {
            commit('current', data)
        },
        getNavigation() {
            // get from backend
            // commit to state
        }
    }
}
export default navigation
