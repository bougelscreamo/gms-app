import { hasInjectionContext, getCurrentInstance, inject, version, readonly, reactive, ref, watchEffect, watch, computed, useSSRContext, createApp, toRef, isRef, effectScope, isReactive, toRaw, unref, getCurrentScope, onScopeDispose, nextTick, defineComponent, useSlots, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, createVNode, mergeProps, createSlots, renderList, withCtx, renderSlot, normalizeProps, guardReactiveProps, createBlock, resolveDynamicComponent, Teleport, createCommentVNode, provide, onErrorCaptured, onServerPrefetch, shallowRef, shallowReactive, isReadonly, toRefs, markRaw, withKeys, createElementVNode, withModifiers, Transition, Fragment, normalizeStyle, createTextVNode, toDisplayString, defineAsyncComponent, isShallow, withDirectives, vShow, onBeforeUpdate, h, Suspense } from 'vue';
import { $fetch as $fetch$1 } from 'ofetch';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { createMemoryHistory, createRouter, START_LOCATION, useRoute as useRoute$1, RouterView } from 'vue-router';
import { createError as createError$1, sanitizeStatusCode, appendHeader, sendRedirect, setCookie, getCookie, deleteCookie } from 'h3';
import { withQuery, hasProtocol, parseURL, joinURL } from 'ufo';
import destr from 'destr';
import { renderSSRHead } from '@unhead/ssr';
import { getActiveHead, createServerHead as createServerHead$1 } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { defu } from 'defu';
import getURL from 'requrl';
import { parse } from 'cookie-es';
import { isEqual as isEqual$1 } from 'ohash';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import $axios from 'axios';
import { format, getMonth, getDay, getYear, getHours, getMinutes, getSeconds, isValid, parseISO, startOfWeek, endOfWeek, setMonth, setYear, addDays, isEqual, set, add, addMonths, subMonths, setHours, setMinutes, setSeconds, setMilliseconds, isBefore, isAfter, getWeek, getISOWeek, differenceInCalendarDays, parse as parse$1, eachDayOfInterval, addYears, subYears, isDate, sub } from 'date-fns';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
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

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.6.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn2) => callWithNuxt(nuxtApp, fn2),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const parallels = [];
  const errors = [];
  for (const plugin2 of plugins2) {
    const promise = applyPlugin(nuxtApp, plugin2);
    if (plugin2.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn2 = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn2));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
function useNuxtApp() {
  var _a2;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a2 = getCurrentInstance()) == null ? void 0 : _a2.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
