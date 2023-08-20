import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';
import { b as useRoute, a as useRouter } from '../server.mjs';
import { u as useDataStore } from './data-25a661d5.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import 'destr';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'defu';
import 'requrl';
import 'cookie-es';
import 'ohash';
import 'pinia-plugin-persistedstate';
import 'axios';
import 'date-fns';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'next-auth/core';
import 'next-auth/jwt';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'sweetalert2';

const _sfc_main$1 = {
  __name: "LineChart",
  __ssrInlineRender: true,
  props: {
    // "highlimit": Number,
    // "lowlimit": Number,
    "data": Array,
    "label": Array,
    "value": Array
  },
  setup(__props) {
    const props = __props;
    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
    const chartData = ref({
      labels: props.label,
      datasets: props.data
      // [
      //     {
      //         label: false,
      //         backgroundColor: '#f87979',
      //         data: props.value,
      //         tension: 0,
      //         pointRadius: 0,
      //         borderWidth: 2
      //         // segment: {
      //         //     borderColor: function (context, options) {
      //         //         const chart = context.chart;
      //         //         const { ctx, chartArea } = chart;
      //         //         if (!chartArea) {
      //         //             return null;
      //         //         }
      //         //         return getGradient(ctx, chartArea, chart);
      //         //     },
      //         // }
      //     }
      // ]
    });
    const chartOptions = ref({
      responsive: true
      // maintainAspectRatio: false,
      // plugins: {
      //     legend: {
      //         display: false,
      //     },
      // },
      // scales: {
      //     x: {
      //         border: {
      //             display: true
      //         },
      //         grid: {
      //             display: true,
      //             drawOnChartArea: true,
      //             drawTicks: true,
      //         }
      //     }, y: {
      //         border: {
      //             display: false,
      //             dash: [4, 4]
      //         },
      //         // grid: {
      //         //     color: function (params) {
      //         //         if (params.tick.value == props.lowlimit || params.tick.value == props.highlimit) {
      //         //             return '#ff0000';
      //         //         } else {
      //         //             return '#ffff';
      //         //         }
      //         //     },
      //         // },
      //     },
      // }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Line), mergeProps({
        options: unref(chartOptions),
        data: unref(chartData)
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Charts/LineChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const store = useDataStore();
    const { id } = useRoute().params;
    const { Type } = useRoute().params;
    useRouter();
    let DProomid = ref("");
    let DPdata = ref(0);
    let DPmin = ref(0);
    let DPmax = ref(0);
    let DPlabels = ref("");
    let Troomid = ref("");
    let Tdata = ref(0);
    let Tmin = ref(0);
    let Tmax = ref(0);
    let Tlabels = ref("");
    let Hdata = ref(0);
    let Hmin = ref(0);
    let Hmax = ref(0);
    let Hlabels = ref("");
    let chartDataTemp = [];
    let chartDataHum = [];
    let chartDataDifPres = [];
    [__temp, __restore] = withAsyncContext(() => store.getMonitoring()), await __temp, __restore();
    if (Type == "DP") {
      const DP = store.$state.data.monitoring.data.realtime.DP;
      [__temp, __restore] = withAsyncContext(() => store.getMonitoringMin(DP[id].tag)), await __temp, __restore();
      DProomid.value = DP[id].roomid;
      DPdata.value = DP[id].data;
      DPmin.value = DP[id].mindata;
      DPmax.value = DP[id].maxdata;
      DPlabels.value = DP.map((item) => item.lastrecord);
      chartDataDifPres = [
        {
          label: "Min",
          backgroundColor: "#f87979",
          data: DP.map((item) => item.mindata),
          segment: {
            borderColor: "#f87979"
          }
        },
        {
          label: "Max",
          backgroundColor: "green",
          data: DP.map((item) => item.maxdata),
          segment: {
            borderColor: "green"
          }
        },
        {
          label: "Current",
          backgroundColor: "orange",
          data: DP.map((item) => item.data),
          segment: {
            borderColor: "orange"
          }
        }
      ];
    }
    if (Type == "TH") {
      const TH = store.$state.data.monitoring.data.realtime.TH;
      const T = [];
      TH.forEach((element) => {
        if (element.unit == "\xB0C") {
          T.push(element);
        }
      });
      [__temp, __restore] = withAsyncContext(() => store.getMonitoringMin(T[id].tag)), await __temp, __restore();
      Troomid.value = T[id].roomid;
      Tdata.value = T[id].data;
      Tmin.value = T[id].mindata;
      Tmax.value = T[id].maxdata;
      Tlabels.value = T.map((item) => item.lastrecord);
      chartDataTemp = [
        {
          label: "Min",
          backgroundColor: "#f87979",
          data: T.map((item) => item.mindata),
          segment: {
            borderColor: "#f87979"
          }
        },
        {
          label: "Max",
          backgroundColor: "green",
          data: T.map((item) => item.maxdata),
          segment: {
            borderColor: "green"
          }
        },
        {
          label: "Current",
          backgroundColor: "orange",
          data: T.map((item) => item.data),
          segment: {
            borderColor: "orange"
          }
        }
      ];
      const H = [];
      TH.forEach((element) => {
        if (element.unit == "%RH") {
          H.push(element);
        }
      });
      Hdata.value = H[id].data;
      Hmin.value = H[id].mindata;
      Hmax.value = H[id].maxdata;
      Hlabels.value = H.map((item) => item.lastrecord);
      chartDataHum = [
        {
          label: "Min",
          backgroundColor: "#f87979",
          data: H.map((item) => item.mindata),
          segment: {
            borderColor: "#f87979"
          }
        },
        {
          label: "Max",
          backgroundColor: "green",
          data: H.map((item) => item.maxdata),
          segment: {
            borderColor: "green"
          }
        },
        {
          label: "Current",
          backgroundColor: "orange",
          data: H.map((item) => item.data),
          segment: {
            borderColor: "orange"
          }
        }
      ];
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ChartsLineChart = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"><div class="row"><div class="col-md-2 mt-2"><button class="btn btn-md btn-success float-left"><i class="fas fa-arrow-left"></i> Back </button></div>`);
      if (unref(Type) == "DP") {
        _push(`<div class="col-md-8 mt-2"><h3 class="text-center">Monitoring Detail</h3><h6 class="text-center">${ssrInterpolate(unref(DProomid))} (${ssrInterpolate(unref(Type))})</h6></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="col-md-8 mt-2"><h3 class="text-center">Monitoring Detail</h3><h6 class="text-center">${ssrInterpolate(unref(Troomid))} (${ssrInterpolate(unref(Type))})</h6></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="row">`);
      if (unref(Type) == "TH") {
        _push(`<div class="col-lg-6 col-12"><div class="info-box bg-info" style="${ssrRenderStyle({ "display": "block !important" })}"><div class="row"><div class="col-md-12 text-center"><div class="h1 font-weight-bold mb-0">${ssrInterpolate(unref(Tdata))} <sup>o</sup>C</div><span class="small text-white">Current</span></div></div><div class="row text-center"><div class="col-6 border-right"><div class="h4 font-weight-bold mb-0">${ssrInterpolate(unref(Tmin))} <sup>o</sup>C</div><span class="small text-white">Min</span></div><div class="col-6"><div class="h4 font-weight-bold mb-0">${ssrInterpolate(unref(Tmax))} <sup>o</sup>C</div><span class="small text-white">Max</span></div></div><div class="row text-center"><div class="col-12">Temperature</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="col-lg-6 col-12"><div class="info-box bg-info" style="${ssrRenderStyle({ "display": "block !important" })}"><div class="row"><div class="col-md-12 text-center"><div class="h1 font-weight-bold mb-0">${ssrInterpolate(unref(Hdata))} <sup>%</sup>Rh</div><span class="small text-white">Current</span></div></div><div class="row text-center"><div class="col-6 border-right"><div class="h4 font-weight-bold mb-0">${ssrInterpolate(unref(Hmin))} <sup>%</sup>Rh</div><span class="small text-white">Min</span></div><div class="col-6"><div class="h4 font-weight-bold mb-0">${ssrInterpolate(unref(Hmax))} <sup>%</sup>Rh</div><span class="small text-white">Max</span></div></div><div class="row text-center"><div class="col-12">Humidity</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "DP") {
        _push(`<div class="col-lg-12 col-12"><div class="info-box bg-info" style="${ssrRenderStyle({ "display": "block !important" })}"><div class="row"><div class="col-md-12 text-center"><div class="h1 font-weight-bold mb-0">${ssrInterpolate(unref(DPdata))} <sup>Pa</sup></div><span class="small text-white">Current</span></div></div><div class="row text-center"><div class="col-6 border-right"><div class="h4 font-weight-bold mb-0">${ssrInterpolate(unref(DPmin))} <sup>Pa</sup></div><span class="small text-white">Min</span></div><div class="col-6"><div class="h4 font-weight-bold mb-0">${ssrInterpolate(unref(DPmax))} <sup>Pa</sup></div><span class="small text-white">Max</span></div></div><div class="row text-center"><div class="col-12">Diferrential Pressure</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(Type) == "TH") {
        _push(`<div class="card card-primary"><div class="card-header">Temperature</div><div class="card-body bg-white">`);
        _push(ssrRenderComponent(_component_ChartsLineChart, {
          label: unref(Tlabels),
          data: unref(chartDataTemp)
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="card card-primary"><div class="card-header">Humidity</div><div class="card-body bg-white">`);
        _push(ssrRenderComponent(_component_ChartsLineChart, {
          label: unref(Hlabels),
          data: unref(chartDataHum)
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "DP") {
        _push(`<div class="card card-primary"><div class="card-header">Pressure</div><div class="card-body bg-white">`);
        _push(ssrRenderComponent(_component_ChartsLineChart, {
          label: unref(DPlabels),
          data: unref(chartDataDifPres)
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Monitoring/Detail-[Type]/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-0ecf620a.mjs.map
