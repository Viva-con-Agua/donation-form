import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
    return () => import(`@/components/${view}.vue`)
}

const routes = [
    {
        path: '/',
        component: loadView('DonationForm'),
        props: route => ({ campaign_id: route.query.campaign_id })
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
