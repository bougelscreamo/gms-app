import { _ as __nuxt_component_0 } from './nuxt-link-744fccd2.mjs';
import { ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { a as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
    useRouter();
    const store = useDataStore();
    const keyword = ref("");
    let page = ref(1);
    let totalRow = ref(0);
    let totalPage = ref(0);
    [__temp, __restore] = withAsyncContext(() => store.getReceipt()), await __temp, __restore();
    totalRow = store.$state.data.receipt.data.length;
    function paginate(array, page_size, page_number) {
      return array.slice((page_number - 1) * page_size, page_number * page_size);
    }
    const data = computed(() => {
      let originalData = store.$state.data.receipt.data;
      let rawData = store.$state.data.receipt.data;
      if (keyword.value != "") {
        rawData = originalData.filter((item) => {
          return item.notification_type.toUpperCase().includes(keyword.value.toUpperCase()) || item.receipt.toUpperCase().includes(keyword.value.toUpperCase()) || item.receiptname.toUpperCase().includes(keyword.value.toUpperCase());
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
        "access": "Notification Destination",
        "action": "Click Edit",
        "description": "Edit Notification History ID : " + id
      };
      store.postAuditTrail(payload);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Notification </div><div class="card-body"><div class="row"><div class="col-md-12"><div role="group" class="input-group mb-3 input-group-md"><div class="input-group-prepend"><div class="input-group-text">Search...</div></div><input type="text" class="form-control"${ssrRenderAttr("value", unref(keyword))}><div class="input-group-append"><button text="Button" type="button" class="btn btn-secondary btn-md"${ssrIncludeBooleanAttr(!unref(keyword)) ? " disabled" : ""}>X</button></div></div></div></div></div><div class="card-body bg-dark" id="theContainer"><table class="table table-bordered"><thead><tr><td>Action</td><th>Notification Type</th><th>Receiver Number</th><th>Receiver Name</th><th>Active</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(data), (r, index) => {
        _push(`<tr><td>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/NotifDestination/${index}`,
          class: "btn btn-success btn-sm",
          onClick: ($event) => postAuditTrailEdit(r.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Edit `);
            } else {
              return [
                createTextVNode("Edit ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(` | <button class="btn btn-danger btn-sm">Delete</button></td><td>${ssrInterpolate(r.notification_type)}</td><td>${ssrInterpolate(r.receipt)}</td><td>${ssrInterpolate(r.receiptname)}</td><td>`);
        if (r.active == 1) {
          _push(`<span class="right badge badge-success">Active</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` `);
        if (r.active == 0) {
          _push(`<span class="right badge badge-danger">Not Active</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/NotifDestination/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-731b298d.mjs.map
