import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        report: {},
    },
    getters: {
        records(state) {
            return state.report.records;
        },
        xaxis(state) {
            return state.report.xaxis;
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
            context.commit("reporting", data);
        },
    },
});

Vue.prototype.$store = store;
export default store;