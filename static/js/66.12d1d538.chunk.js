"use strict";(self.webpackChunkevent_shop=self.webpackChunkevent_shop||[]).push([[66],{1510:(e,t,s)=>{s.r(t),s.d(t,{default:()=>H});var n,r=s(7689),a=s(2791),c=s(4116),i=s(8917),o=s(4420),l=s(168);const d=s(6487).ZP.div(n||(n=(0,l.Z)(["\ndisplay: flex;\nflex-direction: row;\nwidth: 100%;\njustify-content: start;\nalign-items: start;\n"])));var x=s(2941),h=s(8028),p=s(4191),u=s(8237),j=s(8191);var f=s(2008),m=s(697),g=s(3400),v=s(2571),y=s(1747),Z=s(417),w=s(4281),S=s(9982),k=s(1087),N=s(3329);const C=e=>{let{orders:t,active_events:s,messages:n}=e;const r=(0,o.I0)();let a=[];for(const i in t)"new"===t[i].status&&a.push(t[i]);let c=[];for(const i in n)"new"===n[i].status&&c.push(n[i]);return(0,N.jsx)(m.Z,{display:"flex",justifyContent:"end",p:2,children:(0,N.jsxs)(m.Z,{display:"flex",children:[(0,N.jsx)(k.rU,{to:"messages",children:(0,N.jsxs)(g.Z,{onClick:e=>{var t;null===(t=document.querySelector(".messages"))||void 0===t||t.click()},children:[(0,N.jsx)(w.Z,{}),(0,N.jsx)("p",{children:c.length})]})}),(0,N.jsx)(k.rU,{to:"orders",children:(0,N.jsxs)(g.Z,{onClick:e=>{var t;null===(t=document.querySelector(".orders"))||void 0===t||t.click()},children:[(0,N.jsx)(v.Z,{}),(0,N.jsx)("p",{children:a.length})]})}),(0,N.jsx)(k.rU,{to:"activate_events",children:(0,N.jsxs)(g.Z,{onClick:e=>{var t;null===(t=document.querySelector(".activate_events"))||void 0===t||t.click()},children:[(0,N.jsx)(Z.Z,{}),(0,N.jsx)("p",{children:s.length})]})}),(0,N.jsx)(g.Z,{onClick:()=>{r((0,S.ni)())},children:(0,N.jsx)(y.Z,{})})]})})};var b=s(1975),I=s(3967),E=s(890),_=(s(1635),s(6183)),W=s(7374),T=s(617),A=s(1772),Q=s(4390),U=s(6577),q=s(8082),M=s(1607),D=s(5505),P=s(4217);const R=e=>{let{title:t,to:s,icon:n,selected:r,setSelected:a,className:c}=e;const i=(0,I.Z)(),o=(0,M.TV)(i.palette.mode);return(0,N.jsxs)(b.sN,{active:r===t,style:{color:o.grey[100]},onClick:()=>a(t),icon:n,children:[(0,N.jsx)(E.Z,{className:c,children:t}),(0,N.jsx)(k.rU,{to:s})]})},V=()=>{const e=(0,I.Z)(),t=(0,M.TV)(e.palette.mode),[s,n]=(0,a.useState)(!1),[r,c]=(0,a.useState)("Dashboard"),i=(0,o.v9)(P.PR),l=(0,o.v9)(P.Dm);let d;return""!==l&&void 0!==l&&(d="https://event-shop-backend.vercel.app/uploads/avatars/"+l.split("/")[l.split("/").length-1]),(0,N.jsx)(m.Z,{sx:{"& .pro-sidebar-inner":{background:"".concat(t.primary[400]," !important")},"& .pro-icon-wrapper":{backgroundColor:"transparent !important"},"& .pro-inner-item":{padding:"5px 35px 5px 20px !important"},"& .pro-inner-item:hover":{color:"#868dfb !important"},"& .pro-menu-item.active":{color:"#6870fa !important"}},children:(0,N.jsx)(b.M7,{collapsed:s,children:(0,N.jsxs)(b.v2,{iconShape:"square",children:[(0,N.jsx)(b.sN,{onClick:()=>n(!s),icon:s?(0,N.jsx)(Q.Z,{}):void 0,style:{margin:"10px 0 20px 0",color:t.grey[100]},children:!s&&(0,N.jsxs)(m.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",ml:"15px",children:[(0,N.jsx)(E.Z,{variant:"h4",color:t.grey[100],textTransform:"capitalize",children:i.role}),(0,N.jsx)(g.Z,{onClick:()=>n(!s),children:(0,N.jsx)(Q.Z,{})})]})}),!s&&(0,N.jsxs)(m.Z,{mb:"25px",children:[(0,N.jsx)(m.Z,{display:"flex",justifyContent:"center",alignItems:"center",children:(0,N.jsx)("img",{alt:"profile-user",width:"100px",height:"100px",src:d||D,style:{cursor:"pointer",borderRadius:"50%"}})}),(0,N.jsxs)(m.Z,{textAlign:"center",children:[(0,N.jsx)(E.Z,{variant:"h4",color:t.grey[100],fontWeight:"bold",sx:{m:"10px 0 0 0"},textTransform:"uppercase",children:i.name}),(0,N.jsx)(E.Z,{variant:"h5",color:t.greenAccent[500],textTransform:"uppercase",children:i.role})]})]}),(0,N.jsxs)(m.Z,{paddingLeft:s?void 0:"10%",children:[(0,N.jsx)(R,{title:"Messages",to:"messages",icon:(0,N.jsx)(_.Z,{}),selected:r,setSelected:c,className:"messages"}),(0,N.jsx)(E.Z,{variant:"h6",color:t.grey[300],sx:{m:"15px 0 5px 20px"},children:"Data"}),(0,N.jsx)(R,{title:"Manage Team",to:"specialists",icon:(0,N.jsx)(W.Z,{}),selected:r,setSelected:c,className:"specialists"}),(0,N.jsx)(R,{title:"Manage Category",to:"categories",icon:(0,N.jsx)(U.Z,{}),selected:r,setSelected:c,className:"categories"}),(0,N.jsx)(R,{title:"Events Information",to:"events",icon:(0,N.jsx)(T.Z,{}),selected:r,setSelected:c,className:"events"}),(0,N.jsx)(R,{title:"Activate event",to:"activate_events",icon:(0,N.jsx)(q.Z,{}),selected:r,setSelected:c,className:"activate_events"}),(0,N.jsx)(R,{title:"Orders",to:"orders",icon:(0,N.jsx)(A.Z,{}),selected:r,setSelected:c,className:"orders"})]})]})})})};var z=s(1231),F=s(9614);const H=()=>{const[e,t]=(0,a.useState)([]),[s,n]=(0,a.useState)([]),[l,m]=(0,a.useState)([]),[g,v]=(0,a.useState)([]),[y,Z]=(0,a.useState)([]),[w,S]=(0,a.useState)([]),[k,b]=(0,a.useState)(!1),[I,E]=(0,a.useState)(null),_=(0,o.I0)();return(0,a.useEffect)((()=>{!async function(){b(!0);try{const{data:e}=await(0,i.rQ)("/categories");if(_((0,p.n3)({...e})),!e)return(0,h.NI)("Whoops, something went wrong");t(e)}catch(I){E(I)}finally{b(!1)}}()}),[]),(0,a.useEffect)((()=>{!async function(){b(!0);try{const{data:e}=await(0,i.rQ)("/specialists");if(_((0,u.I)({...e})),!e)return(0,h.NI)("Whoops, something went wrong");n(e)}catch(I){E(I)}finally{b(!1)}}()}),[]),(0,a.useEffect)((()=>{!async function(){b(!0);try{const{data:t}=await(0,i.rQ)("/events");if(_((e={...t},t=>{t(j.vg.actions.getEvents({...e}))})),!t)return(0,h.NI)("Whoops, something went wrong");m(t)}catch(I){E(I)}finally{b(!1)}var e}()}),[]),(0,a.useEffect)((()=>{!async function(){b(!0);try{const{data:e}=await(0,i.rQ)("/active_events");if(_((0,f.E)({...e})),!e)return(0,h.NI)("Whoops, something went wrong");v(e)}catch(I){E(I)}finally{b(!1)}}()}),[]),(0,a.useEffect)((()=>{!async function(){b(!0);try{const{data:e}=await(0,i.rQ)("/orders");if(_((0,z.A)({...e})),!e)return(0,h.NI)("Whoops, something went wrong");Z(e)}catch(I){E(I)}finally{b(!1)}}()}),[]),(0,a.useEffect)((()=>{!async function(){b(!0);try{const{data:e}=await(0,i.rQ)("/messages");if(_((0,F._U)({...e})),!e)return(0,h.NI)("Whoops, something went wrong");S(e)}catch(I){E(I)}finally{b(!1)}}()}),[]),(0,a.useEffect)((()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}),[]),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(c.H,{title:"Administration",description:"Page Administration"}),k?(0,x.j)():(0,x.l)(),I&&(0,h.NI)("Whoops, something went wrong"),(0,N.jsx)(C,{orders:y,active_events:g,messages:w}),(0,N.jsxs)(d,{children:[(0,N.jsx)(V,{}),(0,N.jsx)(r.j3,{})]})]})}}}]);
//# sourceMappingURL=66.12d1d538.chunk.js.map