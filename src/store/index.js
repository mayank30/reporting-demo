import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        report: [],
    },
    getters: {
        reports(state) {
            return state.report;
        },
    },
    mutations: {
        reporting(state, data) {
            state.report = data;
        },
    },
    actions: {
        getReportingData: (context) => {
            const data = require("../assets/report.json");
            context.commit("reporting", data.records);
        },
    },
});

Vue.prototype.$store = store;
export default store;