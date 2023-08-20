import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { a as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    let tag_group = ref("");
    let tagname = ref("");
    let sv_min = ref(0);
    let sv_max = ref(0);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Create Alarm Setting </div><form class="form-horizontal"><div class="card-body"><div class="form-group row"><label for="tag_group" class="col-sm-2 col-form-label">Room ID</label><div class="col-sm-10"><input type="text" class="form-control" id="tag_group"${ssrRenderAttr("value", unref(tag_group))} required></div></div><div class="form-group row"><label for="tagname" class="col-sm-2 col-form-label">Tag Name</label><div class="col-sm-10"><input type="text" class="form-control" id="tagname"${ssrRenderAttr("value", unref(tagname))} required></div></div><div class="form-group row"><label for="sv_min" class="col-sm-2 col-form-label">Low Limit</label><div class="col-sm-10"><input type="number" class="form-control" id="sv_min"${ssrRenderAttr("value", unref(sv_min))} required></div></div><div class="form-group row"><label for="sv_max" class="col-sm-2 col-form-label">High Limit</label><div class="col-sm-10"><input type="number" class="form-control" id="sv_max"${ssrRenderAttr("value", unref(sv_max))} required></div></div><div class="form-group row"><label for="active" class="col-sm-2 col-form-label">Status</label><div class="col-sm-10"><select class="form-control" required><option value="1">Active</option><option value="0">Not Active</option></select></div></div></div><div class="card-footer"><button type="submit" class="btn btn-info">Submit</button><button type="button" class="btn btn-default float-right">Cancel</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AlarmSettings/Create/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-6aec20f9.mjs.map
