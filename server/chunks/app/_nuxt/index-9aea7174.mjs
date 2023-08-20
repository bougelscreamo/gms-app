import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { b as useRoute, a as useRouter } from '../server.mjs';
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
  setup(__props) {
    useRoute().params;
    useDataStore();
    useRouter();
    let tagname = ref("");
    let commtype = ref("");
    let ipaddr = ref("");
    let ipport = ref("");
    let pv_low = ref("");
    let pv_high = ref("");
    let alarm_low = ref("");
    let alarm_high = ref("");
    let unit = ref("");
    let decimalplaces = ref("");
    let inbias = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Create Calibrations </div><form class="form-horizontal"><div class="card-body bg-dark" id="theContainer"><div class="form-group row"><label for="tagname" class="col-sm-2 col-form-label">Tag Name</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(tagname))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Communication Type</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(commtype))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">IP Address</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(ipaddr))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Port</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(ipport))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">PV Low</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(pv_low))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">PV High</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(pv_high))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Alarm Low</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("v-model", unref(alarm_low))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Alarm High</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(alarm_high))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Unit</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(unit))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Decimal</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(decimalplaces))}></div></div><div class="form-group row"><label for="" class="col-sm-2 col-form-label">Input Bias</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(inbias))}></div></div></div><div class="card-footer"><button type="submit" class="btn btn-info">Submit</button><button type="button" class="btn btn-default float-right">Cancel</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Calibrations/Create/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-9aea7174.mjs.map
