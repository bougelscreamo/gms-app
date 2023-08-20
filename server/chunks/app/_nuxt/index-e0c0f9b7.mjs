import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, resolveComponent, mergeProps, unref, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'vue-chartjs';
import { _ as _imports_0 } from './logo-b6df196a.mjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { a as useAuthStore, u as useDataStore } from './data-25a661d5.mjs';
import { useDateFormat } from '@vueuse/core';
import { addDays } from 'date-fns';
import Swal from 'sweetalert2';
import { _ as _export_sfc } from '../server.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'next-auth/core';
import 'next-auth/jwt';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'axios';
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';
import 'pinia-plugin-persistedstate';

const _sfc_main$1 = {
  __name: "ReportChart",
  __ssrInlineRender: true,
  props: {
    "highlimit": Number,
    "lowlimit": Number,
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
    let width, height, gradient;
    function getGradient(ctx, chartArea, chart, context) {
      const chartWidth = chartArea.right - chartArea.left;
      const chartHeight = chartArea.bottom - chartArea.top;
      if (gradient === null || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(1, "red");
        gradient.addColorStop(props.highlimit / height, "blue");
        gradient.addColorStop(props.lowlimit / height, "red");
      }
      return gradient;
    }
    const chartData = ref({
      labels: props.label,
      datasets: [
        {
          label: false,
          backgroundColor: "#f87979",
          data: props.value,
          tension: 0,
          pointRadius: 0,
          borderWidth: 2,
          segment: {
            borderColor: function(context, options) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                return null;
              }
              return getGradient(ctx, chartArea);
            }
          }
        }
      ]
    });
    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          border: {
            display: true
          },
          grid: {
            display: true,
            drawOnChartArea: true,
            drawTicks: true
          }
        },
        y: {
          border: {
            display: false,
            dash: [4, 4]
          },
          grid: {
            color: function(params) {
              if (params.tick.value == props.lowlimit || params.tick.value == props.highlimit) {
                return "#ff0000";
              } else {
                return "#ffff";
              }
            }
          }
        }
      }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Charts/ReportChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _imports_1 = "" + buildAssetsURL("logo-biofarma.e48f4695.jpg");
