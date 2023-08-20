import { _ as __nuxt_component_0 } from './nuxt-link-744fccd2.mjs';
import { ref, withAsyncContext, withCtx, unref, openBlock, createBlock, createCommentVNode, useSSRContext, mergeProps, createTextVNode } from 'vue';
import { ssrRenderStyle, ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useDataStore } from './data-25a661d5.mjs';
import 'ufo';
import '../server.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
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

const _sfc_main$2 = {
  __name: "TH",
  __ssrInlineRender: true,
  props: {
    title: String,
    data: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card-body",
        id: "theContainer"
      }, _attrs))}><div class="card card-primary"><div class="card-header text-center"><h3 class="card-title">TEMPERATURE &amp; HUMIDITY</h3></div><div class="card-body card-body-monitoring"><table class="table table-bordered text-center"><thead class="bg-secondary"><tr class="bg-dark-gray"><th>No</th><th>Last Record</th><th>Room ID</th><th>Tag</th><th>Present Value</th><th>Min</th><th>Avg</th><th>Max</th><th>Low Limit</th><th>High Limit</th><th>Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.data, (mons, index) => {
        _push(`<tr><td>${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(mons.lastrecord)}</td><td class="bg-dark">${ssrInterpolate(mons.roomid)}</td><td class="bg-dark">${ssrInterpolate(mons.tag)}</td><td>${ssrInterpolate(mons.data)}</td><td>${ssrInterpolate(mons.min)}</td><td>${ssrInterpolate(mons.avg)}</td><td>${ssrInterpolate(mons.max)}</td><td>--</td><td>--</td><td>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/Monitoring/Detail-TH/${index}`,
          class: "btn btn-success btn-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View`);
            } else {
              return [
                createTextVNode("View")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Panels/TH.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "DP",
  __ssrInlineRender: true,
  props: {
    title: String,
    data: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "card-body",
        id: "theContainer"
      }, _attrs))}><div class="card card-primary"><div class="card-header text-center"><h3 class="card-title">DIFFERENTIAL PRESSURE</h3></div><div class="card-body card-body-monitoring"><table class="table table-bordered text-center"><thead class="bg-secondary"><tr class="bg-dark-gray"><th>No</th><th>Last Record</th><th>Room ID (+)</th><th><i class="fas fa-arrows-alt-h"></i></th><th>Room ID (-)</th><th>Present Value</th><th>Min</th><th>Avg</th><th>Max</th><th>Low Limit</th><th>High Limit</th><th>Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.data, (mons, index) => {
        _push(`<tr><td>${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(mons.lastrecord)}</td><td class="bg-dark">${ssrInterpolate(mons.roomid)}</td><td class="bg-dark"><i class="fas fa-arrows-alt-h"></i></td><td class="bg-dark">${ssrInterpolate(mons.taglink)}</td><td>${ssrInterpolate(mons.data)}</td><td>${ssrInterpolate(mons.min)}</td><td>${ssrInterpolate(mons.avg)}</td><td>${ssrInterpolate(mons.max)}</td><td>${ssrInterpolate(mons.sv_min)}</td><td>${ssrInterpolate(mons.sv_max)}</td><td class="bg-dark">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/Monitoring/Detail-DP/${index}`,
          class: "btn btn-success btn-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View`);
            } else {
              return [
                createTextVNode("View")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Panels/DP.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$1;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const store = useDataStore();
    let alarm = ref(false);
    let monType = ref("DP");
    [__temp, __restore] = withAsyncContext(() => store.getMonitoring()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_PanelsTH = __nuxt_component_1;
      const _component_PanelsDP = __nuxt_component_2;
      _push(`<!--[--><div class="content"><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> Monitoring <div class="card-tools"><ul class="nav nav-pills ml-auto"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/AlarmHistory" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(alarm)) {
              _push2(`<i class="fas fa-bell nav-link" style="${ssrRenderStyle({ "font-size": "larger", "animation": "blink 1s linear infinite" })}"${_scopeId}></i>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(alarm) ? (openBlock(), createBlock("i", {
                key: 0,
                class: "fas fa-bell nav-link",
                style: { "font-size": "larger", "animation": "blink 1s linear infinite" }
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="nav-item"><select class="form-control"><option value="TH">TH</option><option value="DP">DP</option></select></li></ul></div></div><div class="row"><div class="col-md-12">`);
      if (unref(monType) == "TH") {
        _push(ssrRenderComponent(_component_PanelsTH, {
          title: unref(store).$state.data.monitoring.data.realtime.TH[0].tag_group,
          data: unref(store).$state.data.monitoring.data.realtime.TH
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(monType) == "DP") {
        _push(ssrRenderComponent(_component_PanelsDP, {
          title: unref(store).$state.data.monitoring.data.realtime.DP[0].tag_group,
          data: unref(store).$state.data.monitoring.data.realtime.DP
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">\xD7</span></button></div><div class="modal-body">...</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Monitoring/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-81b3e6af.mjs.map
