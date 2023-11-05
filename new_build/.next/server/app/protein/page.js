(()=>{var e={};e.id=52,e.ids=[52],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},93767:(e,t,i)=>{"use strict";i.r(t),i.d(t,{GlobalError:()=>n.a,__next_app__:()=>x,originalPathname:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=i(67096),r=i(16132),l=i(37284),n=i.n(l),a=i(32564),o={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>a[e]);i.d(t,o);let d=["",{children:["protein",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(i.bind(i,62489)),"C:\\Users\\denys\\Documents\\GitHub\\gameplay-planner\\src\\app\\protein\\page.js"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(i.bind(i,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(i.bind(i,31941)),"C:\\Users\\denys\\Documents\\GitHub\\gameplay-planner\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(i.t.bind(i,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(i.bind(i,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["C:\\Users\\denys\\Documents\\GitHub\\gameplay-planner\\src\\app\\protein\\page.js"],p="/protein/page",x={require:i,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/protein/page",pathname:"/protein",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},7858:(e,t,i)=>{Promise.resolve().then(i.bind(i,62071))},62071:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>Protein});var s=i(30784),r=i(9885),l=i(3779),n=i(25628),a=i(11263),o=i(92989),d=i(35877),c=i.n(d),p=i(52451),x=i.n(p);let protein_AssemblyItem=({e,currentWeights:t,setCurrentWeights:i})=>{let[n,a]=c()(`assemblyBonusWeight-${e.id}`,-1);return(0,r.useEffect)(()=>{i(t=>{if(t[e.id]){if(t[e.id]!==(-1===n?e.defaultWeight:n)){let i={...t};return i[e.id]=-1===n?e.defaultWeight:n,i}}else{let i={...t};return i[e.id]=-1===n?e.defaultWeight:n,i}return t})},[e,n,i]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{style:{width:"352px",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"},children:[s.jsx("div",{style:{height:"95%",width:"95%",position:"absolute"},children:s.jsx(x(),{alt:`in game ${e.label} bonus icon`,src:e.img,fill:!0,unoptimized:!0,priority:!0})}),s.jsx("div",{className:"textMedium blackTextStroke1",style:{marginTop:"0",marginRight:"-32px",position:"absolute",color:"rgba(255,255,255,0.9)",fontWeight:"bold",fontSize:"24px"},children:e.label})]}),s.jsx("div",{style:{width:"83px",display:"flex",alignItems:"center",justifyContent:"center",boxSizing:"border-box",borderRight:"1px solid rgba(255,255,255,0.8)",borderLeft:"1px solid rgba(255,255,255,0.8)"},children:s.jsx("div",{className:"importantText textMedium2",children:e.defaultWeight})}),s.jsx("div",{style:{display:"flex",flex:"1",alignItems:"center",justifyContent:"center",padding:"2px 0"},children:s.jsx("input",{className:"importantText textMedium2",style:{borderRadius:"4px",width:"55%",height:"65%",backgroundColor:e.index%2==0?"#2D2D2D":"#353535"},type:"number",value:-1===n?e.defaultWeight:n,onChange:t=>{try{let i=Number(t.target.value);if(i<0||i>99999)return;a(i),l.ZP.event({category:"protein_interaction",action:"changed_assembly_bonus_weight",label:`${e.label}`,value:i})}catch(e){console.log(e)}},min:"0",max:"99999"})})]})};var u=i(5492);let h={src:"/_next/static/media/right_arrow_white.77bfe840.svg",height:25,width:25,blurWidth:0,blurHeight:0},g={src:"/_next/static/media/Not_Unlocked.5a23afdd.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAKUlEQVR4nAVAsQ0AIAijEAe0b/D/T75hIQZVdUkuHgoOy52mJ+tphMd8e6sJrXEdFYwAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},AssemblyInnerBonus=({line:e,al_level:t,key:i})=>{let[l,o]=(0,r.useState)(!1),d=n.bO[e.ID],c=a.Z.calcAssemblyLine(e,t),p=a.Z.calcAssemblyLine(e,t+1),u=!1;return t+1<e.StartingLevel&&(u=!0),(0,s.jsxs)("div",{onMouseEnter:e=>{o(!0)},onMouseLeave:e=>{o(!1)},style:{display:"flex",alignItems:"center",justifyContent:"center",position:"relative",width:"100%",height:"100%"},children:[s.jsx(x(),{alt:`in game ${d.label} assembly line image`,src:!u||l?d.img:g,style:{height:"auto",width:"95%"},unoptimized:!0,priority:!0}),(!u||l)&&(0,s.jsxs)("div",{className:"textMedium blackTextStroke1",style:{left:"14.5%",width:"82%",position:"absolute",color:"rgba(255,255,255,0.9)",fontWeight:"bold",fontSize:"30px",display:"flex",alignItems:"center",justifyContent:"center"},children:[s.jsx("div",{style:{marginRight:"12px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:d.label}),s.jsx("div",{style:{fontSize:"24px",marginLeft:"auto",marginRight:"6px",marginTop:"0px"},children:"x"+c.toExponential(2)}),s.jsx("div",{style:{height:"32px",width:"32px",position:"relative",margin:"0 -3px"},children:s.jsx(x(),{alt:"arrow point to the left",src:h,fill:!0,unoptimized:!0})}),s.jsx("div",{style:{fontSize:"24px",marginLeft:"6px",marginTop:"0px"},children:"x"+p.toExponential(2)})]})]},i)},protein_AssemblyLine=({data:e,assemblyID:t,index:i,purchaseTime:r,cost:l})=>{let n=e.AssemblerCollection[t];if(!n)return null;let a=u.Z.secondsToString(r);return(0,s.jsxs)("div",{style:{backgroundColor:"rgba(255,255,255, 0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",marginTop:i>1?"24px":"3px",marginRight:"3px",borderRadius:"6px"},children:[(0,s.jsxs)("div",{className:"importantText",style:{backgroundColor:"rgba(255,255,255, 0.12)",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"24px",borderRadius:"6px"},children:[(0,s.jsxs)("div",{style:{marginLeft:"6px"},children:["Purchase #",i,": Assembly ",t+1]}),(0,s.jsxs)("div",{style:{marginRight:"6px"},children:["Level: ",n.Level]})]}),(0,s.jsxs)("div",{style:{marginTop:"12px"},children:[n.BonusList.map((e,t)=>s.jsx(AssemblyInnerBonus,{line:e,al_level:n.Level},t)),s.jsx("div",{style:{marginBottom:"6px"}})]}),(0,s.jsxs)("div",{className:"importantText",style:{backgroundColor:"rgba(255,255,255, 0.12)",width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"24px",borderRadius:"6px"},children:[(0,s.jsxs)("div",{style:{marginLeft:"6px"},children:["Cost: ",l.toExponential(2).toString()]}),(0,s.jsxs)("div",{style:{marginRight:"6px"},children:["Time to Purchase: ",a]})]})]})};var m=i(65438);let b={src:"/_next/static/media/info_white.1bde3dac.svg",height:123,width:123,blurWidth:0,blurHeight:0};var y=i(27428);function Protein(){let[e,t]=c()("userData",y),[i,d]=(0,r.useState)(y);(0,r.useEffect)(()=>{d(e)},[e]);let[p,u]=(0,r.useState)({}),[h,g]=c()("cumulativeTime",!1),[f,v]=c()("numAL",5),j=[];Object.values(n.bO).forEach(e=>{e.id<100&&j.push({...e,currentWeight:0})}),j.sort((e,t)=>e.label.localeCompare(t.label));let A=JSON.parse(JSON.stringify(i)),w=0,C=o.Z.createDecimal(i.ProteinCurrent),L=a.Z.calcProteinPerSecond(A),_=[],D=0,I={};if(A.AssemblerCollection.forEach(e=>{D+=e.Level,e.BonusList.forEach(t=>{I[t.ID]||(I[t.ID]=1),I[t.ID]*=a.Z.calcAssemblyLine(t,e.Level)})}),Object.values(p).length>0)for(let e=0;e<f;e++){let e=[];for(let t=0;t<A.AssemblerCollection.length;t++){let i=A.AssemblerCollection[t];if(i.LockQty<=D&&i.Level<i.LevelMax){let t={};for(let e=0;e<A.AssemblerCollection.length;e++){let s=A.AssemblerCollection[e];for(let e=0;e<s.BonusList.length;e++){let r=s.BonusList[e];if(t[r.ID]||(t[r.ID]=1),r.StartingLevel>s.Level+1)continue;let l=s.ID===i.ID?s.Level+1:s.Level;t[r.ID]*=a.Z.calcAssemblyLine(r,l)}}let s=[],r=[],l=a.Z.calcAssemblyCost(i.ID,A);i.cost=l,i.BonusList.forEach(e=>{s.push({...e,value:a.Z.calcAssemblyLine(e,i.Level)}),r.push({...e,Level:i.Level+1,value:a.Z.calcAssemblyLine(e,i.Level+1)})});let n=0;for(let[e,i]of Object.entries(I)){let s=(t[e]-i)/i;s*=p[e],n+=s}e.push({...i,score:n,cost_score:o.Z.divideDecimal(l,n)})}}e.sort((e,t)=>t.cost_score.lessThan(e.cost_score)?1:-1);let t=a.Z.calcAssemblyCost(e[0].ID,A),i=o.Z.subtractDecimal(t,C);if(C.greaterThan(t)?(i=0,h&&(C=o.Z.subtractDecimal(C,t))):(i=o.Z.divideDecimal(i,L),h&&(C=o.Z.createDecimal(0))),h){let e=o.Z.addDecimal(0,i);i=o.Z.addDecimal(i,w),w=o.Z.addDecimal(w,e)}_.push({assembly:JSON.parse(JSON.stringify(e[0])),data:JSON.parse(JSON.stringify(A)),purchaseTime:i,cost:t}),A.AssemblerCollection[e[0].ID].Level++,D++,I={};for(let e=0;e<A.AssemblerCollection.length;e++){let t=A.AssemblerCollection[e];for(let e=0;e<t.BonusList.length;e++){let i=t.BonusList[e];I[i.ID]||(I[i.ID]=1),I[i.ID]*=a.Z.calcAssemblyLine(i,t.Level)}}}return s.jsx("div",{style:{display:"flex",flex:"1",backgroundColor:"black",position:"relative"},children:(0,s.jsxs)("div",{style:{display:"flex",flex:"1",backgroundColor:"rgba(255,255,255, 0.05)",paddingLeft:"12px"},children:[s.jsx("div",{style:{backgroundColor:"rgba(255,255,255, 0.05)",display:"flex",flexDirection:"column",alignSelf:"start",width:"550px",margin:"12px 36px 12px 0px",padding:"12px",borderRadius:"12px"},children:(0,s.jsxs)("div",{style:{maxHeight:"calc(100vh - 50px)"},children:[s.jsx("div",{className:"importantText",style:{fontSize:"36px",marginTop:"-6px",marginBottom:"6px"},children:"Best Purchase Sequence"}),(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"-3px",marginBottom:"6px"},children:[(0,s.jsxs)("div",{className:"importantText",style:{fontSize:"18px"},children:["Use cumulative purchase time:",s.jsx("input",{type:"checkbox",onChange:e=>{g(e.target.checked?1:0)},checked:!!h,value:!!h})]}),s.jsx(m.Z,{tooltip:(0,s.jsxs)("div",{style:{maxWidth:"814px"},children:[(0,s.jsxs)("div",{style:{display:"flex"},children:[s.jsx("div",{style:{fontWeight:"bold",marginRight:"6px"},children:"Use cumulative purchase time:"}),s.jsx("div",{children:"when checked, will display each purchase time as the time necessary to buy all the upgrades before that purchase (inculding itself). Otherwise, it will show the current time to purchase if it is the next assembly upgraded"})]}),(0,s.jsxs)("div",{style:{display:"flex",marginTop:"12px"},children:[s.jsx("div",{style:{fontWeight:"bold",marginRight:"6px"},children:"Num purchases:"}),s.jsx("div",{children:"will calculate and display the selected number of the next suggested assembly purchases"})]})]}),children:s.jsx("div",{style:{height:"24px",width:"24px",position:"relative"},children:s.jsx(x(),{alt:"info icon popup additional information",src:b,fill:!0,unoptimized:!0})})}),(0,s.jsxs)("div",{style:{display:"flex",alignItems:"center",marginRight:"2px"},children:[s.jsx("div",{className:"importantText",style:{fontSize:"18px",marginRight:"6px"},children:"Num purchases"}),s.jsx("input",{className:"importantText textMedium2",style:{borderRadius:"4px",width:"36px",height:"65%",backgroundColor:"#2D2D2D"},type:"number",value:f,onChange:e=>{try{let t=Number(e.target.value);if(t<1||t>99)return;v(t),l.ZP.event({category:"protein_interaction",action:"changed_num_AL",label:`${t}`,value:t})}catch(e){console.log(e)}},min:"1",max:"99"})]})]}),s.jsx("div",{style:{height:"100%",overflow:"hidden",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px",borderTopRightRadius:"6px"},children:s.jsx("div",{style:{overflow:"auto",maxHeight:"calc(100vh - 150px)"},children:_.length>0&&s.jsx(s.Fragment,{children:_.map((e,t)=>s.jsx(protein_AssemblyLine,{data:e.data,assemblyID:e.assembly.ID,index:t+1,purchaseTime:e.purchaseTime,cost:e.cost},t))})})})]})}),(0,s.jsxs)("div",{style:{backgroundColor:"rgba(255,255,255, 0.05)",display:"flex",flexDirection:"column",width:"550px",maxHeight:"calc(100% - 49px)",margin:"12px 0 12px 0",padding:"12px",borderRadius:"12px"},children:[s.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:s.jsx("div",{className:"importantText",style:{fontSize:"36px",marginTop:"-6px",marginBottom:"6px"},children:"Bonus Weights"})}),s.jsx("div",{style:{width:"100%",maxHeight:"calc(100% - 42px)"},children:(0,s.jsxs)("div",{style:{height:"100%",overflow:"hidden",borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"},children:[(0,s.jsxs)("div",{style:{display:"flex"},children:[s.jsx("div",{style:{width:"64%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255, 0.085)",borderTopLeftRadius:"6px",boxSizing:"border-box",borderTop:"1.5px solid rgba(255,255,255,0.8)",borderBottom:"1px solid rgba(255,255,255,0.8)",borderLeft:"1px solid rgba(255,255,255,0.8)"},children:s.jsx("div",{className:"importantText",style:{fontSize:"24px"},children:"Bonus"})}),s.jsx("div",{style:{width:"15%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255, 0.085)",border:"1px solid rgba(255,255,255,0.8",boxSizing:"border-box"},children:s.jsx("div",{className:"importantText",style:{fontSize:"24px"},children:"Default"})}),s.jsx("div",{style:{width:"18%",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"rgba(255,255,255, 0.085)",borderTopRightRadius:"6px",boxSizing:"border-box",borderTop:"1.5px solid rgba(255,255,255,0.8)",borderBottom:"1px solid rgba(255,255,255,0.8)",borderRight:"1px solid rgba(255,255,255,0.8)"},children:s.jsx("div",{className:"importantText",style:{fontSize:"24px"},children:"Current"})})]}),s.jsx("div",{style:{overflow:"auto",maxHeight:"calc(100% - 30px)"},children:j.map((e,t)=>e.disabled?null:s.jsx("div",{style:{display:"flex",width:"100%",backgroundColor:t%2==0?"rgba(255,255,255, 0.085)":"rgba(255,255,255, 0.12)",height:"40px",borderBottomLeftRadius:t===j.length-1?"6px":"",borderBottomRightRadius:t===j.length-1?"6px":""},children:s.jsx(protein_AssemblyItem,{e:{...e,index:t},currentWeight:p,setCurrentWeights:u})}))})]})})]})]})})}l.ZP.initialize([{trackingId:"G-GGLPK02VH8",gtagOptions:{send_page_view:!1}}])},62489:(e,t,i)=>{"use strict";i.r(t),i.d(t,{default:()=>Page,generateMetadata:()=>generateMetadata});var s=i(4656),r=i(95153);let l=(0,r.createProxy)(String.raw`C:\Users\denys\Documents\GitHub\gameplay-planner\src\app\protein\page_content.jsx`),{__esModule:n,$$typeof:a}=l,o=l.default;async function generateMetadata({params:e,searchParams:t},i){return{title:"Protien / Assembly Guide - Gameplay Planner",description:"Protein - Help you build, plan and optimise your protein and assembly line purchases. Includes a weight list to prioritise stats. Displays cost, time to purchase, level, hidden and future bonuses"}}function Page(){return s.jsx(o,{})}i(32298)}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),i=t.X(0,[367,655,10,419,492,263,822,340,438,628,989],()=>__webpack_exec__(93767));module.exports=i})();