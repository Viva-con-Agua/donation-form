import api from "./api.js";

const form = {
    namespaced: true,
    state: () => ({
        current: {
            product: null,
            min_amount: 100,
            payment_types: [
                { name: "civisepa", title: "payment.type.sepa", default: true },
                { name: "sepa", title: "payment.type.sepa" },
                { name: "creditcard", title: "payment.type.creditcard" },
                { name: "paypal", title: "payment.type.paypal" },
            ],
            subscription_types: [
                { name: "civisepa", title: "payment.type.sepa", default: true },
                { name: "sepa", title: "payment.type.sepa" },
                { name: "creditcard", title: "payment.type.creditcard" },
                { name: "paypal", title: "payment.type.paypal" },
            ],
        },
    }),
    getters: {
        product(state) {
            return state.current.product;
        },
        minAmount(state) {
            return state.current.min_amount;
        },
        slider(state) {
            return state.current.slider;
        },
        paymentTypes(state) {
            return state.current.payment_types;
        },
        subscriptionTypes(state) {
            return state.current.subscription_types;
        },
        company(state) {
            return state.current.company;
        },
    },
    mutations: {
        get(state, value) {
            state.current = value;
        },
    },
    actions: {
        get({ commit }, data) {
            return new Promise((resolve, reject) => {
                api.call
                    .get("/payments/form/" + data.data)
                    .then((response) => {
                        commit("get", response.data.payload),
                            commit("company/current", response.data.payload, {
                                root: true,
                            }),
                            commit(
                                "payment/default_amount",
                                response.data.payload.default_amount,
                                { root: true }
                            ),
                            resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
};

export default form;
