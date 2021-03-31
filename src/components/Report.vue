<template>
  <div class="container">
    <select v-model="metric" @change="onMetricChange">
      <option value="" disabled>--select--</option>
      <option
        :value="m"
        v-for="m in metricOptions"
        :key="m.key"
        :disabled="m.key == ''"
      >
        {{ m.value }}
      </option>
    </select>
    <div class="head">{{ metric.value }}</div>

    <GChart
      v-show="chartData.length"
      type="LineChart"
      :resizeDebounce="500"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import Vue from "vue";

import { mapActions, mapGetters } from "vuex";
import VueGoogleCharts from "vue-google-charts";
Vue.use(VueGoogleCharts);

export default {
  name: "Report",
  data() {
    return {
      metric: "",
      metricOptions: [
        { key: "clickThruRate", value: "page rec clickthru rate" },
        { key: "pageViews", value: "page views" },
        { key: "orders", value: "orders" },
        { key: "sales", value: "sales" },
      ],
      chartData: [],
      chartOptions: {
        fontSize: 12,
        fontName: "inherit",
        hAxis: { slantedTextAngle: 60 },
        vAxis: {
          minorGridlines: {
            color: "transparent",
          },
        },
        legend: {
          position: "top",
          alignment: "center",
          textStyle: { color: "black", fontSize: 14 },
        },
        pointsVisible: true,
        height: 400,
        trendlines: { n: { lineWidth: 0 } },
      },
    };
  },
  computed: {
    ...mapGetters(["records", "xaxis"]),
  },
  methods: {
    ...mapActions(["getReportingData"]),
    onMetricChange() {
      this.chartData = [[this.xaxis, this.metric.value]];
      this.records.forEach((x) => {
        const rec = [x[this.xaxis], x[this.metric.key]];
        this.chartData.push(rec);
      });
    },
  },
  created() {
    this.getReportingData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 960px;
  margin: auto;
}
select {
  height: 30px;
}
.head {
  margin: 20px 0px;
  font-weight: bold;
  font-size: 14px;
}
</style>
