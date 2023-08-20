import { _ as __nuxt_component_0 } from './nuxt-link-744fccd2.mjs';
import { withAsyncContext, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { a as useRouter } from '../server.mjs';
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
    const store = useDataStore();
    useRouter();
    [__temp, __restore] = withAsyncContext(() => store.getParametersList()), await __temp, __restore();
    const keyword = ref("");
    const calType = ref("DP");
    let page = ref(1);
    let totalRow = ref(0);
    let totalPage = ref(0);
    function paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const dataDP = computed(() => {
      let originalData = store.$state.data.parameters.data.DP;
      let rawData = store.$state.data.parameters.data.DP;
      if (keyword.value != "") {
        rawData = originalData.filter((item) => {
          return item.tagname.toUpperCase().includes(keyword.value.toUpperCase()) || item.ipaddr.toUpperCase().includes(keyword.value.toUpperCase());
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
      let originalData = store.$state.data.parameters.data.TH;
      let rawData = store.$state.data.parameters.data.TH;
      if (keyword.value != "") {
        rawData = originalData.filter((item) => {
          return item.tagname.toUpperCase().includes(keyword.value.toUpperCase()) || item.ipaddr.toUpperCase().includes(keyword.value.toUpperCase());
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
    function postAuditTrailEdit(id) {
      const payload = {
        access: "Calibration",
        action: "Click Edit",
        description: "Edit Calibration ID : " + id
      };
      store.postAuditTrail(payload);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Calibrations <div class="card-tools"><ul class="nav nav-pills ml-auto"><li class="nav-item"><select class="form-control"><option value="TH">TH</option><option value="DP">DP</option></select></li></ul></div></div></div>`);
      if (unref(calType) == "DP") {
        _push(`<div class="card card-primary"><div class="card-header">DP</div><div class="card-body bg-dark" id="theContainer"><table class="table table-bordered"><thead class="bg-secondary"><tr><th>Action</th><th>Room ID (+)</th><th>Room ID (-)</th><th>DP Scaling Low</th><th>DP Scaling High</th><th>DP Offset</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(dataDP), (datas, index) => {
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/Calibrations/Cal-DP/${index}`,
            class: "btn btn-success",
            onClick: ($event) => postAuditTrailEdit(datas.id)
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
          _push(`</td><td>${ssrInterpolate(datas.roomid)}</td><td>${ssrInterpolate(datas.tagname_link)}</td><td>${ssrInterpolate(datas.DP_SCL_L)}</td><td>${ssrInterpolate(datas.DP_SCL_H)}</td><td>${ssrInterpolate(datas.DP_OFFSET)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="card-footer"> Go To <select><!--[-->`);
        ssrRenderList(unref(totalPage), (n) => {
          _push(`<option${ssrRenderAttr("value", n)}>${ssrInterpolate(n)}</option>`);
        });
        _push(`<!--]--></select> of ${ssrInterpolate(unref(totalPage))} <ul class="pagination pagination-sm m-0 float-right"><li class="page-item"><a class="page-link text-white" href="javascript:void(0);">Previous Page</a></li><li class="page-item"><a class="page-link text-white" href="javascript:void(0);">Next Page</a></li></ul></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(calType) == "TH") {
        _push(`<div class="card card-primary"><div class="card-header">TH</div><div class="card-body bg-dark" id="theContainer"><table class="table table-bordered"><thead class="bg-secondary"><tr><th>Action</th><th>Room ID</th><th>Temp Scaling Low</th><th>Temp Scaling High</th><th>Temp Offset</th><th>Hum Scaling Low</th><th>Hum Scaling High</th><th>Hum Offset</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(dataTH), (datas, index) => {
          _push(`<tr><td>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/Calibrations/Cal-TH/${index}`,
            class: "btn btn-success",
            onClick: ($event) => postAuditTrailEdit(datas.id)
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
          _push(`</td><td>${ssrInterpolate(datas.roomid)}</td><td>${ssrInterpolate(datas.TEMP_SCL_L)}</td><td>${ssrInterpolate(datas.TEMP_SCL_H)}</td><td>${ssrInterpolate(datas.TEMP_OFFSET)}</td><td>${ssrInterpolate(datas.HUM_SCL_L)}</td><td>${ssrInterpolate(datas.HUM_SCL_H)}</td><td>${ssrInterpolate(datas.HUM_OFFSET)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="card-footer"> Go To <select><!--[-->`);
        ssrRenderList(unref(totalPage), (n) => {
          _push(`<option${ssrRenderAttr("value", n)}>${ssrInterpolate(n)}</option>`);
        });
        _push(`<!--]--></select> of ${ssrInterpolate(unref(totalPage))} <ul class="pagination pagination-sm m-0 float-right"><li class="page-item"><a class="page-link text-white" href="javascript:void(0);">Previous Page</a></li><li class="page-item"><a class="page-link text-white" href="javascript:void(0);">Next Page</a></li></ul></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Calibrations/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0e7dd91d.mjs.map
