import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, mergeProps, unref, withAsyncContext, computed, defineComponent, h, ref, withCtx, createVNode } from 'vue';
import { _ as _export_sfc, g as useAuth, a as useRouter, b as useRoute, i as globalMiddleware, d as useNuxtApp } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderSuspense, ssrRenderSlot, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { a as useAuthStore, u as useDataStore } from './data-25a661d5.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-744fccd2.mjs';
import { _ as _imports_0 } from './logo-b6df196a.mjs';
import { u as useFetch } from './fetch-129bc426.mjs';
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

const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props, { slots }) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    const router = useRouter();
    globalMiddleware.unshift(indicator.start);
    router.onError(() => {
      indicator.finish();
    });
    router.beforeResolve((to, from) => {
      if (to === from || to.matched.every((comp, index) => {
        var _a, _b, _c;
        return comp.components && ((_a = comp.components) == null ? void 0 : _a.default) === ((_c = (_b = from.matched[index]) == null ? void 0 : _b.components) == null ? void 0 : _c.default);
      })) {
        indicator.finish();
      }
    });
    router.afterEach((_to, _from, failure) => {
      if (failure) {
        indicator.finish();
      }
    });
    nuxtApp.hook("page:finish", indicator.finish);
    nuxtApp.hook("vue:error", indicator.finish);
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color || void 0,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transform: `scaleX(${indicator.progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    if (opts.throttle && false) {
      _throttle = setTimeout(() => {
        isLoading.value = true;
      }, opts.throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const __default__ = {
  methods: {
    updateDateTime() {
      let now = /* @__PURE__ */ new Date();
      this.cDate = now.toLocaleDateString("en-US");
      this.hours = now.getHours();
      this.minutes = now.getMinutes();
      this.seconds = now.getSeconds();
    },
    getZeroPad(n) {
      return (parseInt(n, 10) >= 10 ? "" : "0") + n;
    }
  },
  mounted() {
    this.$options.interval = setInterval(this.updateDateTime, 1e3);
  },
  data: () => ({
    hours: 0,
    minutes: 0,
    seconds: 0,
    cDate: null
    //isCollapse: false,
  }),
  beforeDestroy() {
    clearInterval(this.$options.interval);
  }
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    useAuth();
    useRouter();
    const auth = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "main-header navbar navbar-expand navbar-black navbar-dark" }, _attrs))}><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a></li><li><a class="nav-link" href="#" role="button"><i class="fas fa-sync"></i></a></li></ul><ul class="navbar-nav ml-auto">`);
      if (unref(auth).user.company === "19") {
        _push(`<h2 class="text-white mt-2"> BIOFARMA - GEDUNG ${ssrInterpolate(unref(auth).user.company)} L2 </h2>`);
      } else {
        _push(`<h2 class="text-white mt-2">BIOFARMA - GEDUNG ${ssrInterpolate(unref(auth).user.company)}</h2>`);
      }
      _push(`</ul><ul class="navbar-nav ml-auto"><li class="nav-link bg-primary m-1 p-2 rounded">${ssrInterpolate(_ctx.getZeroPad(_ctx.hours))}:${ssrInterpolate(_ctx.getZeroPad(_ctx.minutes))}:${ssrInterpolate(_ctx.getZeroPad(_ctx.seconds))}</li><li class="nav-link bg-primary m-1 p-2 rounded">${ssrInterpolate(_ctx.cDate)}</li><li class="nav-link bg-primary m-1 p-2 rounded"><a href="#"><span class="mr-1">Log out </span> <i class="fas fa-sign-out-alt"></i></a></li></ul></nav>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layouts/Navbar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = _sfc_main$4;
const _imports_1 = "" + buildAssetsURL("avatar5.2ef83f30.png");
const _sfc_main$3 = {
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    userName: String,
    role: Number
  },
  setup(__props) {
    const store = useDataStore();
    function postAuditTrail(menuName) {
      const payload = {
        "access": menuName,
        "action": "Click",
        "description": "Enter Menu : " + menuName
      };
      store.postAuditTrail(payload);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "main-sidebar sidebar-dark-primary elevation-4" }, _attrs))}><a${ssrRenderAttr("href", "/")} class="brand-link"><img${ssrRenderAttr("src", _imports_0)} alt="GMS" class="brand-image img-circle elevation-3" style="${ssrRenderStyle({ "opacity": ".8" })}"><span class="brand-text font-weight-light">GMS</span></a><div class="sidebar"><div class="user-panel mt-3 pb-3 mb-3 d-flex"><div class="image"><img${ssrRenderAttr("src", _imports_1)} class="img-circle elevation-2" alt="User Image"></div><div class="info"><a${ssrRenderAttr("href", "/UserProfile")} class="d-block">${ssrInterpolate(__props.userName)}</a></div></div><nav class="mt-2"><ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false"><li class="nav-header">Monitoring</li>`);
      if (__props.role <= 4) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/Maps",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Maps")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-map"${_scopeId}></i><p class="text-white"${_scopeId}>Mapping Layout</p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-map" }),
                createVNode("p", { class: "text-white" }, "Mapping Layout")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 3 || __props.role == 4) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/Monitoring",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Monitoring")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-desktop"${_scopeId}></i><p class="text-white"${_scopeId}> Monitoring </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-desktop" }),
                createVNode("p", { class: "text-white" }, " Monitoring ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="nav-header">Report</li>`);
      if (__props.role <= 3 || __props.role == 4) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/AlarmHistory",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Alarm History")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon far fa-bell"${_scopeId}></i><p class="text-white"${_scopeId}>Alarm History</p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon far fa-bell" }),
                createVNode("p", { class: "text-white" }, "Alarm History")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 3) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/AuditTrails",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Audit Trail")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-shoe-prints"${_scopeId}></i><p class="text-white"${_scopeId}> Audit Trails </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-shoe-prints" }),
                createVNode("p", { class: "text-white" }, " Audit Trails ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 3) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/Reports",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Report")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-clock"${_scopeId}></i><p class="text-white"${_scopeId}> Report </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-clock" }),
                createVNode("p", { class: "text-white" }, " Report ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li class="nav-header">Master</li>`);
      if (__props.role <= 3) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/AlarmSettings",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("AlarmSettings")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-sliders-h"${_scopeId}></i><p class="text-white"${_scopeId}> Alarm Settings </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-sliders-h" }),
                createVNode("p", { class: "text-white" }, " Alarm Settings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 4) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/Calibrations",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Calibrations")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-tablet-alt"${_scopeId}></i><p class="text-white"${_scopeId}> Calibrations </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-tablet-alt" }),
                createVNode("p", { class: "text-white" }, " Calibrations ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 3) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/Users",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Users")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-user"${_scopeId}></i><p class="text-white"${_scopeId}> Users </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-user" }),
                createVNode("p", { class: "text-white" }, " Users ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role == 4) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/UserProfile",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("User Profile")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-user"${_scopeId}></i><p class="text-white"${_scopeId}> User Profile </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-user" }),
                createVNode("p", { class: "text-white" }, " User Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 2) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/Settings",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("Settings")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-cog"${_scopeId}></i><p class="text-white"${_scopeId}> Settings </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-cog" }),
                createVNode("p", { class: "text-white" }, " Settings ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.role <= 3) {
        _push(`<li class="nav-item">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/About",
          class: "nav-link",
          onClick: ($event) => postAuditTrail("About")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="nav-icon fas fa-address-card"${_scopeId}></i><p class="text-white"${_scopeId}> About </p>`);
            } else {
              return [
                createVNode("i", { class: "nav-icon fas fa-address-card" }),
                createVNode("p", { class: "text-white" }, " About ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></nav></div></aside>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layouts/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = _sfc_main$3;
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<aside${ssrRenderAttrs(mergeProps({ class: "control-sidebar control-sidebar-dark" }, _attrs))}></aside>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layouts/ControlSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "main-footer dark-mode" }, _attrs))}><strong>Copyright \xA9 2023 Omron Corp.</strong> All rights reserved. </footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layouts/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: payload } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/token", "$VbeGLRT2Wl")), __temp = await __temp, __restore(), __temp);
    const store = useAuthStore();
    store.setUser(payload);
    const classCollapse = computed(() => {
      let page = useRoute().name;
      if (page == "Maps") {
        return "sidebar-collapse";
      } else {
        return "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_LayoutsNavbar = __nuxt_component_1;
      const _component_LayoutsSidebar = __nuxt_component_2;
      const _component_LayoutsControlSidebar = __nuxt_component_3;
      const _component_LayoutsFooter = __nuxt_component_4;
      _push(`<body${ssrRenderAttrs(mergeProps({
        class: ["hold-transition sidebar-mini layout-fixed", unref(classCollapse)]
      }, _attrs))} data-v-f8c68152><div class="wrapper" data-v-f8c68152>`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutsNavbar, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutsSidebar, {
        userName: unref(payload).name,
        role: unref(payload).role
      }, null, _parent));
      _push(`<div class="content-wrapper dark-mode" data-v-f8c68152><div class="content-header" data-v-f8c68152><div class="container-fluid" data-v-f8c68152><div class="row mb-2" data-v-f8c68152><div class="col-sm-6" data-v-f8c68152></div><div class="col-sm-6" data-v-f8c68152><ol class="breadcrumb float-sm-right" data-v-f8c68152></ol></div></div></div></div>`);
      ssrRenderSuspense(_push, {
        default: () => {
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        },
        _: 3
      });
      _push(`</div>`);
      _push(ssrRenderComponent(_component_LayoutsControlSidebar, null, null, _parent));
      _push(ssrRenderComponent(_component_LayoutsFooter, null, null, _parent));
      _push(`</div></body>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f8c68152"]]);

export { _default as default };
//# sourceMappingURL=default-fa7c2193.mjs.map
