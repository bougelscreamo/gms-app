import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useDataStore } from './data-25a661d5.mjs';
import { VueSignaturePad } from 'vue-signature-pad';
import '../server.mjs';
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

const __default__ = {
  data: () => ({
    dataValue: {},
    system_name: "",
    supervisor_name: "",
    supervisor_signature: null,
    supervisor_comment: "",
    smpt_server: null,
    smpt_port: "",
    auto_generate_report: "",
    location: "",
    options: {
      penColor: "#c0f"
    }
  }),
  async mounted() {
    await useDataStore().getSettings();
    this.dataValue = await useDataStore().$state.data.settings.data;
    this.supervisor_signature = this.$refs.signaturePad.fromDataURL(this.dataValue.supervisor_signature);
  },
  methods: {
    async submitSetting() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.dataValue.supervisor_signature = data;
      const value = {
        system_name: this.dataValue.system_name,
        supervisor_name: this.dataValue.supervisor_name,
        supervisor_signature: this.dataValue.supervisor_signature,
        supervisor_comment: this.dataValue.supervisor_comment,
        smpt_server: this.dataValue.smpt_server,
        smpt_port: this.dataValue.smpt_port,
        auto_generate_report: this.dataValue.auto_generate_report,
        location: this.dataValue.location
      };
      useDataStore().editSettings(value);
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    reset() {
      this.$refs.signaturePad.clearSignature();
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Settings </div><form method="post"><div class="card-body bg-dark" id="theContainer"><div class="card-body"><div class="form-group row"><label for="inputEmail3" class="col-sm-3 col-form-label">Auto Generate Report</label><div class="col-sm-9"><div class="form-check"><input class="form-check-input" type="radio" name="radio1"${ssrIncludeBooleanAttr(ssrLooseEqual(_ctx.dataValue.auto_generate_report, "none")) ? " checked" : ""} value="none"><label class="form-check-label">None</label></div><div class="form-check"><input class="form-check-input" type="radio" name="radio1"${ssrIncludeBooleanAttr(ssrLooseEqual(_ctx.dataValue.auto_generate_report, "hourly")) ? " checked" : ""} value="hourly"><label class="form-check-label">Hourly</label></div><div class="form-check"><input class="form-check-input" type="radio" name="radio1"${ssrIncludeBooleanAttr(ssrLooseEqual(_ctx.dataValue.auto_generate_report, "daily")) ? " checked" : ""} value="daily"><label class="form-check-label">Daily</label></div><div class="form-check"><input class="form-check-input" type="radio" name="radio1"${ssrIncludeBooleanAttr(ssrLooseEqual(_ctx.dataValue.auto_generate_report, "monthly")) ? " checked" : ""} value="monthly"><label class="form-check-label">Monthly</label></div><div class="form-check"><input class="form-check-input" type="radio" name="radio1"${ssrIncludeBooleanAttr(ssrLooseEqual(_ctx.dataValue.auto_generate_report, "yearly")) ? " checked" : ""} value="yearly"><label class="form-check-label">Yearly</label></div></div></div><div class="form-group row"><label for="supervisor_name" class="col-sm-3 col-form-label">Supervisor</label><div class="col-sm-9"><input${ssrRenderAttr("value", _ctx.dataValue.supervisor_name)} type="text" class="form-control" placeholder="Supervisor Name"></div></div><div class="form-group row" style="${ssrRenderStyle({ "height": "30vh" })}"><label for="supervisorSign" class="col-sm-3 col-form-label">Supervisor Signature</label><div class="col-sm-6">`);
      _push(ssrRenderComponent(unref(VueSignaturePad), {
        ref: "signaturePad",
        id: "signature",
        modelValue: _ctx.supervisor_signature,
        "onUpdate:modelValue": ($event) => _ctx.supervisor_signature = $event
      }, null, _parent));
      _push(`</div><div class="col-sm-1"><a class="btn btn-secondary mb-2">Undo</a><a class="btn btn-secondary">Reset</a></div></div></div></div><div class="card-footer"><button type="submit" class="btn btn-primary">Save</button></div></form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-301b1282.mjs.map