let today = useDateFormat(/* @__PURE__ */ new Date(), "DD-MM-YYYY HH:mm:ss").value;
const __default__ = {
  data() {
    return {
      auth: useAuthStore(),
      room: "",
      parameter: "",
      startdate: /* @__PURE__ */ new Date(),
      enddate: /* @__PURE__ */ new Date(),
      maxdate: "",
      tables: false,
      alarm: false,
      auditTrails: false,
      intable: false,
      inalarm: false,
      inauditTrails: false,
      dataRoom: [],
      dataParameter: [
        { id: 0, code: "TEMP", name: "Temperature" },
        { id: 1, code: "HUM", name: "Humidity" },
        { id: 2, code: "DP", name: "Differential Pressure" }
      ],
      dataChart: [],
      dataTable: [],
      dataAlarm: [],
      dataAudit: [],
      dataInfo: {
        unit: "",
        room_name: "",
        parameter: "",
        start: "",
        end: "",
        minData: 0,
        avgData: 0,
        maxData: 0,
        minBatas: 0,
        maxBatas: 0,
        labels: [],
        value: []
      },
      searched: false
    };
  },
  computed: {
    async filterRoom() {
      let par = this.dataParameter;
      for (let index2 = 0; index2 < par.length; index2++) {
        if (par[index2].id == this.parameter) {
          await useDataStore().getReportRoom(par[index2].id);
          this.dataRoom = useDataStore().$state.data.report.room;
        }
      }
    }
  },
  methods: {
    async submitReport() {
      this.searched = true;
      let start = useDateFormat(this.startdate, "YYYY-MM-DD").value;
      let end = useDateFormat(this.enddate, "YYYY-MM-DD").value;
      let para = "";
      for (let index2 = 0; index2 < this.dataParameter.length; index2++) {
        if (this.dataParameter[index2].id == this.parameter) {
          para = this.dataParameter[index2].code;
        }
      }
      console.log(this.room);
      this.form = {
        roomid: this.room,
        parameter: para,
        start,
        end,
        alarm: this.inalarm,
        auditrail: this.inauditTrails,
        reporttable: this.intable
      };
      await this._pStores.data.getReport(this.form).then((res) => {
        Swal.fire({
          title: "Success",
          text: "Report create successfully",
          icon: "success",
          timer: 1500
        });
      });
      this.dataChart = this._pStores.data.data.report.chart;
      this.dataTable = this._pStores.data.data.report.table;
      this.dataAlarm = this._pStores.data.data.report.alarm;
      this.dataAudit = this._pStores.data.data.report.audit;
      if (this.dataChart.length != 0) {
        this.alarm = this.inalarm;
        this.tables = this.intable;
        this.auditTrails = this.inauditTrails;
        this.dataParameter.forEach((item) => {
          if (item.id == this.parameter) {
            this.dataInfo.parameter = item.name;
          }
        });
        this.dataInfo.start = start;
        this.dataInfo.end = end;
        this.dataInfo.roomid = this.dataChart[0].roomid;
        this.dataInfo.minData = this.dataChart[0].mindata;
        this.dataInfo.unit = this.dataChart[0].unit;
        this.dataInfo.avgData = this.dataChart[0].avgdata;
        this.dataInfo.maxData = this.dataChart[0].maxdata;
        this.dataInfo.minBatas = this.dataChart[0].sv_min;
        this.dataInfo.maxBatas = this.dataChart[0].sv_max;
        this.dataInfo.labels = this.dataChart.map((item) => {
          return useDateFormat(item.lastrecord, "hh:mm:ss").value;
        });
        this.dataInfo.value = this.dataChart.map((item) => {
          return item.data;
        });
      }
    },
    generateReport() {
      const imgData = "/assets/img/LOGO-BIOFARMA.jpg";
      const imgLogo = "/assets/img/logo.png";
      const data = document.getElementById("myChart");
      var doc = new jsPDF("l", "pt", "a4");
      const pageSize = doc.internal.pageSize.width;
      const hight = doc.internal.pageSize.height;
      const labels_report = this.parameter == 2 ? [
        "Last Record",
        "Room ID (+)",
        "Room ID (-)",
        "Present Value",
        "Min Data",
        "Avg Data",
        "Max Data",
        "Low Limit",
        "High Limit"
      ] : [
        "Last Record",
        "Room ID",
        "Present Value",
        "Min Data",
        "Avg Data",
        "Max Data",
        "Low Limit",
        "High Limit"
      ];
      const labels_alarm = [
        "Start Alarm",
        "End Alarm",
        "Duration",
        "Alarm Status",
        "Alarm Type",
        "User Comment"
      ];
      const labels_audit = ["Last Record", "Username", "Access", "Action", "Description"];
      html2canvas(data).then(async (canvas) => {
        doc.setFontSize(40);
        doc.addImage(imgLogo, "JPEG", 10, 10, 60, 60);
        doc.setFont("Roboto", "bold").setFontSize(30).text(220, 50, "GMP Monitoring System");
        doc.addImage(imgData, "JPEG", pageSize - 180, 5, 170, 80);
        doc.addImage(canvas, "PNG", 15, 163, pageSize - 20, hight - 295);
        doc.setFont("Roboto", "normal").setFontSize(20).text(20, 100, `Gedung ${auth.user.company}`);
        doc.setFont("Roboto", "normal").setFontSize(16).text(20, 120, "Room");
        doc.setFont("Roboto", "normal").setFontSize(16).text(pageSize - 250, 140, "Periode");
        doc.setFont("Roboto", "normal").setFontSize(16).text(20, 140, "Parameter");
        doc.setFont("Roboto", "normal").setFontSize(16).text(100, 120, `: ${this.dataInfo.room_name}`);
        doc.setFont("Roboto", "normal").setFontSize(16).text(pageSize - 190, 140, `: ${this.dataInfo.start} -- ${this.dataInfo.end}`);
        doc.setFont("Roboto", "normal").setFontSize(16).text(100, 140, `: ${this.dataInfo.parameter}`);
        doc.setLineWidth(1);
        doc.line(15, 160, pageSize - 15, 160);
        doc.line(15, 160, 15, hight - 130);
        doc.line(15, hight - 130, pageSize - 15, hight - 130);
        doc.line(pageSize - 15, 160, pageSize - 15, hight - 130);
        doc.setFont("Roboto", "bold").setFontSize(16).text(20, hight - 110, "LEGEND  :");
        doc.setFillColor(0, 0, 255);
        doc.setDrawColor(0);
        doc.roundedRect(20, hight - 100, 50, 20, 3, 3, "F");
        doc.setFont("Roboto", "normal").setFontSize(16).text(90, hight - 85, "Normal");
        doc.setFillColor(255, 0, 0);
        doc.roundedRect(20, hight - 75, 50, 20, 3, 3, "F");
        doc.setFont("Roboto", "normal").setFontSize(16).text(90, hight - 60, "GMP Limit");
        doc.setFont("Roboto", "normal").setFontSize(16).text(pageSize - 200, hight - 85, "High Limit");
        doc.setFontSize(16).text(
          pageSize - 120,
          hight - 85,
          `: ${this.dataInfo.maxBatas} ${this.dataInfo.unit}`
        );
        doc.setFont("Roboto", "normal").setFontSize(16).text(pageSize - 200, hight - 60, "Low Limit");
        doc.setFontSize(16).text(
          pageSize - 120,
          hight - 60,
          `: ${this.dataInfo.minBatas} ${this.dataInfo.unit}`
        );
        doc.setFont("Roboto", "normal").setFontSize(14).text(150, hight - 35, `min. Value : ${this.dataInfo.minData}`);
        doc.setFont("Roboto", "normal").setFontSize(14).text(pageSize - 500, hight - 35, `avg. Value : ${this.dataInfo.avgData}`);
        doc.setFont("Roboto", "normal").setFontSize(14).text(pageSize - 300, hight - 35, `max. Value : ${this.dataInfo.maxData}`);
        if (this.tables) {
          doc.addPage();
          doc.autoTable({
            head: [labels_report],
            body: this.dataTable.map((item) => {
              return this.parameter == 2 ? [
                item.lastrecord,
                item.roomid,
                item.tagname_link,
                item.data,
                item.mindata,
                item.avgdata,
                item.maxdata,
                item.sv_min,
                item.sv_max
              ] : [
                item.lastrecord,
                item.roomid,
                item.data,
                item.mindata,
                item.avgdata,
                item.maxdata,
                item.sv_min,
                item.sv_max
              ];
            }),
            margin: {
              right: 15,
              left: 15
            }
          });
        }
        if (this.alarm) {
          doc.addPage();
          doc.setFont("Roboto", "bold").setFontSize(20).text(17, 20, "Alarm Report");
          doc.autoTable({
            head: [labels_alarm],
            body: this.dataAlarm.map((item) => {
              return [
                item.alarm_start,
                item.alarm_end,
                item.duration,
                item.error,
                item.alarm_type,
                item.description
              ];
            }),
            startY: 30,
            margin: {
              right: 15,
              left: 15
            }
          });
        }
        if (this.auditTrails) {
          doc.addPage();
          doc.setFont("Roboto", "bold").setFontSize(20).text(17, 20, "Audit Trail Report");
          doc.autoTable({
            head: [labels_audit],
            body: this.dataAudit.map((item) => {
              return [
                item.datetimes,
                item.username,
                item.access,
                item.action,
                item.description
              ];
            }),
            startY: 30,
            margin: {
              right: 15,
              left: 15
            }
          });
        }
        var pageCount = doc.internal.getNumberOfPages();
        for (let i = 0; i < pageCount; i++) {
          doc.setPage(i);
          let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber;
          doc.setFontSize(12);
          doc.text(pageCurrent + "/" + pageCount, 10, doc.internal.pageSize.height - 10);
          doc.setFont("Roboto", "bold").setFontSize(12).text(
            pageSize - 400,
            hight - 10,
            `Printed By : ${this.auth.getUser.fullname}`
          );
          doc.setFont("Roboto", "bold").setFontSize(12).text(pageSize - 150, hight - 10, `${today}`);
        }
        if (this.alarm) {
          if (this.auditTrails) {
            doc.save(
              `GMS Report-${this.dataInfo.room_name}-${this.dataInfo.parameter}-Report${this.tables ? "+Table" : ""}+Alarm+Audit Trail.pdf`
            );
          } else {
            doc.save(
              `GMS Report-${this.dataInfo.room_name}-${this.dataInfo.parameter}-Report${this.tables ? "+Table" : ""}+Alarm.pdf`
            );
          }
        } else {
          if (this.auditTrails) {
            doc.save(
              `GMS Report-${this.dataInfo.room_name}-${this.dataInfo.parameter}-Report${this.tables ? "+Table" : ""}+Audit Trail.pdf`
            );
          } else {
            doc.save(
              `GMS Report-${this.dataInfo.room_name}-${this.dataInfo.parameter}-Report${this.tables ? "+Table" : ""}.pdf`
            );
          }
        }
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_vue_date_picker = resolveComponent("vue-date-picker");
      const _component_ChartsReportChart = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))} data-v-fc67526b><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}" data-v-fc67526b><div class="card card-primary" data-v-fc67526b><div class="card-header" data-v-fc67526b> Report <div class="card-tools" data-v-fc67526b><button type="button" class="btn btn-tool" data-card-widget="collapse" data-v-fc67526b><i class="fas fa-minus" data-v-fc67526b></i></button></div></div><div class="card-body" data-v-fc67526b><form method="post" data-v-fc67526b><div class="row" data-v-fc67526b><div class="col-md-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><label for="parameter" data-v-fc67526b>Parameter</label><select class="form-control" name="parameter" aria-required="true"${ssrRenderAttr("on-change", _ctx.filterRoom)} data-v-fc67526b><option value="" selected disabled data-v-fc67526b>-- Select Parameter --</option><!--[-->`);
      ssrRenderList(_ctx.dataParameter, (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)} data-v-fc67526b>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="col-md-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><label for="room" data-v-fc67526b>Room</label><select class="form-control" name="room" aria-required="true" data-v-fc67526b><option value="" selected disabled data-v-fc67526b>-- Select Room --</option><!--[-->`);
      ssrRenderList(_ctx.dataRoom, (item, index2) => {
        _push(`<option${ssrRenderAttr("value", item.roomid)} data-v-fc67526b>${ssrInterpolate(item.roomid)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="col-md-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><label for="dateFrom" data-v-fc67526b>From</label>`);
      _push(ssrRenderComponent(_component_vue_date_picker, {
        modelValue: _ctx.startdate,
        "onUpdate:modelValue": ($event) => _ctx.startdate = $event,
        "auto-apply": "",
        "enable-time-picker": false,
        inputFormat: "yyyy-MM-dd",
        previewFormat: "yyyy-MM-dd"
      }, null, _parent));
      _push(`</div></div><div class="col-md-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><label for="dateTo" data-v-fc67526b>To</label>`);
      _push(ssrRenderComponent(_component_vue_date_picker, {
        modelValue: _ctx.enddate,
        "onUpdate:modelValue": ($event) => _ctx.enddate = $event,
        "auto-apply": "",
        "enable-time-picker": false,
        "min-date": _ctx.startdate,
        "max-date": unref(addDays)(_ctx.startdate, 30),
        inputFormat: "yyyy-MM-dd",
        previewFormat: "yyyy-MM-dd"
      }, null, _parent));
      _push(`</div></div><div class="col-md-5 text-right pt-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.inauditTrails) ? ssrLooseContain(_ctx.inauditTrails, null) : _ctx.inauditTrails) ? " checked" : ""} id="check_audit" data-v-fc67526b><label class="form-label" for="check_audit" data-v-fc67526b> Audit Trails Report</label></div></div><div class="col-md-2 text-right pt-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.inalarm) ? ssrLooseContain(_ctx.inalarm, null) : _ctx.inalarm) ? " checked" : ""} id="check_alarm" data-v-fc67526b><label class="form-label" for="check_alarm" data-v-fc67526b> Alarm Report</label></div></div><div class="col-md-2 text-right pt-3" data-v-fc67526b><div class="form-group" data-v-fc67526b><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(_ctx.intable) ? ssrLooseContain(_ctx.intable, null) : _ctx.intable) ? " checked" : ""} id="check_table" data-v-fc67526b><label class="form-label" for="check_table" data-v-fc67526b> Report Data Table</label></div></div><div class="col-md-3 pt-2" data-v-fc67526b><div class="form-group" data-v-fc67526b>`);
      if (_ctx.parameter.value == "-- Select Parameter --" && _ctx.room.value == "-- Select Room --") {
        _push(`<button disabled type="submit" id="btnGenerateAsset" class="btn btn-default" style="${ssrRenderStyle({ "width": "100%" })}" data-v-fc67526b><i class="fa fa-search" data-v-fc67526b></i> Submit </button>`);
      } else {
        _push(`<button type="submit" id="btnGenerateAsset" class="btn btn-default" style="${ssrRenderStyle({ "width": "100%" })}" data-v-fc67526b><i class="fa fa-search" data-v-fc67526b></i> Submit </button>`);
      }
      _push(`</div></div></div></form></div></div>`);
      if (!_ctx.searched) {
        _push(`<div data-v-fc67526b></div>`);
      } else {
        _push(`<div data-v-fc67526b>`);
        if (!_ctx.dataChart.length) {
          _push(`<div class="card" data-v-fc67526b><div class="card-body" data-v-fc67526b><h4 data-v-fc67526b>No Data.</h4></div></div>`);
        } else {
          _push(`<div class="card" data-v-fc67526b><div class="card-header" data-v-fc67526b><div class="card-title" data-v-fc67526b><h4 class="font-bold" data-v-fc67526b>Print Preview Report</h4></div><div class="card-tools" data-v-fc67526b><button class="btn btn-primary" data-v-fc67526b><i class="fas fa-download" data-v-fc67526b></i> Download PDF </button></div></div><div class="card-body" data-v-fc67526b>`);
          if (_ctx.dataChart.length != 0) {
            _push(`<div data-v-fc67526b><div class="row" data-v-fc67526b><div class="col-md-12" data-v-fc67526b><div class="card bg-white" data-v-fc67526b><div class="card-body" data-v-fc67526b><div id="headerPDF" data-v-fc67526b><div class="row" data-v-fc67526b><div class="col-md-2 mb-3" data-v-fc67526b><img${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "height": "4em" })}" alt="logo_GMS" data-v-fc67526b></div><div class="col-md-8" data-v-fc67526b><h4 class="text-xl font-bold mb-2 text-center" data-v-fc67526b> GMP Monitoring System </h4></div><div class="col-md-2" data-v-fc67526b><img${ssrRenderAttr("src", _imports_1)} class="w-100" style="${ssrRenderStyle({ "float": "right" })}" alt="logo_Biofarma" data-v-fc67526b></div></div><div class="row px-2" data-v-fc67526b><div class="col-md-2" data-v-fc67526b><div data-v-fc67526b>Gedung</div><div data-v-fc67526b>Room</div><div data-v-fc67526b>Parameter</div></div><div class="col-md-4" data-v-fc67526b><div data-v-fc67526b>: ${ssrInterpolate(_ctx.auth.user.company)}</div><div data-v-fc67526b>: ${ssrInterpolate(_ctx.dataInfo.roomid)}</div><div data-v-fc67526b>: ${ssrInterpolate(_ctx.dataInfo.parameter)}</div></div><div class="col-md-6" style="${ssrRenderStyle({ "align-self": "end", "text-align": "right" })}" data-v-fc67526b><div data-v-fc67526b> Periode : ${ssrInterpolate(_ctx.dataInfo.start + " \u2014 " + _ctx.dataInfo.end)}</div></div></div><div class="border p-1 mb-3" data-v-fc67526b><div id="myChart" style="${ssrRenderStyle({ "height": "20em" })}" class="mb-3 bg-white p-1" data-v-fc67526b>`);
            _push(ssrRenderComponent(_component_ChartsReportChart, {
              highlimit: _ctx.dataInfo.maxBatas,
              lowlimit: _ctx.dataInfo.minBatas,
              label: _ctx.dataInfo.labels,
              value: _ctx.dataInfo.value
            }, null, _parent));
            _push(`</div></div><div class="row" data-v-fc67526b><div class="col-md-6" data-v-fc67526b><div class="row" data-v-fc67526b><div class="col-md-12" data-v-fc67526b><h5 class="bold" data-v-fc67526b>LEGEND</h5></div><div class="col-md-2" data-v-fc67526b><div class="box rounded p-3 bg-primary" data-v-fc67526b></div></div><div class="col-md-4" data-v-fc67526b>Normal</div><div class="col-md-2" data-v-fc67526b><div class="box rounded p-3 bg-danger" data-v-fc67526b></div></div><div class="col-md-4" data-v-fc67526b>GMP Limit</div></div></div><div class="col-md-6" style="${ssrRenderStyle({ "align-self": "end" })}" data-v-fc67526b><div class="row" data-v-fc67526b><div class="col-md-9 text-right" data-v-fc67526b>High Limit</div><div class="col-md-3" data-v-fc67526b> : ${ssrInterpolate(_ctx.dataInfo.maxBatas)} ${ssrInterpolate(_ctx.dataInfo.unit)}</div><div class="col-md-9 text-right" data-v-fc67526b>Low Limit</div><div class="col-md-3" data-v-fc67526b> : ${ssrInterpolate(_ctx.dataInfo.minBatas)} ${ssrInterpolate(_ctx.dataInfo.unit)}</div></div></div></div><div class="row mt-4" data-v-fc67526b><div class="col-md-2 text-right" data-v-fc67526b>min. value</div><div class="col-md-2" data-v-fc67526b>: ${ssrInterpolate(_ctx.dataInfo.minData)}</div><div class="col-md-2 text-right" data-v-fc67526b>max. value</div><div class="col-md-2" data-v-fc67526b>: ${ssrInterpolate(_ctx.dataInfo.maxData)}</div><div class="col-md-2 text-right" data-v-fc67526b>avg. value</div><div class="col-md-2" data-v-fc67526b>: ${ssrInterpolate(_ctx.dataInfo.avgData)}</div></div><hr class="mb-0" data-v-fc67526b><hr data-v-fc67526b>`);
            if (_ctx.intable) {
              _push(`<div class="my-2" style="${ssrRenderStyle({ "overflow-y": "scroll", "max-height": "100vh" })}" data-v-fc67526b><table class="table table-bordered table-striped" data-v-fc67526b><thead data-v-fc67526b><tr data-v-fc67526b><td data-v-fc67526b>Last Record</td>`);
              if (_ctx.parameter != 2) {
                _push(`<td data-v-fc67526b>Room ID</td>`);
              } else {
                _push(`<!---->`);
              }
              if (_ctx.parameter == 2) {
                _push(`<td data-v-fc67526b>Room ID (+)</td>`);
              } else {
                _push(`<!---->`);
              }
              if (_ctx.parameter == 2) {
                _push(`<td data-v-fc67526b>Room ID (-)</td>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<td data-v-fc67526b>Tag</td><td data-v-fc67526b>Present Value</td><td data-v-fc67526b>Min</td><td data-v-fc67526b>Avg</td><td data-v-fc67526b>Max</td><td data-v-fc67526b>Low Limit</td><td data-v-fc67526b>High Limit</td></tr></thead><tbody data-v-fc67526b><!--[-->`);
              ssrRenderList(_ctx.dataTable, (item) => {
                _push(`<tr data-v-fc67526b><td data-v-fc67526b>${ssrInterpolate(item.lastrecord)}</td>`);
                if (_ctx.parameter != 2) {
                  _push(`<td data-v-fc67526b>${ssrInterpolate(item.roomid)}</td>`);
                } else {
                  _push(`<!---->`);
                }
                if (_ctx.parameter == 2) {
                  _push(`<td data-v-fc67526b>${ssrInterpolate(item.roomid)}</td>`);
                } else {
                  _push(`<!---->`);
                }
                if (_ctx.parameter == 2) {
                  _push(`<td data-v-fc67526b>${ssrInterpolate(item.tagname_link)}</td>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<td data-v-fc67526b>${ssrInterpolate(item.tagname)}</td><td data-v-fc67526b>${ssrInterpolate(item.data)}</td><td data-v-fc67526b>${ssrInterpolate(item.mindata)}</td><td data-v-fc67526b>${ssrInterpolate(item.avgdata)}</td><td data-v-fc67526b>${ssrInterpolate(item.maxdata)}</td><td data-v-fc67526b>${ssrInterpolate(item.sv_min)}</td><td data-v-fc67526b>${ssrInterpolate(item.sv_max)}</td></tr>`);
              });
              _push(`<!--]--></tbody></table></div>`);
            } else {
              _push(`<!---->`);
            }
            if (_ctx.inalarm) {
              _push(`<div data-v-fc67526b><h4 data-v-fc67526b>Alarm Report</h4><div class="my-2 border" style="${ssrRenderStyle({ "overflow-y": "scroll", "max-height": "100vh" })}" data-v-fc67526b><table class="table table-bordered table-striped" data-v-fc67526b><thead data-v-fc67526b><tr data-v-fc67526b><th data-v-fc67526b>Start Time</th><th data-v-fc67526b>End Time</th><th data-v-fc67526b>Duration</th><th data-v-fc67526b>Alarm Status</th><th data-v-fc67526b>Alarm Type</th><th data-v-fc67526b>User Comment</th></tr></thead><tbody data-v-fc67526b><!--[-->`);
              ssrRenderList(_ctx.dataAlarm, (item) => {
                _push(`<tr data-v-fc67526b><td data-v-fc67526b>${ssrInterpolate(item.alarm_start)}</td><td data-v-fc67526b>${ssrInterpolate(item.alarm_end)}</td><td data-v-fc67526b>${ssrInterpolate(item.duration)}</td><td data-v-fc67526b>${ssrInterpolate(item.alarm_status)}</td><td data-v-fc67526b>${ssrInterpolate(item.alarm_type)}</td><td data-v-fc67526b>${ssrInterpolate(item.usercomment)}</td></tr>`);
              });
              _push(`<!--]--></tbody></table></div></div>`);
            } else {
              _push(`<!---->`);
            }
            if (_ctx.inauditTrails) {
              _push(`<div data-v-fc67526b><h4 data-v-fc67526b>Audit Trails Report</h4><div class="my-2 border" style="${ssrRenderStyle({ "overflow-y": "scroll", "max-height": "100vh" })}" data-v-fc67526b><table class="table table-bordered table-striped" data-v-fc67526b><thead data-v-fc67526b><tr data-v-fc67526b><th data-v-fc67526b>Date Time</th><th data-v-fc67526b>Username</th><th data-v-fc67526b>Access</th><th data-v-fc67526b>Action</th><th data-v-fc67526b>Description</th></tr></thead><tbody data-v-fc67526b><!--[-->`);
              ssrRenderList(_ctx.dataAudit, (item) => {
                _push(`<tr data-v-fc67526b><td data-v-fc67526b>${ssrInterpolate(item.datetimes)}</td><td data-v-fc67526b>${ssrInterpolate(item.username)}</td><td data-v-fc67526b>${ssrInterpolate(item.access)}</td><td data-v-fc67526b>${ssrInterpolate(item.action)}</td><td data-v-fc67526b>${ssrInterpolate(item.description)}</td></tr>`);
              });
              _push(`<!--]--></tbody></table></div></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="row" data-v-fc67526b><div class="col-md-5" data-v-fc67526b></div><div class="col-md-5 text-right" data-v-fc67526b><span class="p" data-v-fc67526b>PrintedBy : ${ssrInterpolate(_ctx.auth.getUser.fullname)}</span></div><div class="col-md-2 text-right" data-v-fc67526b><span class="p" data-v-fc67526b>${ssrInterpolate(unref(today))}</span></div></div></div></div></div></div></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        }
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Reports/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fc67526b"]]);

export { index as default };
//# sourceMappingURL=index-e0c0f9b7.mjs.map
