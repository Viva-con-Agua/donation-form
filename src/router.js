import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
    return () => import(`@/views/${view}.vue`)
}

const routes = [
    {
        path: '*',
        component: loadView('PaymentWidget'),
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