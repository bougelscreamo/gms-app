import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { a as useRouter, g as useAuth } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { u as useDataStore, a as useAuthStore } from './data-25a661d5.mjs';
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
import 'unctx';
import 'vue-router';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'cookie-es';
import 'pinia-plugin-persistedstate';
import 'axios';
import 'date-fns';
import 'sweetalert2';

const _imports_0 = "" + buildAssetsURL("logo-biofarma.8e068430.png");
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    useRouter();
    useAuth();
    useDataStore();
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "d-md-flex half" }, _attrs))}><div class="bg"></div><div class="contents"><div class="container"><div class="row align-items-center justify-content-center bg-dark"><div class="col-md-12"><div class="form-block mx-auto bg-dark"><div class="text-center mb-5 text-primary"><img${ssrRenderAttr("src", _imports_0)} width="200"><h3><strong>GMS</strong></h3><h3>GMP Monitoring System</h3></div><form><div class="form-group first"><label for="login-username">Username</label><input class="form-control" id="login-username" type="text" name="login-username" required data-msg="Please enter your username"${ssrRenderAttr("value", unref(username))}></div><div class="form-group last mb-3"><label for="login-password">Password</label><input class="form-control" id="login-password" type="password" name="login-password" required data-msg="Please enter your password"${ssrRenderAttr("value", unref(password))}></div><input type="submit" value="Log In" class="btn btn-block btn-primary"></form></div></div></div></div><div class="container bg-dark"><div class="text-center mb-5 text-primary"><strong>Copyright \xA9 2023 Omron Corp.</strong></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-f23029e1.mjs.map
