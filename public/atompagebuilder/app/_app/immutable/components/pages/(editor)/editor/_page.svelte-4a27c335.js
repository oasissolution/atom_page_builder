import{S as W,i as L,s as H,G as Q,a as X,e as O,c as Y,b as E,H as Z,I as ee,J as te,f as y,g as B,d as J,t as S,h,N as ge,w as x,x as C,y as j,z as $,A as M,k as p,l as A,m as k,n as v,K as w,M as z,C as V,E as be,p as T,L as U,v as G,o as ie,q,r as R,u as le,$ as me}from"../../../../chunks/index-71d26060.js";/* empty css                             */import{l as K,d as ne,f as pe,a as se}from"../../../../chunks/globalfunctions-78bfe27e.js";import{w as Ae}from"../../../../chunks/index-3aac0c98.js";function re(f,e,n){const r=f.slice();return r[4]=e[n],r}function ke(f){let e,n,r;return e=new _e({props:{component:f[4],JsonOfModules:f[1]}}),{c(){C(e.$$.fragment),n=X()},l(s){j(e.$$.fragment,s),n=Y(s)},m(s,d){$(e,s,d),E(s,n,d),r=!0},p(s,d){const i={};d&1&&(i.component=s[4]),d&2&&(i.JsonOfModules=s[1]),e.$set(i)},i(s){r||(y(e.$$.fragment,s),r=!0)},o(s){S(e.$$.fragment,s),r=!1},d(s){M(e,s),s&&h(n)}}}function oe(f){let e,n,r;var s=f[1][f[4].type];function d(i){return{props:{data:i[4].data,uuid:i[4].uuid,selected:i[4].selected,$$slots:{default:[ke]},$$scope:{ctx:i}}}}return s&&(e=x(s,d(f))),{c(){e&&C(e.$$.fragment),n=O()},l(i){e&&j(e.$$.fragment,i),n=O()},m(i,l){e&&$(e,i,l),E(i,n,l),r=!0},p(i,l){const t={};if(l&1&&(t.data=i[4].data),l&1&&(t.uuid=i[4].uuid),l&1&&(t.selected=i[4].selected),l&11&&(t.$$scope={dirty:l,ctx:i}),s!==(s=i[1][i[4].type])){if(e){B();const u=e;S(u.$$.fragment,1,0,()=>{M(u,1)}),J()}s?(e=x(s,d(i)),C(e.$$.fragment),y(e.$$.fragment,1),$(e,n.parentNode,n)):e=null}else s&&e.$set(t)},i(i){r||(e&&y(e.$$.fragment,i),r=!0)},o(i){e&&S(e.$$.fragment,i),r=!1},d(i){i&&h(n),e&&M(e,i)}}}function ve(f){var u;let e,n,r;const s=f[2].default,d=Q(s,f,f[3],null);let i=((u=f[0])==null?void 0:u.children)??[],l=[];for(let o=0;o<i.length;o+=1)l[o]=oe(re(f,i,o));const t=o=>S(l[o],1,1,()=>{l[o]=null});return{c(){d&&d.c(),e=X();for(let o=0;o<l.length;o+=1)l[o].c();n=O()},l(o){d&&d.l(o),e=Y(o);for(let a=0;a<l.length;a+=1)l[a].l(o);n=O()},m(o,a){d&&d.m(o,a),E(o,e,a);for(let c=0;c<l.length;c+=1)l[c].m(o,a);E(o,n,a),r=!0},p(o,[a]){var c;if(d&&d.p&&(!r||a&8)&&Z(d,s,o,o[3],r?te(s,o[3],a,null):ee(o[3]),null),a&3){i=((c=o[0])==null?void 0:c.children)??[];let m;for(m=0;m<i.length;m+=1){const g=re(o,i,m);l[m]?(l[m].p(g,a),y(l[m],1)):(l[m]=oe(g),l[m].c(),y(l[m],1),l[m].m(n.parentNode,n))}for(B(),m=i.length;m<l.length;m+=1)t(m);J()}},i(o){if(!r){y(d,o);for(let a=0;a<i.length;a+=1)y(l[a]);r=!0}},o(o){S(d,o),l=l.filter(Boolean);for(let a=0;a<l.length;a+=1)S(l[a]);r=!1},d(o){d&&d.d(o),o&&h(e),ge(l,o),o&&h(n)}}}function we(f,e,n){let{$$slots:r={},$$scope:s}=e,{component:d}=e,{JsonOfModules:i}=e;return f.$$set=l=>{"component"in l&&n(0,d=l.component),"JsonOfModules"in l&&n(1,i=l.JsonOfModules),"$$scope"in l&&n(3,s=l.$$scope)},[d,i,r,s]}class _e extends W{constructor(e){super(),L(this,e,we,ve,H,{component:0,JsonOfModules:1})}}function ye(f){let e,n,r,s,d,i,l,t,u,o;return{c(){e=p("div"),n=p("div"),r=p("button"),s=p("i"),d=X(),i=p("div"),l=p("button"),t=p("i"),this.h()},l(a){e=A(a,"DIV",{class:!0});var c=k(e);n=A(c,"DIV",{});var m=k(n);r=A(m,"BUTTON",{class:!0});var g=k(r);s=A(g,"I",{class:!0}),k(s).forEach(h),g.forEach(h),m.forEach(h),d=Y(c),i=A(c,"DIV",{});var b=k(i);l=A(b,"BUTTON",{class:!0});var I=k(l);t=A(I,"I",{class:!0}),k(t).forEach(h),I.forEach(h),b.forEach(h),c.forEach(h),this.h()},h(){v(s,"class","bi bi-plus w-5 h-5 text-black"),v(r,"class","bg-transparent border-none w-6 h-6 p-0 m-0 text-black"),v(t,"class","bi bi-three-dots-vertical w-5 h-5 text-black"),v(l,"class","bg-transparent border-none w-6 h-6 p-0 m-0 text-black"),v(e,"class","flex flex-row w-16 gap-1 divide-x divide-black/40 place-content-center items-center content-center")},m(a,c){E(a,e,c),w(e,n),w(n,r),w(r,s),w(e,d),w(e,i),w(i,l),w(l,t),u||(o=[z(r,"click",fe),z(l,"click",fe)],u=!0)},p:V,i:V,o:V,d(a){a&&h(e),u=!1,be(o)}}}function fe(){alert("Button clicked!")}function Se(f,e,n){return["-6px","6px"]}let Ee=class extends W{constructor(e){super(),L(this,e,Se,ye,H,{marginX:0,marginY:1})}get marginX(){return this.$$.ctx[0]}get marginY(){return this.$$.ctx[1]}};function De(f){let e,n,r,s,d,i,l,t,u,o;return{c(){e=p("div"),n=p("div"),r=p("button"),s=p("i"),d=X(),i=p("div"),l=p("button"),t=p("i"),this.h()},l(a){e=A(a,"DIV",{class:!0});var c=k(e);n=A(c,"DIV",{});var m=k(n);r=A(m,"BUTTON",{class:!0});var g=k(r);s=A(g,"I",{class:!0}),k(s).forEach(h),g.forEach(h),m.forEach(h),d=Y(c),i=A(c,"DIV",{});var b=k(i);l=A(b,"BUTTON",{class:!0});var I=k(l);t=A(I,"I",{class:!0}),k(t).forEach(h),I.forEach(h),b.forEach(h),c.forEach(h),this.h()},h(){v(s,"class","bi bi-pen w-5 h-5 text-black"),v(r,"class","bg-transparent border-none w-6 h-6 p-0 m-0 text-black"),v(t,"class","bi bi-three-dots-vertical w-5 h-5 text-black"),v(l,"class","bg-transparent border-none w-6 h-6 p-0 m-0 text-black"),v(e,"class","flex flex-row w-16 gap-1 divide-x divide-black/40 place-content-center items-center content-center")},m(a,c){E(a,e,c),w(e,n),w(n,r),w(r,s),w(e,d),w(e,i),w(i,l),w(l,t),u||(o=[z(r,"click",de),z(l,"click",de)],u=!0)},p:V,i:V,o:V,d(a){a&&h(e),u=!1,be(o)}}}function de(){alert("Button clicked!")}function Pe(f,e,n){return["-6px","-38px"]}let Ie=class extends W{constructor(e){super(),L(this,e,Pe,De,H,{marginX:0,marginY:1})}get marginX(){return this.$$.ctx[0]}get marginY(){return this.$$.ctx[1]}};function ae(f){let e,n,r;var s=f[11][f[9]];function d(i){return{props:{}}}return s&&(e=x(s,d()),f[13](e)),{c(){e&&C(e.$$.fragment),n=O()},l(i){e&&j(e.$$.fragment,i),n=O()},m(i,l){e&&$(e,i,l),E(i,n,l),r=!0},p(i,l){const t={};if(s!==(s=i[11][i[9]])){if(e){B();const u=e;S(u.$$.fragment,1,0,()=>{M(u,1)}),J()}s?(e=x(s,d()),i[13](e),C(e.$$.fragment),y(e.$$.fragment,1),$(e,n.parentNode,n)):e=null}else s&&e.$set(t)},i(i){r||(e&&y(e.$$.fragment,i),r=!0)},o(i){e&&S(e.$$.fragment,i),r=!1},d(i){f[13](null),i&&h(n),e&&M(e,i)}}}function Te(f){let e,n,r=f[9]!=""&&ae(f);return{c(){e=p("div"),r&&r.c(),this.h()},l(s){e=A(s,"DIV",{id:!0,class:!0,style:!0});var d=k(e);r&&r.l(d),d.forEach(h),this.h()},h(){v(e,"id","atomSelectorActions"),v(e,"class","bg-white rounded-md absolute h-8 p-0 m-0 z-50 flex min-w-max items-center content-center svelte-wpvtg1"),T(e,"--selectorPositionDataWidth",f[4]),T(e,"--selectorPositionDataHeight",f[5]),T(e,"--selectorPositionDataLeft",f[6]),T(e,"--selectorPositionDataTop",f[7]),T(e,"--atomSelectorActionsWidth",f[8]),T(e,"--marginX",f[1]),T(e,"--marginY",f[2])},m(s,d){E(s,e,d),r&&r.m(e,null),f[14](e),n=!0},p(s,[d]){s[9]!=""?r?(r.p(s,d),d&512&&y(r,1)):(r=ae(s),r.c(),y(r,1),r.m(e,null)):r&&(B(),S(r,1,1,()=>{r=null}),J()),(!n||d&16)&&T(e,"--selectorPositionDataWidth",s[4]),(!n||d&32)&&T(e,"--selectorPositionDataHeight",s[5]),(!n||d&64)&&T(e,"--selectorPositionDataLeft",s[6]),(!n||d&128)&&T(e,"--selectorPositionDataTop",s[7]),(!n||d&256)&&T(e,"--atomSelectorActionsWidth",s[8]),(!n||d&2)&&T(e,"--marginX",s[1]),(!n||d&4)&&T(e,"--marginY",s[2])},i(s){n||(y(r),n=!0)},o(s){S(r),n=!1},d(s){s&&h(e),r&&r.d(),f[14](null)}}}function Oe(f,e,n){let r,s,d;U(f,K,D=>n(12,r=D)),U(f,ne,D=>n(15,s=D));let i,l=Ae("");U(f,l,D=>n(9,d=D));let t,u="100px",o="100px",a="-100px",c="-100px",m="68px",g="6px",b="6px";function I(){if(r!=null&&r!=null){const N=r.getBoundingClientRect();n(4,u=N.width.toString()+"px"),n(5,o=N.height.toString()+"px"),n(6,a=N.left.toString()+"px"),n(7,c=N.top.toString()+"px"),n(8,m=i.offsetWidth>60?i.offsetWidth.toString()+"px":"60px");var D=pe(s,r.id);l.set(D)}}const F={div:Ee,text:Ie};function _(D){G[D?"unshift":"push"](()=>{t=D,n(0,t)})}function P(D){G[D?"unshift":"push"](()=>{i=D,n(3,i)})}return f.$$.update=()=>{f.$$.dirty&7&&(t!==void 0?(n(1,g=t.marginX),n(2,b=t.marginY),console.log("marginX: "+g+"| marginY: "+b)):(n(1,g="-40px"),n(2,b="0px"))),f.$$.dirty&4096&&I()},[t,g,b,i,u,o,a,c,m,d,l,F,r,_,P]}class ue extends W{constructor(e){super(),L(this,e,Oe,Te,H,{})}}function Ne(f){let e,n,r;return{c(){e=p("div"),n=p("span"),r=q(f[2]),this.h()},l(s){e=A(s,"DIV",{class:!0});var d=k(e);n=A(d,"SPAN",{class:!0});var i=k(n);r=R(i,f[2]),i.forEach(h),d.forEach(h),this.h()},h(){v(n,"class",""),v(e,"class","w-full h-full flex align-middle justify-center content-center")},m(s,d){E(s,e,d),w(e,n),w(n,r)},p(s,d){d&4&&le(r,s[2])},d(s){s&&h(e)}}}function Ve(f){let e,n;const r=f[7].default,s=Q(r,f,f[6],null),d=s||Ne(f);return{c(){e=p("div"),d&&d.c(),this.h()},l(i){e=A(i,"DIV",{id:!0});var l=k(e);d&&d.l(l),l.forEach(h),this.h()},h(){v(e,"id",f[0])},m(i,l){E(i,e,l),d&&d.m(e,null),f[8](e),n=!0},p(i,[l]){s?s.p&&(!n||l&64)&&Z(s,r,i,i[6],n?te(r,i[6],l,null):ee(i[6]),null):d&&d.p&&(!n||l&4)&&d.p(i,n?l:-1),(!n||l&1)&&v(e,"id",i[0])},i(i){n||(y(d,i),n=!0)},o(i){S(d,i),n=!1},d(i){i&&h(e),d&&d.d(i),f[8](null)}}}function Ce(f,e,n){let{$$slots:r={},$$scope:s}=e,{uuid:d}=e,{selected:i}=e,{data:l}=e;const t=["class","dir","hidden","id","lang","style","title"];let u,o;ie(()=>{n(2,u=l.text!==void 0?l.text:"");var c="";i==!0&&(c+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),l.class!==void 0&&o.setAttribute("class",l.class+c),l.dir!==void 0&&o.setAttribute("dir",l.dir),l.hidden!==void 0&&o.setAttribute("hidden",l.hidden.toString()),l.id!==void 0&&o.setAttribute("id",l.id),l.lang!==void 0&&o.setAttribute("lang",l.lang),l.style!==void 0&&o.setAttribute("style",l.style),l.title!==void 0&&o.setAttribute("title",l.title)});function a(c){G[c?"unshift":"push"](()=>{o=c,n(1,o)})}return f.$$set=c=>{"uuid"in c&&n(0,d=c.uuid),"selected"in c&&n(3,i=c.selected),"data"in c&&n(4,l=c.data),"$$scope"in c&&n(6,s=c.$$scope)},f.$$.update=()=>{f.$$.dirty&26&&(()=>{if(l!==void 0&&o!==void 0){var c="";i==!0&&(c+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),l.class!==void 0&&o.setAttribute("class",l.class+c),l.dir!==void 0&&o.setAttribute("dir",l.dir),l.hidden!==void 0&&o.setAttribute("hidden",l.hidden.toString()),l.id!==void 0&&o.setAttribute("id",l.id),l.lang!==void 0&&o.setAttribute("lang",l.lang),l.style!==void 0&&o.setAttribute("style",l.style),l.title!==void 0&&o.setAttribute("title",l.title)}})(),f.$$.dirty&26&&(()=>{if(i!==void 0&&o!==void 0){var c="";i==!0&&(c+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),l.class!==void 0&&o.setAttribute("class",l.class+c)}})()},[d,o,u,i,l,t,s,r,a]}class $e extends W{constructor(e){super(),L(this,e,Ce,Ve,H,{uuid:0,selected:3,data:4,elAttr:5})}get elAttr(){return this.$$.ctx[5]}}function Me(f){let e,n;return{c(){e=p("div"),n=q("This is a blank div!"),this.h()},l(r){e=A(r,"DIV",{class:!0});var s=k(e);n=R(s,"This is a blank div!"),s.forEach(h),this.h()},h(){v(e,"class","w-full h-full place-content-center text-slate-300")},m(r,s){E(r,e,s),w(e,n)},p:V,d(r){r&&h(e)}}}function Xe(f){let e,n,r,s;const d=f[8].default,i=Q(d,f,f[7],null),l=i||Me();return{c(){e=p("div"),l&&l.c(),this.h()},l(t){e=A(t,"DIV",{id:!0});var u=k(e);l&&l.l(u),u.forEach(h),this.h()},h(){v(e,"id",f[0])},m(t,u){E(t,e,u),l&&l.m(e,null),f[9](e),n=!0,r||(s=z(e,"mousedown",me(f[2])),r=!0)},p(t,[u]){i&&i.p&&(!n||u&128)&&Z(i,d,t,t[7],n?te(d,t[7],u,null):ee(t[7]),null),(!n||u&1)&&v(e,"id",t[0])},i(t){n||(y(l,t),n=!0)},o(t){S(l,t),n=!1},d(t){t&&h(e),l&&l.d(t),f[9](null),r=!1,s()}}}function Ye(f,e,n){let r;U(f,K,g=>n(10,r=g));let{$$slots:s={},$$scope:d}=e,{uuid:i}=e,{selected:l}=e,{data:t}=e;const u=["accesskey","class","contenteditable","dir","draggable","hidden","id","lang","spellcheck","style","tabindex","title"];let o,a=r;ie(()=>{t.accesskey!==void 0&&o.setAttribute("accesskey",t.accesskey),t.contenteditable!==void 0&&o.setAttribute("contenteditable",t.contenteditable),t.draggable!==void 0&&o.setAttribute("draggable",t.draggable),t.spellcheck!==void 0&&o.setAttribute("spellcheck",t.spellcheck.toString()),t.tabindex!==void 0&&o.setAttribute("tabindex",t.tabindex.toString());var g="";t.class!==void 0&&o.setAttribute("class",t.class+g),t.dir!==void 0&&o.setAttribute("dir",t.dir),t.hidden!==void 0&&o.setAttribute("hidden",t.hidden.toString()),t.id!==void 0&&o.setAttribute("id",t.id),t.lang!==void 0&&o.setAttribute("lang",t.lang),t.style!==void 0&&o.setAttribute("style",t.style),t.title!==void 0&&o.setAttribute("title",t.title)});function c(){window.parent.postMessage(i,"*"),n(6,a=o)}function m(g){G[g?"unshift":"push"](()=>{o=g,n(1,o)})}return f.$$set=g=>{"uuid"in g&&n(0,i=g.uuid),"selected"in g&&n(3,l=g.selected),"data"in g&&n(4,t=g.data),"$$scope"in g&&n(7,d=g.$$scope)},f.$$.update=()=>{f.$$.dirty&64&&K.set(a),f.$$.dirty&26&&(()=>{if(t!==void 0&&o!==void 0){t.accesskey!==void 0&&o.setAttribute("accesskey",t.accesskey),t.contenteditable!==void 0&&o.setAttribute("contenteditable",t.contenteditable),t.draggable!==void 0&&o.setAttribute("draggable",t.draggable),t.spellcheck!==void 0&&o.setAttribute("spellcheck",t.spellcheck.toString()),t.tabindex!==void 0&&o.setAttribute("tabindex",t.tabindex.toString());var g="";l==!0&&(g+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),t.class!==void 0&&o.setAttribute("class",t.class+g),t.dir!==void 0&&o.setAttribute("dir",t.dir),t.hidden!==void 0&&o.setAttribute("hidden",t.hidden.toString()),t.id!==void 0&&o.setAttribute("id",t.id),t.lang!==void 0&&o.setAttribute("lang",t.lang),t.style!==void 0&&o.setAttribute("style",t.style),t.title!==void 0&&o.setAttribute("title",t.title)}})(),f.$$.dirty&26&&(()=>{if(l!==void 0&&o!==void 0){var g="";l==!0&&(g+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),t.class!==void 0&&o.setAttribute("class",t.class+g)}})()},[i,o,c,l,t,u,a,d,s,m]}class Be extends W{constructor(e){super(),L(this,e,Ye,Xe,H,{uuid:0,selected:3,data:4,elAttr:5})}get elAttr(){return this.$$.ctx[5]}}function Je(f){let e;return{c(){e=q("Default Text")},l(n){e=R(n,"Default Text")},m(n,r){E(n,e,r)},d(n){n&&h(e)}}}function xe(f){let e,n,r,s,d,i;const l=f[9].default,t=Q(l,f,f[8],null),u=t||Je();return{c(){e=p("div"),u&&u.c(),n=X(),r=q(f[0]),this.h()},l(o){e=A(o,"DIV",{id:!0});var a=k(e);u&&u.l(a),n=Y(a),r=R(a,f[0]),a.forEach(h),this.h()},h(){v(e,"id",f[1])},m(o,a){E(o,e,a),u&&u.m(e,null),w(e,n),w(e,r),f[10](e),s=!0,d||(i=z(e,"mousedown",me(f[3])),d=!0)},p(o,[a]){t&&t.p&&(!s||a&256)&&Z(t,l,o,o[8],s?te(l,o[8],a,null):ee(o[8]),null),(!s||a&1)&&le(r,o[0]),(!s||a&2)&&v(e,"id",o[1])},i(o){s||(y(u,o),s=!0)},o(o){S(u,o),s=!1},d(o){o&&h(e),u&&u.d(o),f[10](null),d=!1,i()}}}function We(f,e,n){let r;U(f,K,b=>n(11,r=b));let{$$slots:s={},$$scope:d}=e,{uuid:i}=e,{selected:l}=e,{data:t}=e;const u=["accesskey","class","contenteditable","dir","draggable","hidden","id","lang","spellcheck","style","tabindex","title"];let{text:o}=e,a,c=r;ie(()=>{n(0,o=t.text!==void 0?t.text:""),t.accesskey!==void 0&&a.setAttribute("accesskey",t.accesskey),t.contenteditable!==void 0&&a.setAttribute("contenteditable",t.contenteditable),t.draggable!==void 0&&a.setAttribute("draggable",t.draggable),t.spellcheck!==void 0&&a.setAttribute("spellcheck",t.spellcheck.toString()),t.tabindex!==void 0&&a.setAttribute("tabindex",t.tabindex.toString());var b="";l==!0&&(b+="outline-dashed outline-2 outline-offset-2 outline-sky-500"),t.class!==void 0&&a.setAttribute("class",t.class+b),t.dir!==void 0&&a.setAttribute("dir",t.dir),t.hidden!==void 0&&a.setAttribute("hidden",t.hidden.toString()),t.id!==void 0&&a.setAttribute("id",t.id),t.lang!==void 0&&a.setAttribute("lang",t.lang),t.style!==void 0&&a.setAttribute("style",t.style),t.title!==void 0&&a.setAttribute("title",t.title)});function m(){window.parent.postMessage(i,"*"),n(7,c=a)}function g(b){G[b?"unshift":"push"](()=>{a=b,n(2,a)})}return f.$$set=b=>{"uuid"in b&&n(1,i=b.uuid),"selected"in b&&n(4,l=b.selected),"data"in b&&n(5,t=b.data),"text"in b&&n(0,o=b.text),"$$scope"in b&&n(8,d=b.$$scope)},f.$$.update=()=>{f.$$.dirty&128&&K.set(c),f.$$.dirty&52&&(()=>{if(t!==void 0&&a!==void 0){t.accesskey!==void 0&&a.setAttribute("accesskey",t.accesskey),t.contenteditable!==void 0&&a.setAttribute("contenteditable",t.contenteditable),t.draggable!==void 0&&a.setAttribute("draggable",t.draggable),t.spellcheck!==void 0&&a.setAttribute("spellcheck",t.spellcheck.toString()),t.tabindex!==void 0&&a.setAttribute("tabindex",t.tabindex.toString());var b="";l==!0&&(b+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),t.class!==void 0&&a.setAttribute("class",t.class+b),t.dir!==void 0&&a.setAttribute("dir",t.dir),t.hidden!==void 0&&a.setAttribute("hidden",t.hidden.toString()),t.id!==void 0&&a.setAttribute("id",t.id),t.lang!==void 0&&a.setAttribute("lang",t.lang),t.style!==void 0&&a.setAttribute("style",t.style),t.title!==void 0&&a.setAttribute("title",t.title),n(0,o=t.text!==void 0?t.text:"")}})(),f.$$.dirty&52&&(()=>{if(l!==void 0&&a!==void 0){var b="";l==!0&&(b+=" outline-dashed outline-2 outline-offset-2 outline-sky-500"),t.class!==void 0&&a.setAttribute("class",t.class+b)}})()},[o,i,a,m,l,t,u,c,d,s,g]}class Le extends W{constructor(e){super(),L(this,e,We,xe,H,{uuid:1,selected:4,data:5,elAttr:6,text:0})}get elAttr(){return this.$$.ctx[6]}}function ce(f,e,n){const r=f.slice();return r[5]=e[n],r}function He(f){let e,n,r;return{c(){e=p("div"),n=p("span"),r=q("Loading..."),this.h()},l(s){e=A(s,"DIV",{class:!0});var d=k(e);n=A(d,"SPAN",{});var i=k(n);r=R(i,"Loading..."),i.forEach(h),d.forEach(h),this.h()},h(){v(e,"class","w-[100vw] h-[100vh] flex justify-center align-middle content-center text-2x")},m(s,d){E(s,e,d),w(e,n),w(n,r)},p:V,i:V,o:V,d(s){s&&h(e)}}}function Ue(f){let e,n,r=f[0],s=[];for(let i=0;i<r.length;i+=1)s[i]=he(ce(f,r,i));const d=i=>S(s[i],1,1,()=>{s[i]=null});return{c(){for(let i=0;i<s.length;i+=1)s[i].c();e=O()},l(i){for(let l=0;l<s.length;l+=1)s[l].l(i);e=O()},m(i,l){for(let t=0;t<s.length;t+=1)s[t].m(i,l);E(i,e,l),n=!0},p(i,l){if(l&3){r=i[0];let t;for(t=0;t<r.length;t+=1){const u=ce(i,r,t);s[t]?(s[t].p(u,l),y(s[t],1)):(s[t]=he(u),s[t].c(),y(s[t],1),s[t].m(e.parentNode,e))}for(B(),t=r.length;t<s.length;t+=1)d(t);J()}},i(i){if(!n){for(let l=0;l<r.length;l+=1)y(s[l]);n=!0}},o(i){s=s.filter(Boolean);for(let l=0;l<s.length;l+=1)S(s[l]);n=!1},d(i){ge(s,i),i&&h(e)}}}function ze(f){let e,n,r;return e=new _e({props:{component:f[5],JsonOfModules:f[1]}}),{c(){C(e.$$.fragment),n=X()},l(s){j(e.$$.fragment,s),n=Y(s)},m(s,d){$(e,s,d),E(s,n,d),r=!0},p(s,d){const i={};d&1&&(i.component=s[5]),e.$set(i)},i(s){r||(y(e.$$.fragment,s),r=!0)},o(s){S(e.$$.fragment,s),r=!1},d(s){M(e,s),s&&h(n)}}}function he(f){let e,n,r;var s=f[1][f[5].type];function d(i){return{props:{data:i[5].data,uuid:i[5].uuid,selected:i[5].selected,$$slots:{default:[ze]},$$scope:{ctx:i}}}}return s&&(e=x(s,d(f))),{c(){e&&C(e.$$.fragment),n=O()},l(i){e&&j(e.$$.fragment,i),n=O()},m(i,l){e&&$(e,i,l),E(i,n,l),r=!0},p(i,l){const t={};if(l&1&&(t.data=i[5].data),l&1&&(t.uuid=i[5].uuid),l&1&&(t.selected=i[5].selected),l&257&&(t.$$scope={dirty:l,ctx:i}),s!==(s=i[1][i[5].type])){if(e){B();const u=e;S(u.$$.fragment,1,0,()=>{M(u,1)}),J()}s?(e=x(s,d(i)),C(e.$$.fragment),y(e.$$.fragment,1),$(e,n.parentNode,n)):e=null}else s&&e.$set(t)},i(i){r||(e&&y(e.$$.fragment,i),r=!0)},o(i){e&&S(e.$$.fragment,i),r=!1},d(i){i&&h(n),e&&M(e,i)}}}function je(f){let e,n,r,s,d,i,l=JSON.stringify(f[0],null,2)+"",t,u,o,a,c;const m=[Ue,He],g=[];function b(_,P){return _[0]?0:1}n=b(f),r=g[n]=m[n](f);var I=ue;function F(_){return{}}return I&&(o=x(I,F())),{c(){e=p("div"),r.c(),s=X(),d=p("div"),i=p("pre"),t=q(l),u=X(),o&&C(o.$$.fragment),a=O(),this.h()},l(_){e=A(_,"DIV",{id:!0,class:!0});var P=k(e);r.l(P),s=Y(P),d=A(P,"DIV",{class:!0});var D=k(d);i=A(D,"PRE",{class:!0});var N=k(i);t=R(N,l),N.forEach(h),D.forEach(h),P.forEach(h),u=Y(_),o&&j(o.$$.fragment,_),a=O(),this.h()},h(){v(i,"class","text-[10px]"),v(d,"class","flex flex-row"),v(e,"id","editorInnerPanel"),v(e,"class","svelte-1r572z")},m(_,P){E(_,e,P),g[n].m(e,null),w(e,s),w(e,d),w(d,i),w(i,t),E(_,u,P),o&&$(o,_,P),E(_,a,P),c=!0},p(_,[P]){let D=n;if(n=b(_),n===D?g[n].p(_,P):(B(),S(g[D],1,1,()=>{g[D]=null}),J(),r=g[n],r?r.p(_,P):(r=g[n]=m[n](_),r.c()),y(r,1),r.m(e,s)),(!c||P&1)&&l!==(l=JSON.stringify(_[0],null,2)+"")&&le(t,l),I!==(I=ue)){if(o){B();const N=o;S(N.$$.fragment,1,0,()=>{M(N,1)}),J()}I?(o=x(I,F()),C(o.$$.fragment),y(o.$$.fragment,1),$(o,a.parentNode,a)):o=null}},i(_){c||(y(r),o&&y(o.$$.fragment,_),c=!0)},o(_){S(r),o&&S(o.$$.fragment,_),c=!1},d(_){_&&h(e),g[n].d(),_&&h(u),_&&h(a),o&&M(o,_)}}}function qe(f,e,n){let r,s;U(f,ne,t=>n(0,r=t)),U(f,se,t=>n(4,s=t));let d=s,i=r;ie(()=>{window.addEventListener("message",t=>{if(t.origin!==window.location.origin)return;const u=t.data.message;u===void 0?console.log("Incoming data do not have message!"):(n(3,i=u.componentCollection),n(2,d=u.editorPreferences))})});const l={body:$e,div:Be,text:Le};return f.$$.update=()=>{f.$$.dirty&4&&se.set(d),f.$$.dirty&8&&ne.set(i)},[r,l,d,i]}class et extends W{constructor(e){super(),L(this,e,qe,je,H,{})}}export{et as default};
