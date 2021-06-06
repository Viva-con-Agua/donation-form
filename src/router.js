import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
    return () => import(`@/views/${view}.vue`)
}

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: loadView('Login'),
        meta: { requiresAuth: false, title: "Login"},
        props: route => ({code: route.query.code, callback: route.query.callback})
    },
    {
        path: '/logout',
        name: 'Logout',
        component: loadView('Logout'),
        meta: { requiresAuth: false }
    },
    {
        path: '/sign',
        name: 'Sign',
        component: loadView('Sign'),
        meta: { requiresAuth: false, title: "Login" },
        props: true
    },
    {
        path: '/',
        component: loadView('Sign'),
        meta: { requiresAuth: false, title: "Home" }
    },
    {
        path: '*',
        component: loadView('HomeView'),
        meta: { requiresAuth: false, title: "Home" }
    }

]

var router = new Router({
    routes,
    scrollBehavior(to) {
        if (to.hash) {
          return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },
})
export default router