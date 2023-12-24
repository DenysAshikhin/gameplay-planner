"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[198],{62109:function(e,t,a){var l=a(37790);t.Z={EXP_DMG_MOD:.1,EXP_TIME_MOD:.05,SYNERGY_MOD_STEP:.25,EXP_TOKEN_MOD:.05,SOUL_CLOVER_STEP:.25,calculatePetBaseDamage:function(e,t){let a=t||(null==e?void 0:e.Rank),l=(null==e?void 0:e.BaseDungeonDamage)*(1+.05*a);return Number(l)},calculateBestHours:function(e,t,a,l){let n;(null==a?void 0:a.residueToken)&&a.residueToken;let s=a.data.ExpeditionTokenBonuses;t||(t=[1,2,3,4,5,6,7,8,9,10,11,12]),n||(n=(null==a?void 0:a.clover)?a.clover:0),l||(l=1);let i=this.calculateGroupScore(e),o=i.tokenMult*Math.pow(1+this.SOUL_CLOVER_STEP,n)*s*l,r=[];for(let e=0;e<t.length;e++){let a=t[e],l=o*a,n=Math.floor(l),s=n/l,i=l-n,u={wastedHR:i/a,tokenHR:o,wasted:i,hours:a,totalTokens:l,floored:n,effeciency:s};r.push(u)}return r},calculateGroupScore:function(e,t){let a=0,l=0,n=0,s=0,i=0,o=0,r=0,u=0,c=0,h=0,m=0,p=0,g={},D=0;e.forEach(e=>{a+=this.calculatePetBaseDamage(e,t),D+=this.calculatePetBaseDamage(e,0),e.BonusList.some(e=>1013===e.ID)&&l++,e.BonusList.some(e=>1010===e.ID)&&o++,e.BonusList.some(e=>1011===e.ID)&&r++,e.BonusList.some(e=>1014===e.ID)&&c++,e.BonusList.some(e=>1012===e.ID)&&n++,e.BonusList.some(e=>1015===e.ID)&&u++,e.BonusList.some(e=>1016===e.ID)&&h++,g[e.Type]?g[e.Type]++:g[e.Type]=1,e.ID&&(s+=this.SYNERGY_MOD_STEP)}),i=a;let[d,b]=Object.values(g);return d>0&&b>0&&(s+=this.SYNERGY_MOD_STEP),d>1&&b>1&&(s+=this.SYNERGY_MOD_STEP),a*=1+l*this.EXP_DMG_MOD,D*=1+l*this.EXP_DMG_MOD,a*=1+n*this.EXP_TIME_MOD,D*=1+n*this.EXP_TIME_MOD,a*=s,D*=s,p=h*this.EXP_TOKEN_MOD,m=s+s*p,{groupScore:a,baseGroupScore:i,groupScoreMax:D,dmgCount:l,timeCount:n,synergyBonus:s,cardPowerCount:o,expRewardCount:r,cardXpCount:c,rpRewardCount:u,tokenRewardCount:h,tokenModif:p,tokenMult:m}},getBestDamagePets:function(e,t,a){let l={},n=JSON.parse(JSON.stringify(e)),s=[],i=[],updateStrongest=e=>{1===e.Type?0===s.length?s.push(e):1===s.length?this.calculatePetBaseDamage(s[0],t)<this.calculatePetBaseDamage(e,t)?(s[1]=s[0],s[0]=e):s[1]=e:this.calculatePetBaseDamage(s[0],t)<this.calculatePetBaseDamage(e,t)?(s[1]=s[0],s[0]=e):this.calculatePetBaseDamage(s[1],t)<this.calculatePetBaseDamage(e,t)&&(s[1]=e):2===e.Type&&(0===i.length?i.push(e):1===i.length?this.calculatePetBaseDamage(i[0],t)<this.calculatePetBaseDamage(e,t)?(i[1]=i[0],i[0]=e):i[1]=e:this.calculatePetBaseDamage(i[0],t)<this.calculatePetBaseDamage(e,t)?(i[1]=i[0],i[0]=e):this.calculatePetBaseDamage(i[1],t)<this.calculatePetBaseDamage(e,t)&&(i[1]=e))},o=[],r={},u=0,c=0;if(a&&a.requiredPets)for(let e=0;e<a.requiredPets.length;e++)r[a.requiredPets[e].ID]=a.requiredPets[e];for(let e=0;e<n.length;e++){let t=n[e],a=!1;for(let e=0;e<t.BonusList.length;e++){let n=t.BonusList[e];t.ID in r?(l[t.ID]=t,a=!0):1013!==n.ID||l[t.ID]||(l[t.ID]=t,a=!0),1012!==n.ID||l[t.ID]||(l[t.ID]=t,a=!0)}a?updateStrongest(t):(o.push(t),1===t.Type?c++:u++)}let h=i.length,m=s.length,p=i.concat(s);for(let e=0;e<p;e++)l[pet.ID]=p[e];let g=2,D=2;m+c<2&&(D+=2-(m+c)),h+u<2&&(g+=2-(h+u));let d=!1,b=!1;for(let e=0;e<o.length;e++){let a=o[e],l=this.calculatePetBaseDamage(a,t);if(1===a.Type){if(s.length<g)s.push(a),d=!0;else for(let e=0;e<s.length;e++){let n=s[e];if(l>this.calculatePetBaseDamage(n,t)){s[e]=a,d=!0;break}}}else if(i.length<D)i.push(a),b=!0;else for(let e=0;e<i.length;e++){let n=i[e];if(l>this.calculatePetBaseDamage(n,t)){i[e]=a,b=!0;break}}d&&(d=!1,s.sort((e,a)=>this.calculatePetBaseDamage(e,t)-this.calculatePetBaseDamage(a,t))),b&&(b=!1,i.sort((e,a)=>this.calculatePetBaseDamage(e,t)-this.calculatePetBaseDamage(a,t)))}p=i.concat(s);for(let e=0;e<p.length;e++)l[p[e].ID]=p[e];let I=Object.values(l);return I.sort((e,t)=>t.ID-e.ID),I},calcBestDamageGroup:function(e,t,a,l){a=Number(a=a||7);let n={},s={},i={};l=JSON.parse(JSON.stringify(l));for(let t=0;t<e.length;t++)i[e[t].ID]=JSON.parse(JSON.stringify(e[t]));let o=null==l?void 0:l.activeBonuses;o||(o=[]);let memoizedGroupScore=e=>{let a=e.ID;if(!n[a]||n[a]){let l=this.calculateGroupScore(e.team,t),s=l.tokenMult;n[a]={token:s,damage:l.groupScore,other:l}}return n[a]},r={},u={},c={},h={},m={},p=[];for(let e=0;e<a;e++)p.push([]);if(null==l?void 0:l.petWhiteList){for(let e=0;e<l.petWhiteList.length;e++){let t=l.petWhiteList[e];"blacklist"===t.placement?r[t.id]=t:"team"===t.placement?(u[t.id]=t,h[t.id]=t,p[t.parameters.team].push(t)):"rel"===t.placement&&(c[t.id]=t)}for(let e=0;e<l.petWhiteList.length;e++){let t=l.petWhiteList[e];if("auto"===t.placement)for(let e=a-1;e>=0;e--){let a=0,l=0;if(p[e].forEach(e=>{1===e.pet.Type&&a++,2===e.pet.Type&&l++}),(1!==t.pet.Type||!(a>1))&&(2!==t.pet.Type||!(l>1))&&p[e].length<4){t.auto=!0,t.parameters.team=e,t.placement="team",u[t.id]=t,p[e].push(t),m[t.id]=t;break}}}}let getCombinationsInner=(e,t,a)=>{let l=-1,n=0,s=0;e.forEach(e=>{1===e.Type?s++:n++});let i=!0;n>1&&s>1&&(i=!1);let o={},r={},u={},c={};for(let e=0;e<a.length;e++){let t=a[e];"team"!==t.placement||(t.parameters.fake?2!==t.pet.Type||u[t.pet.ID]?c[t.pet.ID]||(c[t.pet.ID]=!0):u[t.pet.ID]=!0:1!==t.pet.Type||r[t.pet.ID]?r[t.pet.ID]||(o[t.pet.ID]=!0):r[t.pet.ID]=!0)}let f=(n,s)=>{if(s.length>0){let e=!0,t=0,n=0,h=0,m=0,p=0,g=0;for(let e=0;e<s.length;e++){let t=s[e];1===t.Type?p++:g++,1===t.Type&&c[t.ID]?m++:u[t.ID]&&h++}let D=Object.entries(o).length,d=Object.entries(r).length,b=Object.entries(u).length,I=Object.entries(c).length,M=2>D?2-D:0,P=2>d?2-d:0,k=0;if(b>0){let t=b<M?b:M;h>M?e=!1:h!==t?e=!1:k+=t}if(I>0){let t=I<P?I:P;m>P?e=!1:m!==t?e=!1:k+=t}let S=d>2?d-2:0;if((g>2+(D>2?D-2:0)||p>2+S)&&!i&&(e=!1),e){a.length;for(let l=0;l<a.length;l++){let i=a[l],o=!1;if("team"===i.placement){let a=0;for(let e=0;e<s.length;e++){let l=s[e];l.ID===i.pet.ID&&(i.parameters.fake?t++:(n++,1===l.Type?d++:D++),a++)}if(a>0)o=!0;else if(!i.parameters.fake){e=!1,o=!1;break}}else if(i.requiredNumber>0){let t=0;for(let e=0;e<s.length;e++)s[e].BonusList.find(e=>e.ID===i.bonus.id)&&(t++,n++);if(t>=i.requiredNumber)o=!0;else{e=!1,o=!1;break}}else if(i.exactNumber>-1){let t=0;for(let e=0;e<s.length;e++)s[e].BonusList.find(e=>e.ID===i.bonus.id)&&(t++,n++);if(t===i.exactNumber)o=!0;else{e=!1,o=!1;break}}else if("rel"===i.bonus.placement){let a=0;for(let e=0;e<s.length;e++)s[e].BonusList.find(e=>e.ID===i.bonus.id)&&(a++,t++);if(a<=i.bonus.amount){if(i.tempRequired>0){if(i.bonus.amount<i.tempRequired&&a===i.bonus.amount||a>=i.tempRequired)o=!0;else{e=!1,o=!1;break}}else o=!0}else{e=!1,o=!1;break}}else i.placement;if(i.tempMax||0===i.tempMax&&!i.disabled&&void 0!==i.disabled){let t=0;for(let e=0;e<s.length;e++){let a=s[e];i.pets.find(e=>e.ID===a.ID)&&t++}if(t<=i.tempMax)o=!0;else{e=!1,o=!1;break}}o&&i.passed++}if(k>0&&e&&(k+n>4&&(k=4-n),e=!(t<k)),e){let e="";for(let t=0;t<s.length;t++)e+=s[t].ID,t+1!==s.length&&(e+=",");let t={ID:e,team:s};if(-1===l)l={ID:e,team:s,score:memoizedGroupScore(t)};else{let a=memoizedGroupScore(t);a.damage===l.score.damage?a.token>l.score.token&&(l={ID:e,team:s,score:a}):a.damage>l.score.damage&&(l={ID:e,team:s,score:a})}}}}if(s.length!==t)for(let t=n;t<e.length;t++)f(t+1,[...s,e[t]])};return f(0,[]),l.team&&l.team.sort((e,t)=>e.Type===t.Type?e.ID-t.ID:e.Type-t.Type),l},g=new Date,D=new Date,d=new Date,b=new Date,I=[],M=e.filter(e=>(e.ID in u&&(u[e.ID].pet=e),!(e.ID in r)&&!(e.ID in u)));for(let e=0;e<a;e++){let l=a-e,n=[],h={},m={},p=[];for(let[t,a]of Object.entries(u))if(a.parameters.team===e){if(!i[a.pet.ID])continue;p.push(a),M.push(a.pet),n.push(a.pet)}if(o.length>0){for(let e=0;e<o.length;e++)h[o[e].id]=o[e],m[o[e].id]={bonus:o[e],pets:[],active:!0};M.forEach(e=>{e.ID in r||e.BonusList.forEach(t=>{t.ID in h&&("top"===h[t.ID].placement&&n.push(e),m[t.ID].pets.push(e))})});for(let t=0;t<o.length;t++){let a=m[o[t].id];if("bottom"===a.bonus.placement){let t,s=a.pets.length,i=0,o=!1,r=0;switch(a.bonus.equation){case"min":s<a.bonus.amount?(t=0,o=!0):(s<=l*a.bonus.amount&&(r=a.bonus.amount),t=s%a.bonus.amount,s-=t,i=s>=0?Math.ceil(s/a.bonus.amount):0);break;case"max":break;case"eq":s<a.bonus.amount?(t=0,o=!0):(s<=l*a.bonus.amount&&(r=a.bonus.amount),t=s%a.bonus.amount,s-=t,i=a.pets.length>=a.bonus.amount?Math.ceil(s/a.bonus.amount):0)}if(l<=i)m[a.bonus.id].tempMax=r,a.pets.forEach(e=>{n.push(e)});else{let l=[];for(let t=0;t<m[a.bonus.id].pets.length;t++){let n=m[a.bonus.id].pets[t];n.ID in u&&"team"===u[n.ID].placement&&u[n.ID].parameters.team===e||l.push(n)}m[a.bonus.id].pets=l,m[a.bonus.id].active=!1,m[a.bonus.id].tempMax=t,m[a.bonus.id].disabled=o}}else if("top"===a.bonus.placement){let e=a.pets.length,t=0;e<=l*a.bonus.amount&&(t=a.bonus.amount),m[a.bonus.id].tempMax=t}}for(let e=0;e<o.length;e++){let t=m[o[e].id];if(!t.active)continue;let a=0,l=-1;switch(t.hardFail=!1,t.bonus.equation){case"min":t.bonus.amount>t.pets.length?(a=0,t.hardFail=!0):a=t.bonus.amount;break;case"max":break;case"eq":t.bonus.amount>t.pets.length?(l=-1,t.hardFail=!0):l=t.bonus.amount}t.requiredNumber=a,t.exactNumber=l}}let d=this.getBestDamagePets(M,t,{requiredPets:n});for(let[e,t]of Object.entries(m))t.passed=0;g=new Date;let b=!1,P=!1,k=Object.values(m);for(let e=0;e<p.length;e++)k.push(p[e]);let S=getCombinationsInner(d,Math.min(4,d.length),k);if(D=new Date,console.log("time to get combinations ".concat(S.length,": ").concat((D-g)/1e3," seconds")),-1===S&&p.length>0){k=[];for(let e=0;e<p.length;e++)k.push(p[e]);-1===(S=getCombinationsInner(d,Math.min(4,d.length),k))?P=!0:b=!0}for(let[t,a]of(-1===S&&(P=!0),Object.entries(m)))if(!(t in s)&&(!a.passed||a.hardFail)){let l="Filter failed on group ".concat(e+1,":\n");switch(a.bonus.equation){case"min":l+="not enough pets, min ".concat(a.bonus.amount," but ").concat(a.pets.length," remain");break;case"max":break;case"eq":l+="not enough pets, req. ".concat(a.bonus.amount," but ").concat(a.pets.length," remain");break;default:throw Error("impossible case")}s[t]=l}if(P){!(Object.values(m).length>0)||"generic"in s||(s.generic="Individual filters all succeeded, but the combination of all is impossible starting group ".concat(e+1));break}if(b){I.push(S.team);for(let e=0;e<S.team.length;e++)S.team[e].ID in c&&delete c[S.team[e].ID];M=M.filter(e=>{let t=!0;for(let a=0;a<S.team.length;a++)if(S.team[a].ID===e.ID){t=!1;break}return t})}else{let a=this.calculateGroupScore(S.team,t),l=a.groupScore,n=Object.values(c);if(o.length>0||n.length>0){let r=!1;for(let s=0;s<n.length;s++){let o=n[s],u=o.parameters.damageBias/100,c=l*u,h=S.team.length,m=0,g=i[o.id],D=this.calculatePetBaseDamage(g,t);if(g&&(g.BonusList.forEach(e=>{let l=0;1013===e.ID?(D*=1+this.EXP_DMG_MOD,h>1?l+=a.baseGroupScore/h*(h-1)*u*this.EXP_DMG_MOD:l=a.baseGroupScore*u*this.EXP_DMG_MOD,m+=l):1012===e.ID&&(D*=1+this.EXP_TIME_MOD,h>1?l+=3*this.calculatePetBaseDamage(g,t)*u*this.EXP_TIME_MOD:l=a.baseGroupScore*u*this.EXP_TIME_MOD,m+=l)}),(D+=m)>c)){r=!0;let t=JSON.parse(JSON.stringify(o));t.placement="team",t.parameters.team=e,t.pet=g,t.parameters.fake=!0,p.push(t),d.find(e=>e.ID===g.ID)||d.push(g)}}for(let e=0;e<o.length;e++){let n=o[e],s=n.relThresh/100,i=l*s,u=!1,c=m[n.id];"rel"!==n.placement||(c.pets.forEach(e=>{let l=this.calculatePetBaseDamage(e,t),n=S.team.length,o=0;e.BonusList.forEach(e=>{let t=0;1013===e.ID?(l*=1+this.EXP_DMG_MOD,n>1?t+=a.baseGroupScore/n*(n-1)*s*this.EXP_DMG_MOD:t=a.baseGroupScore*s*this.EXP_DMG_MOD,o+=t):1012===e.ID&&(l*=1+this.EXP_TIME_MOD,n>1?t+=a.baseGroupScore/n*(n-1)*s*this.EXP_TIME_MOD:t=a.baseGroupScore*s*this.EXP_TIME_MOD,o+=t)}),(l+=o)>i&&(r=!0,u=!0,c.active=!0,c.tempMin=!0,c.tempRequired=0!==c.tempRequired&&c.tempRequired?c.tempRequired+1:1,c.tempRequiredPets||(c.tempRequiredPets=[]),c.tempRequiredPets.push(e),d.find(t=>t.ID===e.ID)||d.push(e))}),u||(c.tempMin=null,c.tempRequired=0,c.tempRequiredPets=[],c.active=!1))}if(r){g=new Date;let t=Object.values(m);for(let e=0;e<p.length;e++)t.push(p[e]);let a=getCombinationsInner(d,Math.min(4,d.length),t);if(console.log("got new combinations after the rel calcs"),-1!==a&&(p=p.filter(e=>!e.parameters.fake||!a.team.find(t=>t.ID===e.id))),-1===a&&0===p.length){"generic"in s||(s.generic="Individual filters all succeeded, but the combination of all is impossible starting group ".concat(e+1," (too many relative pets in one team)"));break}if(-1!==a){S=a;for(let e=0;e<t.length;e++)t[e].id in c&&a.team.find(a=>a.ID===t[e].id)&&delete c[t[e].id]}}}I.push(S.team);for(let e=0;e<S.team.length;e++)S.team[e].ID in c&&delete c[S.team[e].ID];M=M.filter(e=>{let t=!0;for(let a=0;a<S.team.length;a++)if(S.team[a].ID===e.ID){t=!1;break}return t})}}b=new Date,console.log("time to get best combo: ".concat((b-d)/1e3," seconds")),(null==l?void 0:l.setFailedFilters)&&l.setFailedFilters(s);let P=!0,k=-1;for(;P;){k++,P=!1;let e=JSON.parse(JSON.stringify(I));for(let a=0;a<e.length;a++){let l=e[a];for(let n=0;n<l.length;n++){let s=l[n],i=!1;if(!h[s.ID]){if(a<I.length-1){let o=e[a+1],r={},u=this.calculateGroupScore(l,t).groupScore;for(let e=0;e<2;e++)for(let e=0;e<o.length;e++){let a=o[e];if(a.Type===s.Type&&!r[a.ID]){r[a.ID]=a;let e=JSON.parse(JSON.stringify(l));e[n]=a,this.calculateGroupScore(e,t).groupScore>u&&(i=!0);break}}}if(!i&&a>0){let l=a-1;for(;l>=0;){let i=e[l],o={},r=this.calculateGroupScore(i,t).groupScore;for(let e=0;e<2;e++){for(let e=0;e<i.length;e++){let u=i[e];if(!h[u.ID]){if(u.Type===s.Type&&!o[u.ID]){o[u.ID]=u;let c=JSON.parse(JSON.stringify(i));c[e]=s,this.calculateGroupScore(c,t).groupScore>r&&(P=!0,I[a][n]=JSON.parse(JSON.stringify(u)),I[l][e]=JSON.parse(JSON.stringify(s)));break}if(P)break}}if(P)break}if(P)break;l--}}if(P)break}}if(P)break}}return console.log("num swaps: ".concat(k)),I.forEach(e=>{e.sort((e,t)=>e.ID-t.ID),e.sort((e,t)=>e.Type-t.Type)}),I},calcBestTokenGroup:function(e,t,a,l){a=a||7;let n=1,s={},memoizedGroupScore=e=>{let a=e.ID;if(!s[a]||s[a]){let l=this.calculateGroupScore(e.team,t),n=l.tokenMult;s[a]={token:n,damage:l.groupScore,other:l}}return s[a]},getCombinationsInner=(e,t,a)=>{let l=-1,f=(s,i)=>{let o=0,r=0,u=[],c=[];a&&(o=a.min?a.min:0,u=a.pets?a.pets:[],c=a.ignoredPets?a.ignoredPets:[]);let h=0;if(i.length>0){let e="";for(let t=0;t<i.length;t++){if(e+=i[t].ID,t+1!==i.length&&(e+=","),o>0)for(let e=0;e<u.length;e++)i[t].ID==u[e].ID&&h++;if(c.length>0)for(let e=0;e<c.length;e++)i[t].ID==c[e].ID&&r++}if(h===o&&0===r){let t={ID:e,team:i};if(-1===l)l={ID:e,team:i,score:memoizedGroupScore(t)};else{let a=memoizedGroupScore(t);1===n?a.damage>l.score.damage&&(l={ID:e,team:i,score:a}):a.token===l.score.token?a.other.tokenRewardCount>0?a.damage<l.score.damage&&(l={ID:e,team:i,score:a}):a.damage>l.score.damage&&(l={ID:e,team:i,score:a}):a.token>l.score.token&&(l={ID:e,team:i,score:a})}}}if(i.length!==t)for(let t=s;t<e.length;t++)f(t+1,[...i,e[t]])};return f(0,[]),l.team&&l.team.sort((e,t)=>e.Type===t.Type?e.ID-t.ID:e.Type-t.Type),l},i=new Date,o=new Date,r=[];for(let s=0;s<a;s++){let i=-1,o=JSON.parse(JSON.stringify(e)),u=0,c=0,h=[],m=0,p=0,g=0;o.forEach(e=>{e.BonusList.forEach(a=>{1016===a.ID&&(h.push(e),c+=this.calculatePetBaseDamage(e,t),u++,1===e.Type?g++:2===e.Type&&p++)})}),c/=u,o=(o=this.getBestDamagePets(o,t,{requiredPets:h})).sort((e,a)=>this.calculatePetBaseDamage(a,t)-this.calculatePetBaseDamage(e,t));for(let e=0;e<2;e++)m+=this.calculatePetBaseDamage(o[e],t);m/=2;let D=this.calcBestDamageGroup(o,t,1)[0];if(m=D?this.calculateGroupScore(D,t):[],u>=4&&p>=2&&g>=2)n=2,i=getCombinationsInner(o,Math.min(4,o.length),{pets:h,min:4}),n=1;else if(1===u)i=s===a-1?getCombinationsInner(o,Math.min(4,o.length),{pets:h,min:h.length}):getCombinationsInner(o,Math.min(4,o.length));else if(u>1){let e=(100-l.tokenDamageBias)/100*m.groupScore;e/=5.75;let t=2;(p>1&&g>0||g>1&&p>0)&&(t=3);let r=Math.ceil(u/t);r>=a-s?(n=r-(a-s)>=0?1:2,i=getCombinationsInner(o,Math.min(4,o.length),{pets:h,min:t}),n=1):c>e?(n=a-s-r>=0?1:2,i=getCombinationsInner(o,Math.min(4,o.length),{pets:h,min:t}),n=1):i=getCombinationsInner(o,Math.min(4,o.length),{pets:[],min:0,ignoredPets:h})}else i=getCombinationsInner(o,Math.min(4,o.length));if(-1===i)break;memoizedGroupScore(i),r.push(i.team),e=e.filter(e=>{let t=!0;for(let a=0;a<i.team.length;a++)if(i.team[a].ID===e.ID){t=!1;break}return t})}return o=new Date,console.log("time to get best combo: ".concat((o-i)/1e3," seconds")),r},findBestGroups:function(e,t,a,l,n){switch(a){case 1:case 3:return this.calcBestDamageGroup(e,t,l,n);case 2:return this.calcBestTokenGroup(e,t,l,n)}},calcEquipBonus:function(e,t){let a=1;return 100*(23===t.ID?.5*((Math.pow(1+t.Gain,e.Level)-1+Math.max(0,(.005*l.Z.calculateLogarithm(1.0125,e.Level+1)-1)*.5))*(1+.005*l.Z.calculateLogarithm(1.075,e.Rank+1))):28===t.ID?(Math.pow(1+t.Gain,e.Level)-1+Math.max(0,(.005*l.Z.calculateLogarithm(1.0125,e.Level+1)-1)*.25))*(1+.005*l.Z.calculateLogarithm(1.075,e.Rank+1)):29===t.ID?(Math.pow(1+t.Gain,e.Level)-1+Math.max(0,(.005*l.Z.calculateLogarithm(1.0125,e.Level+1)-1)*.125))*(1+.005*l.Z.calculateLogarithm(1.075,e.Rank+1)):(Math.pow(1+t.Gain,e.Level)-1)*(1+.02*e.Rank))}}},39768:function(e,t,a){var l=a(57437),n=a(2265);a(65947);var s=a(38606),i=a(60731);t.Z=e=>{let{data:t,onSelect:a,placeholder:o,updateBox:r,margin:u}=e,[c,h]=(0,n.useState)(null);return(0,l.jsx)("div",{style:{width:(null==t?void 0:t.width)?t.width:"288px",minHeight:"0px",height:"36px",margin:u||""},children:(0,l.jsx)(s.Z,{options:t.list,renderInput:e=>{let t=e.key;return delete e.key,(0,n.createElement)(i.Z,{...e,key:t,placeholder:(null==c?void 0:c.label)&&r?c.label:o||"Enter a pet"})},ListboxProps:{style:{maxHeight:150}},value:c,clearOnBlur:!0,isOptionEqualToValue:(e,t)=>-1!==t.id&&e.label===t.label,onChange:(e,t)=>{t&&(a(t),r&&h(t))}})})}},33187:function(e,t){t.Z={src:"/_next/static/media/x_icon.2c19be28.svg",height:800,width:800,blurWidth:0,blurHeight:0}}}]);