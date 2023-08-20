import { withAsyncContext, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { u as useFetch } from './fetch-129bc426.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { u as useDataStore } from './data-25a661d5.mjs';
import 'ohash';
import '../server.mjs';
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

const pageSize = 10;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const store = useDataStore();
    const { data: payload } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/token", "$wW2thL8nmk")), __temp = await __temp, __restore(), __temp);
    [__temp, __restore] = withAsyncContext(() => store.getAlarmHistory()), await __temp, __restore();
    const keyword = ref("");
    let page = ref(1);
    let totalRow = ref(0);
    let totalPage = ref(0);
    totalRow = store.$state.data.alarms.data.length;
    function paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const data = computed(() => {
      let originalData = store.$state.data.alarms.data;
      let rawData = store.$state.data.alarms.data;
      if (keyword.value != "") {
        rawData = originalData.filter((item) => {
          return item.tagname.toUpperCase().includes(keyword.value.toUpperCase()) || item.error.toUpperCase().includes(keyword.value.toUpperCase()) || item.alarm_type.toUpperCase().includes(keyword.value.toUpperCase()) || item.code.toUpperCase().includes(keyword.value.toUpperCase()) || item.description.toUpperCase().includes(keyword.value.toUpperCase());
        });
        totalRow = rawData.length;
        totalPage = computedTotalPage();
        if (page.value > totalPage) {
          page.value = 1;
          gotoPage();
        }
      } else {
        rawData = originalData;
        totalRow = rawData.length;
        totalPage = computedTotalPage();
      }
      return paginate(rawData, pageSize, page.value);
    });
    totalPage = computedTotalPage();
    function computedTotalPage() {
      return Math.ceil(totalRow / pageSize);
    }
    function gotoPage() {
      console.log("page :" + page.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header">Alarm History</div><div class="card-body"><div class="row"><div class="col-md-12"><div role="group" class="input-group mb-3 input-group-md"><div class="input-group-prepend"><div class="input-group-text">Search...</div></div><input type="text" class="form-control"${ssrRenderAttr("value", unref(keyword))}><div class="input-group-append"><button text="Button" type="button" class="btn btn-secondary btn-md"${ssrIncludeBooleanAttr(!unref(keyword)) ? " disabled" : ""}> X </button></div></div></div></div></div><div class="card-body bg-dark" id="theContainer"><table class="table table-bordered"><thead class="bg-secondary"><tr class="bg-dark-gray">`);
      if (unref(payload).role <= 2) {
        _push(`<th>Action</th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<th>Room Id</th><th>Alarm Start</th><th>Alarm End</th><th>Duration</th><th>Error</th><th>Alarm Type</th><th>Values</th><th>User Comment</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(data), (alarm, index) => {
        _push(`<tr class="${ssrRenderClass(
          alarm.code == "10" ? "bg-danger" : alarm.code == "00" ? "bg-success" : "bg-warning"
        )}">`);
        if (unref(payload).role <= 2) {
          _push(`<td><button class="btn btn-default btn-sm"> Delete </button></td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<td>${ssrInterpolate(alarm.roomid)}</td><td>${ssrInterpolate(alarm.alarm_start)}</td>`);
        if (alarm.alarm_end == "Invalid date") {
          _push(`<td></td>`);
        } else {
          _push(`<td>${ssrInterpolate(alarm.alarm_end)}</td>`);
        }
        if (alarm.alarm_end != "Invalid date") {
          _push(`<td>${ssrInterpolate(alarm.duration)}</td>`);
        } else {
          _push(`<td></td>`);
        }
        _push(`<td>${ssrInterpolate(alarm.error)}</td><td>${ssrInterpolate(alarm.alarm_type)}</td><td>${ssrInterpolate(alarm.values)}</td><td>${ssrInterpolate(alarm.description)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="card-footer"> Go To <select><!--[-->`);
      ssrRenderList(unref(totalPage), (n) => {
        _push(`<option${ssrRenderAttr("value", n)}>${ssrInterpolate(n)}</option>`);
      });
      _push(`<!--]--></select> of ${ssrInterpolate(unref(totalPage))} <ul class="pagination pagination-sm m-0 float-right"><li class="page-item"><a class="page-link text-white" href="javascript:void(0);">Previous Page</a></li><li class="page-item"><a class="page-link text-white" href="javascript:void(0);">Next Page</a></li></ul></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AlarmHistory/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-3b45ec0f.mjs.map
