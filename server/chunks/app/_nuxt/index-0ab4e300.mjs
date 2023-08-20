import { ref, withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { a as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const store = useDataStore();
    let fullname = ref("");
    let username = ref("");
    ref(0);
    let password = ref("");
    [__temp, __restore] = withAsyncContext(() => store.getUserList()), await __temp, __restore();
    const isUserNameExist = computed(() => {
      let originalData = store.$state.data.users.data;
      let rawData = store.$state.data.users.data;
      rawData = originalData.filter((item) => {
        return item.username.toUpperCase() == username.value.toUpperCase();
      });
      console.log(rawData);
      if (rawData.length > 0) {
        return true;
      } else {
        return false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> User Profile </div><form class="form-horizontal"><div class="card-body"><div class="form-group row"><label for="fullname" class="col-sm-2 col-form-label">Full Name</label><div class="col-sm-10"><input type="text" class="form-control" id="fullname"${ssrRenderAttr("value", unref(fullname))} required></div></div><div class="form-group row"><label for="username" class="col-sm-2 col-form-label">User Name</label><div class="col-sm-10"><input type="text" class="form-control" id="username"${ssrRenderAttr("value", unref(username))} required>`);
      if (unref(isUserNameExist)) {
        _push(`<label class="text-danger">Username is exist</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="form-group row"><label for="role" class="col-sm-2 col-form-label">Role</label><div class="col-sm-10"><select class="form-control" id="role"><option value="0">Root</option><option value="1">Vendor</option><option value="2">Admin</option><option value="3">Supervisor</option><option value="4">Operator</option></select></div></div><div class="form-group row"><label for="password" class="col-sm-2 col-form-label">Password</label><div class="col-sm-10"><input type="password" class="form-control" id="password"${ssrRenderAttr("value", unref(password))} required></div></div></div><div class="card-footer">`);
      if (!unref(isUserNameExist)) {
        _push(`<button type="submit" class="btn btn-info">Submit</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="btn btn-default float-right">Cancel</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Users/Create/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0ab4e300.mjs.map
