import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

function loadView(view) {
    return () => import(`@/components/${view}.vue`);
}

const routes = [
    {
        path: "*",
        component: loadView("DonationForm"),
        props: (route) => ({
            donation_form_id: route.query.donation_form_id,
            lang: route.query.lang,
            setting: route.query.setting,
            customized: route.query.customized,
            email: route.query.email,
            amount: route.query.amount,
            interval: route.query.interval,
            a1: route.query.a1,
            a2: route.query.a2,
            a3: route.query.a3
        }),
    },
];

var router = new Router({
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return { selector: to.hash };
        }
        return { x: 0, y: 0 };
    },
});
export default router;
