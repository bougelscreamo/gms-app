import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const store = useDataStore();
    const { id } = useRoute().params;
    useRouter();
    let tag_group = ref("");
    let tagname = ref("");
    let sv_min = ref(0);
    let sv_max = ref(0);
    let active = ref(0);
    let deviceid = ref(0);
    let tagid = ref(0);
    [__temp, __restore] = withAsyncContext(() => store.getParametersList()), await __temp, __restore();
    tag_group.value = store.$state.data.parameters.data[id].tag_group;
    tagname.value = store.$state.data.parameters.data[id].tagname;
    sv_min.value = store.$state.data.parameters.data[id].sv_min;
    sv_max.value = store.$state.data.parameters.data[id].sv_max;
    active.value = store.$state.data.parameters.data[id].active;
    deviceid.value = store.$state.data.parameters.data[id].deviceid;
    tagid.value = store.$state.data.parameters.data[id].tagid;
    ({
      "tag_group": store.$state.data.parameters.data[id].tag_group,
      "tagname": store.$state.data.parameters.data[id].tagname,
      "sv_min": store.$state.data.parameters.data[id].sv_min,
      "sv_max": store.$state.data.parameters.data[id].sv_max,
      "active": store.$state.data.parameters.data[id].active,
      "deviceid": store.$state.data.parameters.data[id].deviceid,
      "tagid": store.$state.data.parameters.data[id].tagid
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Edit Alarm Settings </div><form class="form-horizontal"><div class="card-body"><div class="form-group row"><label for="tag_group" class="col-sm-2 col-form-label">Room ID</label><div class="col-sm-10"><input type="text" class="form-control" id="tag_group"${ssrRenderAttr("value", unref(tag_group))} required></div></div><div class="form-group row"><label for="tagname" class="col-sm-2 col-form-label">Tag Name</label><div class="col-sm-10"><input type="text" class="form-control" id="tagname"${ssrRenderAttr("value", unref(tagname))} required></div></div><div class="form-group row"><label for="sv_min" class="col-sm-2 col-form-label">Low Limit</label><div class="col-sm-10"><input type="number" class="form-control" id="sv_min"${ssrRenderAttr("value", unref(sv_min))} required></div></div><div class="form-group row"><label for="sv_max" class="col-sm-2 col-form-label">High Limit</label><div class="col-sm-10"><input type="number" class="form-control" id="sv_max"${ssrRenderAttr("value", unref(sv_max))} required></div></div><div class="form-group row"><label for="active" class="col-sm-2 col-form-label">Status</label><div class="col-sm-10"><select class="form-control" required><option value="1">Active</option><option value="0">Not Active</option></select></div></div></div><div class="card-footer"><button type="submit" class="btn btn-info">Submit</button><button type="button" class="btn btn-default float-right">Cancel</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/AlarmSettings/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-939d0599.mjs.map
