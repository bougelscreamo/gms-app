import{_ as u}from"./nuxt-link.0330aa19.js";import{o as l,c as d,a as t,F as h,m as f,t as s,b as m,w as b,d as g,r as y,g as L,i as M,n as P,j as n,k as T,B as $,l as _}from"./entry.69edd33e.js";import{u as w}from"./data.8bfc3874.js";import"./sweetalert2.all.7ef268f0.js";const H={class:"card-body",id:"theContainer"},R={class:"card card-primary"},N=t("div",{class:"card-header text-center"},[t("h3",{class:"card-title"},"TEMPERATURE & HUMIDITY")],-1),V={class:"card-body card-body-monitoring"},A={class:"table table-bordered text-center"},E=t("thead",{class:"bg-secondary"},[t("tr",{class:"bg-dark-gray"},[t("th",null,"No"),t("th",null,"Last Record"),t("th",null,"Room ID"),t("th",null,"Tag"),t("th",null,"Present Value"),t("th",null,"Min"),t("th",null,"Avg"),t("th",null,"Max"),t("th",null,"Low Limit"),t("th",null,"High Limit"),t("th",null,"Actions")])],-1),S={class:"bg-dark"},C={class:"bg-dark"},I=t("td",null,"--",-1),B=t("td",null,"--",-1),F={__name:"TH",props:{title:String,data:Object},setup(i){return(c,r)=>{const o=u;return l(),d("div",H,[t("div",R,[N,t("div",V,[t("table",A,[E,t("tbody",null,[(l(!0),d(h,null,f(i.data,(a,e)=>(l(),d("tr",{key:e},[t("td",null,s(e+1),1),t("td",null,s(a.lastrecord),1),t("td",S,s(a.roomid),1),t("td",C,s(a.tag),1),t("td",null,s(a.data),1),t("td",null,s(a.min),1),t("td",null,s(a.avg),1),t("td",null,s(a.max),1),I,B,t("td",null,[m(o,{to:`/Monitoring/Detail-TH/${e}`,class:"btn btn-success btn-sm"},{default:b(()=>[g("View")]),_:2},1032,["to"])])]))),128))])])])])])}}},U=F,j={class:"card-body",id:"theContainer"},O={class:"card card-primary"},z=t("div",{class:"card-header text-center"},[t("h3",{class:"card-title"},"DIFFERENTIAL PRESSURE")],-1),Y={class:"card-body card-body-monitoring"},q={class:"table table-bordered text-center"},G=t("thead",{class:"bg-secondary"},[t("tr",{class:"bg-dark-gray"},[t("th",null,"No"),t("th",null,"Last Record"),t("th",null,"Room ID (+)"),t("th",null,[t("i",{class:"fas fa-arrows-alt-h"})]),t("th",null,"Room ID (-)"),t("th",null,"Present Value"),t("th",null,"Min"),t("th",null,"Avg"),t("th",null,"Max"),t("th",null,"Low Limit"),t("th",null,"High Limit"),t("th",null,"Actions")])],-1),J={class:"bg-dark"},K=t("td",{class:"bg-dark"},[t("i",{class:"fas fa-arrows-alt-h"})],-1),Q={class:"bg-dark"},W={class:"bg-dark"},X={__name:"DP",props:{title:String,data:Object},setup(i){return(c,r)=>{const o=u;return l(),d("div",j,[t("div",O,[z,t("div",Y,[t("table",q,[G,t("tbody",null,[(l(!0),d(h,null,f(i.data,(a,e)=>(l(),d("tr",{key:e},[t("td",null,s(e+1),1),t("td",null,s(a.lastrecord),1),t("td",J,s(a.roomid),1),K,t("td",Q,s(a.taglink),1),t("td",null,s(a.data),1),t("td",null,s(a.min),1),t("td",null,s(a.avg),1),t("td",null,s(a.max),1),t("td",null,s(a.sv_min),1),t("td",null,s(a.sv_max),1),t("td",W,[m(o,{to:`/Monitoring/Detail-DP/${e}`,class:"btn btn-success btn-sm"},{default:b(()=>[g("View")]),_:2},1032,["to"])])]))),128))])])])])])}}},Z=X;const tt={class:"content"},at={class:"container-fluid",style:{"padding-bottom":"10px"}},st={class:"card card-primary"},et={class:"card-header"},lt={class:"card-tools"},ot={class:"nav nav-pills ml-auto"},nt={key:0,class:"fas fa-bell nav-link",style:{"font-size":"larger",animation:"blink 1s linear infinite"}},dt={class:"nav-item"},it=t("option",{value:"TH"},"TH",-1),ct=t("option",{value:"DP"},"DP",-1),rt=[it,ct],_t={class:"row"},ut={class:"col-md-12"},ht=t("div",{class:"modal fade",id:"exampleModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},[t("div",{class:"modal-dialog",role:"document"},[t("div",{class:"modal-content"},[t("div",{class:"modal-header"},[t("h5",{class:"modal-title",id:"exampleModalLabel"},"Modal title"),t("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},[t("span",{"aria-hidden":"true"},"×")])]),t("div",{class:"modal-body"},"..."),t("div",{class:"modal-footer"},[t("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal"}," Close "),t("button",{type:"button",class:"btn btn-primary"},"Save changes")])])])],-1),yt={__name:"index",async setup(i){let c,r;const o=w();let a=y(!1),e=y("DP");return[c,r]=L(()=>o.getMonitoring()),await c,r(),(mt,p)=>{const x=u,k=U,D=Z;return l(),d(h,null,[t("div",tt,[t("div",at,[t("div",st,[t("div",et,[g(" Monitoring "),t("div",lt,[t("ul",ot,[t("li",null,[m(x,{to:"/AlarmHistory"},{default:b(()=>[n(a)?(l(),d("i",nt)):_("",!0)]),_:1})]),t("li",dt,[M(t("select",{class:"form-control","onUpdate:modelValue":p[0]||(p[0]=v=>T(e)?e.value=v:e=v)},rt,512),[[P,n(e)]])])])])]),t("div",_t,[t("div",ut,[n(e)=="TH"?(l(),$(k,{key:0,title:n(o).$state.data.monitoring.data.realtime.TH[0].tag_group,data:n(o).$state.data.monitoring.data.realtime.TH},null,8,["title","data"])):_("",!0),n(e)=="DP"?(l(),$(D,{key:1,title:n(o).$state.data.monitoring.data.realtime.DP[0].tag_group,data:n(o).$state.data.monitoring.data.realtime.DP},null,8,["title","data"])):_("",!0)])])])])]),ht],64)}}};export{yt as default};
