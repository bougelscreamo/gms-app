import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { b as useRoute, a as useRouter } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { id } = useRoute().params;
    const { Type } = useRoute().params;
    const store = useDataStore();
    useRouter();
    let tag_group = ref("");
    let roomid = ref("");
    let DP_SCL_H = ref("");
    let DP_SCL_L = ref("");
    let DP_OFFSET = ref("");
    let TEMP_SCL_L = ref("");
    let TEMP_SCL_H = ref("");
    let TEMP_OFFSET = ref("");
    let HUM_SCL_L = ref("");
    let HUM_SCL_H = ref("");
    let HUM_OFFSET = ref("");
    let tagids = ref("");
    let deviceid = ref("");
    [__temp, __restore] = withAsyncContext(() => store.getDeviceList()), await __temp, __restore();
    if (Type == "DP") {
      tag_group.value = store.$state.data.parameters.data.DP[id].tag_group;
      roomid.value = store.$state.data.parameters.data.DP[id].roomid;
      DP_SCL_H.value = store.$state.data.parameters.data.DP[id].DP_SCL_H;
      DP_SCL_L.value = store.$state.data.parameters.data.DP[id].DP_SCL_L;
      DP_OFFSET.value = store.$state.data.parameters.data.DP[id].DP_OFFSET;
      TEMP_SCL_L.value = store.$state.data.parameters.data.DP[id].TEMP_SCL_L;
      TEMP_SCL_H.value = store.$state.data.parameters.data.DP[id].TEMP_SCL_H;
      TEMP_OFFSET.value = store.$state.data.parameters.data.DP[id].DP_OFFSET;
      HUM_SCL_L.value = store.$state.data.parameters.data.DP[id].HUM_SCL_L;
      HUM_SCL_H.value = store.$state.data.parameters.data.DP[id].HUM_SCL_H;
      HUM_OFFSET.value = store.$state.data.parameters.data.DP[id].HUM_OFFSET;
      tagids.value = store.$state.data.parameters.data.DP[id].tagids;
      deviceid.value = store.$state.data.parameters.data.DP[id].deviceid;
      ({
        "deviceid": store.$state.data.parameters.data.DP[id].deviceid,
        "tagids": store.$state.data.parameters.data.DP[id].tagids,
        "tag_group": store.$state.data.parameters.data.DP[id].tag_group,
        "roomid": store.$state.data.parameters.data.DP[id].roomid,
        "DP_SCL_H": store.$state.data.parameters.data.DP[id].DP_SCL_H,
        "DP_SCL_L": store.$state.data.parameters.data.DP[id].DP_SCL_L,
        "DP_OFFSET": store.$state.data.parameters.data.DP[id].DP_OFFSET,
        "TEMP_SCL_L": store.$state.data.parameters.data.DP[id].TEMP_SCL_L,
        "TEMP_SCL_H": store.$state.data.parameters.data.DP[id].TEMP_SCL_H,
        "TEMP_OFFSET": store.$state.data.parameters.data.DP[id].DP_OFFSET,
        "HUM_SCL_L": store.$state.data.parameters.data.DP[id].HUM_SCL_L,
        "HUM_SCL_H": store.$state.data.parameters.data.DP[id].HUM_SCL_H,
        "HUM_OFFSET": store.$state.data.parameters.data.DP[id].HUM_OFFSET
      });
    }
    if (Type == "TH") {
      tag_group.value = store.$state.data.parameters.data.TH[id].tag_group;
      roomid.value = store.$state.data.parameters.data.TH[id].roomid;
      DP_SCL_H.value = store.$state.data.parameters.data.TH[id].DP_SCL_H;
      DP_SCL_L.value = store.$state.data.parameters.data.TH[id].DP_SCL_L;
      DP_OFFSET.value = store.$state.data.parameters.data.TH[id].DP_OFFSET;
      TEMP_SCL_L.value = store.$state.data.parameters.data.TH[id].TEMP_SCL_L;
      TEMP_SCL_H.value = store.$state.data.parameters.data.TH[id].TEMP_SCL_H;
      TEMP_OFFSET.value = store.$state.data.parameters.data.TH[id].TEMP_OFFSET;
      HUM_SCL_L.value = store.$state.data.parameters.data.TH[id].HUM_SCL_L;
      HUM_SCL_H.value = store.$state.data.parameters.data.TH[id].HUM_SCL_H;
      HUM_OFFSET.value = store.$state.data.parameters.data.TH[id].HUM_OFFSET;
      tagids.value = store.$state.data.parameters.data.TH[id].tagids;
      deviceid.value = store.$state.data.parameters.data.TH[id].deviceid;
      ({
        "deviceid": store.$state.data.parameters.data.TH[id].deviceid,
        "tagids": store.$state.data.parameters.data.TH[id].tagids,
        "tag_group": store.$state.data.parameters.data.TH[id].tag_group,
        "roomid": store.$state.data.parameters.data.TH[id].roomid,
        "DP_SCL_H": store.$state.data.parameters.data.TH[id].DP_SCL_H,
        "DP_SCL_L": store.$state.data.parameters.data.TH[id].DP_SCL_L,
        "DP_OFFSET": store.$state.data.parameters.data.TH[id].DP_OFFSET,
        "TEMP_SCL_L": store.$state.data.parameters.data.TH[id].TEMP_SCL_L,
        "TEMP_SCL_H": store.$state.data.parameters.data.TH[id].TEMP_SCL_H,
        "TEMP_OFFSET": store.$state.data.parameters.data.TH[id].TEMP_OFFSET,
        "HUM_SCL_L": store.$state.data.parameters.data.TH[id].HUM_SCL_L,
        "HUM_SCL_H": store.$state.data.parameters.data.TH[id].HUM_SCL_H,
        "HUM_OFFSET": store.$state.data.parameters.data.TH[id].HUM_OFFSET
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header">${ssrInterpolate(unref(roomid))} ${ssrInterpolate(unref(Type))}</div><form class="form-horizontal"><div class="card-body bg-dark" id="theContainer"><div class="form-group row"><label for="roomid" class="col-sm-2 col-form-label">Room ID</label><div class="col-sm-10"><input type="text" disabled class="form-control"${ssrRenderAttr("value", unref(roomid))}></div></div>`);
      if (unref(Type) == "DP") {
        _push(`<div class="form-group row"><label for="DP_SCL_L" class="col-sm-2 col-form-label">DP Scaling L</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(DP_SCL_L))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "DP") {
        _push(`<div class="form-group row"><label for="DP_SCL_H" class="col-sm-2 col-form-label">DP Scaling H</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(DP_SCL_H))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "DP") {
        _push(`<div class="form-group row"><label for="DP_OFFSET" class="col-sm-2 col-form-label">DP Offset</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(DP_OFFSET))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="TEMP_SCL_L" class="col-sm-2 col-form-label">Temp Scaling L</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(TEMP_SCL_L))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="TEMP_SCL_H" class="col-sm-2 col-form-label">Temp Scaling H</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(TEMP_SCL_H))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="TEMP_OFFSET" class="col-sm-2 col-form-label">Temp Offset</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(TEMP_OFFSET))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="HUM_SCL_L" class="col-sm-2 col-form-label">Hum Scaling L</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(HUM_SCL_L))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="HUM_SCL_H" class="col-sm-2 col-form-label">Hum Scaling H</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(HUM_SCL_H))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="HUM_OFFSET" class="col-sm-2 col-form-label">Hum Offset</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(HUM_OFFSET))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card-footer"><button type="submit" class="btn btn-info">Submit</button><button type="button" class="btn btn-default float-right">Cancel</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Calibrations/Cal-[Type]/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-df83526e.mjs.map
