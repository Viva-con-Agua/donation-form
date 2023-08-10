import Vue from "vue";
import Vuex from "vuex";
import api from "./api.js";
import payment from "./payment";
import knownfrom from "./knownfrom.js";
import company from "./company.js";
import form from "./form.js";

Vue.use(Vuex);
export default new Vuex.Store({
    namespaced: true,
    modules: {
        payment: payment,
        knownfrom: knownfrom,
        company: company,
        form: form,
    },
    state: {
        loading: false,
        setting: "",
        customized: "",
        currentMsg: null,
        product: "prod_HZW4PLYJeuxnyC",
        isCompany: false,
        offset: {
            known_from: null,
            comment: null,
        },
        customized_amount: {
            a_1: 2500,
            a_2: 5000,
            a_3: 10000
        }
    },
    mutations: {
        currentMsg(state, value) {
            state.currentMsg = value;
        },
        loadingFlow(state) {
            state.loading = !state.loading;
        },
        offset(state, value) {
            state.offset = value;
        },
        anonymous(state, value) {
            state.anonymous = value;
        },
        isCompany(state, value) {
            state.isCompany = value;
        },
        setting(state, value) {
            state.setting = value;
        },
        customized(state, value) {
            state.customized = value
        },
        customized_amount(state, val) {
            if (val.a_1 !== null) {
                state.customized_amount.a_1 = Number.parseInt(val.a_1)
            }
            if (val.a_2 !== null) {
                state.customized_amount.a_2 = Number.parseInt(val.a_2)
            }
            if (val.a_3 !== null) {
                state.customized_amount.a_3 = Number.parseInt(val.a_3)
            }
        }
    },
    getters: {
        currentMsg(state) {
            return state.currentMsg;
        },
        knownfrom(state) {
            return state.knownfrom;
        },
        loadingFlow(state) {
            return state.loading;
        },
        offset(state) {
            return state.offset;
        },
        anonymous(state) {
            return state.anonymous;
        },
        isCompany(state) {
            return state.isCompany;
        },
        payment(state) {
            return state.payment;
        },
        setting(state) {
            return state.setting;
        },
        customized(state) {
            return state.customized
        },
        customized_amount(state) {
            return state.customized_amount
        }
    },
    actions: {
        async init({ dispatch }, data) {
            await dispatch({ type: "form/get", data: data.data });
        },
        contact({ state }) {
            let data = {
                first_name: state.payment.contact.first_name
                    ? state.payment.contact.first_name
                    : "",
                last_name: state.payment.contact.last_name
                    ? state.payment.contact.last_name
                    : "",
                email: state.payment.contact.email
                    ? state.payment.contact.email
                    : "",
                message: state.offset.comment ? state.offset.comment : "",
                known_from: state.offset.known_from
                    ? state.offset.known_from[0].title
                    : "",
            };

            return new Promise((resolve, reject) => {
                api.call
                    .post("/v1/email/contact", data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        feedback({ state, rootState }) {
            let data = {
                payment_id: rootState.payment.payment_id,
                offset: {
                    comment: state.offset.comment,
                    known_from: state.offset.known_from
                        ? state.offset.known_from[0].title
                        : "",
                },
            };
            return new Promise((resolve, reject) => {
                api.call
                    .post(process.env.VUE_APP_BACKEND_CONTEXT + "/feedback", data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        newsletter({ state }) {
            let data = {
                m_id: {
                    id: state.form.current.id,
                    type: "donation_form",
                },
                email: state.payment.contact.email,
            };

            return new Promise((resolve, reject) => {
                api.call
                    .post("/v1/newsletters/subscription", data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },
});
