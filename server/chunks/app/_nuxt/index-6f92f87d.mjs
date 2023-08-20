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
    let id = ref(0);
    let currentPassword = ref("currentpassword");
    let newPassword = ref("");
    let conPassword = ref("");
    [__temp, __restore] = withAsyncContext(() => store.getUserProfile()), await __temp, __restore();
    fullname = store.$state.data.userProfile.data.fullname;
    username = store.$state.data.userProfile.data.username;
    id = store.$state.data.userProfile.data.id;
    const validPassword = computed(() => {
      if (conPassword.value == newPassword.value) {
        return true;
      } else {
        return false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> User Profile </div><div class="card-body form-horizontal"><input type="hidden"${ssrRenderAttr("value", unref(id))}><div class="form-group row"><label for="fullname" class="col-sm-2 col-form-label">Full Name</label><div class="col-sm-10"><input type="text" class="form-control" id="fullname"${ssrRenderAttr("value", unref(fullname))} required disabled></div></div><div class="form-group row"><label for="username" class="col-sm-2 col-form-label">User Name</label><div class="col-sm-10"><input type="text" class="form-control" id="username"${ssrRenderAttr("value", unref(username))} required disabled></div></div></div></div><div class="card card-primary"><div class="card-header"> Change password </div><form class="form-horizontal"><div class="card-body"><div class="form-group row"><label for="currentPassword" class="col-sm-2 col-form-label">Current Password</label><div class="col-sm-10"><input type="password" class="form-control" id="currentPassword"${ssrRenderAttr("value", unref(currentPassword))} required></div></div><div class="form-group row"><label for="newPassword" class="col-sm-2 col-form-label">New Password</label><div class="col-sm-10"><input type="password" class="form-control" id="newPassword"${ssrRenderAttr("value", unref(newPassword))} required></div></div><div class="form-group row"><label for="conPassword" class="col-sm-2 col-form-label">New Password Confirmation</label><div class="col-sm-10"><input type="password" class="form-control" id="conPassword"${ssrRenderAttr("value", unref(conPassword))} required></div></div><div class="offset-sm-2 col-sm-10">`);
      if (!unref(validPassword)) {
        _push(`<label class="form-check-label text-danger">New password didnt match</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="card-footer">`);
      if (unref(newPassword).value != "" && unref(conPassword).value != "" && unref(validPassword)) {
        _push(`<button type="submit" class="btn btn-info">Change Password</button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/UserProfile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6f92f87d.mjs.map
