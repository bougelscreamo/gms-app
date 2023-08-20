import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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

const _imports_0 = "" + buildAssetsURL("799px-OMRON_Logo.20f0b849.png");
const _imports_1 = "" + buildAssetsURL("cx-supervisor_splash_prod.964a0ee9.jpg");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "content" }, _attrs))}><div class="container-fluid" style="${ssrRenderStyle({ "padding-bottom": "10px" })}"><div class="card card-primary"><div class="card-header"> About </div></div><div class="card card-primary"><div class="card-body bg-dark" id="theContainer"><img class="img-fluid pad"${ssrRenderAttr("src", _imports_0)} alt="Omron"><p class="text-justify">Omron Corporation (\u30AA\u30E0\u30ED\u30F3\u682A\u5F0F\u4F1A\u793E, Omuron Kabushiki-gaisha), styled as OMRON, is a Japanese electronics company based in Kyoto, Japan. Omron was established by Kazuma Tateishi (\u7ACB\u77F3\u4E00\u771F) in 1933 (as the Tateishi Electric Manufacturing Company) and incorporated in 1948.</p><p class="text-justify">The company originated in an area of Kyoto called &quot;Omuro (\u5FA1\u5BA4)&quot;(ja), from which the name &quot;Omron&quot; was derived. Prior to 1990, the corporation was known as Omron Tateishi Electronics. During the 1980s and early 1990s, the company motto was: &quot;To the machine the work of machines, to man the thrill of further creation&quot;.</p><p class="text-justify">Omron&#39;s primary business is the manufacture and sale of automation components, equipment and systems. In the consumer and medical markets, it is known for medical equipment such as digital thermometers, blood pressure monitors and nebulizers. Omron developed the world&#39;s first electronic ticket gate,[5] which was named an IEEE Milestone in 2007,[6] and was one of the first manufacturers of automated teller machines (ATM)[7] with magnetic stripe card readers.</p><p class="text-justify">Omron Oilfield &amp; Marine is a provider of AC and DC drive systems and custom control systems for oil and gas and related industries.</p><p class="text-justify">Omron was named one of Thomson Reuters Top 100 Global Innovators in 2013.</p><a href="https://www.omron.com/" target="_blank">www.omron.com</a></div></div><div class="card card-primary"><div class="card-body bg-dark" id="theContainer"><img class="img-fluid pad"${ssrRenderAttr("src", _imports_1)} alt="Omron"><p class="text-justify">CX-Supervisor boasts powerful functions for a wide range of PC based HMI requirements. Simple applications can be created rapidly with the aid of a large number of predefined functions and libraries, and even very complex applications can be generated with a powerful programming language or VBScript\u2122. CX-Supervisor has an extremely simple, intuitive handling and high user friendliness. Importing ActiveX\xAE components makes it possible to create flexible applications and extend functionality.</p><p class="text-justify">CX-Supervisor is dedicated to the design and operation of PC visualisation and machine control. It is not only simple to use for small supervisory and control tasks, but it also offers a wealth of power for the design of the most sophisticated</p><a href="https://industrial.omron.eu/en/products/cx-supervisor" target="_blank">Website</a></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/About/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-5ddc65ab.mjs.map