/*! @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global = options.global || typeof name !== "string";
  const mw = typeof name !== "string" ? name : middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `navigateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
const __nuxt_page_meta = {
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/Maps",
    callbackUrl: "/Maps"
  }
};
const _routes = [
  {
    name: "About",
    path: "/About",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-5ddc65ab.mjs').then((m) => m.default || m)
  },
  {
    name: "AlarmHistory",
    path: "/AlarmHistory",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-3b45ec0f.mjs').then((m) => m.default || m)
  },
  {
    name: "AlarmSettings-Create",
    path: "/AlarmSettings/Create",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-6aec20f9.mjs').then((m) => m.default || m)
  },
  {
    name: "AlarmSettings-Edit-Type-id",
    path: "/AlarmSettings/Edit-:Type()/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-9b99a028.mjs').then((m) => m.default || m)
  },
  {
    name: "AlarmSettings-id",
    path: "/AlarmSettings/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-939d0599.mjs').then((m) => m.default || m)
  },
  {
    name: "AlarmSettings",
    path: "/AlarmSettings",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-6eed4cbb.mjs').then((m) => m.default || m)
  },
  {
    name: "AuditTrails-Log",
    path: "/AuditTrails/Log",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-fc2061f7.mjs').then((m) => m.default || m)
  },
  {
    name: "AuditTrails",
    path: "/AuditTrails",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-2c96b1b9.mjs').then((m) => m.default || m)
  },
  {
    name: "Calibrations-Cal-Type-id",
    path: "/Calibrations/Cal-:Type()/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-df83526e.mjs').then((m) => m.default || m)
  },
  {
    name: "Calibrations-Create",
    path: "/Calibrations/Create",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-9aea7174.mjs').then((m) => m.default || m)
  },
  {
    name: "Calibrations-id",
    path: "/Calibrations/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-4c98e842.mjs').then((m) => m.default || m)
  },
  {
    name: "Calibrations",
    path: "/Calibrations",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-0e7dd91d.mjs').then((m) => m.default || m)
  },
  {
    name: "Dashboard",
    path: "/Dashboard",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-c7690706.mjs').then((m) => m.default || m)
  },
  {
    name: "Maps",
    path: "/Maps",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-e34daa2d.mjs').then((m) => m.default || m)
  },
  {
    name: "Monitoring-Detail-Type-id",
    path: "/Monitoring/Detail-:Type()/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-0ecf620a.mjs').then((m) => m.default || m)
  },
  {
    name: "Monitoring",
    path: "/Monitoring",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-81b3e6af.mjs').then((m) => m.default || m)
  },
  {
    name: "NotifDestination-Create",
    path: "/NotifDestination/Create",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-0551acdb.mjs').then((m) => m.default || m)
  },
  {
    name: "NotifDestination-id",
    path: "/NotifDestination/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-0c673338.mjs').then((m) => m.default || m)
  },
  {
    name: "NotifDestination",
    path: "/NotifDestination",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-731b298d.mjs').then((m) => m.default || m)
  },
  {
    name: "Reports",
    path: "/Reports",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-e0c0f9b7.mjs').then((m) => m.default || m)
  },
  {
    name: "Settings",
    path: "/Settings",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-301b1282.mjs').then((m) => m.default || m)
  },
  {
    name: "UserProfile",
    path: "/UserProfile",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-6f92f87d.mjs').then((m) => m.default || m)
  },
  {
    name: "Users-Create",
    path: "/Users/Create",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-0ab4e300.mjs').then((m) => m.default || m)
  },
  {
    name: "Users-id",
    path: "/Users/:id()",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/_id_-e58555a8.mjs').then((m) => m.default || m)
  },
  {
    name: "Users",
    path: "/Users",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-8f6fcaac.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    meta: {},
    alias: [],
    redirect: void 0,
    component: () => import('./_nuxt/index-798bc3d8.mjs').then((m) => m.default || m)
  },
  {
    name: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) ?? "login",
    path: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) ?? "/login",
    meta: __nuxt_page_meta || {},
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import('./_nuxt/login-f23029e1.mjs').then((m) => m.default || m)
  }
];
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [{ "rel": "icon", "type": "image/png", "href": "favicon.png" }, { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" }, { "rel": "stylesheet", "href": "https://fonts.googleapis.com/css?family=Roboto&display=swap" }, { "rel": "stylesheet", "href": "admin-lte/plugins/fontawesome-free/css/all.min.css" }, { "rel": "stylesheet", "href": "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" }, { "rel": "stylesheet", "href": "admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css" }, { "rel": "stylesheet", "href": "admin-lte/dist/css/adminlte.min.css" }], "style": [], "script": [{ "type": "text/javascript", "src": "admin-lte/plugins/jquery/jquery.min.js" }, { "type": "text/javascript", "src": "admin-lte/plugins/moment/moment.min.js" }, { "type": "text/javascript", "src": "admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js" }, { "type": "text/javascript", "src": "admin-lte/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js" }, { "type": "text/javascript", "src": "admin-lte/dist/js/adminlte.min.js" }], "noscript": [], "title": "GMS - GMP Monitoring System", "htmlAttrs": { "lang": "en" } };
const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(from, to) {
  const samePageComponent = to.matched.every((comp, index) => {
    var _a2, _b, _c;
    return ((_a2 = comp.components) == null ? void 0 : _a2.default) === ((_c = (_b = from.matched[index]) == null ? void 0 : _b.components) == null ? void 0 : _c.default);
  });
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(from.params) !== JSON.stringify(to.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  {
    return result;
  }
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = ((_b = routerOptions.routes) == null ? void 0 : _b.call(routerOptions, _routes)) ?? _routes;
    let startPosition;
    const initialURL = nuxtApp.ssrContext.url;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        var _a3;
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        router.options.scrollBehavior = routerOptions.scrollBehavior;
        return (_a3 = routerOptions.scrollBehavior) == null ? void 0 : _a3.call(routerOptions, to, START_LOCATION, startPosition || savedPosition);
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const _route = shallowRef(router.resolve(initialURL));
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a3, _b2, _c, _d;
      if (((_b2 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b2.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const initialLayout = useState("_layout");
    router.beforeEach(async (to, from) => {
      var _a3, _b2;
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout.value && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout.value;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          if (Array.isArray(componentMiddleware)) {
            for (const entry2 of componentMiddleware) {
              middlewareEntries.add(entry2);
            }
          } else {
            middlewareEntries.add(componentMiddleware);
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(() => {
      delete nuxtApp._processingMiddleware;
    });
    router.afterEach(async (to, _from, failure) => {
      var _a3;
      delete nuxtApp._processingMiddleware;
      if ((failure == null ? void 0 : failure.type) === 4) {
        return;
      }
      if (to.matched.length === 0 && !((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        await nuxtApp.runWithContext(() => showError(createError$1({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`
        })));
      } else if (to.redirectedFrom && to.fullPath !== initialURL) {
        await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        await router.replace({
          ...router.resolve(initialURL),
          name: void 0,
          // #4920, #4982
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const isVue2 = false;
/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn2) => fn2();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
    // flush: 'post',
  };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return runWithContext(() => scope.run(setup));
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
const Vue3 = version.startsWith("3");
const headSymbol = "usehead";
function injectHead() {
  return getCurrentInstance() && inject(headSymbol) || getActiveHead();
}
function vueInstall(head) {
  const plugin2 = {
    install(app) {
      if (Vue3) {
        app.config.globalProperties.$unhead = head;
        app.config.globalProperties.$head = head;
        app.provide(headSymbol, head);
      }
    }
  };
  return plugin2.install;
}
function createServerHead(options = {}) {
  const head = createServerHead$1({
    ...options,
    plugins: [
      VueReactiveUseHeadPlugin(),
      ...(options == null ? void 0 : options.plugins) || []
    ]
  });
  head.install = vueInstall(head);
  return head;
}
function VueReactiveUseHeadPlugin() {
  return defineHeadPlugin({
    hooks: {
      "entries:resolve": function(ctx) {
        for (const entry2 of ctx.entries)
          entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
      }
    }
  });
}
function clientUseHead(input, options = {}) {
  const head = injectHead();
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
function serverUseHead(input, options = {}) {
  const head = injectHead();
  return head.push(input, options);
}
function useHead(input, options = {}) {
  var _a2;
  const head = injectHead();
  if (head) {
    const isBrowser = !!((_a2 = head.resolvedOptions) == null ? void 0 : _a2.document);
    if (options.mode === "server" && isBrowser || options.mode === "client" && !isBrowser)
      return;
    return isBrowser ? clientUseHead(input, options) : serverUseHead(input, options);
  }
}
function useRequestHeaders(include) {
  var _a2;
  const headers = ((_a2 = useNuxtApp().ssrContext) == null ? void 0 : _a2.event.node.req.headers) ?? {};
  if (!include) {
    return headers;
  }
  return Object.fromEntries(include.map((key) => key.toLowerCase()).filter((key) => headers[key]).map((key) => [key, headers[key]]));
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a2;
  return (_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.event;
}
function useRequestFetch() {
  var _a2;
  const event = (_a2 = useNuxtApp().ssrContext) == null ? void 0 : _a2.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref(cookies[name] ?? ((_a2 = opts.default) == null ? void 0 : _a2.call(opts)));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual$1(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a2;
  {
    return parse(((_a2 = useRequestEvent()) == null ? void 0 : _a2.node.req.headers.cookie) || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const plugin = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  setup(nuxtApp) {
    const createHead = createServerHead;
    const head = createHead();
    head.push(appHead);
    nuxtApp.vueApp.use(head);
    {
      nuxtApp.ssrContext.renderMeta = async () => {
        const meta = await renderSSRHead(head);
        return {
          ...meta,
          bodyScriptsPrepend: meta.bodyTagsOpen,
          // resolves naming difference with NuxtMeta and Unhead
          bodyScripts: meta.bodyTags
        };
      };
    }
  }
});
const useAuthState = () => {
  const data = useState("auth:data", () => void 0);
  const hasInitialSession = data.value !== void 0;
  const lastRefreshedAt = useState("auth:lastRefreshedAt", () => {
    if (hasInitialSession) {
      return /* @__PURE__ */ new Date();
    }
    return void 0;
  });
  const loading = useState("auth:loading", () => !hasInitialSession);
  const status = computed(() => {
    if (loading.value) {
      return "loading";
    }
    if (data.value) {
      return "authenticated";
    }
    return "unauthenticated";
  });
  return {
    data,
    loading,
    lastRefreshedAt,
    status
  };
};
const getApiURL = () => {
  const origin = useRuntimeConfig().public.auth.origin ?? ("");
  return joinURL(origin, useRuntimeConfig().public.auth.basePath);
};
const getRequestURL = (includePath = true) => {
  var _a2;
  return getURL((_a2 = useRequestEvent()) == null ? void 0 : _a2.node.req, includePath);
};
const joinPathToApiURL = (path) => joinURL(getApiURL(), path);
const navigateToAuthPages = (href) => {
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, href, 302));
    }
  }
  window.location.href = href;
  if (href.includes("#")) {
    window.location.reload();
  }
  const router = nuxtApp.$router;
  const waitForNavigationWithFallbackToRouter = new Promise((resolve) => setTimeout(resolve, 60 * 1e3)).then(() => router.push(href));
  return waitForNavigationWithFallbackToRouter;
};
const determineCallbackUrl = (authConfig, getOriginalTargetPath) => {
  var _a2;
  const authConfigCallbackUrl = (_a2 = authConfig.globalMiddlewareOptions) == null ? void 0 : _a2.addDefaultCallbackUrl;
  if (typeof authConfigCallbackUrl !== "undefined") {
    if (typeof authConfigCallbackUrl === "string") {
      return authConfigCallbackUrl;
    }
    if (typeof authConfigCallbackUrl === "boolean") {
      if (authConfigCallbackUrl) {
        return getOriginalTargetPath();
      }
    }
  }
};
const _fetch = async (nuxt, path, fetchOptions) => {
  const joinedPath = await callWithNuxt(nuxt, () => joinPathToApiURL(path));
  try {
    return $fetch(joinedPath, fetchOptions);
  } catch (error) {
    console.error("Error in `nuxt-auth`-app-side data fetching: Have you added the authentication handler server-endpoint `[...].ts`? Have you added the authentication handler in a non-default location (default is `~/server/api/auth/[...].ts`) and not updated the module-setting `auth.basePath`? Error is:");
    console.error(error);
    throw new Error("Runtime error, checkout the console logs to debug, open an issue at https://github.com/sidebase/nuxt-auth/issues/new/choose if you continue to have this problem");
  }
};
const isNonEmptyObject = (obj) => typeof obj === "object" && Object.keys(obj).length > 0;
const getRequestCookies = async (nuxt) => {
  const { cookie } = await callWithNuxt(nuxt, () => useRequestHeaders(["cookie"]));
  if (cookie) {
    return { cookie };
  }
  return {};
};
const navigateToAuthPageWithNuxt = (nuxt, href) => callWithNuxt(nuxt, navigateToAuthPages, [href]);
const joinPathToApiURLWithNuxt = (nuxt, path) => callWithNuxt(nuxt, joinPathToApiURL, [path]);
const getRequestURLWithNuxt = (nuxt) => callWithNuxt(nuxt, getRequestURL);
const getCsrfTokenWithNuxt = (nuxt) => callWithNuxt(nuxt, getCsrfToken);
const getSessionWithNuxt = (nuxt) => callWithNuxt(nuxt, getSession);
const getCsrfToken = async () => {
  const nuxt = useNuxtApp();
  const headers = await getRequestCookies(nuxt);
  return _fetch(nuxt, "csrf", { headers }).then((response) => response.csrfToken);
};
const signIn = async (provider, options, authorizationParams) => {
  const nuxt = useNuxtApp();
  const configuredProviders = await getProviders();
  if (!configuredProviders) {
    const errorUrl = await joinPathToApiURLWithNuxt(nuxt, "error");
    return navigateToAuthPageWithNuxt(nuxt, errorUrl);
  }
  const runtimeConfig = await callWithNuxt(nuxt, useRuntimeConfig);
  if (typeof provider === "undefined") {
    provider = runtimeConfig.public.auth.defaultProvider;
  }
  const { redirect = true } = options ?? {};
  let { callbackUrl } = options ?? {};
  if (typeof callbackUrl === "undefined" && runtimeConfig.public.auth.addDefaultCallbackUrl) {
    callbackUrl = await determineCallbackUrl(runtimeConfig.public.auth, () => getRequestURLWithNuxt(nuxt));
  }
  const signinUrl = await joinPathToApiURLWithNuxt(nuxt, "signin");
  const queryParams = callbackUrl ? `?${new URLSearchParams({ callbackUrl })}` : "";
  const hrefSignInAllProviderPage = `${signinUrl}${queryParams}`;
  if (!provider) {
    return navigateToAuthPageWithNuxt(nuxt, hrefSignInAllProviderPage);
  }
  const selectedProvider = configuredProviders[provider];
  if (!selectedProvider) {
    return navigateToAuthPageWithNuxt(nuxt, hrefSignInAllProviderPage);
  }
  const isCredentials = selectedProvider.type === "credentials";
  const isEmail = selectedProvider.type === "email";
  const isSupportingReturn = isCredentials || isEmail;
  let action = "signin";
  if (isCredentials) {
    action = "callback";
  }
  const csrfToken = await callWithNuxt(nuxt, getCsrfToken);
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...await getRequestCookies(nuxt)
  };
  const body = new URLSearchParams({
    ...options,
    csrfToken,
    callbackUrl,
    json: true
  });
  const fetchSignIn = () => _fetch(nuxt, `${action}/${provider}`, {
    method: "post",
    params: authorizationParams,
    headers,
    body
  }).catch((error2) => error2.data);
  const data = await callWithNuxt(nuxt, fetchSignIn);
  if (redirect || !isSupportingReturn) {
    const href = data.url ?? callbackUrl;
    return navigateToAuthPageWithNuxt(nuxt, href);
  }
  const error = new URL(data.url).searchParams.get("error");
  await getSessionWithNuxt(nuxt);
  return {
    error,
    status: 200,
    ok: true,
    url: error ? null : data.url
  };
};
const getProviders = () => _fetch(useNuxtApp(), "providers");
const getSession = async (getSessionOptions) => {
  const nuxt = useNuxtApp();
  const callbackUrlFallback = await getRequestURLWithNuxt(nuxt);
  const { required, callbackUrl, onUnauthenticated } = defu(getSessionOptions || {}, {
    required: false,
    callbackUrl: void 0,
    onUnauthenticated: () => signIn(void 0, {
      callbackUrl: (getSessionOptions == null ? void 0 : getSessionOptions.callbackUrl) || callbackUrlFallback
    })
  });
  const { data, status, loading, lastRefreshedAt } = await callWithNuxt(nuxt, useAuthState);
  const onError = () => {
    loading.value = false;
  };
  const headers = await getRequestCookies(nuxt);
  return _fetch(nuxt, "session", {
    onResponse: ({ response }) => {
      const sessionData = response._data;
      {
        const setCookieValue = response.headers.get("set-cookie");
        if (setCookieValue && nuxt.ssrContext) {
          appendHeader(nuxt.ssrContext.event, "set-cookie", setCookieValue);
        }
      }
      data.value = isNonEmptyObject(sessionData) ? sessionData : null;
      loading.value = false;
      if (required && status.value === "unauthenticated") {
        return onUnauthenticated();
      }
      return sessionData;
    },
    onRequest: ({ options }) => {
      lastRefreshedAt.value = /* @__PURE__ */ new Date();
      options.params = {
        ...options.params || {},
        callbackUrl: callbackUrl || callbackUrlFallback
      };
    },
    onRequestError: onError,
    onResponseError: onError,
    headers
  });
};
const signOut = async (options) => {
  const nuxt = useNuxtApp();
  const requestURL = await getRequestURLWithNuxt(nuxt);
  const { callbackUrl = requestURL, redirect = true } = options ?? {};
  const csrfToken = await getCsrfTokenWithNuxt(nuxt);
  if (!csrfToken) {
    throw createError({ statusCode: 400, statusMessage: "Could not fetch CSRF Token for signing out" });
  }
  const callbackUrlFallback = requestURL;
  const signoutData = await _fetch(nuxt, "signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onRequest: ({ options: options2 }) => {
      options2.body = new URLSearchParams({
        csrfToken,
        callbackUrl: callbackUrl || callbackUrlFallback,
        json: "true"
      });
    }
  }).catch((error) => error.data);
  if (redirect) {
    const url = signoutData.url ?? callbackUrl;
    return navigateToAuthPageWithNuxt(nuxt, url);
  }
  await getSessionWithNuxt(nuxt);
  return signoutData;
};
const useAuth = () => {
  const {
    data,
    status,
    lastRefreshedAt
  } = useAuthState();
  const actions = {
    getSession,
    getCsrfToken,
    getProviders,
    signIn,
    signOut
  };
  const getters = {
    status,
    data: readonly(data),
    lastRefreshedAt: readonly(lastRefreshedAt)
  };
  return {
    ...actions,
    ...getters
  };
};
const authMiddleware = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  const metaAuth = to.meta.auth;
  if (metaAuth === false) {
    return;
  }
  const authConfig = useRuntimeConfig().public.auth;
  const { status, signIn: signIn2 } = useAuth();
  const isGuestMode = typeof metaAuth === "object" && metaAuth.unauthenticatedOnly;
  if (isGuestMode && status.value === "unauthenticated") {
    return;
  }
  if (typeof metaAuth === "object" && !metaAuth.unauthenticatedOnly) {
    return;
  }
  if (status.value === "authenticated") {
    if (isGuestMode) {
      return navigateTo(metaAuth.navigateAuthenticatedTo ?? "/");
    }
    return;
  }
  if (authConfig.globalMiddlewareOptions.allow404WithoutAuth) {
    const matchedRoute = to.matched.length > 0;
    if (!matchedRoute) {
      return;
    }
  }
  const signInOptions = { error: "SessionRequired", callbackUrl: determineCallbackUrl(authConfig, () => to.path) };
  return signIn2(void 0, signInOptions);
});
const plugin_AOuQ1DYzjk = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  const { enableSessionRefreshOnWindowFocus, enableSessionRefreshPeriodically, enableGlobalAppMiddleware } = useRuntimeConfig().public.auth;
  const { data, lastRefreshedAt } = useAuthState();
  const { getSession: getSession2 } = useAuth();
  if (typeof data.value === "undefined") {
    [__temp, __restore] = executeAsync(() => getSession2()), await __temp, __restore();
  }
  const visibilityHandler = () => {
    if (enableSessionRefreshOnWindowFocus && document.visibilityState === "visible") {
      getSession2();
    }
  };
  let refetchIntervalTimer;
  nuxtApp.hook("app:mounted", () => {
    document.addEventListener("visibilitychange", visibilityHandler, false);
    if (enableSessionRefreshPeriodically !== false) {
      const intervalTime = enableSessionRefreshPeriodically === true ? 1e3 : enableSessionRefreshPeriodically;
      refetchIntervalTimer = setInterval(() => {
        if (data.value) {
          getSession2();
        }
      }, intervalTime);
    }
  });
  const _unmount = nuxtApp.vueApp.unmount;
  nuxtApp.vueApp.unmount = function() {
    document.removeEventListener("visibilitychange", visibilityHandler, false);
    clearInterval(refetchIntervalTimer);
    lastRefreshedAt.value = void 0;
    data.value = void 0;
    _unmount();
  };
  addRouteMiddleware("auth", authMiddleware, {
    global: enableGlobalAppMiddleware
  });
});
const usePersistedstateCookies = (cookieOptions) => ({
  getItem: (key) => {
    return useCookie(key, {
      ...cookieOptions,
      encode: encodeURIComponent,
      decode: decodeURIComponent
    }).value;
  },
  setItem: (key, value) => {
    useCookie(key, {
      ...cookieOptions,
      encode: encodeURIComponent,
      decode: decodeURIComponent
    }).value = value;
  }
});
const usePersistedstateLocalStorage = () => ({
  getItem: (key) => {
    return !useNuxtApp().ssrContext ? localStorage.getItem(key) : null;
  },
  setItem: (key, value) => {
    if (!useNuxtApp().ssrContext)
      localStorage.setItem(key, value);
  }
});
const usePersistedstateSessionStorage = () => ({
  getItem: (key) => {
    return !useNuxtApp().ssrContext ? sessionStorage.getItem(key) : null;
  },
  setItem: (key, value) => {
    if (!useNuxtApp().ssrContext)
      sessionStorage.setItem(key, value);
  }
});
const persistedState = {
  localStorage: usePersistedstateLocalStorage(),
  sessionStorage: usePersistedstateSessionStorage(),
  cookies: usePersistedstateCookies(),
  cookiesWithOptions: usePersistedstateCookies
};
const plugin_1UohGbtF8v = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const { cookieOptions, debug, storage } = useRuntimeConfig().public.persistedState;
  const pinia = nuxtApp.$pinia;
  pinia.use(createPersistedState({
    storage: storage === "cookies" ? persistedState.cookiesWithOptions(cookieOptions) : persistedState[storage],
    debug
  }));
});
const axios_QMFgzss1s4 = /* @__PURE__ */ defineNuxtPlugin(async () => {
  return {
    provide: {
      axios: $axios
    }
  };
});
function Kt() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      createElementVNode("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createElementVNode("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createElementVNode("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
function Da() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createElementVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
function Pn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function _n() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
function Xn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createElementVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
function Jn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
function Qn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createElementVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
const Cn = (e, n, a, t, i) => {
  const v = parse$1(e, n.slice(0, e.length), /* @__PURE__ */ new Date());
  return isValid(v) && isDate(v) ? t || i ? v : set(v, {
    hours: +a.hours,
    minutes: +(a == null ? void 0 : a.minutes),
    seconds: +(a == null ? void 0 : a.seconds),
    milliseconds: 0
  }) : null;
}, $a = (e, n, a, t, i) => {
  const v = Array.isArray(a) ? a[0] : a;
  if (typeof n == "string")
    return Cn(e, n, v, t, i);
  if (Array.isArray(n)) {
    let m = null;
    for (const T of n)
      if (m = Cn(e, T, v, t, i), m)
        break;
    return m;
  }
  return typeof n == "function" ? n(e) : null;
}, A = (e) => e ? new Date(e) : /* @__PURE__ */ new Date(), Ma = (e, n, a) => {
  if (n) {
    const i = (e.getMonth() + 1).toString().padStart(2, "0"), v = e.getDate().toString().padStart(2, "0"), m = e.getHours().toString().padStart(2, "0"), T = e.getMinutes().toString().padStart(2, "0"), Y = a ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${i}-${v}T${m}:${T}:${Y}.000Z`;
  }
  const t = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(t).toISOString();
}, je = (e) => {
  let n = A(JSON.parse(JSON.stringify(e)));
  return n = setHours(n, 0), n = setMinutes(n, 0), n = setSeconds(n, 0), n = setMilliseconds(n, 0), n;
}, Ke = (e, n, a, t) => {
  let i = e ? A(e) : A();
  return (n || n === 0) && (i = setHours(i, +n)), (a || a === 0) && (i = setMinutes(i, +a)), (t || t === 0) && (i = setSeconds(i, +t)), setMilliseconds(i, 0);
}, Ve = (e, n) => !e || !n ? false : isBefore(je(e), je(n)), ke = (e, n) => !e || !n ? false : isEqual(je(e), je(n)), Fe = (e, n) => !e || !n ? false : isAfter(je(e), je(n)), ea = (e, n, a) => e && e[0] && e[1] ? Fe(a, e[0]) && Ve(a, e[1]) : e && e[0] && n ? Fe(a, e[0]) && Ve(a, n) || Ve(a, e[0]) && Fe(a, n) : false, Pt = (e) => {
  const n = set(new Date(e), { date: 1 });
  return je(n);
}, Qt = (e, n, a) => n && (a || a === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((t) => t === n ? [t, a] : [t, isNaN(+e[t]) ? void 0 : +e[t]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
}, Lt = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
}), _t = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
}), ta = () => {
  const e = (t) => {
    _t.menuFocused = t;
  }, n = (t) => {
    _t.shiftKeyInMenu !== t && (_t.shiftKeyInMenu = t);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: _t.shiftKeyInMenu, menuFocused: _t.menuFocused })),
    setMenuFocused: e,
    setShiftKey: n
  };
};
function bn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var na = { exports: {} };
(function(e) {
  function n(a) {
    return a && a.__esModule ? a : {
      default: a
    };
  }
  e.exports = n, e.exports.__esModule = true, e.exports.default = e.exports;
})(na);
var Aa = na.exports, fn = { exports: {} };
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    if (t === null || t === true || t === false)
      return NaN;
    var i = Number(t);
    return isNaN(i) ? i : i < 0 ? Math.ceil(i) : Math.floor(i);
  }
  e.exports = n.default;
})(fn, fn.exports);
var Ta = fn.exports;
const Sa = /* @__PURE__ */ bn(Ta);
var vn = { exports: {} };
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t) {
    var i = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
    return i.setUTCFullYear(t.getFullYear()), t.getTime() - i.getTime();
  }
  e.exports = n.default;
})(vn, vn.exports);
var Pa = vn.exports;
const Nn = /* @__PURE__ */ bn(Pa);
function _a(e, n) {
  var a = Ia(n);
  return a.formatToParts ? Na(a, e) : Ra(a, e);
}
var Ca = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Na(e, n) {
  try {
    for (var a = e.formatToParts(n), t = [], i = 0; i < a.length; i++) {
      var v = Ca[a[i].type];
      v >= 0 && (t[v] = parseInt(a[i].value, 10));
    }
    return t;
  } catch (m) {
    if (m instanceof RangeError)
      return [NaN];
    throw m;
  }
}
function Ra(e, n) {
  var a = e.format(n).replace(/\u200E/g, ""), t = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);
  return [t[3], t[1], t[2], t[4], t[5], t[6]];
}
var en = {};
function Ia(e) {
  if (!en[e]) {
    var n = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), a = n === "06/25/2014, 00:00:00" || n === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    en[e] = a ? new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return en[e];
}
function Dn(e, n, a, t, i, v, m) {
  var T = /* @__PURE__ */ new Date(0);
  return T.setUTCFullYear(e, n, a), T.setUTCHours(t, i, v, m), T;
}
var Rn = 36e5, Oa = 6e4, tn = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function $n(e, n, a) {
  var t, i;
  if (!e || (t = tn.timezoneZ.exec(e), t))
    return 0;
  var v;
  if (t = tn.timezoneHH.exec(e), t)
    return v = parseInt(t[1], 10), In(v) ? -(v * Rn) : NaN;
  if (t = tn.timezoneHHMM.exec(e), t) {
    v = parseInt(t[1], 10);
    var m = parseInt(t[2], 10);
    return In(v, m) ? (i = Math.abs(v) * Rn + m * Oa, v > 0 ? -i : i) : NaN;
  }
  if (Va(e)) {
    n = new Date(n || Date.now());
    var T = a ? n : Ba(n), Y = mn(T, e), _ = a ? Y : Ya(n, Y, e);
    return -_;
  }
  return NaN;
}
function Ba(e) {
  return Dn(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function mn(e, n) {
  var a = _a(e, n), t = Dn(
    a[0],
    a[1] - 1,
    a[2],
    a[3] % 24,
    a[4],
    a[5],
    0
  ).getTime(), i = e.getTime(), v = i % 1e3;
  return i -= v >= 0 ? v : 1e3 + v, t - i;
}
function Ya(e, n, a) {
  var t = e.getTime(), i = t - n, v = mn(new Date(i), a);
  if (n === v)
    return n;
  i -= v - n;
  var m = mn(new Date(i), a);
  return v === m ? v : Math.max(v, m);
}
function In(e, n) {
  return -23 <= e && e <= 23 && (n == null || 0 <= n && n <= 59);
}
var On = {};
function Va(e) {
  if (On[e])
    return true;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), On[e] = true, true;
  } catch {
    return false;
  }
}
var Ea = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
const aa = Ea;
var nn = 36e5, Bn = 6e4, La = 2, Le = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: aa
};
function yn(e, n) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var a = n || {}, t = a.additionalDigits == null ? La : Sa(a.additionalDigits);
  if (t !== 2 && t !== 1 && t !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var i = Fa(e), v = Ua(i.date, t), m = v.year, T = v.restDateString, Y = Wa(T, m);
  if (isNaN(Y))
    return /* @__PURE__ */ new Date(NaN);
  if (Y) {
    var _ = Y.getTime(), W = 0, C;
    if (i.time && (W = Ha(i.time), isNaN(W)))
      return /* @__PURE__ */ new Date(NaN);
    if (i.timeZone || a.timeZone) {
      if (C = $n(i.timeZone || a.timeZone, new Date(_ + W)), isNaN(C))
        return /* @__PURE__ */ new Date(NaN);
    } else
      C = Nn(new Date(_ + W)), C = Nn(new Date(_ + W + C));
    return new Date(_ + W + C);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function Fa(e) {
  var n = {}, a = Le.dateTimePattern.exec(e), t;
  if (a ? (n.date = a[1], t = a[3]) : (a = Le.datePattern.exec(e), a ? (n.date = a[1], t = a[2]) : (n.date = null, t = e)), t) {
    var i = Le.timeZone.exec(t);
    i ? (n.time = t.replace(i[1], ""), n.timeZone = i[1].trim()) : n.time = t;
  }
  return n;
}
function Ua(e, n) {
  var a = Le.YYY[n], t = Le.YYYYY[n], i;
  if (i = Le.YYYY.exec(e) || t.exec(e), i) {
    var v = i[1];
    return {
      year: parseInt(v, 10),
      restDateString: e.slice(v.length)
    };
  }
  if (i = Le.YY.exec(e) || a.exec(e), i) {
    var m = i[1];
    return {
      year: parseInt(m, 10) * 100,
      restDateString: e.slice(m.length)
    };
  }
  return {
    year: null
  };
}
function Wa(e, n) {
  if (n === null)
    return null;
  var a, t, i, v;
  if (e.length === 0)
    return t = /* @__PURE__ */ new Date(0), t.setUTCFullYear(n), t;
  if (a = Le.MM.exec(e), a)
    return t = /* @__PURE__ */ new Date(0), i = parseInt(a[1], 10) - 1, Vn(n, i) ? (t.setUTCFullYear(n, i), t) : /* @__PURE__ */ new Date(NaN);
  if (a = Le.DDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0);
    var m = parseInt(a[1], 10);
    return Ka(n, m) ? (t.setUTCFullYear(n, 0, m), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Le.MMDD.exec(e), a) {
    t = /* @__PURE__ */ new Date(0), i = parseInt(a[1], 10) - 1;
    var T = parseInt(a[2], 10);
    return Vn(n, i, T) ? (t.setUTCFullYear(n, i, T), t) : /* @__PURE__ */ new Date(NaN);
  }
  if (a = Le.Www.exec(e), a)
    return v = parseInt(a[1], 10) - 1, En(n, v) ? Yn(n, v) : /* @__PURE__ */ new Date(NaN);
  if (a = Le.WwwD.exec(e), a) {
    v = parseInt(a[1], 10) - 1;
    var Y = parseInt(a[2], 10) - 1;
    return En(n, v, Y) ? Yn(n, v, Y) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function Ha(e) {
  var n, a, t;
  if (n = Le.HH.exec(e), n)
    return a = parseFloat(n[1].replace(",", ".")), an(a) ? a % 24 * nn : NaN;
  if (n = Le.HHMM.exec(e), n)
    return a = parseInt(n[1], 10), t = parseFloat(n[2].replace(",", ".")), an(a, t) ? a % 24 * nn + t * Bn : NaN;
  if (n = Le.HHMMSS.exec(e), n) {
    a = parseInt(n[1], 10), t = parseInt(n[2], 10);
    var i = parseFloat(n[3].replace(",", "."));
    return an(a, t, i) ? a % 24 * nn + t * Bn + i * 1e3 : NaN;
  }
  return null;
}
function Yn(e, n, a) {
  n = n || 0, a = a || 0;
  var t = /* @__PURE__ */ new Date(0);
  t.setUTCFullYear(e, 0, 4);
  var i = t.getUTCDay() || 7, v = n * 7 + a + 1 - i;
  return t.setUTCDate(t.getUTCDate() + v), t;
}
var xa = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], za = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function la(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function Vn(e, n, a) {
  if (n < 0 || n > 11)
    return false;
  if (a != null) {
    if (a < 1)
      return false;
    var t = la(e);
    if (t && a > za[n] || !t && a > xa[n])
      return false;
  }
  return true;
}
function Ka(e, n) {
  if (n < 1)
    return false;
  var a = la(e);
  return !(a && n > 366 || !a && n > 365);
}
function En(e, n, a) {
  return !(n < 0 || n > 52 || a != null && (a < 0 || a > 6));
}
function an(e, n, a) {
  return !(e != null && (e < 0 || e >= 25) || n != null && (n < 0 || n >= 60) || a != null && (a < 0 || a >= 60));
}
var gn = { exports: {} }, hn = { exports: {} };
(function(e, n) {
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = a;
  function a(t, i) {
    if (t == null)
      throw new TypeError("assign requires that input parameter not be null or undefined");
    for (var v in i)
      Object.prototype.hasOwnProperty.call(i, v) && (t[v] = i[v]);
    return t;
  }
  e.exports = n.default;
})(hn, hn.exports);
var ja = hn.exports;
(function(e, n) {
  var a = Aa.default;
  Object.defineProperty(n, "__esModule", {
    value: true
  }), n.default = i;
  var t = a(ja);
  function i(v) {
    return (0, t.default)({}, v);
  }
  e.exports = n.default;
})(gn, gn.exports);
var Ga = gn.exports;
const Za = /* @__PURE__ */ bn(Ga);
function qa(e, n, a) {
  var t = yn(e, a), i = $n(n, t, true), v = new Date(t.getTime() - i), m = /* @__PURE__ */ new Date(0);
  return m.setFullYear(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate()), m.setHours(v.getUTCHours(), v.getUTCMinutes(), v.getUTCSeconds(), v.getUTCMilliseconds()), m;
}
function Xa(e, n, a) {
  if (typeof e == "string" && !e.match(aa)) {
    var t = Za(a);
    return t.timeZone = n, yn(e, t);
  }
  var i = yn(e, a), v = Dn(
    i.getFullYear(),
    i.getMonth(),
    i.getDate(),
    i.getHours(),
    i.getMinutes(),
    i.getSeconds(),
    i.getMilliseconds()
  ).getTime(), m = $n(n, new Date(v));
  return new Date(v + m);
}
const Ja = (e, n = 3) => {
  const a = [];
  for (let t = 0; t < e.length; t += n)
    a.push([e[t], e[t + 1], e[t + 2]]);
  return a;
};
function Ln(e) {
  return (n) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`)).slice(0, 2);
}
function Qa(e) {
  return (n) => format(/* @__PURE__ */ new Date(`2017-01-0${n}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
const el = (e, n, a) => {
  const t = [1, 2, 3, 4, 5, 6, 7];
  let i;
  if (e !== null)
    try {
      i = t.map(Qa(e));
    } catch {
      i = t.map(Ln(n));
    }
  else
    i = t.map(Ln(n));
  const v = i.slice(0, a), m = i.slice(a + 1, i.length);
  return [i[a]].concat(...m).concat(...v);
}, tl = (e, n) => {
  const a = [];
  for (let t = +e[0]; t <= +e[1]; t++)
    a.push({ value: +t, text: `${t}` });
  return n ? a.reverse() : a;
}, nl = (e, n, a) => {
  const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => {
    const m = v < 10 ? `0${v}` : v;
    return /* @__PURE__ */ new Date(`2017-${m}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const v = a === "long" ? "MMMM" : "MMM";
      return t.map((m, T) => {
        const Y = format(m, v, { locale: e });
        return {
          text: Y.charAt(0).toUpperCase() + Y.substring(1),
          value: T
        };
      });
    } catch {
    }
  const i = new Intl.DateTimeFormat(n, { month: a, timeZone: "UTC" });
  return t.map((v, m) => {
    const T = i.format(v);
    return {
      text: T.charAt(0).toUpperCase() + T.substring(1),
      value: m
    };
  });
}, al = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e], Ae = (e) => {
  const n = unref(e);
  return n != null && n.$el ? n == null ? void 0 : n.$el : n;
}, ll = (e) => Object.assign({ type: "dot" }, e), ra = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false, zt = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
}, _e = (e) => e, Fn = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e, rl = (e) => e === 0 ? true : !!e, Un = (e) => e === null, ol = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
}, Wn = (e) => Object.assign(
  {
    menuAppear: "",
    open: "dp-slide-down",
    close: "dp-slide-up",
    next: "calendar-next",
    previous: "calendar-prev",
    vNext: "dp-slide-up",
    vPrevious: "dp-slide-down"
  },
  e
), sl = (e) => Object.assign(
  {
    toggleOverlay: "Toggle overlay",
    menu: "Datepicker menu",
    input: "Datepicker input",
    calendarWrap: "Calendar wrapper",
    calendarDays: "Calendar days",
    openTimePicker: "Open time picker",
    closeTimePicker: "Close time Picker",
    incrementValue: (n) => `Increment ${n}`,
    decrementValue: (n) => `Decrement ${n}`,
    openTpOverlay: (n) => `Open ${n} overlay`,
    amPmButton: "Switch AM/PM mode",
    openYearsOverlay: "Open years overlay",
    openMonthsOverlay: "Open months overlay",
    nextMonth: "Next month",
    prevMonth: "Previous month",
    day: () => ""
  },
  e
), il = (e) => e === null ? 0 : typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2, ul = (e, n, a) => e || (typeof a == "string" ? a : n), dl = (e) => typeof e == "boolean" ? e ? Wn({}) : false : Wn(e), cl = () => ({
  enterSubmit: true,
  tabSubmit: true,
  openMenu: true,
  rangeSeparator: " - "
}), fl = (e) => Object.assign({ months: [], years: [], times: { hours: [], minutes: [], seconds: [] } }, e), vl = (e) => Object.assign({ showSelect: true, showCancel: true, showNow: false, showPreview: true }, e), xe = (e) => {
  const n = () => {
    if (e.partialRange)
      return null;
    throw new Error(zt.prop("partial-range"));
  }, a = computed(() => ({
    ariaLabels: sl(e.ariaLabels),
    textInputOptions: Object.assign(cl(), e.textInputOptions),
    multiCalendars: il(e.multiCalendars),
    previewFormat: ul(e.previewFormat, e.format, v()),
    filters: fl(e.filters),
    transitions: dl(e.transitions),
    startTime: g(),
    actionRow: vl(e.actionRow)
  })), t = (r) => {
    if (e.range)
      return r();
    throw new Error(zt.prop("range"));
  }, i = () => {
    const r = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${r}` : `hh:mm${r} aa`;
  }, v = () => e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? i() : e.weekPicker ? "MM/dd/yyyy" : e.yearPicker ? "yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${i()}` : "MM/dd/yyyy", m = (r, o) => {
    if (typeof e.format == "function")
      return e.format(r);
    const l = o || v(), M = e.formatLocale ? { locale: e.formatLocale } : void 0;
    return Array.isArray(r) ? `${format(r[0], l, M)}${e.modelAuto && !r[1] ? "" : a.value.textInputOptions.rangeSeparator || "-"}${r[1] ? format(r[1], l, M) : ""}` : format(r, l, M);
  }, T = (r) => e.timezone ? qa(r, e.timezone) : r, Y = (r) => e.timezone ? Xa(r, e.timezone) : r, _ = computed(() => (r) => {
    var o;
    return (o = e.hideNavigation) == null ? void 0 : o.includes(r);
  }), W = (r) => {
    var o, l, M, re;
    return Array.isArray(e.allowedDates) && !((o = e.allowedDates) != null && o.length) ? true : (l = e.arrMapValues) != null && l.allowedDates ? !F(r, e.arrMapValues.allowedDates) : (M = e.allowedDates) != null && M.length ? !((re = e.allowedDates) != null && re.some(
      (se) => ke(T(A(se)), T(r))
    )) : false;
  }, C = (r) => {
    var Ie;
    const o = e.maxDate ? Fe(T(r), T(A(e.maxDate))) : false, l = e.minDate ? Ve(T(r), T(A(e.minDate))) : false, M = F(
      r,
      (Ie = e.arrMapValues) != null && Ie.disabledDates ? e.arrMapValues.disabledDates : e.disabledDates
    ), se = a.value.filters.months.map((Te) => +Te).includes(getMonth(r)), Pe = e.disabledWeekDays.length ? e.disabledWeekDays.some((Te) => +Te === getDay(r)) : false, Se = W(r), ee = getYear(r), Ue = ee < +e.yearRange[0] || ee > +e.yearRange[1];
    return !(o || l || M || se || Ue || Pe || Se);
  }, c = (r) => {
    const o = {
      hours: getHours(A()),
      minutes: getMinutes(A()),
      seconds: e.enableSeconds ? getSeconds(A()) : 0
    };
    return Object.assign(o, r);
  }, g = () => e.range ? e.startTime && Array.isArray(e.startTime) ? [c(e.startTime[0]), c(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? c(e.startTime) : null, Q = (r) => !C(r), U = (r) => Array.isArray(r) ? isValid(r[0]) && (r[1] ? isValid(r[1]) : true) : r ? isValid(r) : false, x = (r) => r instanceof Date ? r : parseISO(r), V = (r) => {
    const o = startOfWeek(T(r), { weekStartsOn: +e.weekStart }), l = endOfWeek(T(r), { weekStartsOn: +e.weekStart });
    return [o, l];
  }, F = (r, o) => r ? o instanceof Map ? !!o.get(u(r)) : Array.isArray(o) ? o.some((l) => ke(T(A(l)), T(r))) : o(A(JSON.parse(JSON.stringify(r)))) : true, ae = (r, o, l) => {
    let M = r ? A(r) : A();
    return (o || o === 0) && (M = setMonth(M, o)), l && (M = setYear(M, l)), M;
  }, oe = (r) => set(A(), Lt(r)), B = (r) => set(A(), {
    hours: +r.hours || 0,
    minutes: +r.minutes || 0,
    seconds: +r.seconds || 0
  }), G = (r, o, l, M) => {
    if (!r)
      return true;
    if (M) {
      const re = l === "max" ? isBefore(r, o) : isAfter(r, o), se = { seconds: 0, milliseconds: 0 };
      return re || isEqual(set(r, se), set(o, se));
    }
    return l === "max" ? r.getTime() <= o.getTime() : r.getTime() >= o.getTime();
  }, J = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, ne = (r) => Array.isArray(r) ? [r[0] ? oe(r[0]) : null, r[1] ? oe(r[1]) : null] : oe(r), ce = (r) => {
    const o = e.maxTime ? B(e.maxTime) : A(e.maxDate);
    return Array.isArray(r) ? G(r[0], o, "max", !!e.maxDate) && G(r[1], o, "max", !!e.maxDate) : G(r, o, "max", !!e.maxDate);
  }, ye = (r, o) => {
    const l = e.minTime ? B(e.minTime) : A(e.minDate);
    return Array.isArray(r) ? G(r[0], l, "min", !!e.minDate) && G(r[1], l, "min", !!e.minDate) && o : G(r, l, "min", !!e.minDate) && o;
  }, O = (r) => {
    let o = true;
    if (!r || J())
      return true;
    const l = !e.minDate && !e.maxDate ? ne(r) : r;
    if ((e.maxTime || e.maxDate) && (o = ce(_e(l))), (e.minTime || e.minDate) && (o = ye(_e(l), o)), e.disabledTimes) {
      const M = Array.isArray(r) ? [Lt(r[0]), r[1] ? Lt(r[1]) : void 0] : Lt(r);
      o = !e.disabledTimes(M);
    }
    return o;
  }, w = (r, o) => {
    const l = A(JSON.parse(JSON.stringify(r))), M = [];
    for (let re = 0; re < 7; re++) {
      const se = addDays(l, re), Pe = getMonth(se) !== o;
      M.push({
        text: e.hideOffsetDates && Pe ? "" : se.getDate(),
        value: se,
        current: !Pe,
        classData: {}
      });
    }
    return M;
  }, f = (r, o) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [r == 0, true];
      case "fair":
        return [r == 0 || o > r, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, N = (r, o) => {
    const l = [], M = A(T(new Date(o, r))), re = A(T(new Date(o, r + 1, 0))), se = e.weekStart, Pe = startOfWeek(M, { weekStartsOn: se }), Se = (ee) => {
      const Ue = w(ee, r);
      if (l.push({ days: Ue }), !l[l.length - 1].days.some(
        (Ie) => ke(je(Ie.value), je(re))
      )) {
        const Ie = addDays(ee, 7);
        Se(Ie);
      }
    };
    if (Se(Pe), e.sixWeeks && l.length < 6) {
      const ee = 6 - l.length, Ue = (M.getDay() + 7 - se) % 7, Te = 6 - (re.getDay() + 7 - se) % 7, [Xe, ct] = f(Ue, Te);
      for (let et = 1; et <= ee; et++)
        if (ct ? !!(et % 2) == Xe : Xe) {
          const ze = l[0].days[0], j = w(addDays(ze.value, -7), getMonth(M));
          l.unshift({ days: j });
        } else {
          const ze = l[l.length - 1], j = ze.days[ze.days.length - 1], te = w(addDays(j.value, 1), getMonth(M));
          l.push({ days: te });
        }
    }
    return l;
  }, I = (r, o, l) => [set(A(r), { date: 1 }), set(A(), { month: o, year: l, date: 1 })], E = (r, o) => Ve(...I(e.minDate, r, o)) || ke(...I(e.minDate, r, o)), D = (r, o) => Fe(...I(e.maxDate, r, o)) || ke(...I(e.maxDate, r, o)), y = (r, o, l) => {
    let M = false;
    return e.maxDate && l && D(r, o) && (M = true), e.minDate && !l && E(r, o) && (M = true), M;
  }, d = (r, o, l, M) => {
    let re = false;
    return M ? e.minDate && e.maxDate ? re = y(r, o, l) : (e.minDate && E(r, o) || e.maxDate && D(r, o)) && (re = true) : re = true, re;
  }, u = (r) => {
    const o = je(T(A(r))).toISOString(), [l] = o.split("T");
    return l;
  }, S = (r) => new Map(r.map((o) => [u(o), true])), b = (r) => Array.isArray(r) && r.length > 0;
  return {
    checkPartialRangeValue: n,
    checkRangeEnabled: t,
    getZonedDate: T,
    getZonedToUtc: Y,
    formatDate: m,
    getDefaultPattern: v,
    validateDate: C,
    getDefaultStartTime: g,
    isDisabled: Q,
    isValidDate: U,
    sanitizeDate: x,
    getWeekFromDate: V,
    matchDate: F,
    setDateMonthOrYear: ae,
    isValidTime: O,
    getCalendarDays: N,
    validateMonthYearInRange: d,
    validateMaxDate: D,
    validateMinDate: E,
    assignDefaultTime: c,
    mapDatesArrToMap: (r) => {
      b(e.allowedDates) && (r.allowedDates = S(e.allowedDates)), b(e.highlight) && (r.highlightedDates = S(e.highlight)), b(e.disabledDates) && (r.disabledDates = S(e.disabledDates));
    },
    defaults: a,
    hideNavigationButtons: _
  };
}, be = reactive({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
}), ln = ref(null), Ft = ref(false), rn = ref(false), on = ref(false), sn = ref(false), Ee = ref(0), Oe = ref(0), ut = () => {
  const e = computed(() => Ft.value ? [...be.selectionGrid, be.actionRow].filter((V) => V.length) : rn.value ? [
    ...be.timePicker[0],
    ...be.timePicker[1],
    sn.value ? [] : [ln.value],
    be.actionRow
  ].filter((V) => V.length) : on.value ? [...be.monthPicker, be.actionRow] : [be.monthYear, ...be.calendar, be.time, be.actionRow].filter((V) => V.length)), n = (V) => {
    Ee.value = V ? Ee.value + 1 : Ee.value - 1;
    let F = null;
    e.value[Oe.value] && (F = e.value[Oe.value][Ee.value]), F || (Ee.value = V ? Ee.value - 1 : Ee.value + 1);
  }, a = (V) => {
    if (Oe.value === 0 && !V || Oe.value === e.value.length && V)
      return;
    Oe.value = V ? Oe.value + 1 : Oe.value - 1, e.value[Oe.value] ? e.value[Oe.value] && !e.value[Oe.value][Ee.value] && Ee.value !== 0 && (Ee.value = e.value[Oe.value].length - 1) : Oe.value = V ? Oe.value - 1 : Oe.value + 1;
  }, t = (V) => {
    let F = null;
    e.value[Oe.value] && (F = e.value[Oe.value][Ee.value]), F ? F.focus({ preventScroll: !Ft.value }) : Ee.value = V ? Ee.value - 1 : Ee.value + 1;
  }, i = () => {
    n(true), t(true);
  }, v = () => {
    n(false), t(false);
  }, m = () => {
    a(false), t(true);
  }, T = () => {
    a(true), t(true);
  }, Y = (V, F) => {
    be[F] = V;
  }, _ = (V, F) => {
    be[F] = V;
  }, W = () => {
    Ee.value = 0, Oe.value = 0;
  };
  return {
    buildMatrix: Y,
    buildMultiLevelMatrix: _,
    setTimePickerBackRef: (V) => {
      ln.value = V;
    },
    setSelectionGrid: (V) => {
      Ft.value = V, W(), V || (be.selectionGrid = []);
    },
    setTimePicker: (V, F = false) => {
      rn.value = V, sn.value = F, W(), V || (be.timePicker[0] = [], be.timePicker[1] = []);
    },
    setTimePickerElements: (V, F = 0) => {
      be.timePicker[F] = V;
    },
    arrowRight: i,
    arrowLeft: v,
    arrowUp: m,
    arrowDown: T,
    clearArrowNav: () => {
      be.monthYear = [], be.calendar = [], be.time = [], be.actionRow = [], be.selectionGrid = [], be.timePicker[0] = [], be.timePicker[1] = [], Ft.value = false, rn.value = false, sn.value = false, on.value = false, W(), ln.value = null;
    },
    setMonthPicker: (V) => {
      on.value = V, W();
    },
    refSets: be
    // exposed for testing
  };
}, Hn = (e) => Array.isArray(e), vt = (e) => Array.isArray(e), xn = (e) => Array.isArray(e) && e.length === 2, ml = (e, n, a, t, i) => {
  const {
    getDefaultStartTime: v,
    isDisabled: m,
    sanitizeDate: T,
    getWeekFromDate: Y,
    setDateMonthOrYear: _,
    validateMonthYearInRange: W,
    defaults: C
  } = xe(e), c = computed({
    get: () => e.internalModelValue,
    set: (s) => {
      !e.readonly && !e.disabled && n("update:internal-model-value", s);
    }
  }), g = ref([]);
  watch(c, (s, k) => {
    e.range ? J() : isEqual(s, k) || J();
  });
  const Q = toRef(e, "multiCalendars");
  watch(Q, () => {
    j(0);
  });
  const U = ref([{ month: getMonth(A()), year: getYear(A()) }]);
  watch(
    U,
    () => {
      U.value.forEach((s, k) => {
        n("update-month-year", { instance: k, month: s.month, year: s.year });
      });
    },
    { deep: true }
  );
  const x = reactive({
    hours: e.range ? [getHours(A()), getHours(A())] : getHours(A()),
    minutes: e.range ? [getMinutes(A()), getMinutes(A())] : getMinutes(A()),
    seconds: e.range ? [0, 0] : 0
  }), V = computed(
    () => (s) => U.value[s] ? U.value[s].month : 0
  ), F = computed(
    () => (s) => U.value[s] ? U.value[s].year : 0
  ), ae = computed(() => {
    var s;
    return (s = e.flow) != null && s.length && !e.partialFlow ? i.value === e.flow.length : true;
  }), oe = (s, k, X) => {
    var ie, $e;
    U.value[s] || (U.value[s] = { month: 0, year: 0 }), U.value[s].month = Un(k) ? (ie = U.value[s]) == null ? void 0 : ie.month : k, U.value[s].year = Un(X) ? ($e = U.value[s]) == null ? void 0 : $e.year : X;
  }, B = (s, k) => {
    x[s] = k;
  }, G = () => {
    e.startDate && (oe(0, getMonth(A(e.startDate)), getYear(A(e.startDate))), C.value.multiCalendars && j(0));
  };
  onMounted(() => {
    c.value || (G(), C.value.startTime && D()), J(true), e.focusStartDate && e.startDate && G();
  });
  const J = (s = false) => {
    if (c.value)
      return Array.isArray(c.value) ? (g.value = c.value, w(s)) : ce(c.value, s);
    if (e.timePicker)
      return f();
    if (e.monthPicker && !e.range)
      return N();
    if (e.yearPicker && !e.range)
      return I();
    if (C.value.multiCalendars && s && !e.startDate)
      return ne(A(), s);
  }, ne = (s, k = false) => {
    if ((!C.value.multiCalendars || !e.multiStatic || k) && oe(0, getMonth(s), getYear(s)), C.value.multiCalendars)
      for (let X = 1; X < C.value.multiCalendars; X++) {
        const ie = set(A(), { month: V.value(X - 1), year: F.value(X - 1) }), $e = add(ie, { months: 1 });
        U.value[X] = { month: getMonth($e), year: getYear($e) };
      }
  }, ce = (s, k) => {
    ne(s), B("hours", getHours(s)), B("minutes", getMinutes(s)), B("seconds", getSeconds(s)), C.value.multiCalendars && k && d();
  }, ye = (s, k) => {
    s[1] && e.showLastInRange ? ne(s[1], k) : ne(s[0], k);
    const X = (ie, $e) => [
      ie(s[0]),
      s[1] ? ie(s[1]) : x[$e][1]
    ];
    B("hours", X(getHours, "hours")), B("minutes", X(getMinutes, "minutes")), B("seconds", X(getSeconds, "seconds"));
  }, O = (s, k) => {
    if ((e.range || e.weekPicker) && !e.multiDates)
      return ye(s, k);
    if (e.multiDates) {
      const X = s[s.length - 1];
      return ce(X, k);
    }
  }, w = (s) => {
    const k = c.value;
    O(k, s), C.value.multiCalendars && e.multiCalendarsSolo && d();
  }, f = () => {
    if (D(), !e.range)
      c.value = Ke(A(), x.hours, x.minutes, E());
    else {
      const s = x.hours, k = x.minutes;
      c.value = [
        Ke(A(), s[0], k[0], E()),
        Ke(A(), s[1], k[1], E(false))
      ];
    }
  }, N = () => {
    e.multiDates ? c.value = [_(A(), V.value(0), F.value(0))] : c.value = _(A(), V.value(0), F.value(0));
  }, I = () => {
    c.value = A();
  }, E = (s = true) => e.enableSeconds ? Array.isArray(x.seconds) ? s ? x.seconds[0] : x.seconds[1] : x.seconds : 0, D = () => {
    const s = v();
    if (s) {
      const k = Array.isArray(s), X = k ? [+s[0].hours, +s[1].hours] : +s.hours, ie = k ? [+s[0].minutes, +s[1].minutes] : +s.minutes, $e = k ? [+s[0].seconds, +s[1].seconds] : +s.seconds;
      B("hours", X), B("minutes", ie), e.enableSeconds && B("seconds", $e);
    }
  }, y = () => Array.isArray(c.value) && c.value.length ? c.value[c.value.length - 1] : null, d = () => {
    if (Array.isArray(c.value) && c.value.length === 2) {
      const s = A(
        A(c.value[1] ? c.value[1] : addMonths(c.value[0], 1))
      ), [k, X] = [getMonth(c.value[0]), getYear(c.value[0])], [ie, $e] = [getMonth(c.value[1]), getYear(c.value[1])];
      (k !== ie || k === ie && X !== $e) && e.multiCalendarsSolo && oe(1, getMonth(s), getYear(s));
    } else
      c.value && !Array.isArray(c.value) && oe(0, getMonth(c.value), getYear(c.value));
  }, u = (s) => {
    const k = addMonths(s, 1);
    return { month: getMonth(k), year: getYear(k) };
  }, S = (s) => {
    const k = getMonth(A(s)), X = getYear(A(s));
    if (oe(0, k, X), C.value.multiCalendars > 0)
      for (let ie = 1; ie < C.value.multiCalendars; ie++) {
        const $e = u(
          set(A(s), { year: V.value(ie - 1), month: F.value(ie - 1) })
        );
        oe(ie, $e.month, $e.year);
      }
  }, b = (s) => {
    if (c.value && Array.isArray(c.value))
      if (c.value.some((k) => ke(s, k))) {
        const k = c.value.filter((X) => !ke(X, s));
        c.value = k.length ? k : null;
      } else
        (e.multiDatesLimit && +e.multiDatesLimit > c.value.length || !e.multiDatesLimit) && c.value.push(s);
    else
      c.value = [s];
  }, Z = (s, k) => {
    const X = Fe(s, k) ? k : s, ie = Fe(k, s) ? k : s;
    return eachDayOfInterval({ start: X, end: ie });
  }, r = (s, k = 0) => {
    if (Array.isArray(c.value) && c.value[k]) {
      const X = differenceInCalendarDays(s, c.value[k]), ie = Z(c.value[k], s), $e = ie.length === 1 ? 0 : ie.filter((h2) => m(h2)).length, tt = Math.abs(X) - $e;
      if (e.minRange && e.maxRange)
        return tt >= +e.minRange && tt <= +e.maxRange;
      if (e.minRange)
        return tt >= +e.minRange;
      if (e.maxRange)
        return tt <= +e.maxRange;
    }
    return true;
  }, o = (s) => Array.isArray(c.value) && c.value.length === 2 ? e.fixedStart && (Fe(s, c.value[0]) || ke(s, c.value[0])) ? [c.value[0], s] : e.fixedEnd && (Ve(s, c.value[1]) || ke(s, c.value[1])) ? [s, c.value[1]] : (n("invalid-fixed-range", s), c.value) : [], l = () => {
    e.autoApply && ae.value && n("auto-apply", e.partialFlow);
  }, M = () => {
    e.autoApply && n("select-date");
  }, re = (s) => !eachDayOfInterval({ start: s[0], end: s[1] }).some((X) => m(X)), se = (s) => (c.value = Y(A(s.value)), l()), Pe = (s) => {
    const k = Ke(A(s.value), x.hours, x.minutes, E());
    e.multiDates ? b(k) : c.value = k, a(), l();
  }, Se = () => {
    g.value = c.value ? c.value.slice() : [], g.value.length === 2 && !(e.fixedStart || e.fixedEnd) && (g.value = []);
  }, ee = (s, k) => {
    const X = [A(s.value), addDays(A(s.value), +e.autoRange)];
    re(X) && (k && S(s.value), g.value = X);
  }, Ue = (s) => {
    Ie(s.value) || !r(s.value, e.fixedStart ? 0 : 1) || (g.value = o(A(s.value)));
  }, Ie = (s) => e.noDisabledRange ? Z(g.value[0], s).some((X) => m(X)) : false, Te = (s, k) => {
    if (Se(), e.autoRange)
      return ee(s, k);
    if (e.fixedStart || e.fixedEnd)
      return Ue(s);
    g.value[0] ? r(A(s.value)) && !Ie(s.value) && (Ve(A(s.value), A(g.value[0])) ? (g.value.unshift(A(s.value)), n("range-end", g.value[0])) : (g.value[1] = A(s.value), n("range-end", g.value[1]))) : (g.value[0] = A(s.value), n("range-start", g.value[0]));
  }, Xe = (s) => {
    g.value[s] = Ke(
      g.value[s],
      x.hours[s],
      x.minutes[s],
      E(s !== 1)
    );
  }, ct = () => {
    var s, k;
    g.value[0] && g.value[1] && +((s = g.value) == null ? void 0 : s[0]) > +((k = g.value) == null ? void 0 : k[1]) && (g.value.reverse(), n("range-start", g.value[0]), n("range-end", g.value[1]));
  }, et = () => {
    g.value.length && (g.value[0] && !g.value[1] ? Xe(0) : (Xe(0), Xe(1), a()), ct(), c.value = g.value.slice(), g.value[0] && g.value[1] && e.autoApply && n("auto-apply"), g.value[0] && !g.value[1] && e.modelAuto && e.autoApply && n("auto-apply"));
  }, wt = (s, k = false) => {
    if (!(m(s.value) || !s.current && e.hideOffsetDates)) {
      if (e.weekPicker)
        return se(s);
      if (!e.range)
        return Pe(s);
      vt(x.hours) && vt(x.minutes) && !e.multiDates && (Te(s, k), et());
    }
  }, ze = (s) => {
    const k = s[0];
    return e.weekNumbers === "local" ? getWeek(k.value, { weekStartsOn: +e.weekStart }) : e.weekNumbers === "iso" ? getISOWeek(k.value) : typeof e.weekNumbers == "function" ? e.weekNumbers(k.value) : "";
  }, j = (s) => {
    for (let k = s - 1; k >= 0; k--) {
      const X = subMonths(set(A(), { month: V.value(k + 1), year: F.value(k + 1) }), 1);
      oe(k, getMonth(X), getYear(X));
    }
    for (let k = s + 1; k <= C.value.multiCalendars - 1; k++) {
      const X = addMonths(set(A(), { month: V.value(k - 1), year: F.value(k - 1) }), 1);
      oe(k, getMonth(X), getYear(X));
    }
  }, te = (s) => _(A(), V.value(s), F.value(s)), ue = (s) => Ke(s, x.hours, x.minutes, E()), Tt = (s) => {
    b(te(s));
  }, ft = (s, k) => {
    const X = e.monthPicker ? V.value(s) !== k.month || !k.fromNav : F.value(s) !== k.year || !k.fromNav;
    if (oe(s, k.month, k.year), C.value.multiCalendars && !e.multiCalendarsSolo && j(s), e.monthPicker || e.yearPicker)
      if (e.multiDates)
        X && Tt(s);
      else if (e.range) {
        if (X && r(te(s))) {
          let ie = c.value ? c.value.slice() : [];
          ie.length === 2 && ie[1] !== null && (ie = []), ie.length ? Ve(te(s), ie[0]) ? ie.unshift(te(s)) : ie[1] = te(s) : ie = [te(s)], c.value = ie;
        }
      } else
        (e.autoApplyMonth || X) && (c.value = te(s));
    t(e.multiCalendarsSolo ? s : void 0);
  }, Gt = async (s = false) => {
    if (e.autoApply && (e.monthPicker || e.yearPicker)) {
      await nextTick();
      const k = e.monthPicker ? s : false;
      e.range ? n("auto-apply", k || !c.value || c.value.length === 1) : n("auto-apply", k);
    }
    a();
  }, Yt = (s, k) => {
    const X = set(A(), { month: V.value(k), year: F.value(k) }), ie = s < 0 ? addMonths(X, 1) : subMonths(X, 1);
    W(getMonth(ie), getYear(ie), s < 0, e.preventMinMaxNavigation) && (oe(k, getMonth(ie), getYear(ie)), C.value.multiCalendars && !e.multiCalendarsSolo && j(k), t());
  }, St = (s) => {
    Hn(s) && Hn(c.value) && vt(x.hours) && vt(x.minutes) ? (s[0] && c.value[0] && (c.value[0] = Ke(s[0], x.hours[0], x.minutes[0], E())), s[1] && c.value[1] && (c.value[1] = Ke(s[1], x.hours[1], x.minutes[1], E(false)))) : e.multiDates && Array.isArray(c.value) ? c.value[c.value.length - 1] = ue(s) : !e.range && !xn(s) && (c.value = ue(s)), n("time-update");
  }, Zt = (s, k = true, X = false) => {
    const ie = k ? s : x.hours, $e = !k && !X ? s : x.minutes, tt = X ? s : x.seconds;
    if (e.range && xn(c.value) && vt(ie) && vt($e) && vt(tt) && !e.disableTimeRangeValidation) {
      const h2 = (pe) => Ke(c.value[pe], ie[pe], $e[pe], tt[pe]), z = (pe) => setMilliseconds(c.value[pe], 0);
      if (ke(c.value[0], c.value[1]) && (isAfter(h2(0), z(1)) || isBefore(h2(1), z(0))))
        return;
    }
    if (B("hours", ie), B("minutes", $e), B("seconds", tt), c.value)
      if (e.multiDates) {
        const h2 = y();
        h2 && St(h2);
      } else
        St(c.value);
    else
      e.timePicker && St(e.range ? [A(), A()] : A());
    a();
  }, qt = (s, k) => {
    e.monthChangeOnScroll && Yt(e.monthChangeOnScroll !== "inverse" ? -s.deltaY : s.deltaY, k);
  }, Xt = (s, k, X = false) => {
    e.monthChangeOnArrows && e.vertical === X && Vt(s, k);
  }, Vt = (s, k) => {
    Yt(s === "right" ? -1 : 1, k);
  };
  return {
    time: x,
    month: V,
    year: F,
    modelValue: c,
    calendars: U,
    monthYearSelect: Gt,
    isDisabled: m,
    updateTime: Zt,
    getWeekNum: ze,
    selectDate: wt,
    updateMonthYear: ft,
    handleScroll: qt,
    getMarker: (s) => e.markers.find((k) => ke(T(s.value), T(k.date))),
    handleArrow: Xt,
    handleSwipe: Vt,
    selectCurrentDate: () => {
      e.range ? c.value && Array.isArray(c.value) && c.value[0] ? c.value = Ve(A(), c.value[0]) ? [A(), c.value[0]] : [c.value[0], A()] : c.value = [A()] : c.value = A(), M();
    },
    presetDateRange: (s, k) => {
      k || s.length && s.length <= 2 && e.range && (c.value = s.map((X) => A(X)), M(), e.multiCalendars && nextTick().then(() => J(true)));
    }
  };
}, yl = (e, n, a) => {
  const t = ref(), {
    getZonedToUtc: i,
    getZonedDate: v,
    formatDate: m,
    getDefaultPattern: T,
    checkRangeEnabled: Y,
    checkPartialRangeValue: _,
    isValidDate: W,
    setDateMonthOrYear: C,
    defaults: c
  } = xe(n), g = ref(""), Q = toRef(n, "format");
  watch(t, () => {
    e("internal-model-change", t.value);
  }), watch(Q, () => {
    y();
  });
  const U = (l) => {
    const M = l || A();
    return n.modelType ? u(M) : {
      hours: getHours(M),
      minutes: getMinutes(M),
      seconds: n.enableSeconds ? getSeconds(M) : 0
    };
  }, x = (l) => n.modelType ? u(l) : { month: getMonth(l), year: getYear(l) }, V = (l) => Array.isArray(l) ? Y(() => [
    setYear(A(), l[0]),
    l[1] ? setYear(A(), l[1]) : _()
  ]) : setYear(A(), +l), F = (l, M) => (typeof l == "string" || typeof l == "number") && n.modelType ? d(l) : M, ae = (l) => Array.isArray(l) ? [
    F(
      l[0],
      Ke(null, +l[0].hours, +l[0].minutes, l[0].seconds)
    ),
    F(
      l[1],
      Ke(null, +l[1].hours, +l[1].minutes, l[1].seconds)
    )
  ] : F(l, Ke(null, l.hours, l.minutes, l.seconds)), oe = (l) => Array.isArray(l) ? n.multiDates ? l.map((M) => F(M, C(null, +M.month, +M.year))) : Y(() => [
    F(l[0], C(null, +l[0].month, +l[0].year)),
    F(
      l[1],
      l[1] ? C(null, +l[1].month, +l[1].year) : _()
    )
  ]) : F(l, C(null, +l.month, +l.year)), B = (l) => {
    if (Array.isArray(l))
      return l.map((M) => d(M));
    throw new Error(zt.dateArr("multi-dates"));
  }, G = (l) => {
    if (Array.isArray(l))
      return [A(l[0]), A(l[1])];
    throw new Error(zt.dateArr("week-picker"));
  }, J = (l) => n.modelAuto ? Array.isArray(l) ? [d(l[0]), d(l[1])] : n.autoApply ? [d(l)] : [d(l), null] : Array.isArray(l) ? Y(() => [
    d(l[0]),
    l[1] ? d(l[1]) : _()
  ]) : d(l), ne = () => {
    Array.isArray(t.value) && n.range && t.value.length === 1 && t.value.push(_());
  }, ce = () => {
    const l = t.value;
    return [
      u(l[0]),
      l[1] ? u(l[1]) : _()
    ];
  }, ye = () => t.value[1] ? ce() : u(_e(t.value[0])), O = () => (t.value || []).map((l) => u(l)), w = () => (ne(), n.modelAuto ? ye() : n.multiDates ? O() : Array.isArray(t.value) ? Y(() => ce()) : u(_e(t.value))), f = (l) => l ? n.timePicker ? ae(_e(l)) : n.monthPicker ? oe(_e(l)) : n.yearPicker ? V(_e(l)) : n.multiDates ? B(_e(l)) : n.weekPicker ? G(_e(l)) : J(_e(l)) : null, N = (l) => {
    const M = f(l);
    W(_e(M)) ? (t.value = _e(M), y()) : (t.value = null, g.value = "");
  }, I = () => {
    var M;
    const l = (re) => {
      var se;
      return format(re, (se = c.value.textInputOptions) == null ? void 0 : se.format);
    };
    return `${l(t.value[0])} ${(M = c.value.textInputOptions) == null ? void 0 : M.rangeSeparator} ${t.value[1] ? l(t.value[1]) : ""}`;
  }, E = () => {
    var l;
    return a.value && t.value ? Array.isArray(t.value) ? I() : format(t.value, (l = c.value.textInputOptions) == null ? void 0 : l.format) : m(t.value);
  }, D = () => {
    var l;
    return t.value ? n.multiDates ? t.value.map((M) => m(M)).join("; ") : n.textInput && typeof ((l = c.value.textInputOptions) == null ? void 0 : l.format) == "string" ? E() : m(t.value) : "";
  }, y = () => {
    !n.format || typeof n.format == "string" || n.textInput && typeof n.textInputOptions.format == "string" ? g.value = D() : g.value = n.format(t.value);
  }, d = (l) => {
    if (n.utc) {
      const M = new Date(l);
      return n.utc === "preserve" ? new Date(M.getTime() + M.getTimezoneOffset() * 6e4) : M;
    }
    return n.modelType ? n.modelType === "date" || n.modelType === "timestamp" ? v(new Date(l)) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? parse$1(l, T(), /* @__PURE__ */ new Date()) : v(parse$1(l, n.modelType, /* @__PURE__ */ new Date())) : v(new Date(l));
  }, u = (l) => l ? n.utc ? Ma(l, n.utc === "preserve", n.enableSeconds) : n.modelType ? n.modelType === "timestamp" ? +i(l) : n.modelType === "format" && (typeof n.format == "string" || !n.format) ? m(i(l)) : m(i(l), n.modelType) : i(l) : "", S = (l) => {
    e("update:model-value", l);
  }, b = (l) => Array.isArray(t.value) ? n.multiDates ? t.value.map((M) => l(M)) : [
    l(t.value[0]),
    t.value[1] ? l(t.value[1]) : _()
  ] : l(_e(t.value)), Z = (l) => S(_e(b(l)));
  return {
    inputValue: g,
    internalModelValue: t,
    checkBeforeEmit: () => t.value ? n.range ? n.partialRange ? t.value.length >= 1 : t.value.length === 2 : !!t.value : false,
    parseExternalModelValue: N,
    formatInputValue: y,
    emitModelValue: () => (y(), n.monthPicker ? Z(x) : n.timePicker ? Z(U) : n.yearPicker ? Z(getYear) : n.weekPicker ? S(t.value) : S(w()))
  };
}, gl = (e, n) => {
  const { validateMonthYearInRange: a, validateMaxDate: t, validateMinDate: i, defaults: v } = xe(e), m = (C, c) => {
    let g = C;
    return v.value.filters.months.includes(getMonth(g)) ? (g = c ? addMonths(C, 1) : subMonths(C, 1), m(g, c)) : g;
  }, T = (C, c) => {
    let g = C;
    return v.value.filters.years.includes(getYear(g)) ? (g = c ? addYears(C, 1) : subYears(C, 1), T(g, c)) : g;
  }, Y = (C) => {
    const c = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year });
    let g = C ? addMonths(c, 1) : subMonths(c, 1);
    e.disableYearSelect && (g = setYear(g, e.year));
    let Q = getMonth(g), U = getYear(g);
    v.value.filters.months.includes(Q) && (g = m(g, C), Q = getMonth(g), U = getYear(g)), v.value.filters.years.includes(U) && (g = T(g, C), U = getYear(g)), a(Q, U, C, e.preventMinMaxNavigation) && _(Q, U);
  }, _ = (C, c) => {
    n("update-month-year", { month: C, year: c });
  }, W = computed(() => (C) => {
    if (!e.preventMinMaxNavigation || C && !e.maxDate || !C && !e.minDate)
      return false;
    const c = set(/* @__PURE__ */ new Date(), { month: e.month, year: e.year }), g = C ? addMonths(c, 1) : subMonths(c, 1), Q = [getMonth(g), getYear(g)];
    return C ? !t(...Q) : !i(...Q);
  });
  return { handleMonthYearChange: Y, isDisabled: W, updateMonthYear: _ };
};
var xt = /* @__PURE__ */ ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(xt || {});
const hl = (e, n, a, t) => {
  const i = ref({
    top: "0",
    left: "0",
    transform: "none",
    opacity: "0"
  }), v = ref(false), m = toRef(t, "teleportCenter"), T = computed(() => v.value ? "-100%" : "0"), Y = () => {
    _(), i.value.opacity = "0";
  };
  watch(m, () => {
    F();
  }), onMounted(() => {
    _();
  });
  const _ = () => {
    const w = Ae(n);
    if (w) {
      const { top: f, left: N, width: I, height: E } = Q(w);
      i.value.top = `${f + E / 2}px`, g(N, I, 50);
    }
  }, W = (w) => {
    if (t.teleport) {
      const f = w.getBoundingClientRect();
      return {
        left: f.left + window.scrollX,
        top: f.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, C = (w, f) => {
    i.value.left = `${w + f}px`, i.value.transform = `translate(-100%, ${T.value})`;
  }, c = (w) => {
    i.value.left = `${w}px`, i.value.transform = `translate(0, ${T.value})`;
  }, g = (w, f, N) => {
    t.position === xt.left && c(w), t.position === xt.right && C(w, f), t.position === xt.center && (i.value.left = `${w + f / 2}px`, i.value.transform = N ? `translate(-50%, -${N}%)` : `translate(-50%, ${T.value})`);
  }, Q = (w) => {
    const { width: f, height: N } = w.getBoundingClientRect(), { top: I, left: E } = t.altPosition ? t.altPosition(w) : W(w);
    return { top: +I, left: +E, width: f, height: N };
  }, U = () => {
    const w = Ae(n);
    if (w) {
      const { top: f, left: N, width: I, height: E } = Q(w), D = J();
      i.value.top = `${f + E / 2}px`, g(N, I, D === "top" ? 100 : 0);
    }
  }, x = () => {
    i.value.left = "50%", i.value.top = "50%", i.value.transform = "translate(-50%, -50%)", i.value.position = "fixed", delete i.value.opacity;
  }, V = () => {
    const w = Ae(n), { top: f, left: N, transform: I } = t.altPosition(w);
    i.value = { top: `${f}px`, left: `${N}px`, transform: I || "" };
  }, F = (w = true) => {
    if (!t.inline)
      return m.value ? x() : t.altPosition !== null ? V() : (w && a("recalculate-position"), ce());
  }, ae = ({
    inputEl: w,
    menuEl: f,
    left: N,
    width: I
  }) => {
    window.screen.width > 768 && g(N, I), G(w, f);
  }, oe = (w, f) => {
    const { top: N, left: I, height: E, width: D } = Q(w);
    i.value.top = `${E + N + +t.offset}px`, v.value = false, ae({ inputEl: w, menuEl: f, left: I, width: D });
  }, B = (w, f) => {
    const { top: N, left: I, width: E } = Q(w);
    i.value.top = `${N - +t.offset}px`, v.value = true, ae({ inputEl: w, menuEl: f, left: I, width: E });
  }, G = (w, f) => {
    if (t.autoPosition) {
      const { left: N, width: I } = Q(w), { left: E, right: D } = f.getBoundingClientRect();
      return E <= 0 ? c(N) : D >= document.documentElement.clientWidth ? C(N, I) : g(N, I);
    }
  }, J = () => {
    const w = Ae(e), f = Ae(n);
    if (w && f) {
      const { height: N } = w.getBoundingClientRect(), { top: I, height: E } = f.getBoundingClientRect(), y = window.innerHeight - I - E, d = I;
      return N <= y ? "bottom" : N > y && N <= d ? "top" : y >= d ? "bottom" : "top";
    }
    return "bottom";
  }, ne = (w, f) => J() === "bottom" ? oe(w, f) : B(w, f), ce = () => {
    const w = Ae(n), f = Ae(e);
    if (w && f)
      return t.autoPosition ? ne(w, f) : oe(w, f);
  }, ye = function(w) {
    if (w) {
      const f = w.scrollHeight > w.clientHeight, I = window.getComputedStyle(w).overflowY.indexOf("hidden") !== -1;
      return f && !I;
    }
    return true;
  }, O = function(w) {
    return !w || w === document.body || w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : ye(w) ? w : O(w.parentNode);
  };
  return { openOnTop: v, menuStyle: i, resetPosition: Y, setMenuPosition: F, setInitialPosition: U, getScrollableParent: O };
}, Dt = [
  { name: "clock-icon", use: ["time", "calendar"] },
  { name: "arrow-left", use: ["month-year", "calendar"] },
  { name: "arrow-right", use: ["month-year", "calendar"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar"] },
  { name: "day", use: ["calendar"] },
  { name: "month-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay-value", use: ["calendar", "month-year"] },
  { name: "year-overlay", use: ["month-year"] },
  { name: "month-overlay", use: ["month-year"] },
  { name: "month-overlay-header", use: ["month-year"] },
  { name: "year-overlay-header", use: ["month-year"] },
  { name: "hours-overlay-value", use: ["calendar", "time"] },
  { name: "minutes-overlay-value", use: ["calendar", "time"] },
  { name: "seconds-overlay-value", use: ["calendar", "time"] },
  { name: "hours", use: ["calendar", "time"] },
  { name: "minutes", use: ["calendar", "time"] },
  { name: "month", use: ["calendar", "month-year"] },
  { name: "year", use: ["calendar", "month-year"] },
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar"] },
  { name: "marker-tooltip", use: ["calendar"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time"] },
  { name: "am-pm-button", use: ["calendar", "time"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year"] },
  { name: "time-picker", use: ["menu"] },
  { name: "action-row", use: ["action"] },
  { name: "marker", use: ["calendar"] }
], pl = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }], kl = {
  all: () => Dt,
  monthYear: () => Dt.filter((e) => e.use.includes("month-year")),
  input: () => pl,
  timePicker: () => Dt.filter((e) => e.use.includes("time")),
  action: () => Dt.filter((e) => e.use.includes("action")),
  calendar: () => Dt.filter((e) => e.use.includes("calendar")),
  menu: () => Dt.filter((e) => e.use.includes("menu"))
}, ht = (e, n, a) => {
  const t = [];
  return kl[n]().forEach((i) => {
    e[i.name] && t.push(i.name);
  }), a && a.length && a.forEach((i) => {
    i.slot && t.push(i.slot);
  }), t;
}, jt = (e) => ({ transitionName: computed(() => (a) => e && typeof e != "boolean" ? a ? e.open : e.close : ""), showTransition: !!e }), dt = {
  multiCalendars: { type: [Boolean, Number, String], default: null },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  closeOnScroll: { type: Boolean, default: false },
  autoPosition: { type: Boolean, default: true },
  closeOnAutoApply: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
  yearRange: { type: Array, default: () => [1900, 2100] },
  multiCalendarsSolo: { type: Boolean, default: false },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  showNowButton: { type: Boolean, default: false },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  modeHeight: { type: [Number, String], default: 255 },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetRanges: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: false },
  preventMinMaxNavigation: { type: Boolean, default: false },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  keepActionRow: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  multiStatic: { type: Boolean, default: true },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Array, Function],
    default: null
  },
  highlightWeekDays: {
    type: Array,
    default: null
  },
  highlightDisabledDays: { type: Boolean, default: false },
  teleport: { type: [String, Boolean], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function],
    default: null
  },
  calendarClassName: { type: String, default: null },
  noSwipe: { type: Boolean, default: false },
  monthChangeOnScroll: { type: [Boolean, String], default: true },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: false },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: false },
  modelAuto: { type: Boolean, default: false },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: Boolean, default: false },
  partialRange: { type: Boolean, default: true },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  inlineWithInput: { type: Boolean, default: false },
  textInputOptions: { type: Object, default: () => null },
  fixedStart: { type: Boolean, default: false },
  fixedEnd: { type: Boolean, default: false },
  timePicker: { type: Boolean, default: false },
  enableSeconds: { type: Boolean, default: false },
  is24: { type: Boolean, default: true },
  noHoursOverlay: { type: Boolean, default: false },
  noMinutesOverlay: { type: Boolean, default: false },
  noSecondsOverlay: { type: Boolean, default: false },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: Boolean, default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  textInput: { type: Boolean, default: false },
  onClickOutside: { type: Function, default: null },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  allowPreventDefault: { type: Boolean, default: false },
  closeOnClearValue: { type: Boolean, default: true },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: Function, default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  autoApplyMonth: { type: Boolean, default: true }
}, wl = {
  key: 1,
  class: "dp__input_wrap"
}, bl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "onKeydown"], Dl = {
  key: 2,
  class: "dp__clear_icon"
}, $l = /* @__PURE__ */ defineComponent({
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...dt
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur",
    "real-blur"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { getDefaultPattern: i, isValidDate: v, defaults: m, getDefaultStartTime: T, assignDefaultTime: Y } = xe(t), _ = ref(), W = ref(null), C = ref(false), c = ref(false), g = computed(
      () => ({
        dp__pointer: !t.disabled && !t.readonly && !t.textInput,
        dp__disabled: t.disabled,
        dp__input_readonly: !t.textInput,
        dp__input: true,
        dp__input_icon_pad: !t.hideInputIcon,
        dp__input_valid: t.state,
        dp__input_invalid: t.state === false,
        dp__input_focus: C.value || t.isMenuOpen,
        dp__input_reg: !t.textInput,
        [t.inputClassName]: !!t.inputClassName
      })
    ), Q = () => {
      a("set-input-date", null), t.autoApply && (a("set-empty-date"), _.value = null);
    }, U = (f) => {
      var I;
      const N = T();
      return $a(
        f,
        ((I = m.value.textInputOptions) == null ? void 0 : I.format) || i(),
        N || Y({}),
        t.inputValue,
        c.value
      );
    }, x = (f) => {
      const { rangeSeparator: N } = m.value.textInputOptions, [I, E] = f.split(`${N}`);
      if (I) {
        const D = U(I.trim()), y = E ? U(E.trim()) : null, d = D && y ? [D, y] : [D];
        _.value = D ? d : null;
      }
    }, V = () => {
      c.value = true;
    }, F = (f) => {
      if (t.range)
        x(f);
      else if (t.multiDates) {
        const N = f.split(";");
        _.value = N.map((I) => U(I.trim())).filter((I) => I);
      } else
        _.value = U(f);
    }, ae = (f) => {
      var I, E;
      const N = typeof f == "string" ? f : (I = f.target) == null ? void 0 : I.value;
      N !== "" ? ((E = m.value.textInputOptions) != null && E.openMenu && !t.isMenuOpen && a("open"), F(N), a("set-input-date", _.value)) : Q(), c.value = false, a("update:input-value", N);
    }, oe = (f) => {
      var N, I;
      t.textInput ? (F(f.target.value), (N = m.value.textInputOptions) != null && N.enterSubmit && v(_.value) && t.inputValue !== "" ? (a("set-input-date", _.value, true), _.value = null) : (I = m.value.textInputOptions) != null && I.enterSubmit && t.inputValue === "" && (_.value = null, a("clear"))) : J(f);
    }, B = (f) => {
      var N, I, E;
      t.textInput && ((N = m.value.textInputOptions) != null && N.tabSubmit) && F(f.target.value), (I = m.value.textInputOptions) != null && I.tabSubmit && v(_.value) && t.inputValue !== "" ? (a("set-input-date", _.value, true), _.value = null) : (E = m.value.textInputOptions) != null && E.tabSubmit && t.inputValue === "" && (_.value = null, a("clear"));
    }, G = () => {
      C.value = true, a("focus");
    }, J = (f) => {
      var N;
      f.preventDefault(), f.stopImmediatePropagation(), f.stopPropagation(), t.textInput && ((N = m.value.textInputOptions) != null && N.openMenu) && !t.inlineWithInput ? (a("toggle"), m.value.textInputOptions.enterSubmit && a("select-date")) : t.textInput || a("toggle");
    }, ne = () => {
      a("real-blur"), C.value = false, (!t.isMenuOpen || t.inline && t.inlineWithInput) && a("blur"), t.autoApply && t.textInput && _.value && !t.isMenuOpen && (a("set-input-date", _.value), a("select-date"), _.value = null);
    }, ce = () => {
      a("clear");
    }, ye = (f) => {
      if (!t.textInput) {
        if (f.code === "Tab")
          return;
        f.preventDefault();
      }
    };
    return n({
      focusInput: () => {
        var f;
        (f = W.value) == null || f.focus({ preventScroll: true });
      },
      setParsedDate: (f) => {
        _.value = f;
      }
    }), (f, N) => {
      var I;
      return openBlock(), createElementBlock("div", { onClick: J }, [
        f.$slots.trigger && !f.$slots["dp-input"] && !f.inline ? renderSlot(f.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !f.$slots.trigger && (!f.inline || f.inlineWithInput) ? (openBlock(), createElementBlock("div", wl, [
          f.$slots["dp-input"] && !f.$slots.trigger && !f.inline ? renderSlot(f.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: ae,
            onEnter: oe,
            onTab: B,
            onClear: ce,
            onBlur: ne,
            onKeypress: ye,
            onPaste: V
          }) : createCommentVNode("", true),
          f.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            ref_key: "inputRef",
            ref: W,
            id: f.uid ? `dp-input-${f.uid}` : void 0,
            name: f.name,
            class: normalizeClass(g.value),
            inputmode: f.textInput ? "text" : "none",
            placeholder: f.placeholder,
            disabled: f.disabled,
            readonly: f.readonly,
            required: f.required,
            value: e.inputValue,
            autocomplete: f.autocomplete,
            "aria-label": (I = unref(m).ariaLabels) == null ? void 0 : I.input,
            onInput: ae,
            onKeydown: [
              withKeys(oe, ["enter"]),
              withKeys(B, ["tab"]),
              ye
            ],
            onBlur: ne,
            onFocus: G,
            onKeypress: ye,
            onPaste: V
          }, null, 42, bl)),
          createElementVNode("div", {
            onClick: N[2] || (N[2] = (E) => a("toggle"))
          }, [
            f.$slots["input-icon"] && !f.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: N[0] || (N[0] = (E) => a("toggle"))
            }, [
              renderSlot(f.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !f.$slots["input-icon"] && !f.hideInputIcon && !f.$slots["dp-input"] ? (openBlock(), createBlock(unref(Kt), {
              key: 1,
              onClick: N[1] || (N[1] = (E) => a("toggle")),
              class: "dp__input_icon dp__input_icons"
            })) : createCommentVNode("", true)
          ]),
          f.$slots["clear-icon"] && e.inputValue && f.clearable && !f.disabled && !f.readonly ? (openBlock(), createElementBlock("span", Dl, [
            renderSlot(f.$slots, "clear-icon", { clear: ce })
          ])) : createCommentVNode("", true),
          f.clearable && !f.$slots["clear-icon"] && e.inputValue && !f.disabled && !f.readonly ? (openBlock(), createBlock(unref(Da), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: withModifiers(ce, ["stop", "prevent"])
          }, null, 8, ["onClick"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
}), Ml = ["title"], Al = { class: "dp__action_buttons" }, Tl = ["onKeydown", "disabled"], Sl = /* @__PURE__ */ defineComponent({
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    calendarWidth: { type: Number, default: 0 },
    ...dt
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: n }) {
    const a = e, { formatDate: t, isValidTime: i, defaults: v } = xe(a), { buildMatrix: m } = ut(), T = ref(null), Y = ref(null);
    onMounted(() => {
      a.arrowNavigation && m([Ae(T), Ae(Y)], "actionRow");
    });
    const _ = computed(() => a.range && !a.partialRange && a.internalModelValue ? a.internalModelValue.length === 2 : true), W = computed(() => !C.value || !c.value || !_.value), C = computed(() => !a.enableTimePicker || a.ignoreTimeValidation ? true : i(a.internalModelValue)), c = computed(() => a.monthPicker ? a.range && Array.isArray(a.internalModelValue) ? !a.internalModelValue.filter((G) => !ae(G)).length : ae(a.internalModelValue) : true), g = () => {
      const B = v.value.previewFormat;
      return a.timePicker || a.monthPicker, B(_e(a.internalModelValue));
    }, Q = () => {
      const B = a.internalModelValue;
      return v.value.multiCalendars > 0 ? `${U(B[0])} - ${U(B[1])}` : [U(B[0]), U(B[1])];
    }, U = (B) => t(B, v.value.previewFormat), x = computed(() => !a.internalModelValue || !a.menuMount ? "" : typeof v.value.previewFormat == "string" ? Array.isArray(a.internalModelValue) ? a.internalModelValue.length === 2 && a.internalModelValue[1] ? Q() : a.multiDates ? a.internalModelValue.map((B) => `${U(B)}`) : a.modelAuto ? `${U(a.internalModelValue[0])}` : `${U(a.internalModelValue[0])} -` : U(a.internalModelValue) : g()), V = () => a.multiDates ? "; " : " - ", F = computed(
      () => Array.isArray(x.value) ? x.value.join(V()) : x.value
    ), ae = (B) => {
      if (!a.monthPicker)
        return true;
      let G = true;
      const J = A(Pt(B));
      if (a.minDate && a.maxDate) {
        const ne = A(Pt(a.minDate)), ce = A(Pt(a.maxDate));
        return Fe(J, ne) && Ve(J, ce) || ke(J, ne) || ke(J, ce);
      }
      if (a.minDate) {
        const ne = A(Pt(a.minDate));
        G = Fe(J, ne) || ke(J, ne);
      }
      if (a.maxDate) {
        const ne = A(Pt(a.maxDate));
        G = Ve(J, ne) || ke(J, ne);
      }
      return G;
    }, oe = () => {
      C.value && c.value && _.value ? n("select-date") : n("invalid-select");
    };
    return (B, G) => (openBlock(), createElementBlock("div", {
      class: "dp__action_row",
      style: normalizeStyle(e.calendarWidth ? { width: `${e.calendarWidth}px` } : {})
    }, [
      B.$slots["action-row"] ? renderSlot(B.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: e.internalModelValue,
        disabled: W.value,
        selectDate: () => B.$emit("select-date"),
        closePicker: () => B.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(v).actionRow.showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: F.value
        }, [
          B.$slots["action-preview"] ? renderSlot(B.$slots, "action-preview", {
            key: 0,
            value: e.internalModelValue
          }) : createCommentVNode("", true),
          B.$slots["action-preview"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(F.value), 1)
          ], 64))
        ], 8, Ml)) : createCommentVNode("", true),
        createElementVNode("div", Al, [
          B.$slots["action-buttons"] ? renderSlot(B.$slots, "action-buttons", {
            key: 0,
            value: e.internalModelValue
          }) : createCommentVNode("", true),
          B.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !B.inline && unref(v).actionRow.showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: G[0] || (G[0] = (J) => B.$emit("close-picker")),
              onKeydown: [
                G[1] || (G[1] = withKeys((J) => B.$emit("close-picker"), ["enter"])),
                G[2] || (G[2] = withKeys((J) => B.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(B.cancelText), 545)) : createCommentVNode("", true),
            B.showNowButton || unref(v).actionRow.showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              ref_key: "cancelButtonRef",
              ref: T,
              class: "dp__action_button dp__action_cancel",
              onClick: G[3] || (G[3] = (J) => B.$emit("select-now")),
              onKeydown: [
                G[4] || (G[4] = withKeys((J) => B.$emit("select-now"), ["enter"])),
                G[5] || (G[5] = withKeys((J) => B.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(B.nowButtonLabel), 545)) : createCommentVNode("", true),
            unref(v).actionRow.showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "dp__action_button dp__action_select",
              onKeydown: [
                withKeys(oe, ["enter"]),
                withKeys(oe, ["space"])
              ],
              onClick: oe,
              disabled: W.value,
              ref_key: "selectButtonRef",
              ref: Y
            }, toDisplayString(B.selectText), 41, Tl)) : createCommentVNode("", true)
          ], 64))
        ])
      ], 64))
    ], 4));
  }
}), Pl = ["aria-label"], _l = {
  class: "dp__calendar_header",
  role: "row"
}, Cl = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
}, Nl = /* @__PURE__ */ createElementVNode("div", { class: "dp__calendar_header_separator" }, null, -1), Rl = ["aria-label"], Il = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
}, Ol = { class: "dp__cell_inner" }, Bl = ["aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave"], Yl = /* @__PURE__ */ defineComponent({
  __name: "Calendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    getWeekNum: {
      type: Function,
      default: () => ""
    },
    specificMode: { type: Boolean, default: false },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...dt
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMultiLevelMatrix: i } = ut(), { setDateMonthOrYear: v, defaults: m } = xe(t), T = ref(null), Y = ref({
      bottom: "",
      left: "",
      transform: ""
    }), _ = ref([]), W = ref(null), C = ref(true), c = ref(""), g = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), Q = ref([]), U = ref({ left: "50%" }), x = computed(() => t.calendar ? t.calendar(t.mappedDates) : t.mappedDates), V = computed(() => t.dayNames ? Array.isArray(t.dayNames) ? t.dayNames : t.dayNames(t.locale, +t.weekStart) : el(t.formatLocale, t.locale, +t.weekStart));
    onMounted(() => {
      a("mount", { cmp: "calendar", refs: _ }), t.noSwipe || W.value && (W.value.addEventListener("touchstart", w, { passive: false }), W.value.addEventListener("touchend", f, { passive: false }), W.value.addEventListener("touchmove", N, { passive: false })), t.monthChangeOnScroll && W.value && W.value.addEventListener("wheel", D, { passive: false });
    });
    const F = (y) => y ? t.vertical ? "vNext" : "next" : t.vertical ? "vPrevious" : "previous", ae = (y, d) => {
      if (t.transitions) {
        const u = je(v(A(), t.month, t.year));
        c.value = Fe(je(v(A(), y, d)), u) ? m.value.transitions[F(true)] : m.value.transitions[F(false)], C.value = false, nextTick(() => {
          C.value = true;
        });
      }
    }, oe = computed(
      () => ({
        [t.calendarClassName]: !!t.calendarClassName
      })
    ), B = computed(() => (y) => {
      const d = ll(y);
      return {
        dp__marker_dot: d.type === "dot",
        dp__marker_line: d.type === "line"
      };
    }), G = computed(() => (y) => ke(y, T.value)), J = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: m.value.multiCalendars > 0 && t.instance !== 0
    })), ne = computed(() => (y) => t.hideOffsetDates ? y.current : true), ce = computed(() => t.specificMode ? { height: `${t.modeHeight}px` } : void 0), ye = async (y, d, u) => {
      var S, b;
      if (a("set-hover-date", y), (b = (S = y.marker) == null ? void 0 : S.tooltip) != null && b.length) {
        const Z = Ae(_.value[d][u]);
        if (Z) {
          const { width: r, height: o } = Z.getBoundingClientRect();
          T.value = y.value;
          let l = { left: `${r / 2}px` }, M = -50;
          if (await nextTick(), Q.value[0]) {
            const { left: re, width: se } = Q.value[0].getBoundingClientRect();
            re < 0 && (l = { left: "0" }, M = 0, U.value.left = `${r / 2}px`), window.innerWidth < re + se && (l = { right: "0" }, M = 0, U.value.left = `${se - r / 2}px`);
          }
          Y.value = {
            bottom: `${o}px`,
            ...l,
            transform: `translateX(${M}%)`
          }, a("tooltip-open", y.marker);
        }
      }
    }, O = (y) => {
      T.value && (T.value = null, Y.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), a("tooltip-close", y.marker));
    }, w = (y) => {
      g.value.startX = y.changedTouches[0].screenX, g.value.startY = y.changedTouches[0].screenY;
    }, f = (y) => {
      g.value.endX = y.changedTouches[0].screenX, g.value.endY = y.changedTouches[0].screenY, I();
    }, N = (y) => {
      t.vertical && !t.inline && y.preventDefault();
    }, I = () => {
      const y = t.vertical ? "Y" : "X";
      Math.abs(g.value[`start${y}`] - g.value[`end${y}`]) > 10 && a("handle-swipe", g.value[`start${y}`] > g.value[`end${y}`] ? "right" : "left");
    }, E = (y, d, u) => {
      y && (Array.isArray(_.value[d]) ? _.value[d][u] = y : _.value[d] = [y]), t.arrowNavigation && i(_.value, "calendar");
    }, D = (y) => {
      t.monthChangeOnScroll && (y.preventDefault(), a("handle-scroll", y));
    };
    return n({ triggerTransition: ae }), (y, d) => {
      var u;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(J.value)
      }, [
        createElementVNode("div", {
          style: normalizeStyle(ce.value),
          ref_key: "calendarWrapRef",
          ref: W,
          role: "grid",
          class: normalizeClass(oe.value),
          "aria-label": (u = unref(m).ariaLabels) == null ? void 0 : u.calendarWrap
        }, [
          e.specificMode ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createElementVNode("div", _l, [
              y.weekNumbers ? (openBlock(), createElementBlock("div", Cl, toDisplayString(y.weekNumName), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(V.value, (S, b) => (openBlock(), createElementBlock("div", {
                class: "dp__calendar_header_item",
                role: "gridcell",
                key: b
              }, [
                y.$slots["calendar-header"] ? renderSlot(y.$slots, "calendar-header", {
                  key: 0,
                  day: S,
                  index: b
                }) : createCommentVNode("", true),
                y.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(S), 1)
                ], 64))
              ]))), 128))
            ]),
            Nl,
            createVNode(Transition, {
              name: c.value,
              css: !!y.transitions
            }, {
              default: withCtx(() => {
                var S;
                return [
                  C.value ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: "dp__calendar",
                    role: "grid",
                    "aria-label": (S = unref(m).ariaLabels) == null ? void 0 : S.calendarDays
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(x.value, (b, Z) => (openBlock(), createElementBlock("div", {
                      class: "dp__calendar_row",
                      role: "row",
                      key: Z
                    }, [
                      y.weekNumbers ? (openBlock(), createElementBlock("div", Il, [
                        createElementVNode("div", Ol, toDisplayString(e.getWeekNum(b.days)), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(b.days, (r, o) => {
                        var l, M, re;
                        return openBlock(), createElementBlock("div", {
                          role: "gridcell",
                          class: "dp__calendar_item",
                          ref_for: true,
                          ref: (se) => E(se, Z, o),
                          key: o + Z,
                          "aria-selected": r.classData.dp__active_date || r.classData.dp__range_start || r.classData.dp__range_start,
                          "aria-disabled": r.classData.dp__cell_disabled,
                          "aria-label": (M = (l = unref(m).ariaLabels) == null ? void 0 : l.day) == null ? void 0 : M.call(l, r),
                          tabindex: "0",
                          onClick: withModifiers((se) => y.$emit("select-date", r), ["stop", "prevent"]),
                          onKeydown: [
                            withKeys((se) => y.$emit("select-date", r), ["enter"]),
                            withKeys((se) => y.$emit("handle-space", r), ["space"])
                          ],
                          onMouseenter: (se) => ye(r, Z, o),
                          onMouseleave: (se) => O(r)
                        }, [
                          createElementVNode("div", {
                            class: normalizeClass(["dp__cell_inner", r.classData])
                          }, [
                            y.$slots.day && ne.value(r) ? renderSlot(y.$slots, "day", {
                              key: 0,
                              day: +r.text,
                              date: r.value
                            }) : createCommentVNode("", true),
                            y.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(r.text), 1)
                            ], 64)),
                            r.marker && ne.value(r) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                              y.$slots.marker ? renderSlot(y.$slots, "marker", {
                                key: 0,
                                marker: r.marker,
                                day: +r.text,
                                date: r.value
                              }) : (openBlock(), createElementBlock("div", {
                                key: 1,
                                class: normalizeClass(B.value(r.marker)),
                                style: normalizeStyle(r.marker.color ? { backgroundColor: r.marker.color } : {})
                              }, null, 6))
                            ], 64)) : createCommentVNode("", true),
                            G.value(r.value) ? (openBlock(), createElementBlock("div", {
                              key: 3,
                              class: "dp__marker_tooltip",
                              ref_for: true,
                              ref_key: "activeTooltip",
                              ref: Q,
                              style: normalizeStyle(Y.value)
                            }, [
                              (re = r.marker) != null && re.tooltip ? (openBlock(), createElementBlock("div", {
                                key: 0,
                                class: "dp__tooltip_content",
                                onClick: d[0] || (d[0] = withModifiers(() => {
                                }, ["stop"]))
                              }, [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(r.marker.tooltip, (se, Pe) => (openBlock(), createElementBlock("div", {
                                  key: Pe,
                                  class: "dp__tooltip_text"
                                }, [
                                  y.$slots["marker-tooltip"] ? renderSlot(y.$slots, "marker-tooltip", {
                                    key: 0,
                                    tooltip: se,
                                    day: r.value
                                  }) : createCommentVNode("", true),
                                  y.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                    createElementVNode("div", {
                                      class: "dp__tooltip_mark",
                                      style: normalizeStyle(se.color ? { backgroundColor: se.color } : {})
                                    }, null, 4),
                                    createElementVNode("div", null, toDisplayString(se.text), 1)
                                  ], 64))
                                ]))), 128)),
                                createElementVNode("div", {
                                  class: "dp__arrow_bottom_tp",
                                  style: normalizeStyle(U.value)
                                }, null, 4)
                              ])) : createCommentVNode("", true)
                            ], 4)) : createCommentVNode("", true)
                          ], 2)
                        ], 40, Bl);
                      }), 128))
                    ]))), 128))
                  ], 8, Rl)) : createCommentVNode("", true)
                ];
              }),
              _: 3
            }, 8, ["name", "css"])
          ], 64))
        ], 14, Pl)
      ], 2);
    };
  }
}), Vl = ["aria-label", "aria-disabled"], un = /* @__PURE__ */ defineComponent({
  __name: "ActionIcon",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: n }) {
    const a = ref(null);
    return onMounted(() => n("set-ref", a)), (t, i) => (openBlock(), createElementBlock("button", {
      type: "button",
      class: "dp__btn dp__month_year_col_nav",
      onClick: i[0] || (i[0] = (v) => t.$emit("activate")),
      onKeydown: [
        i[1] || (i[1] = withKeys(withModifiers((v) => t.$emit("activate"), ["prevent"]), ["enter"])),
        i[2] || (i[2] = withKeys(withModifiers((v) => t.$emit("activate"), ["prevent"]), ["space"]))
      ],
      tabindex: "0",
      "aria-label": t.ariaLabel,
      "aria-disabled": t.disabled,
      ref_key: "elRef",
      ref: a
    }, [
      createElementVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: t.disabled }])
      }, [
        renderSlot(t.$slots, "default")
      ], 2)
    ], 40, Vl));
  }
}), El = ["onKeydown"], Ll = { class: "dp__selection_grid_header" }, Fl = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"], Ul = ["aria-label", "onKeydown"], Rt = /* @__PURE__ */ defineComponent({
  __name: "SelectionGrid",
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: null },
    multiModelValue: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: [Number, String], default: null },
    maxValue: { type: [Number, String], default: null },
    year: { type: Number, default: 0 },
    skipActive: { type: Boolean, default: false },
    headerRefs: { type: Array, default: () => [] },
    skipButtonRef: { type: Boolean, default: false },
    monthPicker: { type: Boolean, default: false },
    yearPicker: { type: Boolean, default: false },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    autoApplyMonth: { type: Boolean, default: false }
  },
  emits: ["update:model-value", "selected", "toggle", "reset-flow"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setSelectionGrid: i, buildMultiLevelMatrix: v, setMonthPicker: m } = ut(), { hideNavigationButtons: T } = xe(t), Y = ref(false), _ = ref(null), W = ref(null), C = ref([]), c = ref(), g = ref(null), Q = ref(0), U = ref(null);
    onBeforeUpdate(() => {
      _.value = null;
    }), onMounted(() => {
      var D;
      nextTick().then(() => ce()), V(), x(true), (D = _.value) == null || D.focus({ preventScroll: true });
    }), onUnmounted(() => x(false));
    const x = (D) => {
      var y;
      t.arrowNavigation && ((y = t.headerRefs) != null && y.length ? m(D) : i(D));
    }, V = () => {
      const D = Ae(W);
      D && (t.textInput || D.focus({ preventScroll: true }), Y.value = D.clientHeight < D.scrollHeight);
    }, F = computed(
      () => ({
        dp__overlay: true
      })
    ), ae = computed(() => ({
      dp__overlay_col: true
    })), oe = (D) => t.monthPicker && !t.autoApplyMonth ? ke(
      t.internalModelValue,
      setYear(setMonth(/* @__PURE__ */ new Date(), D.value), t.year)
    ) : t.skipActive ? false : D.value === t.modelValue, B = computed(() => t.items.map((D) => D.filter((y) => y).map((y) => {
      var S, b, Z;
      const d = t.disabledValues.some((r) => r === y.value) || ne(y.value), u = (S = t.multiModelValue) != null && S.length ? (b = t.multiModelValue) == null ? void 0 : b.some(
        (r) => ke(
          r,
          setYear(
            t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), y.value) : /* @__PURE__ */ new Date(),
            t.monthPicker ? t.year : y.value
          )
        )
      ) : oe(y);
      return {
        ...y,
        className: {
          dp__overlay_cell_active: u,
          dp__overlay_cell: !u,
          dp__overlay_cell_disabled: d,
          dp__overlay_cell_active_disabled: d && u,
          dp__overlay_cell_pad: true,
          dp__cell_in_between: (Z = t.multiModelValue) != null && Z.length && t.skipActive ? O(y.value) : false
        }
      };
    }))), G = computed(
      () => ({
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: Y.value,
        dp__button_bottom: t.autoApply
      })
    ), J = computed(() => {
      var D, y;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((D = t.items) == null ? void 0 : D.length) <= 6,
        dp__container_block: ((y = t.items) == null ? void 0 : y.length) > 6
      };
    }), ne = (D) => {
      const y = t.maxValue || t.maxValue === 0, d = t.minValue || t.minValue === 0;
      return !y && !d ? false : y && d ? +D > +t.maxValue || +D < +t.minValue : y ? +D > +t.maxValue : d ? +D < +t.minValue : false;
    }, ce = () => {
      const D = Ae(_), y = Ae(W), d = Ae(g), u = Ae(U), S = d ? d.getBoundingClientRect().height : 0;
      y && (Q.value = y.getBoundingClientRect().height - S), D && u && (u.scrollTop = D.offsetTop - u.offsetTop - (Q.value / 2 - D.getBoundingClientRect().height) - S);
    }, ye = (D) => {
      !t.disabledValues.some((y) => y === D) && !ne(D) && (a("update:model-value", D), a("selected"));
    }, O = (D) => {
      const y = t.monthPicker ? t.year : D;
      return ea(
        t.multiModelValue,
        setYear(
          t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), c.value || 0) : /* @__PURE__ */ new Date(),
          t.monthPicker ? y : c.value || y
        ),
        setYear(t.monthPicker ? setMonth(/* @__PURE__ */ new Date(), D) : /* @__PURE__ */ new Date(), y)
      );
    }, w = () => {
      a("toggle"), a("reset-flow");
    }, f = () => {
      t.escClose && w();
    }, N = (D, y, d, u) => {
      D && (y.value === +t.modelValue && !t.disabledValues.includes(y.value) && (_.value = D), t.arrowNavigation && (Array.isArray(C.value[d]) ? C.value[d][u] = D : C.value[d] = [D], I()));
    }, I = () => {
      var y, d;
      const D = (y = t.headerRefs) != null && y.length ? [t.headerRefs].concat(C.value) : C.value.concat([t.skipButtonRef ? [] : [g.value]]);
      v(_e(D), (d = t.headerRefs) != null && d.length ? "monthPicker" : "selectionGrid");
    }, E = (D) => {
      t.arrowNavigation || D.stopImmediatePropagation();
    };
    return n({ focusGrid: V }), (D, y) => {
      var d;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: W,
        class: normalizeClass(F.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(f, ["esc"]),
          y[0] || (y[0] = withKeys((u) => E(u), ["left"])),
          y[1] || (y[1] = withKeys((u) => E(u), ["up"])),
          y[2] || (y[2] = withKeys((u) => E(u), ["down"])),
          y[3] || (y[3] = withKeys((u) => E(u), ["right"]))
        ]
      }, [
        createElementVNode("div", {
          class: normalizeClass(J.value),
          ref_key: "containerRef",
          ref: U,
          role: "grid",
          style: normalizeStyle({ height: `${Q.value}px` })
        }, [
          createElementVNode("div", Ll, [
            renderSlot(D.$slots, "header")
          ]),
          D.$slots.overlay ? renderSlot(D.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(B.value, (u, S) => (openBlock(), createElementBlock("div", {
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: B.value.length >= 3 }]),
            key: S,
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(u, (b, Z) => (openBlock(), createElementBlock("div", {
              role: "gridcell",
              class: normalizeClass(ae.value),
              key: b.value,
              "aria-selected": b.value === e.modelValue && !e.disabledValues.includes(b.value),
              "aria-disabled": b.className.dp__overlay_cell_disabled,
              ref_for: true,
              ref: (r) => N(r, b, S, Z),
              tabindex: "0",
              onClick: (r) => ye(b.value),
              onKeydown: [
                withKeys((r) => ye(b.value), ["enter"]),
                withKeys((r) => ye(b.value), ["space"])
              ],
              onMouseover: (r) => c.value = b.value
            }, [
              createElementVNode("div", {
                class: normalizeClass(b.className)
              }, [
                D.$slots.item ? renderSlot(D.$slots, "item", {
                  key: 0,
                  item: b
                }) : createCommentVNode("", true),
                D.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(b.text), 1)
                ], 64))
              ], 2)
            ], 42, Fl))), 128))
          ], 2))), 128))
        ], 6),
        D.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          role: "button",
          "aria-label": (d = e.ariaLabels) == null ? void 0 : d.toggleOverlay,
          class: normalizeClass(G.value),
          tabindex: "0",
          ref_key: "toggleButton",
          ref: g,
          onClick: w,
          onKeydown: [
            withKeys(w, ["enter"]),
            withKeys(w, ["tab"])
          ]
        }, [
          renderSlot(D.$slots, "button-icon")
        ], 42, Ul)), [
          [vShow, !unref(T)(e.type)]
        ]) : createCommentVNode("", true)
      ], 42, El);
    };
  }
}), Wl = ["aria-label"], zn = /* @__PURE__ */ defineComponent({
  __name: "RegularPicker",
  props: {
    ariaLabel: { type: String, default: "" },
    showSelectionGrid: { type: Boolean, default: false },
    modelValue: { type: Number, default: null },
    items: { type: Array, default: () => [] },
    disabledValues: { type: Array, default: () => [] },
    minValue: { type: Number, default: null },
    maxValue: { type: Number, default: null },
    slotName: { type: String, default: "" },
    overlaySlot: { type: String, default: "" },
    headerRefs: { type: Array, default: () => [] },
    escClose: { type: Boolean, default: true },
    type: { type: String, default: null },
    transitions: { type: [Object, Boolean], default: false },
    arrowNavigation: { type: Boolean, default: false },
    autoApply: { type: Boolean, default: false },
    textInput: { type: Boolean, default: false },
    ariaLabels: { type: Object, default: () => ({}) },
    hideNavigation: { type: Array, default: () => [] }
  },
  emits: ["update:model-value", "toggle", "set-ref"],
  setup(e, { emit: n }) {
    const a = e, { transitionName: t, showTransition: i } = jt(a.transitions), v = ref(null);
    return onMounted(() => n("set-ref", v)), (m, T) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("button", {
        type: "button",
        class: "dp__btn dp__month_year_select",
        onClick: T[0] || (T[0] = (Y) => m.$emit("toggle")),
        onKeydown: [
          T[1] || (T[1] = withKeys(withModifiers((Y) => m.$emit("toggle"), ["prevent"]), ["enter"])),
          T[2] || (T[2] = withKeys(withModifiers((Y) => m.$emit("toggle"), ["prevent"]), ["space"]))
        ],
        "aria-label": e.ariaLabel,
        tabindex: "0",
        ref_key: "elRef",
        ref: v
      }, [
        renderSlot(m.$slots, "default")
      ], 40, Wl),
      createVNode(Transition, {
        name: unref(t)(e.showSelectionGrid),
        css: unref(i)
      }, {
        default: withCtx(() => [
          e.showSelectionGrid ? (openBlock(), createBlock(Rt, mergeProps({ key: 0 }, {
            modelValue: e.modelValue,
            items: e.items,
            disabledValues: e.disabledValues,
            minValue: e.minValue,
            maxValue: e.maxValue,
            escClose: e.escClose,
            type: e.type,
            arrowNavigation: e.arrowNavigation,
            textInput: e.textInput,
            autoApply: e.autoApply,
            ariaLabels: e.ariaLabels,
            hideNavigation: e.hideNavigation
          }, {
            "header-refs": [],
            "onUpdate:modelValue": T[3] || (T[3] = (Y) => m.$emit("update:model-value", Y)),
            onToggle: T[4] || (T[4] = (Y) => m.$emit("toggle"))
          }), createSlots({
            "button-icon": withCtx(() => [
              m.$slots["calendar-icon"] ? renderSlot(m.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
              m.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Kt), { key: 1 }))
            ]),
            _: 2
          }, [
            m.$slots[e.slotName] ? {
              name: "item",
              fn: withCtx(({ item: Y }) => [
                renderSlot(m.$slots, e.slotName, { item: Y })
              ]),
              key: "0"
            } : void 0,
            m.$slots[e.overlaySlot] ? {
              name: "overlay",
              fn: withCtx(() => [
                renderSlot(m.$slots, e.overlaySlot)
              ]),
              key: "1"
            } : void 0,
            m.$slots[`${e.overlaySlot}-header`] ? {
              name: "header",
              fn: withCtx(() => [
                renderSlot(m.$slots, `${e.overlaySlot}-header`)
              ]),
              key: "2"
            } : void 0
          ]), 1040)) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["name", "css"])
    ], 64));
  }
}), Hl = { class: "dp__month_year_row" }, xl = { class: "dp__month_picker_header" }, zl = ["aria-label"], Kl = ["aria-label"], jl = ["aria-label"], Gl = /* @__PURE__ */ defineComponent({
  __name: "MonthYearPicker",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    internalModelValue: { type: [Date, Array], default: null },
    ...dt
  },
  emits: ["update-month-year", "month-year-select", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: n, emit: a }) {
    const t = e, { defaults: i } = xe(t), { transitionName: v, showTransition: m } = jt(i.value.transitions), { buildMatrix: T } = ut(), { handleMonthYearChange: Y, isDisabled: _, updateMonthYear: W } = gl(t, a), C = ref(false), c = ref(false), g = ref([null, null, null, null]), Q = ref(null), U = ref(null), x = ref(null);
    onMounted(() => {
      a("mount");
    });
    const V = (o) => ({
      get: () => t[o],
      set: (l) => {
        const M = o === "month" ? "year" : "month";
        a("update-month-year", { [o]: l, [M]: t[M] }), a("month-year-select", o === "year"), o === "month" ? u(true) : S(true);
      }
    }), F = computed(V("month")), ae = computed(V("year")), oe = (o) => {
      const l = getYear(A(o));
      return t.year === l;
    }, B = computed(() => t.monthPicker ? Array.isArray(t.disabledDates) ? t.disabledDates.map((o) => A(o)).filter((o) => oe(o)).map((o) => getMonth(o)) : [] : []), G = computed(() => (o) => {
      const l = o === "month";
      return {
        showSelectionGrid: (l ? C : c).value,
        items: (l ? I : E).value,
        disabledValues: i.value.filters[l ? "months" : "years"].concat(B.value),
        minValue: (l ? ye : ne).value,
        maxValue: (l ? O : ce).value,
        headerRefs: l && t.monthPicker ? [Q.value, U.value, x.value] : [],
        escClose: t.escClose,
        transitions: i.value.transitions,
        ariaLabels: i.value.ariaLabels,
        textInput: t.textInput,
        autoApply: t.autoApply,
        arrowNavigation: t.arrowNavigation,
        hideNavigation: t.hideNavigation
      };
    }), J = computed(() => (o) => ({
      month: t.month,
      year: t.year,
      items: o === "month" ? t.months : t.years,
      instance: t.instance,
      updateMonthYear: W,
      toggle: o === "month" ? u : S
    })), ne = computed(() => t.minDate ? getYear(A(t.minDate)) : null), ce = computed(() => t.maxDate ? getYear(A(t.maxDate)) : null), ye = computed(() => {
      if (t.minDate && ne.value) {
        if (ne.value > t.year)
          return 12;
        if (ne.value === t.year)
          return getMonth(A(t.minDate));
      }
      return null;
    }), O = computed(() => t.maxDate && ce.value ? ce.value < t.year ? -1 : ce.value === t.year ? getMonth(A(t.maxDate)) : null : null), w = computed(() => (t.range || t.multiDates) && t.internalModelValue && (t.monthPicker || t.yearPicker) ? t.internalModelValue : []), f = (o) => {
      const l = [], M = (re) => re;
      for (let re = 0; re < o.length; re += 3) {
        const se = [o[re], o[re + 1], o[re + 2]];
        l.push(M(se));
      }
      return l;
    }, N = computed(() => {
      const o = t.months.find((l) => l.value === t.month);
      return o || { text: "", value: 0 };
    }), I = computed(() => f(t.months)), E = computed(() => f(t.years)), D = computed(() => i.value.multiCalendars ? t.multiCalendarsSolo ? true : t.instance === 0 : true), y = computed(() => i.value.multiCalendars ? t.multiCalendarsSolo ? true : t.instance === i.value.multiCalendars - 1 : true), d = (o, l) => {
      l !== void 0 ? o.value = l : o.value = !o.value;
    }, u = (o = false, l) => {
      b(o), d(C, l), C.value || a("overlay-closed");
    }, S = (o = false, l) => {
      b(o), d(c, l), c.value || a("overlay-closed");
    }, b = (o) => {
      o || a("reset-flow");
    }, Z = (o = false) => {
      _.value(o) || a("update-month-year", {
        year: o ? t.year + 1 : t.year - 1,
        month: t.month,
        fromNav: true
      });
    }, r = (o, l) => {
      t.arrowNavigation && (g.value[l] = Ae(o), T(g.value, "monthYear"));
    };
    return n({
      toggleMonthPicker: u,
      toggleYearPicker: S,
      handleMonthYearChange: Y
    }), (o, l) => {
      var M, re, se, Pe, Se;
      return openBlock(), createElementBlock("div", Hl, [
        o.$slots["month-year"] ? renderSlot(o.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(W), handleMonthYearChange: unref(Y), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          !o.monthPicker && !o.yearPicker ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            D.value && !o.vertical ? (openBlock(), createBlock(un, {
              key: 0,
              "aria-label": (M = unref(i).ariaLabels) == null ? void 0 : M.prevMonth,
              disabled: unref(_)(false),
              onActivate: l[0] || (l[0] = (ee) => unref(Y)(false)),
              onSetRef: l[1] || (l[1] = (ee) => r(ee, 0))
            }, {
              default: withCtx(() => [
                o.$slots["arrow-left"] ? renderSlot(o.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                o.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Pn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["dp__month_year_wrap", {
                dp__year_disable_select: t.disableYearSelect
              }])
            }, [
              createVNode(zn, mergeProps({
                type: "month",
                "slot-name": "month-overlay-val",
                "overlay-slot": "overlay-month",
                "aria-label": (re = unref(i).ariaLabels) == null ? void 0 : re.openMonthsOverlay,
                modelValue: F.value,
                "onUpdate:modelValue": l[2] || (l[2] = (ee) => F.value = ee)
              }, G.value("month"), {
                onToggle: u,
                onSetRef: l[3] || (l[3] = (ee) => r(ee, 1))
              }), createSlots({
                default: withCtx(() => [
                  o.$slots.month ? renderSlot(o.$slots, "month", normalizeProps(mergeProps({ key: 0 }, N.value))) : createCommentVNode("", true),
                  o.$slots.month ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(N.value.text), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                o.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                o.$slots["month-overlay-value"] ? {
                  name: "month-overlay-val",
                  fn: withCtx(({ item: ee }) => [
                    renderSlot(o.$slots, "month-overlay-value", {
                      text: ee.text,
                      value: ee.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                o.$slots["month-overlay"] ? {
                  name: "overlay-month",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, "month-overlay", normalizeProps(guardReactiveProps(J.value("month"))))
                  ]),
                  key: "2"
                } : void 0,
                o.$slots["month-overlay-header"] ? {
                  name: "overlay-month-header",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, "month-overlay-header", { toggle: u })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]),
              t.disableYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(zn, mergeProps({
                key: 0,
                type: "year",
                "slot-name": "year-overlay-val",
                "overlay-slot": "overlay-year",
                "aria-label": (se = unref(i).ariaLabels) == null ? void 0 : se.openYearsOverlay,
                modelValue: ae.value,
                "onUpdate:modelValue": l[4] || (l[4] = (ee) => ae.value = ee)
              }, G.value("year"), {
                onToggle: S,
                onSetRef: l[5] || (l[5] = (ee) => r(ee, 2))
              }), createSlots({
                default: withCtx(() => [
                  o.$slots.year ? renderSlot(o.$slots, "year", {
                    key: 0,
                    year: e.year
                  }) : createCommentVNode("", true),
                  o.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(e.year), 1)
                  ], 64))
                ]),
                _: 2
              }, [
                o.$slots["calendar-icon"] ? {
                  name: "calendar-icon",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, "calendar-icon")
                  ]),
                  key: "0"
                } : void 0,
                o.$slots["year-overlay-value"] ? {
                  name: "year-overlay-val",
                  fn: withCtx(({ item: ee }) => [
                    renderSlot(o.$slots, "year-overlay-value", {
                      text: ee.text,
                      value: ee.value
                    })
                  ]),
                  key: "1"
                } : void 0,
                o.$slots["year-overlay"] ? {
                  name: "overlay-year",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, "year-overlay", normalizeProps(guardReactiveProps(J.value("year"))))
                  ]),
                  key: "2"
                } : void 0,
                o.$slots["year-overlay-header"] ? {
                  name: "overlay-year-header",
                  fn: withCtx(() => [
                    renderSlot(o.$slots, "year-overlay-header", { toggle: S })
                  ]),
                  key: "3"
                } : void 0
              ]), 1040, ["aria-label", "modelValue"]))
            ], 2),
            D.value && o.vertical ? (openBlock(), createBlock(un, {
              key: 1,
              "aria-label": (Pe = unref(i).ariaLabels) == null ? void 0 : Pe.prevMonth,
              disabled: unref(_)(false),
              onActivate: l[6] || (l[6] = (ee) => unref(Y)(false))
            }, {
              default: withCtx(() => [
                o.$slots["arrow-up"] ? renderSlot(o.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                o.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Jn), { key: 1 }))
              ]),
              _: 3
            }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
            y.value ? (openBlock(), createBlock(un, {
              key: 2,
              ref: "rightIcon",
              disabled: unref(_)(true),
              "aria-label": (Se = unref(i).ariaLabels) == null ? void 0 : Se.nextMonth,
              onActivate: l[7] || (l[7] = (ee) => unref(Y)(true)),
              onSetRef: l[8] || (l[8] = (ee) => r(ee, 3))
            }, {
              default: withCtx(() => [
                o.$slots[o.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(o.$slots, o.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
                o.$slots[o.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(o.vertical ? unref(Qn) : unref(_n)), { key: 1 }))
              ]),
              _: 3
            }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true),
          o.monthPicker ? (openBlock(), createBlock(Rt, mergeProps({ key: 1 }, G.value("month"), {
            "skip-active": o.range,
            "internal-model-value": e.internalModelValue,
            year: e.year,
            "auto-apply-month": o.autoApplyMonth,
            "multi-model-value": w.value,
            "month-picker": "",
            modelValue: F.value,
            "onUpdate:modelValue": l[17] || (l[17] = (ee) => F.value = ee),
            onToggle: u,
            onSelected: l[18] || (l[18] = (ee) => o.$emit("overlay-closed"))
          }), createSlots({
            header: withCtx(() => {
              var ee, Ue, Ie;
              return [
                createElementVNode("div", xl, [
                  createElementVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpPrevIconRef",
                    ref: Q,
                    onClick: l[9] || (l[9] = (Te) => Z(false)),
                    onKeydown: l[10] || (l[10] = withKeys((Te) => Z(false), ["enter"]))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(_)(false) }]),
                      role: "button",
                      "aria-label": (ee = unref(i).ariaLabels) == null ? void 0 : ee.prevMonth
                    }, [
                      o.$slots["arrow-left"] ? renderSlot(o.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
                      o.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Pn), { key: 1 }))
                    ], 10, zl)
                  ], 544),
                  createElementVNode("div", {
                    class: "dp__pointer",
                    role: "button",
                    ref_key: "mpYearButtonRef",
                    ref: U,
                    "aria-label": (Ue = unref(i).ariaLabels) == null ? void 0 : Ue.openYearsOverlay,
                    tabindex: "0",
                    onClick: l[11] || (l[11] = () => S(false)),
                    onKeydown: l[12] || (l[12] = withKeys(() => S(false), ["enter"]))
                  }, [
                    o.$slots.year ? renderSlot(o.$slots, "year", {
                      key: 0,
                      year: e.year
                    }) : createCommentVNode("", true),
                    o.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(e.year), 1)
                    ], 64))
                  ], 40, Kl),
                  createElementVNode("div", {
                    class: "dp__month_year_col_nav",
                    tabindex: "0",
                    ref_key: "mpNextIconRef",
                    ref: x,
                    onClick: l[13] || (l[13] = (Te) => Z(true)),
                    onKeydown: l[14] || (l[14] = withKeys((Te) => Z(true), ["enter"]))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: unref(_)(true) }]),
                      role: "button",
                      "aria-label": (Ie = unref(i).ariaLabels) == null ? void 0 : Ie.nextMonth
                    }, [
                      o.$slots["arrow-right"] ? renderSlot(o.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
                      o.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(_n), { key: 1 }))
                    ], 10, jl)
                  ], 544)
                ]),
                createVNode(Transition, {
                  name: unref(v)(c.value),
                  css: unref(m)
                }, {
                  default: withCtx(() => [
                    c.value ? (openBlock(), createBlock(Rt, mergeProps({ key: 0 }, G.value("year"), {
                      modelValue: ae.value,
                      "onUpdate:modelValue": l[15] || (l[15] = (Te) => ae.value = Te),
                      onToggle: S,
                      onSelected: l[16] || (l[16] = (Te) => o.$emit("overlay-closed"))
                    }), createSlots({
                      "button-icon": withCtx(() => [
                        o.$slots["calendar-icon"] ? renderSlot(o.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                        o.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Kt), { key: 1 }))
                      ]),
                      _: 2
                    }, [
                      o.$slots["year-overlay-value"] ? {
                        name: "item",
                        fn: withCtx(({ item: Te }) => [
                          renderSlot(o.$slots, "year-overlay-value", {
                            text: Te.text,
                            value: Te.value
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040, ["modelValue"])) : createCommentVNode("", true)
                  ]),
                  _: 3
                }, 8, ["name", "css"])
              ];
            }),
            _: 2
          }, [
            o.$slots["month-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: ee }) => [
                renderSlot(o.$slots, "month-overlay-value", {
                  text: ee.text,
                  value: ee.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["skip-active", "internal-model-value", "year", "auto-apply-month", "multi-model-value", "modelValue"])) : createCommentVNode("", true),
          o.yearPicker ? (openBlock(), createBlock(Rt, mergeProps({ key: 2 }, G.value("year"), {
            modelValue: ae.value,
            "onUpdate:modelValue": l[19] || (l[19] = (ee) => ae.value = ee),
            "multi-model-value": w.value,
            "skip-active": o.range,
            "skip-button-ref": "",
            "year-picker": "",
            onToggle: S,
            onSelected: l[20] || (l[20] = (ee) => o.$emit("overlay-closed"))
          }), createSlots({ _: 2 }, [
            o.$slots["year-overlay-value"] ? {
              name: "item",
              fn: withCtx(({ item: ee }) => [
                renderSlot(o.$slots, "year-overlay-value", {
                  text: ee.text,
                  value: ee.value
                })
              ]),
              key: "0"
            } : void 0
          ]), 1040, ["modelValue", "multi-model-value", "skip-active"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
}), Zl = {
  key: 0,
  class: "dp__time_input"
}, ql = ["aria-label", "onKeydown", "onClick"], Xl = /* @__PURE__ */ createElementVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), Jl = /* @__PURE__ */ createElementVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1), Ql = ["aria-label", "onKeydown", "onClick"], er = ["aria-label", "onKeydown", "onClick"], tr = /* @__PURE__ */ createElementVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1), nr = /* @__PURE__ */ createElementVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1), ar = { key: 0 }, lr = ["aria-label", "onKeydown"], rr = /* @__PURE__ */ defineComponent({
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    ...dt
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { setTimePickerElements: i, setTimePickerBackRef: v } = ut(), { defaults: m } = xe(t), { transitionName: T, showTransition: Y } = jt(m.value.transitions), _ = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), W = ref("AM"), C = ref(null), c = ref([]);
    onMounted(() => {
      a("mounted");
    });
    const g = (d) => set(/* @__PURE__ */ new Date(), {
      hours: d.hours,
      minutes: d.minutes,
      seconds: t.enableSeconds ? d.seconds : 0,
      milliseconds: 0
    }), Q = computed(() => ({ hours: t.hours, minutes: t.minutes, seconds: t.seconds })), U = computed(() => (d) => !ne(+t[d] + +t[`${d}Increment`], d)), x = computed(() => (d) => !ne(+t[d] - +t[`${d}Increment`], d)), V = (d, u) => add(set(A(), d), u), F = (d, u) => sub(set(A(), d), u), ae = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !t.timePickerInline,
        dp__time_col_reg_block: !t.enableSeconds && t.is24 && !t.timePickerInline,
        dp__time_col_reg_inline: !t.enableSeconds && t.is24 && t.timePickerInline,
        dp__time_col_reg_with_button: !t.enableSeconds && !t.is24,
        dp__time_col_sec: t.enableSeconds && t.is24,
        dp__time_col_sec_with_button: t.enableSeconds && !t.is24
      })
    ), oe = computed(() => {
      const d = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return t.enableSeconds ? d.concat([{ type: "", separator: true }, { type: "seconds" }]) : d;
    }), B = computed(() => oe.value.filter((d) => !d.separator)), G = computed(() => (d) => {
      if (d === "hours") {
        const u = N(+t.hours);
        return { text: u < 10 ? `0${u}` : `${u}`, value: u };
      }
      return { text: t[d] < 10 ? `0${t[d]}` : `${t[d]}`, value: t[d] };
    }), J = (d) => {
      const u = t.is24 ? 24 : 12, S = d === "hours" ? u : 60, b = +t[`${d}GridIncrement`], Z = d === "hours" && !t.is24 ? b : 0, r = [];
      for (let o = Z; o < S; o += b)
        r.push({ value: o, text: o < 10 ? `0${o}` : `${o}` });
      return d === "hours" && !t.is24 && r.push({ value: 0, text: "12" }), Ja(r);
    }, ne = (d, u) => {
      const S = t.minTime ? g(Qt(t.minTime)) : null, b = t.maxTime ? g(Qt(t.maxTime)) : null, Z = g(Qt(Q.value, u, d));
      return S && b ? (isBefore(Z, b) || isEqual(Z, b)) && (isAfter(Z, S) || isEqual(Z, S)) : S ? isAfter(Z, S) || isEqual(Z, S) : b ? isBefore(Z, b) || isEqual(Z, b) : true;
    }, ce = computed(() => (d) => J(d).flat().filter((S) => rl(S.value)).map((S) => S.value).filter((S) => !ne(S, d))), ye = (d) => t[`no${d[0].toUpperCase() + d.slice(1)}Overlay`], O = (d) => {
      ye(d) || (_[d] = !_[d], _[d] || a("overlay-closed"));
    }, w = (d) => d === "hours" ? getHours : d === "minutes" ? getMinutes : getSeconds, f = (d, u = true) => {
      const S = u ? V : F, b = u ? +t[`${d}Increment`] : -+t[`${d}Increment`];
      ne(+t[d] + b, d) && a(
        `update:${d}`,
        w(d)(S({ [d]: +t[d] }, { [d]: +t[`${d}Increment`] }))
      );
    }, N = (d) => t.is24 ? d : (d >= 12 ? W.value = "PM" : W.value = "AM", al(d)), I = () => {
      W.value === "PM" ? (W.value = "AM", a("update:hours", t.hours - 12)) : (W.value = "PM", a("update:hours", t.hours + 12)), a("am-pm-change", W.value);
    }, E = (d) => {
      _[d] = true;
    }, D = (d, u, S) => {
      if (d && t.arrowNavigation) {
        Array.isArray(c.value[u]) ? c.value[u][S] = d : c.value[u] = [d];
        const b = c.value.reduce(
          (Z, r) => r.map((o, l) => [...Z[l] || [], r[l]]),
          []
        );
        v(t.closeTimePickerBtn), C.value && (b[1] = b[1].concat(C.value)), i(b, t.order);
      }
    }, y = (d, u) => d === "hours" && !t.is24 ? a(`update:${d}`, W.value === "PM" ? u + 12 : u) : a(`update:${d}`, u);
    return n({ openChildCmp: E }), (d, u) => {
      var S;
      return d.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Zl, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(oe.value, (b, Z) => {
          var r, o, l;
          return openBlock(), createElementBlock("div", {
            key: Z,
            class: normalizeClass(ae.value)
          }, [
            b.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createElementVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_top: t.timePickerInline,
                  dp__inc_dec_button_disabled: U.value(b.type)
                }),
                "aria-label": (r = unref(m).ariaLabels) == null ? void 0 : r.incrementValue(b.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((M) => f(b.type), ["enter"]),
                  withKeys((M) => f(b.type), ["space"])
                ],
                onClick: (M) => f(b.type),
                ref_for: true,
                ref: (M) => D(M, Z, 0)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  Xl,
                  Jl
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-up"] ? renderSlot(d.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Jn), { key: 1 }))
                ], 64))
              ], 42, ql),
              createElementVNode("button", {
                type: "button",
                "aria-label": (o = unref(m).ariaLabels) == null ? void 0 : o.openTpOverlay(b.type),
                class: normalizeClass([
                  "dp__btn",
                  ye(b.type) ? void 0 : {
                    dp__time_display: true,
                    dp__time_display_block: !t.timePickerInline,
                    dp__time_display_inline: t.timePickerInline
                  }
                ]),
                tabindex: "0",
                onKeydown: [
                  withKeys((M) => O(b.type), ["enter"]),
                  withKeys((M) => O(b.type), ["space"])
                ],
                onClick: (M) => O(b.type),
                ref_for: true,
                ref: (M) => D(M, Z, 1)
              }, [
                d.$slots[b.type] ? renderSlot(d.$slots, b.type, {
                  key: 0,
                  text: G.value(b.type).text,
                  value: G.value(b.type).value
                }) : createCommentVNode("", true),
                d.$slots[b.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(G.value(b.type).text), 1)
                ], 64))
              ], 42, Ql),
              createElementVNode("button", {
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !t.timePickerInline,
                  dp__inc_dec_button_inline: t.timePickerInline,
                  dp__tp_inline_btn_bottom: t.timePickerInline,
                  dp__inc_dec_button_disabled: x.value(b.type)
                }),
                "aria-label": (l = unref(m).ariaLabels) == null ? void 0 : l.decrementValue(b.type),
                tabindex: "0",
                onKeydown: [
                  withKeys((M) => f(b.type, false), ["enter"]),
                  withKeys((M) => f(b.type, false), ["space"])
                ],
                onClick: (M) => f(b.type, false),
                ref_for: true,
                ref: (M) => D(M, Z, 2)
              }, [
                t.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  tr,
                  nr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-down"] ? renderSlot(d.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Qn), { key: 1 }))
                ], 64))
              ], 42, er)
            ], 64))
          ], 2);
        }), 128)),
        d.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", ar, [
          d.$slots["am-pm-button"] ? renderSlot(d.$slots, "am-pm-button", {
            key: 0,
            toggle: I,
            value: W.value
          }) : createCommentVNode("", true),
          d.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: C,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (S = unref(m).ariaLabels) == null ? void 0 : S.amPmButton,
            tabindex: "0",
            onClick: I,
            onKeydown: [
              withKeys(withModifiers(I, ["prevent"]), ["enter"]),
              withKeys(withModifiers(I, ["prevent"]), ["space"])
            ]
          }, toDisplayString(W.value), 41, lr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(B.value, (b, Z) => (openBlock(), createBlock(Transition, {
          key: Z,
          name: unref(T)(_[b.type]),
          css: unref(Y)
        }, {
          default: withCtx(() => [
            _[b.type] ? (openBlock(), createBlock(Rt, {
              key: 0,
              items: J(b.type),
              "disabled-values": unref(m).filters.times[b.type].concat(ce.value(b.type)),
              "esc-close": d.escClose,
              "aria-labels": unref(m).ariaLabels,
              "hide-navigation": d.hideNavigation,
              "onUpdate:modelValue": (r) => y(b.type, r),
              onSelected: (r) => O(b.type),
              onToggle: (r) => O(b.type),
              onResetFlow: u[0] || (u[0] = (r) => d.$emit("reset-flow")),
              type: b.type
            }, createSlots({
              "button-icon": withCtx(() => [
                d.$slots["clock-icon"] ? renderSlot(d.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                d.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Xn), { key: 1 }))
              ]),
              _: 2
            }, [
              d.$slots[`${b.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: r }) => [
                  renderSlot(d.$slots, `${b.type}-overlay-value`, {
                    text: r.text,
                    value: r.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "disabled-values", "esc-close", "aria-labels", "hide-navigation", "onUpdate:modelValue", "onSelected", "onToggle", "type"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
}), or = ["aria-label"], sr = ["tabindex"], ir = ["aria-label"], ur = /* @__PURE__ */ defineComponent({
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    internalModelValue: { type: [Date, Array], default: null },
    ...dt
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, { buildMatrix: i, setTimePicker: v } = ut(), m = useSlots(), { hideNavigationButtons: T, defaults: Y } = xe(t), { transitionName: _, showTransition: W } = jt(Y.value.transitions), C = ref(null), c = ref(null), g = ref([]), Q = ref(null);
    onMounted(() => {
      a("mount"), !t.timePicker && t.arrowNavigation ? i([Ae(C.value)], "time") : v(true, t.timePicker);
    });
    const U = computed(() => t.range && t.modelAuto ? ra(t.internalModelValue) : true), x = ref(false), V = (O) => ({
      hours: Array.isArray(t.hours) ? t.hours[O] : t.hours,
      minutes: Array.isArray(t.minutes) ? t.minutes[O] : t.minutes,
      seconds: Array.isArray(t.seconds) ? t.seconds[O] : t.seconds
    }), F = computed(() => {
      const O = [];
      if (t.range)
        for (let w = 0; w < 2; w++)
          O.push(V(w));
      else
        O.push(V(0));
      return O;
    }), ae = (O, w = false, f = "") => {
      w || a("reset-flow"), x.value = O, a(O ? "overlay-opened" : "overlay-closed"), t.arrowNavigation && v(O), nextTick(() => {
        f !== "" && g.value[0] && g.value[0].openChildCmp(f);
      });
    }, oe = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: t.autoApply && !t.keepActionRow
    })), B = ht(m, "timePicker"), G = (O, w, f) => t.range ? w === 0 ? [O, F.value[1][f]] : [F.value[0][f], O] : O, J = (O) => {
      a("update:hours", O);
    }, ne = (O) => {
      a("update:minutes", O);
    }, ce = (O) => {
      a("update:seconds", O);
    }, ye = () => {
      if (Q.value) {
        const O = ol(Q.value);
        O && O.focus({ preventScroll: true });
      }
    };
    return n({ toggleTimePicker: ae }), (O, w) => {
      var f;
      return openBlock(), createElementBlock("div", null, [
        !O.timePicker && !O.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(oe.value),
          "aria-label": (f = unref(Y).ariaLabels) == null ? void 0 : f.openTimePicker,
          tabindex: "0",
          ref_key: "openTimePickerBtn",
          ref: C,
          onKeydown: [
            w[0] || (w[0] = withKeys((N) => ae(true), ["enter"])),
            w[1] || (w[1] = withKeys((N) => ae(true), ["space"]))
          ],
          onClick: w[2] || (w[2] = (N) => ae(true))
        }, [
          O.$slots["clock-icon"] ? renderSlot(O.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          O.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Xn), { key: 1 }))
        ], 42, or)), [
          [vShow, !unref(T)("time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(_)(x.value),
          css: unref(W) && !O.timePickerInline
        }, {
          default: withCtx(() => {
            var N;
            return [
              x.value || O.timePicker || O.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass({ dp__overlay: !O.timePickerInline }),
                ref_key: "overlayRef",
                ref: Q,
                tabindex: O.timePickerInline ? void 0 : 0
              }, [
                createElementVNode("div", {
                  class: normalizeClass(
                    O.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  O.$slots["time-picker-overlay"] ? renderSlot(O.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: J,
                    setMinutes: ne,
                    setSeconds: ce
                  }) : createCommentVNode("", true),
                  O.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(O.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(F.value, (I, E) => withDirectives((openBlock(), createBlock(rr, mergeProps({ key: E }, {
                      ...O.$props,
                      order: E,
                      hours: I.hours,
                      minutes: I.minutes,
                      seconds: I.seconds,
                      closeTimePickerBtn: c.value,
                      disabled: E === 0 ? O.fixedStart : O.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: g,
                      "onUpdate:hours": (D) => J(G(D, E, "hours")),
                      "onUpdate:minutes": (D) => ne(G(D, E, "minutes")),
                      "onUpdate:seconds": (D) => ce(G(D, E, "seconds")),
                      onMounted: ye,
                      onOverlayClosed: ye,
                      onAmPmChange: w[3] || (w[3] = (D) => O.$emit("am-pm-change", D))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(B), (D, y) => ({
                        name: D,
                        fn: withCtx((d) => [
                          renderSlot(O.$slots, D, normalizeProps(guardReactiveProps(d)))
                        ])
                      }))
                    ]), 1040, ["onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, E === 0 ? true : U.value]
                    ])), 128))
                  ], 2)),
                  !O.timePicker && !O.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    type: "button",
                    ref_key: "closeTimePickerBtn",
                    ref: c,
                    class: normalizeClass(oe.value),
                    "aria-label": (N = unref(Y).ariaLabels) == null ? void 0 : N.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      w[4] || (w[4] = withKeys((I) => ae(false), ["enter"])),
                      w[5] || (w[5] = withKeys((I) => ae(false), ["space"]))
                    ],
                    onClick: w[6] || (w[6] = (I) => ae(false))
                  }, [
                    O.$slots["calendar-icon"] ? renderSlot(O.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    O.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Kt), { key: 1 }))
                  ], 42, ir)), [
                    [vShow, !unref(T)("time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 10, sr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
}), dr = (e, n) => {
  const { isDisabled: a, matchDate: t, getWeekFromDate: i, defaults: v } = xe(n), m = ref(null), T = ref(A()), Y = (u) => {
    !u.current && n.hideOffsetDates || (m.value = u.value);
  }, _ = () => {
    m.value = null;
  }, W = (u) => Array.isArray(e.value) && n.range && e.value[0] && m.value ? u ? Fe(m.value, e.value[0]) : Ve(m.value, e.value[0]) : true, C = (u, S) => {
    const b = () => e.value ? S ? e.value[0] || null : e.value[1] : null, Z = e.value && Array.isArray(e.value) ? b() : null;
    return ke(A(u.value), Z);
  }, c = (u) => {
    const S = Array.isArray(e.value) ? e.value[0] : null;
    return u ? !Ve(m.value || null, S) : true;
  }, g = (u, S = true) => (n.range || n.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? n.hideOffsetDates && !u.current ? false : ke(A(u.value), e.value[S ? 0 : 1]) : n.range ? C(u, S) && c(S) || ke(u.value, Array.isArray(e.value) ? e.value[0] : null) && W(S) : false, Q = (u, S, b) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? u ? false : b ? Fe(e.value[0], S.value) : Ve(e.value[0], S.value) : false, U = (u) => !e.value || n.hideOffsetDates && !u.current ? false : n.range ? n.modelAuto && Array.isArray(e.value) ? ke(u.value, e.value[0] ? e.value[0] : T.value) : false : n.multiDates && Array.isArray(e.value) ? e.value.some((S) => ke(S, u.value)) : ke(u.value, e.value ? e.value : T.value), x = (u) => {
    if (n.autoRange || n.weekPicker) {
      if (m.value) {
        if (n.hideOffsetDates && !u.current)
          return false;
        const S = addDays(m.value, +n.autoRange), b = i(A(m.value));
        return n.weekPicker ? ke(b[1], A(u.value)) : ke(S, A(u.value));
      }
      return false;
    }
    return false;
  }, V = (u) => {
    if (n.autoRange || n.weekPicker) {
      if (m.value) {
        const S = addDays(m.value, +n.autoRange);
        if (n.hideOffsetDates && !u.current)
          return false;
        const b = i(A(m.value));
        return n.weekPicker ? Fe(u.value, b[0]) && Ve(u.value, b[1]) : Fe(u.value, m.value) && Ve(u.value, S);
      }
      return false;
    }
    return false;
  }, F = (u) => {
    if (n.autoRange || n.weekPicker) {
      if (m.value) {
        if (n.hideOffsetDates && !u.current)
          return false;
        const S = i(A(m.value));
        return n.weekPicker ? ke(S[0], u.value) : ke(m.value, u.value);
      }
      return false;
    }
    return false;
  }, ae = (u) => ea(e.value, m.value, u.value), oe = () => n.modelAuto && Array.isArray(n.internalModelValue) ? !!n.internalModelValue[0] : false, B = () => n.modelAuto ? ra(n.internalModelValue) : true, G = (u) => {
    if (Array.isArray(e.value) && e.value.length || n.weekPicker)
      return false;
    const S = n.range ? !g(u) && !g(u, false) : true;
    return !a(u.value) && !U(u) && !(!u.current && n.hideOffsetDates) && S;
  }, J = (u) => n.range ? n.modelAuto ? oe() && U(u) : false : U(u), ne = (u) => {
    var S;
    return n.highlight ? t(
      u.value,
      (S = n.arrMapValues) != null && S.highlightedDates ? n.arrMapValues.highlightedDates : n.highlight
    ) : false;
  }, ce = (u) => a(u.value) && n.highlightDisabledDays === false, ye = (u) => n.highlightWeekDays && n.highlightWeekDays.includes(u.value.getDay()), O = (u) => (n.range || n.weekPicker) && (!(v.value.multiCalendars > 0) || u.current) && B() && !(!u.current && n.hideOffsetDates) && !U(u) ? ae(u) : false, w = (u) => {
    const { isRangeStart: S, isRangeEnd: b } = I(u), Z = n.range ? S || b : false;
    return {
      dp__cell_offset: !u.current,
      dp__pointer: !n.disabled && !(!u.current && n.hideOffsetDates) && !a(u.value),
      dp__cell_disabled: a(u.value),
      dp__cell_highlight: !ce(u) && (ne(u) || ye(u)) && !J(u) && !Z,
      dp__cell_highlight_active: !ce(u) && (ne(u) || ye(u)) && J(u),
      dp__today: !n.noToday && ke(u.value, T.value) && u.current
    };
  }, f = (u) => ({
    dp__active_date: J(u),
    dp__date_hover: G(u)
  }), N = (u) => ({
    ...E(u),
    ...D(u),
    dp__range_between_week: O(u) && n.weekPicker
  }), I = (u) => {
    const S = v.value.multiCalendars > 0 ? u.current && g(u) && B() : g(u) && B(), b = v.value.multiCalendars > 0 ? u.current && g(u, false) && B() : g(u, false) && B();
    return { isRangeStart: S, isRangeEnd: b };
  }, E = (u) => {
    const { isRangeStart: S, isRangeEnd: b } = I(u);
    return {
      dp__range_start: S,
      dp__range_end: b,
      dp__range_between: O(u) && !n.weekPicker,
      dp__date_hover_start: Q(G(u), u, true),
      dp__date_hover_end: Q(G(u), u, false)
    };
  }, D = (u) => ({
    ...E(u),
    dp__cell_auto_range: V(u),
    dp__cell_auto_range_start: F(u),
    dp__cell_auto_range_end: x(u)
  }), y = (u) => n.range ? n.autoRange ? D(u) : n.modelAuto ? { ...f(u), ...E(u) } : E(u) : n.weekPicker ? N(u) : f(u);
  return {
    setHoverDate: Y,
    clearHoverDate: _,
    getDayClassData: (u) => n.hideOffsetDates && !u.current ? {} : {
      ...w(u),
      ...y(u),
      [n.dayClass ? n.dayClass(u.value) : ""]: true,
      [n.calendarCellClassName]: !!n.calendarCellClassName
    }
  };
}, cr = ["id", "onKeydown"], fr = {
  key: 0,
  class: "dp__sidebar_left"
}, vr = {
  key: 1,
  class: "dp__preset_ranges"
}, mr = ["onClick"], yr = {
  key: 2,
  class: "dp__sidebar_right"
}, gr = {
  key: 3,
  class: "dp__action_extra"
}, hr = /* @__PURE__ */ defineComponent({
  __name: "DatepickerMenu",
  props: {
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    arrMapValues: { type: Object, default: () => ({}) },
    ...dt
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, i = computed(() => {
      const { openOnTop: h2, internalModelValue: z, arrMapValues: pe, ...Me } = t;
      return Me;
    }), { setMenuFocused: v, setShiftKey: m, control: T } = ta(), { getCalendarDays: Y, defaults: _ } = xe(t), W = useSlots(), C = ref(null), c = reactive({
      timePicker: !!(!t.enableTimePicker || t.timePicker || t.monthPicker),
      monthYearInput: !!t.timePicker,
      calendar: false
    }), g = ref([]), Q = ref([]), U = ref(null), x = ref(null), V = ref(0), F = ref(false), ae = ref(0);
    onMounted(() => {
      var z;
      F.value = true, !((z = t.presetRanges) != null && z.length) && !W["left-sidebar"] && !W["right-sidebar"] && (ze(), window.addEventListener("resize", ze));
      const h2 = Ae(x);
      if (h2 && !t.textInput && !t.inline && (v(true), ce()), h2) {
        const pe = (Me) => {
          t.allowPreventDefault && Me.preventDefault(), Me.stopImmediatePropagation(), Me.stopPropagation();
        };
        h2.addEventListener("pointerdown", pe), h2.addEventListener("mousedown", pe);
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", ze);
    });
    const { arrowRight: oe, arrowLeft: B, arrowDown: G, arrowUp: J } = ut(), ne = (h2) => {
      h2 || h2 === 0 ? Q.value[h2].triggerTransition(
        N.value(h2),
        I.value(h2)
      ) : Q.value.forEach(
        (z, pe) => z.triggerTransition(N.value(pe), I.value(pe))
      );
    }, ce = () => {
      const h2 = Ae(x);
      h2 && h2.focus({ preventScroll: true });
    }, ye = () => {
      var h2;
      (h2 = t.flow) != null && h2.length && ae.value !== -1 && (ae.value += 1, a("flow-step", ae.value), s());
    }, O = () => {
      ae.value = -1;
    }, {
      calendars: w,
      modelValue: f,
      month: N,
      year: I,
      time: E,
      updateTime: D,
      updateMonthYear: y,
      selectDate: d,
      getWeekNum: u,
      monthYearSelect: S,
      handleScroll: b,
      handleArrow: Z,
      handleSwipe: r,
      getMarker: o,
      selectCurrentDate: l,
      presetDateRange: M
    } = ml(t, a, ye, ne, ae), { setHoverDate: re, clearHoverDate: se, getDayClassData: Pe } = dr(f, t), ee = {
      modelValue: f,
      month: N,
      year: I,
      time: E,
      updateTime: D,
      updateMonthYear: y,
      selectDate: d,
      presetDateRange: M,
      handleMonthYearChange: (h2) => {
        g.value[0] && g.value[0].handleMonthYearChange(h2);
      }
    };
    watch(
      w,
      () => {
        t.openOnTop && setTimeout(() => {
          a("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const Ue = ht(W, "calendar"), Ie = ht(W, "action"), Te = ht(W, "timePicker"), Xe = ht(W, "monthYear"), ct = computed(() => t.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), et = computed(() => tl(t.yearRange, t.reverseYears)), wt = computed(() => nl(t.formatLocale, t.locale, t.monthNameFormat)), ze = () => {
      const h2 = Ae(C);
      h2 && (V.value = h2.getBoundingClientRect().width);
    }, j = computed(() => (h2) => Y(N.value(h2), I.value(h2))), te = computed(
      () => _.value.multiCalendars > 0 ? [...Array(_.value.multiCalendars).keys()] : [0]
    ), ue = computed(
      () => (h2) => h2 === 1
    ), Tt = computed(() => t.monthPicker || t.timePicker || t.yearPicker), ft = computed(
      () => ({
        dp__menu_inner: true,
        dp__flex_display: _.value.multiCalendars > 0
      })
    ), Gt = computed(() => ({
      dp__instance_calendar: _.value.multiCalendars > 0
    })), Yt = computed(() => ({
      dp__menu_disabled: t.disabled,
      dp__menu_readonly: t.readonly
    })), St = computed(
      () => (h2) => qt(j, h2)
    ), Zt = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !t.inline,
        dp__relative: t.inline,
        [t.menuClassName]: !!t.menuClassName
      })
    ), qt = (h2, z) => h2.value(z).map((pe) => ({
      ...pe,
      days: pe.days.map((Me) => (Me.marker = o(Me), Me.classData = Pe(Me), Me))
    })), Xt = (h2) => {
      h2.stopPropagation(), h2.stopImmediatePropagation();
    }, Vt = () => {
      t.escClose && a("close-picker");
    }, Mn = (h2, z = false) => {
      d(h2, z), t.spaceConfirm && a("select-date");
    }, Et = (h2) => {
      var z;
      (z = t.flow) != null && z.length && (c[h2] = true, Object.keys(c).filter((pe) => !c[pe]).length || s());
    }, bt = (h2, z, pe, Me, ...Je) => {
      if (t.flow[ae.value] === h2) {
        const q = Me ? z.value[0] : z.value;
        q && q[pe](...Je);
      }
    }, s = () => {
      bt("month", g, "toggleMonthPicker", true, true), bt("year", g, "toggleYearPicker", true, true), bt("calendar", U, "toggleTimePicker", false, false, true), bt("time", U, "toggleTimePicker", false, true, true);
      const h2 = t.flow[ae.value];
      (h2 === "hours" || h2 === "minutes" || h2 === "seconds") && bt(h2, U, "toggleTimePicker", false, true, true, h2);
    }, k = (h2) => {
      if (t.arrowNavigation) {
        if (h2 === "up")
          return J();
        if (h2 === "down")
          return G();
        if (h2 === "left")
          return B();
        if (h2 === "right")
          return oe();
      } else
        h2 === "left" || h2 === "up" ? Z("left", 0, h2 === "up") : Z("right", 0, h2 === "down");
    }, X = (h2) => {
      m(h2.shiftKey), !t.disableMonthYearSelect && h2.code === "Tab" && h2.target.classList.contains("dp__menu") && T.value.shiftKeyInMenu && (h2.preventDefault(), h2.stopImmediatePropagation(), a("close-picker"));
    }, ie = () => {
      ce(), a("time-picker-close");
    }, $e = (h2) => {
      var z, pe, Me, Je, q;
      (z = U.value) == null || z.toggleTimePicker(false, false), (Me = (pe = g.value) == null ? void 0 : pe[h2]) == null || Me.toggleMonthPicker(false, false), (q = (Je = g.value) == null ? void 0 : Je[h2]) == null || q.toggleYearPicker(false, false);
    };
    return n({
      updateMonthYear: y,
      switchView: (h2, z = 0) => {
        var pe, Me, Je, q, nt;
        return h2 === "month" ? (Me = (pe = g.value) == null ? void 0 : pe[z]) == null ? void 0 : Me.toggleMonthPicker(false, true) : h2 === "year" ? (q = (Je = g.value) == null ? void 0 : Je[z]) == null ? void 0 : q.toggleYearPicker(false, true) : h2 === "time" ? (nt = U.value) == null ? void 0 : nt.toggleTimePicker(true, false) : $e(z);
      }
    }), (h2, z) => {
      var pe;
      return openBlock(), createBlock(Transition, {
        appear: "",
        name: (pe = unref(_).transitions) == null ? void 0 : pe.menuAppear,
        css: !!h2.transitions
      }, {
        default: withCtx(() => {
          var Me, Je;
          return [
            createElementVNode("div", {
              id: h2.uid ? `dp-menu-${h2.uid}` : void 0,
              tabindex: "0",
              ref_key: "dpMenuRef",
              ref: x,
              role: "dialog",
              class: normalizeClass(Zt.value),
              onMouseleave: z[14] || (z[14] = //@ts-ignore
              (...q) => unref(se) && unref(se)(...q)),
              onClick: Xt,
              onKeydown: [
                withKeys(Vt, ["esc"]),
                z[15] || (z[15] = withKeys(withModifiers((q) => k("left"), ["prevent"]), ["left"])),
                z[16] || (z[16] = withKeys(withModifiers((q) => k("up"), ["prevent"]), ["up"])),
                z[17] || (z[17] = withKeys(withModifiers((q) => k("down"), ["prevent"]), ["down"])),
                z[18] || (z[18] = withKeys(withModifiers((q) => k("right"), ["prevent"]), ["right"])),
                X
              ]
            }, [
              (h2.disabled || h2.readonly) && h2.inline ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(Yt.value)
              }, null, 2)) : createCommentVNode("", true),
              !h2.inline && !h2.teleportCenter ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(ct.value)
              }, null, 2)) : createCommentVNode("", true),
              createElementVNode("div", {
                class: normalizeClass({
                  dp__menu_content_wrapper: ((Me = h2.presetRanges) == null ? void 0 : Me.length) || !!h2.$slots["left-sidebar"] || !!h2.$slots["right-sidebar"]
                })
              }, [
                h2.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", fr, [
                  renderSlot(h2.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ee)))
                ])) : createCommentVNode("", true),
                (Je = h2.presetRanges) != null && Je.length ? (openBlock(), createElementBlock("div", vr, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(h2.presetRanges, (q, nt) => (openBlock(), createElementBlock("div", {
                    key: nt,
                    style: normalizeStyle(q.style || {}),
                    class: "dp__preset_range",
                    onClick: (me) => unref(M)(q.range, !!q.slot)
                  }, [
                    q.slot ? renderSlot(h2.$slots, q.slot, {
                      key: 0,
                      presetDateRange: unref(M),
                      label: q.label,
                      range: q.range
                    }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createTextVNode(toDisplayString(q.label), 1)
                    ], 64))
                  ], 12, mr))), 128))
                ])) : createCommentVNode("", true),
                createElementVNode("div", {
                  class: "dp__instance_calendar",
                  ref_key: "calendarWrapperRef",
                  ref: C,
                  role: "document"
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(ft.value)
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(te.value, (q, nt) => (openBlock(), createElementBlock("div", {
                      key: q,
                      class: normalizeClass(Gt.value)
                    }, [
                      !h2.disableMonthYearSelect && !h2.timePicker ? (openBlock(), createBlock(Gl, mergeProps({
                        key: 0,
                        ref_for: true,
                        ref: (me) => {
                          me && (g.value[nt] = me);
                        },
                        months: wt.value,
                        years: et.value,
                        month: unref(N)(q),
                        year: unref(I)(q),
                        instance: q,
                        "internal-model-value": e.internalModelValue
                      }, i.value, {
                        onMount: z[0] || (z[0] = (me) => Et("monthYearInput")),
                        onResetFlow: O,
                        onUpdateMonthYear: (me) => unref(y)(q, me),
                        onMonthYearSelect: unref(S),
                        onOverlayClosed: ce
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Xe), (me, sa) => ({
                          name: me,
                          fn: withCtx((Jt) => [
                            renderSlot(h2.$slots, me, normalizeProps(guardReactiveProps(Jt)))
                          ])
                        }))
                      ]), 1040, ["months", "years", "month", "year", "instance", "internal-model-value", "onUpdateMonthYear", "onMonthYearSelect"])) : createCommentVNode("", true),
                      createVNode(Yl, mergeProps({
                        ref_for: true,
                        ref: (me) => {
                          me && (Q.value[nt] = me);
                        },
                        "specific-mode": Tt.value,
                        "get-week-num": unref(u),
                        instance: q,
                        "mapped-dates": St.value(q),
                        month: unref(N)(q),
                        year: unref(I)(q)
                      }, i.value, {
                        onSelectDate: (me) => unref(d)(me, !ue.value(q)),
                        onHandleSpace: (me) => Mn(me, !ue.value(q)),
                        onSetHoverDate: z[1] || (z[1] = (me) => unref(re)(me)),
                        onHandleScroll: (me) => unref(b)(me, q),
                        onHandleSwipe: (me) => unref(r)(me, q),
                        onMount: z[2] || (z[2] = (me) => Et("calendar")),
                        onResetFlow: O,
                        onTooltipOpen: z[3] || (z[3] = (me) => h2.$emit("tooltip-open", me)),
                        onTooltipClose: z[4] || (z[4] = (me) => h2.$emit("tooltip-close", me))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Ue), (me, sa) => ({
                          name: me,
                          fn: withCtx((Jt) => [
                            renderSlot(h2.$slots, me, normalizeProps(guardReactiveProps({ ...Jt })))
                          ])
                        }))
                      ]), 1040, ["specific-mode", "get-week-num", "instance", "mapped-dates", "month", "year", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
                    ], 2))), 128))
                  ], 2),
                  createElementVNode("div", null, [
                    h2.$slots["time-picker"] ? renderSlot(h2.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(E), updateTime: unref(D) }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      h2.enableTimePicker && !h2.monthPicker && !h2.weekPicker ? (openBlock(), createBlock(ur, mergeProps({
                        key: 0,
                        ref_key: "timePickerRef",
                        ref: U,
                        hours: unref(E).hours,
                        minutes: unref(E).minutes,
                        seconds: unref(E).seconds,
                        "internal-model-value": e.internalModelValue
                      }, i.value, {
                        onMount: z[5] || (z[5] = (q) => Et("timePicker")),
                        "onUpdate:hours": z[6] || (z[6] = (q) => unref(D)(q)),
                        "onUpdate:minutes": z[7] || (z[7] = (q) => unref(D)(q, false)),
                        "onUpdate:seconds": z[8] || (z[8] = (q) => unref(D)(q, false, true)),
                        onResetFlow: O,
                        onOverlayClosed: ie,
                        onOverlayOpened: z[9] || (z[9] = (q) => h2.$emit("time-picker-open", q)),
                        onAmPmChange: z[10] || (z[10] = (q) => h2.$emit("am-pm-change", q))
                      }), createSlots({ _: 2 }, [
                        renderList(unref(Te), (q, nt) => ({
                          name: q,
                          fn: withCtx((me) => [
                            renderSlot(h2.$slots, q, normalizeProps(guardReactiveProps(me)))
                          ])
                        }))
                      ]), 1040, ["hours", "minutes", "seconds", "internal-model-value"])) : createCommentVNode("", true)
                    ], 64))
                  ])
                ], 512),
                h2.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", yr, [
                  renderSlot(h2.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ee)))
                ])) : createCommentVNode("", true),
                h2.$slots["action-extra"] ? (openBlock(), createElementBlock("div", gr, [
                  h2.$slots["action-extra"] ? renderSlot(h2.$slots, "action-extra", {
                    key: 0,
                    selectCurrentDate: unref(l)
                  }) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ], 2),
              !h2.autoApply || h2.keepActionRow ? (openBlock(), createBlock(Sl, mergeProps({
                key: 2,
                "menu-mount": F.value,
                "calendar-width": V.value,
                "internal-model-value": e.internalModelValue
              }, i.value, {
                onClosePicker: z[11] || (z[11] = (q) => h2.$emit("close-picker")),
                onSelectDate: z[12] || (z[12] = (q) => h2.$emit("select-date")),
                onInvalidSelect: z[13] || (z[13] = (q) => h2.$emit("invalid-select")),
                onSelectNow: unref(l)
              }), createSlots({ _: 2 }, [
                renderList(unref(Ie), (q, nt) => ({
                  name: q,
                  fn: withCtx((me) => [
                    renderSlot(h2.$slots, q, normalizeProps(guardReactiveProps({ ...me })))
                  ])
                }))
              ]), 1040, ["menu-mount", "calendar-width", "internal-model-value", "onSelectNow"])) : createCommentVNode("", true)
            ], 42, cr)
          ];
        }),
        _: 3
      }, 8, ["name", "css"]);
    };
  }
}), pr = void 0, dn = () => {
}, kr = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false, wr = (e, n, a, t) => {
  if (!e)
    return dn;
  let i = dn;
  const v = watch(
    () => unref(e),
    (T) => {
      i(), T && (T.addEventListener(n, a, t), i = () => {
        T.removeEventListener(n, a, t), i = dn;
      });
    },
    { immediate: true, flush: "post" }
  ), m = () => {
    v(), i();
  };
  return kr(m), m;
}, br = (e, n, a, t = {}) => {
  const { window: i = pr, event: v = "pointerdown" } = t;
  return i ? wr(i, v, (T) => {
    const Y = Ae(e), _ = Ae(n);
    !Y || !_ || Y === T.target || T.composedPath().includes(Y) || T.composedPath().includes(_) || a(T);
  }, { passive: true }) : void 0;
}, Dr = /* @__PURE__ */ defineComponent({
  __name: "VueDatePicker",
  props: {
    ...dt
  },
  emits: [
    "update:model-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end"
  ],
  setup(e, { expose: n, emit: a }) {
    const t = e, i = useSlots(), v = ref(false), m = toRef(t, "modelValue"), T = toRef(t, "timezone"), Y = ref(null), _ = ref(null), W = ref(false), C = ref(null), c = reactive({
      disabledDates: null,
      allowedDates: null,
      highlightedDates: null
    }), { setMenuFocused: g, setShiftKey: Q } = ta(), { clearArrowNav: U } = ut(), { validateDate: x, isValidTime: V, defaults: F, mapDatesArrToMap: ae } = xe(t);
    onMounted(() => {
      N(t.modelValue), t.inline || (O(C.value).addEventListener("scroll", S), window.addEventListener("resize", b)), t.inline && (v.value = true), ae(c);
    }), onUnmounted(() => {
      if (!t.inline) {
        const j = O(C.value);
        j && j.removeEventListener("scroll", S), window.removeEventListener("resize", b);
      }
    });
    const oe = ht(i, "all", t.presetRanges), B = ht(i, "input");
    watch(
      [m, T],
      () => {
        N(m.value);
      },
      { deep: true }
    );
    const { openOnTop: G, menuStyle: J, resetPosition: ne, setMenuPosition: ce, setInitialPosition: ye, getScrollableParent: O } = hl(Y, _, a, t), {
      inputValue: w,
      internalModelValue: f,
      parseExternalModelValue: N,
      emitModelValue: I,
      formatInputValue: E,
      checkBeforeEmit: D
    } = yl(a, t, W), y = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: t.dark,
        dp__theme_light: !t.dark,
        dp__flex_display: t.inline,
        dp__flex_display_with_input: t.inlineWithInput
      })
    ), d = computed(() => t.dark ? "dp__theme_dark" : "dp__theme_light"), u = computed(() => t.teleport ? {
      to: typeof t.teleport == "boolean" ? "body" : t.teleport,
      disabled: t.inline
    } : { class: "dp__outer_menu_wrap" }), S = () => {
      v.value && (t.closeOnScroll ? Se() : ce());
    }, b = () => {
      v.value && ce();
    }, Z = async () => {
      var j, te, ue;
      !t.disabled && !t.readonly && (ne(), await nextTick(), v.value = true, await nextTick(), ye(), await nextTick(), ce(), delete J.value.opacity, !((j = F.value.transitions) != null && j.menuAppear) && t.transitions && ((ue = (te = Y.value) == null ? void 0 : te.$el) == null || ue.classList.add("dp__menu_transitioned")), v.value && a("open"), v.value || Pe(), N(t.modelValue));
    }, r = () => {
      w.value = "", Pe(), a("update:model-value", null), a("cleared"), t.closeOnClearValue && Se();
    }, o = () => {
      const j = f.value;
      return !j || !Array.isArray(j) && x(j) ? true : Array.isArray(j) ? j.length === 2 && x(j[0]) && x(j[1]) ? true : x(j[0]) : false;
    }, l = () => {
      D() && o() ? (I(), Se()) : a("invalid-select", f.value);
    }, M = (j) => {
      re(), I(), t.closeOnAutoApply && !j && Se();
    }, re = () => {
      _.value && t.textInput && _.value.setParsedDate(f.value);
    }, se = (j = false) => {
      t.autoApply && V(f.value) && o() && (t.range && Array.isArray(f.value) ? (t.partialRange || f.value.length === 2) && M(j) : M(j));
    }, Pe = () => {
      t.textInput || (f.value = null);
    }, Se = () => {
      t.inline || (v.value && (v.value = false, g(false), Q(false), U(), a("closed"), ye(), w.value && N(m.value)), Pe());
    }, ee = (j, te) => {
      if (!j) {
        f.value = null;
        return;
      }
      f.value = j, te && (l(), a("text-submit"));
    }, Ue = () => {
      t.autoApply && V(f.value) && I(), re();
    }, Ie = () => v.value ? Se() : Z(), Te = (j) => {
      f.value = j;
    }, Xe = () => {
      t.textInput && (W.value = true, E()), a("focus");
    }, ct = () => {
      t.textInput && (W.value = false, N(t.modelValue)), a("blur");
    }, et = (j) => {
      Y.value && Y.value.updateMonthYear(0, {
        month: Fn(j.month),
        year: Fn(j.year)
      });
    }, wt = (j) => {
      N(j || t.modelValue);
    }, ze = (j, te) => {
      var ue;
      (ue = Y.value) == null || ue.switchView(j, te);
    };
    return br(
      Y,
      _,
      t.onClickOutside ? () => t.onClickOutside(o) : Se
    ), n({
      closeMenu: Se,
      selectDate: l,
      clearValue: r,
      openMenu: Z,
      onScroll: S,
      formatInputValue: E,
      // exposed for testing purposes
      updateInternalModelValue: Te,
      // modify internal modelValue
      setMonthYear: et,
      parseModel: wt,
      switchView: ze
    }), (j, te) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(y.value),
      ref_key: "pickerWrapperRef",
      ref: C
    }, [
      createVNode($l, mergeProps({
        ref_key: "inputRef",
        ref: _,
        "is-menu-open": v.value,
        "input-value": unref(w),
        "onUpdate:inputValue": te[0] || (te[0] = (ue) => isRef(w) ? w.value = ue : null)
      }, j.$props, {
        onClear: r,
        onOpen: Z,
        onSetInputDate: ee,
        onSetEmptyDate: unref(I),
        onSelectDate: l,
        onToggle: Ie,
        onClose: Se,
        onFocus: Xe,
        onBlur: ct,
        onRealBlur: te[1] || (te[1] = (ue) => W.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(B), (ue, Tt) => ({
          name: ue,
          fn: withCtx((ft) => [
            renderSlot(j.$slots, ue, normalizeProps(guardReactiveProps(ft)))
          ])
        }))
      ]), 1040, ["is-menu-open", "input-value", "onSetEmptyDate"]),
      v.value ? (openBlock(), createBlock(resolveDynamicComponent(j.teleport ? Teleport : "div"), normalizeProps(mergeProps({ key: 0 }, u.value)), {
        default: withCtx(() => [
          v.value ? (openBlock(), createBlock(hr, mergeProps({
            key: 0,
            ref_key: "dpMenuRef",
            ref: Y,
            class: d.value,
            style: j.inline ? void 0 : unref(J),
            "open-on-top": unref(G),
            "arr-map-values": c
          }, j.$props, {
            "internal-model-value": unref(f),
            "onUpdate:internalModelValue": te[2] || (te[2] = (ue) => isRef(f) ? f.value = ue : null),
            onClosePicker: Se,
            onSelectDate: l,
            onAutoApply: se,
            onTimeUpdate: Ue,
            onFlowStep: te[3] || (te[3] = (ue) => j.$emit("flow-step", ue)),
            onUpdateMonthYear: te[4] || (te[4] = (ue) => j.$emit("update-month-year", ue)),
            onInvalidSelect: te[5] || (te[5] = (ue) => j.$emit("invalid-select", unref(f))),
            onInvalidFixedRange: te[6] || (te[6] = (ue) => j.$emit("invalid-fixed-range", ue)),
            onRecalculatePosition: unref(ce),
            onTooltipOpen: te[7] || (te[7] = (ue) => j.$emit("tooltip-open", ue)),
            onTooltipClose: te[8] || (te[8] = (ue) => j.$emit("tooltip-close", ue)),
            onTimePickerOpen: te[9] || (te[9] = (ue) => j.$emit("time-picker-open", ue)),
            onTimePickerClose: te[10] || (te[10] = (ue) => j.$emit("time-picker-close", ue)),
            onAmPmChange: te[11] || (te[11] = (ue) => j.$emit("am-pm-change", ue)),
            onRangeStart: te[12] || (te[12] = (ue) => j.$emit("range-start", ue)),
            onRangeEnd: te[13] || (te[13] = (ue) => j.$emit("range-end", ue))
          }), createSlots({ _: 2 }, [
            renderList(unref(oe), (ue, Tt) => ({
              name: ue,
              fn: withCtx((ft) => [
                renderSlot(j.$slots, ue, normalizeProps(guardReactiveProps({ ...ft })))
              ])
            }))
          ]), 1040, ["class", "style", "open-on-top", "arr-map-values", "internal-model-value", "onRecalculatePosition"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16)) : createCommentVNode("", true)
    ], 2));
  }
}), oa = /* @__PURE__ */ (() => {
  const e = Dr;
  return e.install = (n) => {
    n.component("Vue3DatePicker", e);
  }, e;
})(), $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: oa
}, Symbol.toStringTag, { value: "Module" }));
Object.entries($r).forEach(([e, n]) => {
  e !== "default" && (oa[e] = n);
});
const vueDatePicker_GfeYHwmpe2 = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-date-picker", oa);
});
const plugins = [
  plugin$1,
  plugin,
  revive_payload_server_eJ33V7gbc6,
  components_plugin_KR1HBZs4kY,
  unhead_KgADcZ0jPj,
  plugin_AOuQ1DYzjk,
  plugin_1UohGbtF8v,
  axios_QMFgzss1s4,
  vueDatePicker_GfeYHwmpe2
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a2;
    return props ? h(component, props, slots) : (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
  } };
};
const layouts = {
  auth: /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/auth-3b4b56aa.mjs').then((m) => m.default || m)),
  default: /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/default-fa7c2193.mjs').then((m) => m.default || m))
};
const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => unref(props.name) ?? route.meta.layout ?? "default");
    const layoutRef = ref();
    context.expose({ layoutRef });
    return () => {
      const done = nuxtApp.deferHydration();
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          // @ts-expect-error seems to be an issue in vue types
          default: () => h(LayoutProvider, {
            layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
            key: layout.value,
            name: layout.value,
            shouldProvide: !props.name,
            hasTransition: !!transitionProps
          }, context.slots)
        })
      }).default();
    };
  }
});
const LayoutProvider = /* @__PURE__ */ defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a2, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a2 = context.slots).default) == null ? void 0 : _b.call(_a2);
      }
      return h(layouts[name], props.layoutProps, context.slots);
    };
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const RouteProvider = /* @__PURE__ */ defineComponent({
  name: "RouteProvider",
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_1 = /* @__PURE__ */ defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          const done = nuxtApp.deferHydration();
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).finally(done));
                }
              }, {
                // @ts-expect-error seems to be an issue in vue types
                default: () => h(RouteProvider, {
                  key,
                  vnode: routeProps.Component,
                  route: routeProps.route,
                  renderKey: key,
                  trackRootNodes: hasTransition,
                  vnodeRef: pageRef
                })
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _toArray(val) {
  return Array.isArray(val) ? val : val ? [val] : [];
}
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: _toArray(prop.onAfterLeave)
  }));
  return defu(..._props);
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NuxtPage)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/pages/runtime/app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    (_error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-404-bd0342ec.mjs').then((r) => r.default || r));
    const _Error = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-500-258a9887.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-e1a21f0b.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const { islandContext } = nuxtApp.ssrContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, useRouter as a, useRoute as b, createError as c, useNuxtApp as d, entry$1 as default, useRequestFetch as e, defineStore as f, useAuth as g, useRuntimeConfig as h, globalMiddleware as i, navigateTo as n, useHead as u };
//# sourceMappingURL=server.mjs.map
