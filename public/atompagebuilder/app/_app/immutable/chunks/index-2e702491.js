function w(){}const lt=t=>t;function ct(t,e){for(const n in e)t[n]=e[n];return t}function Q(t){return t()}function G(){return Object.create(null)}function v(t){t.forEach(Q)}function F(t){return typeof t=="function"}function Ot(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let k;function Rt(t,e){return k||(k=document.createElement("a")),k.href=e,t===k.href}function ut(t){return Object.keys(t).length===0}function at(t,...e){if(t==null)return w;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Lt(t,e,n){t.$$.on_destroy.push(at(e,n))}function zt(t,e,n,i){if(t){const r=U(t,e,n,i);return t[0](r)}}function U(t,e,n,i){return t[1]&&i?ct(n.ctx.slice(),t[1](i(e))):n.ctx}function Bt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)c[o]=e.dirty[o]|r[o];return c}return e.dirty|r}return e.dirty}function Ht(t,e,n,i,r,c){if(r){const s=U(e,n,i,c);t.p(s,r)}}function Ft(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function It(t){return t??""}function Wt(t,e,n){return t.set(n),e}const V=typeof window<"u";let ft=V?()=>window.performance.now():()=>Date.now(),I=V?t=>requestAnimationFrame(t):w;const x=new Set;function X(t){x.forEach(e=>{e.c(t)||(x.delete(e),e.f())}),x.size!==0&&I(X)}function _t(t){let e;return x.size===0&&I(X),{promise:new Promise(n=>{x.add(e={c:t,f:n})}),abort(){x.delete(e)}}}let P=!1;function dt(){P=!0}function ht(){P=!1}function mt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function pt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const _=e[u];_.claim_order!==void 0&&l.push(_)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,_=(r>0&&e[n[r]].claim_order<=u?r+1:mt(1,r,h=>e[n[h]].claim_order,u))-1;i[l]=n[_]+1;const a=_+1;n[a]=l,r=Math.max(a,r)}const c=[],s=[];let o=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);c.reverse(),s.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<s.length;l++){for(;u<c.length&&s[l].claim_order>=c[u].claim_order;)u++;const _=u<c.length?c[u]:null;t.insertBefore(s[l],_)}}function yt(t,e){t.appendChild(e)}function Y(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function gt(t){const e=tt("style");return $t(Y(t),e),e.sheet}function $t(t,e){return yt(t.head||t,e),e.sheet}function bt(t,e){if(P){for(pt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Gt(t,e,n){P&&!n?bt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function Z(t){t.parentNode&&t.parentNode.removeChild(t)}function Jt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function tt(t){return document.createElement(t)}function W(t){return document.createTextNode(t)}function Kt(){return W(" ")}function Qt(){return W("")}function Ut(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Vt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Xt(t){return function(e){return e.stopPropagation(),t.call(this,e)}}function Yt(t){return function(e){e.target===this&&t.call(this,e)}}function Zt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function xt(t){return Array.from(t.childNodes)}function wt(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function et(t,e,n,i,r=!1){wt(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function vt(t,e,n,i){return et(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||c.push(o.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function te(t,e,n){return vt(t,e,n,tt)}function Et(t,e){return et(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>W(e),!0)}function ee(t){return Et(t," ")}function ne(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function ie(t,e){t.value=e??""}function re(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function se(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function oe(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}function le(t,e,n){t.classList[n?"add":"remove"](e)}function nt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function ce(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const c=r.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(r)):c===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function ue(t,e){return new t(e)}const T=new Map;let j=0;function Nt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function At(t,e){const n={stylesheet:gt(e),rules:{}};return T.set(t,n),n}function J(t,e,n,i,r,c,s,o=0){const l=16.666/i;let u=`{
`;for(let y=0;y<=1;y+=l){const g=e+(n-e)*c(y);u+=y*100+`%{${s(g,1-g)}}
`}const _=u+`100% {${s(n,1-n)}}
}`,a=`__svelte_${Nt(_)}_${o}`,h=Y(t),{stylesheet:f,rules:d}=T.get(h)||At(h,t);d[a]||(d[a]=!0,f.insertRule(`@keyframes ${a} ${_}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${i}ms linear ${r}ms 1 both`,j+=1,a}function St(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),j-=r,j||kt())}function kt(){I(()=>{j||(T.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&Z(e)}),T.clear())})}let A;function N(t){A=t}function q(){if(!A)throw new Error("Function called outside component initialization");return A}function ae(t){q().$$.on_mount.push(t)}function fe(t){q().$$.after_update.push(t)}function _e(t){q().$$.on_destroy.push(t)}function de(){const t=q();return(e,n,{cancelable:i=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=nt(e,n,{cancelable:i});return r.slice().forEach(s=>{s.call(t,c)}),!c.defaultPrevented}return!0}}const b=[],K=[],C=[],B=[],it=Promise.resolve();let H=!1;function rt(){H||(H=!0,it.then(st))}function he(){return rt(),it}function M(t){C.push(t)}function me(t){B.push(t)}const L=new Set;let $=0;function st(){if($!==0)return;const t=A;do{try{for(;$<b.length;){const e=b[$];$++,N(e),Ct(e.$$)}}catch(e){throw b.length=0,$=0,e}for(N(null),b.length=0,$=0;K.length;)K.pop()();for(let e=0;e<C.length;e+=1){const n=C[e];L.has(n)||(L.add(n),n())}C.length=0}while(b.length);for(;B.length;)B.pop()();H=!1,L.clear(),N(t)}function Ct(t){if(t.fragment!==null){t.update(),v(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}let E;function Dt(){return E||(E=Promise.resolve(),E.then(()=>{E=null})),E}function z(t,e,n){t.dispatchEvent(nt(`${e?"intro":"outro"}${n}`))}const D=new Set;let p;function pe(){p={r:0,c:[],p}}function ye(){p.r||v(p.c),p=p.p}function Tt(t,e){t&&t.i&&(D.delete(t),t.i(e))}function ge(t,e,n,i){if(t&&t.o){if(D.has(t))return;D.add(t),p.c.push(()=>{D.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const jt={duration:0};function $e(t,e,n,i){const r={direction:"both"};let c=e(t,n,r),s=i?0:1,o=null,l=null,u=null;function _(){u&&St(t,u)}function a(f,d){const m=f.b-s;return d*=Math.abs(m),{a:s,b:f.b,d:m,duration:d,start:f.start,end:f.start+d,group:f.group}}function h(f){const{delay:d=0,duration:m=300,easing:y=lt,tick:g=w,css:O}=c||jt,R={start:ft()+d,b:f};f||(R.group=p,p.r+=1),o||l?l=R:(O&&(_(),u=J(t,s,f,m,d,y,O)),f&&g(0,1),o=a(R,m),M(()=>z(t,f,"start")),_t(S=>{if(l&&S>l.start&&(o=a(l,m),l=null,z(t,o.b,"start"),O&&(_(),u=J(t,s,o.b,o.duration,0,y,c.css))),o){if(S>=o.end)g(s=o.b,1-s),z(t,o.b,"end"),l||(o.b?_():--o.group.r||v(o.group.c)),o=null;else if(S>=o.start){const ot=S-o.start;s=o.a+o.d*y(ot/o.duration),g(s,1-s)}}return!!(o||l)}))}return{run(f){F(c)?Dt().then(()=>{c=c(r),h(f)}):h(f)},end(){_(),o=l=null}}}const be=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function xe(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function we(t){t&&t.c()}function ve(t,e){t&&t.l(e)}function Mt(t,e,n,i){const{fragment:r,after_update:c}=t.$$;r&&r.m(e,n),i||M(()=>{const s=t.$$.on_mount.map(Q).filter(F);t.$$.on_destroy?t.$$.on_destroy.push(...s):v(s),t.$$.on_mount=[]}),c.forEach(M)}function Pt(t,e){const n=t.$$;n.fragment!==null&&(v(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function qt(t,e){t.$$.dirty[0]===-1&&(b.push(t),rt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ee(t,e,n,i,r,c,s,o=[-1]){const l=A;N(t);const u=t.$$={fragment:null,ctx:[],props:c,update:w,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:G(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};s&&s(u.root);let _=!1;if(u.ctx=n?n(t,e.props||{},(a,h,...f)=>{const d=f.length?f[0]:h;return u.ctx&&r(u.ctx[a],u.ctx[a]=d)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](d),_&&qt(t,a)),h}):[],u.update(),_=!0,v(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){dt();const a=xt(e.target);u.fragment&&u.fragment.l(a),a.forEach(Z)}else u.fragment&&u.fragment.c();e.intro&&Tt(t.$$.fragment),Mt(t,e.target,e.anchor,e.customElement),ht(),st()}N(l)}class Ne{$destroy(){Pt(this,1),this.$destroy=w}$on(e,n){if(!F(n))return w;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ut(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{oe as $,Pt as A,he as B,w as C,at as D,v as E,F,zt as G,Ht as H,Ft as I,Bt as J,bt as K,Lt as L,Ut as M,Jt as N,be as O,Xt as P,Vt as Q,le as R,Ne as S,Wt as T,xe as U,me as V,de as W,ie as X,It as Y,M as Z,se as _,Kt as a,ce as a0,$e as a1,Rt as a2,Yt as a3,_e as a4,Gt as b,ee as c,ye as d,Qt as e,Tt as f,pe as g,Z as h,Ee as i,fe as j,tt as k,te as l,xt as m,Zt as n,ae as o,re as p,W as q,Et as r,Ot as s,ge as t,ne as u,K as v,ue as w,we as x,ve as y,Mt as z};