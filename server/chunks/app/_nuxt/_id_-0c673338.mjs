import { ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { a as useRouter, b as useRoute } from '../server.mjs';
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
    useRouter();
    const store = useDataStore();
    const { id } = useRoute().params;
    const notification_type = ref("");
    const receipt = ref("");
    const receiptname = ref("");
    const active = ref("1");
    const idreceipt = ref("0");
    [__temp, __restore] = withAsyncContext(() => store.getReceipt()), await __temp, __restore();
    let data = store.$state.data.receipt.data;
    active.value = data[id].active;
    notification_type.value = data[id].notification_type;
    receipt.value = data[id].receipt;
    receiptname.value = data[id].receiptname;
    idreceipt.value = data[id].id;
    ({
      "notification_type": data[id].notification_type,
      "receipt": data[id].receipt,
      "receiptname": data[id].receiptname,
      "active": data[id].active,
      "idreceipt": data[id].id
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Edit Notification </div><form class="form-horizontal"><input type="hidden"${ssrRenderAttr("value", unref(idreceipt))}><div class="card-body"><div class="form-group row"><label for="notification_type" class="col-sm-2 col-form-label">Notification Type</label><div class="col-sm-10"><select class="form-control" required><option value="TELE">TELE</option><option value="TELEGROUP">TELEGROUP</option><option value="EMAIL">EMAIL</option></select></div></div><div class="form-group row"><label for="receipt" class="col-sm-2 col-form-label">Destination</label><div class="col-sm-10"><input type="text" class="form-control" id="receipt"${ssrRenderAttr("value", unref(receipt))} required></div></div><div class="form-group row"><label for="receiptname" class="col-sm-2 col-form-label">Name</label><div class="col-sm-10"><input type="text" class="form-control" id="receiptname"${ssrRenderAttr("value", unref(receiptname))} required></div></div><div class="form-group row"><label for="active" class="col-sm-2 col-form-label">Status</label><div class="col-sm-10"><select class="form-control" required${ssrRenderAttr("value", 0)}><option value="1">Active</option><option value="0">Not Active</option></select></div></div></div><div class="card-footer"><button type="submit" class="btn btn-info">Submit</button><button type="button" class="btn btn-default float-right">Cancel</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/NotifDestination/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-0c673338.mjs.map
