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
    const store = useDataStore();
    const { id } = useRoute().params;
    const { Type } = useRoute().params;
    useRouter();
    let roomid = ref("");
    let TEMP_AL_L = ref(0);
    let TEMP_AL_H = ref(0);
    let TEMP_AL_DELAY = ref(0);
    let HUM_AL_L = ref(0);
    let HUM_AL_H = ref(0);
    let HUM_AL_DELAY = ref(0);
    let DP_AL_L = ref(0);
    let DP_AL_H = ref(0);
    let DP_AL_DELAY = ref(0);
    let tagids = ref("");
    let deviceid = ref(0);
    [__temp, __restore] = withAsyncContext(() => store.getDeviceList()), await __temp, __restore();
    if (Type == "DP") {
      roomid.value = store.$state.data.devices.data.DP[id].roomid;
      TEMP_AL_L.value = store.$state.data.devices.data.DP[id].TEMP_AL_L;
      TEMP_AL_H.value = store.$state.data.devices.data.DP[id].TEMP_AL_H;
      TEMP_AL_DELAY.value = store.$state.data.devices.data.DP[id].TEMP_AL_DELAY;
      HUM_AL_L.value = store.$state.data.devices.data.DP[id].HUM_AL_L;
      HUM_AL_H.value = store.$state.data.devices.data.DP[id].HUM_AL_H;
      HUM_AL_DELAY.value = store.$state.data.devices.data.DP[id].HUM_AL_DELAY;
      DP_AL_L.value = store.$state.data.devices.data.DP[id].DP_AL_L;
      DP_AL_H.value = store.$state.data.devices.data.DP[id].DP_AL_H;
      DP_AL_DELAY.value = store.$state.data.devices.data.DP[id].DP_AL_DELAY;
      tagids.value = store.$state.data.devices.data.DP[id].tagids;
      deviceid.value = store.$state.data.devices.data.DP[id].deviceid;
      ({
        "roomid": store.$state.data.devices.data.DP[id].roomid,
        "TEMP_AL_L": store.$state.data.devices.data.DP[id].TEMP_AL_L,
        "TEMP_AL_H": store.$state.data.devices.data.DP[id].TEMP_AL_H,
        "TEMP_AL_DELAY": store.$state.data.devices.data.DP[id].TEMP_AL_DELAY,
        "HUM_AL_L": store.$state.data.devices.data.DP[id].HUM_AL_L,
        "HUM_AL_H": store.$state.data.devices.data.DP[id].HUM_AL_H,
        "HUM_AL_DELAY": store.$state.data.devices.data.DP[id].HUM_AL_DELAY,
        "DP_AL_L": store.$state.data.devices.data.DP[id].DP_AL_L,
        "DP_AL_H": store.$state.data.devices.data.DP[id].DP_AL_H,
        "DP_AL_DELAY": store.$state.data.devices.data.DP[id].DP_AL_DELAY,
        "deviceid": store.$state.data.devices.data.DP[id].deviceid
      });
    }
    if (Type == "TH") {
      roomid.value = store.$state.data.devices.data.TH[id].roomid;
      TEMP_AL_L.value = store.$state.data.devices.data.TH[id].TEMP_AL_L;
      TEMP_AL_H.value = store.$state.data.devices.data.TH[id].TEMP_AL_H;
      TEMP_AL_DELAY.value = store.$state.data.devices.data.TH[id].TEMP_AL_DELAY;
      HUM_AL_L.value = store.$state.data.devices.data.TH[id].HUM_AL_L;
      HUM_AL_H.value = store.$state.data.devices.data.TH[id].HUM_AL_H;
      HUM_AL_DELAY.value = store.$state.data.devices.data.TH[id].HUM_AL_DELAY;
      DP_AL_L.value = store.$state.data.devices.data.TH[id].DP_AL_L;
      DP_AL_H.value = store.$state.data.devices.data.TH[id].DP_AL_H;
      DP_AL_DELAY.value = store.$state.data.devices.data.TH[id].DP_AL_DELAY;
      tagids.value = store.$state.data.devices.data.TH[id].tagids;
      deviceid.value = store.$state.data.devices.data.TH[id].deviceid;
      ({
        "roomid": store.$state.data.devices.data.TH[id].roomid,
        "TEMP_AL_L": store.$state.data.devices.data.TH[id].TEMP_AL_L,
        "TEMP_AL_H": store.$state.data.devices.data.TH[id].TEMP_AL_H,
        "TEMP_AL_DELAY": store.$state.data.devices.data.TH[id].TEMP_AL_DELAY,
        "HUM_AL_L": store.$state.data.devices.data.TH[id].HUM_AL_L,
        "HUM_AL_H": store.$state.data.devices.data.TH[id].HUM_AL_H,
        "HUM_AL_DELAY": store.$state.data.devices.data.TH[id].HUM_AL_DELAY,
        "DP_AL_L": store.$state.data.devices.data.TH[id].DP_AL_L,
        "DP_AL_H": store.$state.data.devices.data.TH[id].DP_AL_H,
        "DP_AL_DELAY": store.$state.data.devices.data.TH[id].DP_AL_DELAY,
        "deviceid": store.$state.data.devices.data.TH[id].deviceid
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Edit Alarm Settings ${ssrInterpolate(unref(roomid))} ${ssrInterpolate(unref(Type))}</div><form class="form-horizontal"><div class="card-body"><div class="form-group row"><label for="roomid" class="col-sm-2 col-form-label">Room ID</label><div class="col-sm-10"><input type="text" class="form-control" id="roomid"${ssrRenderAttr("value", unref(roomid))} required></div></div>`);
      if (unref(Type) == "DP") {
        _push(`<div class="form-group row"><label for="DP_AL_L" class="col-sm-2 col-form-label">DP Alarm L</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(DP_AL_L))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "DP") {
        _push(`<div class="form-group row"><label for="DP_AL_H" class="col-sm-2 col-form-label">DP Alarm H</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(DP_AL_H))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "DP") {
        _push(`<div class="form-group row"><label for="DP_AL_DELAY" class="col-sm-2 col-form-label">DP Alarm Delay</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(DP_AL_DELAY))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="TEMP_AL_L" class="col-sm-2 col-form-label">Temp Alarm L</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(TEMP_AL_L))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="TEMP_AL_H" class="col-sm-2 col-form-label">Temp Alarm H</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(TEMP_AL_H))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="TEMP_AL_DELAY" class="col-sm-2 col-form-label">Temp Alarm Delay</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(TEMP_AL_DELAY))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="HUM_AL_L" class="col-sm-2 col-form-label">Hum Alarms L</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(HUM_AL_L))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="HUM_AL_H" class="col-sm-2 col-form-label">Hum Alarm H</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(HUM_AL_H))}></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(Type) == "TH") {
        _push(`<div class="form-group row"><label for="HUM_AL_DELAY" class="col-sm-2 col-form-label">Hum Alarm Delay</label><div class="col-sm-10"><input type="number" class="form-control"${ssrRenderAttr("value", unref(HUM_AL_DELAY))}></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AlarmSettings/Edit-[Type]/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-9b99a028.mjs.map
