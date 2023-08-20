import { _ as __nuxt_component_0 } from './nuxt-link-744fccd2.mjs';
import { withAsyncContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { a as useRouter } from '../server.mjs';
import { u as useFetch } from './fetch-129bc426.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useDataStore } from './data-25a661d5.mjs';
import 'ufo';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
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

const pageSize = 10;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: payload } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/token", "$XtFwH5tPWC")), __temp = await __temp, __restore(), __temp);
    useRouter();
    const store = useDataStore();
    const keyword = ref("");
    let page = ref(1);
    const alType = ref("DP");
    let totalRow = ref(0);
    let totalPage = ref(0);
    [__temp, __restore] = withAsyncContext(() => store.getDeviceList()), await __temp, __restore();
    totalRow = store.$state.data.devices.data.length;
    function paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const dataDP = computed(() => {
      let originalData = store.$state.data.devices.data.DP;
      let rawData = store.$state.data.devices.data.DP;
      if (keyword.value != "") {
        rawData = originalData.filter((item) => {
          return item.tag_group.toUpperCase().includes(keyword.value.toUpperCase()) || item.tagname.toUpperCase().includes(keyword.value.toUpperCase());
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
    const dataTH = computed(() => {
      let originalData = store.$state.data.devices.data.TH;
      let rawData = store.$state.data.devices.data.TH;
      if (keyword.value != "") {
        rawData = originalData.filter((item) => {
          return item.tag_group.toUpperCase().includes(keyword.value.toUpperCase()) || item.tagname.toUpperCase().includes(keyword.value.toUpperCase());
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
    function postAuditTrailEdit(roomid) {
      const payload2 = {
        access: "Alarm Settings",
        action: "Click Edit",
        description: "Edit Alarm Settings Room Id : " + roomid
      };
      store.postAuditTrail(payload2);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Alarm Settings <div class="card-tools"><ul class="nav nav-pills ml-auto"><li class="nav-item"><select class="form-control"><option value="TH">TH</option><option value="DP">DP</option></select></li></ul></div></div></div>`);
      if (unref(alType) == "TH") {
        _push(`<div class="card card-primary"><div class="card-header">TH</div><div class="card-body bg-dark" id="theContainer"><table class="table table-bordered"><thead class="bg-secondary"><tr>`);
        if (unref(payload).role <= 3) {
          _push(`<th>Action</th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<th>Room ID</th><th>Temp Alarm Low</th><th>Temp Alarm High</th><th>Temp Alarm Delay</th><th>Hum Alarm Low</th><th>Hum Alarm High</th><th>Hum Alarm Delay</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(dataTH), (alarm, index) => {
          _push(`<tr>`);
          if (unref(payload).role <= 3) {
            _push(`<td>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/AlarmSettings/Edit-TH/${index}`,
              class: "btn btn-success btn-sm",
              onClick: ($event) => postAuditTrailEdit(alarm.tag_group, alarm.tagid)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Edit`);
                } else {
                  return [
                    createTextVNode("Edit")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td>${ssrInterpolate(alarm.roomid)}</td><td>${ssrInterpolate(alarm.TEMP_AL_L)}</td><td>${ssrInterpolate(alarm.TEMP_AL_H)}</td><td>${ssrInterpolate(alarm.TEMP_AL_DELAY)}</td><td>${ssrInterpolate(alarm.HUM_AL_L)}</td><td>${ssrInterpolate(alarm.HUM_AL_H)}</td><td>${ssrInterpolate(alarm.HUM_AL_DELAY)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="card-footer"> Go To <select><!--[-->`);
        ssrRenderList(unref(totalPage), (n) => {
          _push(`<option${ssrRenderAttr("value", n)}>${ssrInterpolate(n)}</option>`);
        });
        _push(`<!--]--></select> of ${ssrInterpolate(unref(totalPage))} <ul class="pagination pagination-sm m-0 float-right"><li class="page-item"><a class="page-link bg-secondary text-white" href="javascript:void(0);">Previous Page</a></li><li class="page-item"><a class="page-link bg-secondary text-white" href="javascript:void(0);">Next Page</a></li></ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(alType) == "DP") {
        _push(`<div class="card card-primary"><div class="card-header">DP</div><div class="card-body bg-dark" id="theContainer"><table class="table table-bordered"><thead class="bg-secondary"><tr>`);
        if (unref(payload).role <= 3) {
          _push(`<th>Action</th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<th>Room ID (+)</th><th>Room ID (-)</th><th>DP Alarm Low</th><th>DP Alarm High</th><th>DP Alarm Delay</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(dataDP), (alarm, index) => {
          _push(`<tr>`);
          if (unref(payload).role <= 3) {
            _push(`<td>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/AlarmSettings/Edit-DP/${index}`,
              class: "btn btn-success btn-sm",
              onClick: ($event) => postAuditTrailEdit(alarm.roomid)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Edit`);
                } else {
                  return [
                    createTextVNode("Edit")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</td>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<td>${ssrInterpolate(alarm.roomid)}</td><td>${ssrInterpolate(alarm.tagname_link)}</td><td>${ssrInterpolate(alarm.DP_AL_L)}</td><td>${ssrInterpolate(alarm.DP_AL_H)}</td><td>${ssrInterpolate(alarm.DP_AL_DELAY)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="card-footer"> Go To <select><!--[-->`);
        ssrRenderList(unref(totalPage), (n) => {
          _push(`<option${ssrRenderAttr("value", n)}>${ssrInterpolate(n)}</option>`);
        });
        _push(`<!--]--></select> of ${ssrInterpolate(unref(totalPage))} <ul class="pagination pagination-sm m-0 float-right"><li class="page-item"><a class="page-link bg-secondary text-white" href="javascript:void(0);">Previous Page</a></li><li class="page-item"><a class="page-link bg-secondary text-white" href="javascript:void(0);">Next Page</a></li></ul></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AlarmSettings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6eed4cbb.mjs.map
