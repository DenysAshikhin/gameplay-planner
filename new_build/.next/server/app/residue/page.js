(()=>{var A={};A.id=7149,A.ids=[7149],A.modules={72934:A=>{"use strict";A.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:A=>{"use strict";A.exports=require("next/dist/client/components/request-async-storage.external")},54580:A=>{"use strict";A.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:A=>{"use strict";A.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:A=>{"use strict";A.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:A=>{"use strict";A.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:A=>{"use strict";A.exports=require("path")},57310:A=>{"use strict";A.exports=require("url")},61259:(A,e,t)=>{"use strict";t.r(e),t.d(e,{GlobalError:()=>r.a,__next_app__:()=>h,originalPathname:()=>d,pages:()=>n,routeModule:()=>c,tree:()=>g});var i=t(67096),a=t(16132),l=t(37284),r=t.n(l),s=t(32564),o={};for(let A in s)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(A)&&(o[A]=()=>s[A]);t.d(e,o);let g=["",{children:["residue",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,70583)),"C:\\Users\\denys\\Documents\\GitHub\\gameplay-planner\\src\\app\\residue\\page.js"]}]},{metadata:{icon:[async A=>(await Promise.resolve().then(t.bind(t,73881))).default(A)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,43537)),"C:\\Users\\denys\\Documents\\GitHub\\gameplay-planner\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async A=>(await Promise.resolve().then(t.bind(t,73881))).default(A)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],n=["C:\\Users\\denys\\Documents\\GitHub\\gameplay-planner\\src\\app\\residue\\page.js"],d="/residue/page",h={require:t,loadChunk:()=>Promise.resolve()},c=new i.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/residue/page",pathname:"/residue",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:g}})},28098:(A,e,t)=>{Promise.resolve().then(t.bind(t,41805))},41805:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>Residue});var i=t(30784);t(16467);var a=t(9885),l=t(3779);t(25628),t(11263);var r=t(92989),s=t(5492);let o={attack:{img:{src:"/_next/static/media/ShopUpgrade1AtkBonusSelected.e27775d7.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATcdAPvJ4wAEcGtnAD5AQgD7+/sACAcHANvb2gD18u78AYSAfP8QFRoADQwMAOHi4QAMCgsAGx8fALC0tgA6MCoAAbu4tv8JDQ8AUEJJAOz58gA3Sk4AV1NTADgqJgDq5uQAAbGvrP8hIycAvMO+ANPU2wBMTU0AHhYTAOXk5ADIxMAAAXl1cfz8Agj/JCEXAPwGCQAvJSoA6erpAFNTVAAfAAABAR8AAP/hAAAAhoeGAB0dHAAMCw0ABwcHAJmamwDezK8AAU9AL4Wxy/LEAPXfC2tscBUyMzAB//7/62SHlfRIEeU8AWVNJ3ALBgjAAwgPC+zhwv3bxAAAAgAAAy9NH/b7AQ0/HnVeUdNdga0AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Attack_Exp.e20cbb2f.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJElEQVR4nGNcqan1iPvtW1aG/wx//jMwACkGhn9gkoHxD5AJANXjC7vd/06OAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:1,label:"Attack",unlock:0,key:"CowShopAttackBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.05+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(10,t).floor();return i},weight:A=>4},hp:{img:{src:"/_next/static/media/ShopUpgrade2HPBonusSelected.8cbea039.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATcbAPvJ5QAEXGpkAEg9QAD8/fwAAwUGAOnf3wD28u78AYaBfv8IERUAPQIFAO39/AD7BAQAKB8gAHuqqAA9MiwAAbi6uP8XBQcAGFxsAPsoIQD2vb4AH21tANdQSADf8u0AAbOysP8aFhkAADg3AAsAAAD/AAAABzM8ANNzbADG0csAAXt0cfzzBwr/TxscAB1qaQADAAAA1HZ3AE+KiQAkAAABAR0AAP/jAAAAi5SUAB7z9AALCAcAAS0tAJuSkwDezrEAAU9ALoWx2f7EAOfUC2F6fBU4MC8BBvDx62GJlvRIEug8AWVNJ3ALBQXABQwXC/DNvf3b1QAA+gAAAzFOIPX7AAxAx/lcXRxnqNQAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/HP_Exp.35d112ca.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAI0lEQVR4nGMstep6NOOPKOuX/4x/WBgYGP4DMRQwMvz/9w8AxkgKuoBB8SkAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:2,label:"HP",unlock:0,key:"CowShopHPBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.05+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(10,t).floor();return i},weight:A=>1},potato:{img:{src:"/_next/static/media/ShopUpgrade3PotatoBonusSelected.b3980036.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATYbAPvK5QAEa2loADg4NwD8+/sACw0OAODe3AD49PD8AYWAfP8MFBsAFwwEACH91AD9+/UA+B9OAKOwuQAxJyAAAb25tf8ACQ8A2KdlAEEvGAD49tsA8BJnAAorSwDo4doAAbOvrP8cIykA6NTDABnuqAD9/fsA4AZHAAMdNADIv7gAAXt0cPz3BA3/STQjAA/higDj7ggA6hVaAGlwdAAZAAABAR0AAP/jAAAAioiHAAr77gAMExoAGCIqAJeXlwDezLAAAU9AL4Wx0vfEAO7aC256gRU1LSoB+vbz62OGlfRIEuY8AWVNJ3ALBgbABAgRC+vTwv3U0gAABwAAAzFOIPb7AAw/cBhlQZgYoIsAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Potatoes_Earned.7ccbe8f8.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAI0lEQVR4nGM8PkXtkZTwE1Zmpn9//jMwMDACMZRm/PuP4R8AuHkKdFn/fPsAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:3,label:"Potato",unlock:0,key:"CowShopPotatoBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.0525+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(20,t).floor();return i},weight:A=>5},class:{img:{src:"/_next/static/media/ShopUpgrade4ExpBonusSelected.3790534d.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABAklEQVR42mMwl2H4zcDA8L8gO+3/utUr/q9cuvj/ymWL/3e1Nf9vqi75zdDSWPt/xsxZ/xctXvy/oaHx/4SJk/6fPHXqf3Zu/v9J/T3/GXbt2Pp/y5at/xkYGOC4tbnx/6bNm4EmrvzPsH7NKqCuiXBJEUFuMG3n4PS/MCfjP0NVWfGf+vqG352dnb9dXFx+e7i7/85JT/zNJyr5W4mR4Q+DDFTnxAkT/i9ftvz/+vXr/+/YseO/j6/ff11Jhv8M/g56rQxiWp4MDAwhGVm5mfMWLMyaPXtOKIOCgaeHqVQrQ6qvekFBkI5BaayTdYINg4UZA4OFNQODdbafomGan04BAHtMej2gWKtLAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Class_Exp.2de9617a.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAH0lEQVR4nGNULOV4xCD6j5WBieEPw38GBGAEwn8M/wB1YgaVLgIPvwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:1},order:4,label:"Class",unlock:0,key:"CowShopClassExpBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.055+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(30,t).floor();return i},weight:A=>5},skull:{img:{src:"/_next/static/media/ShopUpgrade5PerkBonusSelected.9de8c7ac.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATYaAPvK5gAEcG9rADg3OgD6+voADA4MAN7b2wD18ez8AYaCf/8JDxIA+9vVABEnIwAFCAcAAOzxALfQ2AA8OTUAAby7uf8F//4AuUZJAF3EjgAJDAoAmTBoADWjoAAHEhMAAba0sv8MDRAAmnZdAHqSeAAJCggAf2Z8ADdcegDr6OQAAXp2cPz4/gn/QD0oABkR7AACAQIA0dn1AGJkfAAgAAABAR4AAP/iAAAAioqLAB4bDAAJCQkABAYUAJqcnQDfy68AAU9ALoWx0vnEAO7ZC2BmdBU5NjEBBQP762KBkPRIFeo8AWVNJ3ALBQbABAkSC+/jwf3ZwgAA+wAAAzVOIfb6AAs/yi5cgmP7g00AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Skull_Earned.b26712a6.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJElEQVR4nGOcGt3w6N9SYVZmBuY/DEDACIQgwMTAxPiP4d8/AJKCCBJWQUGUAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:6,label:"Skull",unlock:0,key:"CowShopPerkBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.06+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(75,t).floor();return i},weight:A=>5},confection:{img:{src:"/_next/static/media/ShopUpgrade6ConfectionExpBonusSelected.7650938d.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABC0lEQVR42gVAv0oCcQD+oK0HiMhoCKFFrIZMsCFoycEa1KGxIa0u60xDzBuO8hAKgs7+QUQd5nFidxdRXUFEQU4HDeUT9Bo/4QtEhiEAUJYytC2TrYbBttXkYU3jXqUgUFUVnp1fUNdPuFra5LKW46P3zGxW4vHRAfH26vGr0+FAHyhlwHod/Pzw6PvfdNsW8eDa/Pnt0ry94rUG/r0H2fVfeHf/xFIhR5SL+d5uRRGm2RRzEYitGsTlzakAIAJAD0MAAVBRFBbLO6zqGh3XYTKZZmgQxOLsuIb+YBxASlX31+yWs24YjTRGwvH5qYCGlcSYnE+GJ7aXZmKpIKIBIDoNxDYWRicziZD8D/bKhMNeWoMYAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Confection_Exp.526012d9.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIElEQVR4nGP06a56vEdYheUHI+Mfhv8MCMAIhP/+/QMAoj0JHgRAo4oAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:5,label:"Conf.",unlock:0,key:"CowShopConfectionBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.0575+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(50,t).floor();return i},weight:A=>.5},reinc:{img:{src:"/_next/static/media/ShopUpgrade7ReincExpBonusSelected.4decf056.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATYXAPvK6QAEbWFbACchIQD++PkAFystAOLm5wD37+n8AYWCfv8KDRIA5KebADwJ7AAD9ukA9C5eALr0+wAzOjUAAbe7uf8U8e8A2FRYAMciEgAWDAUAKtLpAA6PjAD4JicAAbK3tv8R4d0A/ohtAP4+HgAI9/sA/+bnAOc5bADGCA8AAXt6d/zq3+P/VvqmABkfAAD9+AAA7+8AAIOnAAC9AAABASAAAP/gAAUAdGJUADAH3AD/Dx8ADSU/AJq0wQDlyKwAAU9AL4WxwO3EAADkC0VnchVJNjIBDgwL63h6gfQzEuo8AWZNJ3AJBQXBAwD/Cv3x1f3evQAA7gAAAzBOIfb7AAs/JRZnUWf0yw0AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Reincarnation_Exp.4e39eeed.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAH0lEQVR4nGNcE8D82MmUmYWVmeHP//8MyIDx7z+GfwCLNwhepkVvmQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:1},order:7,label:"Reinc.",unlock:0,key:"CowShopReincarnationBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.065+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(100,t).floor();return i},weight:A=>100},ir:{img:{src:"/_next/static/media/ShopUpgrade8ItemRatingBonusSelected.26582a70.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABD0lEQVR4nAWAO0gCYQCAv78kRbNoMIdOQRSUKIoWRewxRSjVWnPUEpJLS0QJXtDm0N5am+iQDVKURYRDY6QVpDRZkpHPu/NC+B0ojxUMO9FtAsEAna6K1TzIW+mFduNHFfLhvj5ilzBrdTrlMmZdxRYMkc494PO4ELnLrG6yWkiG51icBKkHypqMNBuh8lpEZFIp3e2R+Mye8124xdT9wB6J8TU2wX3uCrG3G1PbhiE9LFnR83F6vw1qM1HW5ROcIIQD9ApwLCdwCg2DpmB0+zjNXPB+fYZYXZg6Sj+17qgXLVsHCZt/3CtoNasb8eTf0mg1JDaXvTHLgPHGYBw21wp57bkEfdA/veJqKljm/wHjVWY+2sQPKAAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Item_Rating_Bonus.5e4a0e0c.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAI0lEQVR4nGM81CryWEHpCwsTE8Of/wwMDIxADKUZ//5j+AcAoeEJdIdWhywAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:8,label:"IR",unlock:0,key:"CowShopItemRatingBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.07+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(150,t).floor();return i},weight:A=>A>=15?50:30},calcium:{img:{src:"/_next/static/media/ShopUpgrade9CalciumBonusSelected.ec5b3744.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABEElEQVR4nA3LPUsCYQDA8f9zdoPdNcRxLpYJDWGDB5m1BDVlS/UJcsohCJGGhoagwbbchCToGwTWFESB4RBBY0RIwxlpUViKpnAvT32An5gL49y/MZTd2iSRnMdzXTR9hLpt0+9+uyJ/sC/1URPDMJiOxVAUhV6vS+nklKQVQ1xfXUoUFd/3seIWnU4Hz/dotVp8NF4RF+UzGYlO8tNuMx4eAwm1lxr9wYC7agWxt7vjDjxFrqSWCQQCSClpNBukN9JMgBCRf1MHCkcFzJBJMBhE1zSKxyXshzJifSmeP3/2qjQfte1szpxNzAjHcT4zh8VuynhfEJnVqZymqhVVCw1/2Tfe0y0MQcBai/466It/FotoUl05zJIAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Calcium_Exp.9b8e6dbc.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJUlEQVR4nGOc27zi8ZMJn1j+f2f485/5P8M/BggGQsa/DH//AQBDuBL7mIR0fQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:1},order:14,label:"Calc.",unlock:6,key:"CowShopCalciumBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.1+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(5e3,t).floor();return i},weight:A=>.5},ferment:{img:{src:"/_next/static/media/ShopUpgrade10FermentingBonusSelected.8063aa8b.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATYcAPvK5AAEcGtnAD5AQgD6+voAAgICAODg3wD48/D8AYSAff8PFBgADw4NAOHh4AAQEBAAMzIzAJqdoAAyLScAAbu4tv8KDQ8AOzs8AAAA/wAADTgAwreQAAcEAADm5OIAAbSwrf8VICQA8frwABEI+gAGBwcAAQcVAN/X4gDHurQAAXRta/wXKSf/YGRPAAUC/QD9/PsA+/8EAIGBlQCXiI4BARwAAP/kAAAAjJWVACEjIAAICAcAAf0BAJiUlgDgyq0AAVBBL4Wwv+zEAADlC11UXhU6PjkBAwMB62aFk/NIHPA9AWVNJ3AMBgjBBQ8YCvDquf3ctAAA/AAAAy5PJfb6/gY/w8pdKdVbdzsAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Fermentation_Exp.98523785.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJ0lEQVR4nGOc2bD08csZX1n+vWf485/9P8O//0DM8B8EGf8y/P0HAFKgE/t/TX+kAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:15,label:"Ferm.",unlock:7,key:"CowShopFermentingExp",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.125+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(1e4,t).floor();return i},weight:A=>.5},rp:{img:{src:"/_next/static/media/ShopUpgrade11R\xe9incPointBonusSelected.8911fdab.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABEklEQVR4nAWAzytDcQDAP9+Hl97bsMNY2lJzWJofpcWYEicp8Q/g5LbDmpKDRUwu7q6ym1JLTRwWaZTDhKO1OdDEHDaWPXtv70mMutHv3miOhpcZCYbQDQPV1kE+V6BWLRtiZytmOTq7ME0nz98BRF1nuu+Fs+tT+nu9iPRFypIUJ9n4A+m2EHZNY1bK4I4EqFWKiPNU0pJaXZTDh7iCEpKh81WQ+Vga4/31ERFbXzWKP4blrzgYl24xGxr3up/w8QE9IEQ3WEVgO76HqkkodgWXz8NRIkHu5gSxMDW0m7ysZiCvRjc3nMMDg8Kq/ZUW1/arM57ShFiZ80VssnwlWtrVz2ym8ZQDGZqC897fuqlM/gMLGmhl2wPZVwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Reincarnation_Point.0c532b2b.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIElEQVR4nGPcnxf/yEBiJSsz098/DP8ZGZAA499/DP8AqW8JXiF2iJYAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:19,label:"RP",unlock:12,key:"CowShopReincPtsBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.25+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(1e9,t).floor();return i},weight:A=>2},milk:{img:{src:"/_next/static/media/ShopUpgrade12MilkSelected.9d14e70a.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATYbAPvK5QAEcGplADA0NwD5+fkAEhEPAODf4AD28+/8AYWBff8NEhgAEQ8NAC42OQD3+vwA+/DrAJ2gowAzLScAAb26uP8BBQYAuLi4AHN4fADw9PcA9e3nAPr4+ADo5eIAAbSxr/8ZHB4A9vf3ACAmKQDz9voA+PDqAOHf3gDJxcIAAXt3dPzw9Pj/YmNiAB4kKADy9vgA1s3IAE1LSgAiAwABASECAP/f/gAAmJiYADI3OQD/AQMA8uzoAJCQkADl07cAAU9ALoWx3wHEAOHRC1NTVBVDQkEBBQcI62aKl/RGD+U8AWVNJ3ALBAPABw8cC/Pt1P3Zs+YA+gAAAy5NHvb7AQ4/NK9xXbX6Nk4AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Milk_Created.38910a20.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJElEQVR4nGOcXrXy8ctJH1gYGRj//GP8z/CPAYKBkPEvw99/ABRoEPtRS3HJAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:9,label:"Milk",unlock:1,key:"CowShopMilkBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.075+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(200,t).floor();return i},weight:A=>8},worm_qty:{img:{src:"/_next/static/media/ShopUpgrade13WormQtySelected.60183f26.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATYdAPvK4wAEcGtnADc8QAD6+/sADAkGAN3c3AD59O/8AYWBff8NExgAEA4NABT76AADAPwA/xgwAKyztAAuJiAAAb26t/8CCA0Av5JiAEUzDgD48cwAAzCYAAslNwDm3tgAAbWyr/8UGB4A6s20ABf6xQDz8/YA7Q1AAP4ZMQDTy8QAAXp1cPz0AQv/TCgLAAbklADk9CwA7BNCAHB3eAAdAAABARwAAP/kAAAAgnt1AA344wATKDwAFyAoAJWTkwDgzrEAAU9AL4WxyvLEAPbfC2d0fhU6MSoB+vXz62WKmPRHEeY8AWVNJ3ALBgfABAYKC+7byP3SzAAABwAAAzBOH/b7AA0/nXZjStXUFuEAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Worms_Quantity.dae2aa20.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIElEQVR4nGPM6ap5PEVYkYWBiekPw38GBGAEwn///gEAipkIHmccGFAAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:10,label:"Worm Qty.",unlock:2,key:"CowShopWormQtyBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.08+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(300,t).floor();return i},weight:A=>.5},brew:{img:{src:"/_next/static/media/ShopUpgrade14BrewerySelected.1370fc71.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABC0lEQVR42hXLP0sCYQDH8d9LaAiXWqIhSDKFiCsbXZ4igrAIjCgulWzoBq2ujKxOogI1raUazrv+GyImJpRt3duIehuP8OsaPssXvhjthQRAbT3OauWJj3c2X54feHps8HAnKWFk9li6uKRZtpg5OGIhX+Bnu80VNcZi7ox4bzXpOA49Hg8BcMS1vTpP58thrVoh3hp1frhHROmisTjOqBimPtVNu2wyrW8R+2m9k0yl5OwgZDQAGRqA3E0sSSGEBNDBUA94a1u8t02W8idsNRv8/fnm9c0VARBC6c8CEMuqGs6dF9dq9deEZVlz/21yrC+L+IxX24xM+Bd8CIYABa4AENwI+/yxaa/2B1OngfzGPBMWAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Brewing_Exp.c085d8dc.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJElEQVR4nGOs822+z3xKjOP/R8Y//1n/M/xjgGAgZPzL8PcfAAvEEPsIagVuAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:11,label:"Brew",unlock:3,key:"CowShopBrewExp",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.085+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(500,t).floor();return i},weight:A=>.5},poop:{img:{src:"/_next/static/media/ShopUpgrade15PoopSelected.4aef5827.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCklEQVR42g3DTUvCAAAG4PfUxVN00CJEOuShIX1QSF7qEkmIIXoykqAPKosVMvrA0KkUEQQzAkMIK8M12yAyCDpuB9fVfs2Etz3wYG4UDgCK+zvUNZVq85laq8nryzLl85yDciHP6t09G40nFooyFaVK07SY2dikcntD/Hx/0bQsegaHCIBL0wK7dpe2/UujrRIfxjt7vT8+1GpcBLgSGGDr9YWfnQ6lo0PiTDru5yTJOVhPOzOAE3TPu+H2An34AcKdWUvz4vSEVyWZj/U6E8kUBR+I+EKoguGJKDzeZL5Y2tV0Y++trafgD0WXZ0cq2IoFRTEhTGZXhUgygLAPCI8DkWx8bGo7Joj/rO596yoKtg0AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Poop_Created.848ff15b.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIElEQVR4nGNUaG5+9FBKivU/E9Mfhv8MCMAIhP/+/QMAoWkJHgiFbncAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},order:12,label:"Poop",unlock:4,key:"CowShopPoopBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.09+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(600,t).floor();return i},weight:A=>.5},pet_dmg:{img:{src:"/_next/static/media/ShopUpgrade16PetDamageSelected.b88c2486.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATgdAPvI4wAEa2ZgAD9AQgD7+/sAAQIDAObl5AD28+/8AYJ+ev8QFRoA/gICAPv9/gD+/v8AKygnALKwrwAqJSEAAbm2s/8UFhoAmp6cAAUSFQAFAgIATUI/AA4MDQDm4+EAAbKvrP8gIycA5OPjAKeVhgAHCAoAWmt3AAEDAwC4sq8AAXhzb/z+BQr/KCIgAJNmZwD1AAAAbI6MAK62ugDAvLoBAR0AAP/jAAAAiYmJAN7Y1gASExIAOj5BAJaYmQDm07UAAU9ALoWxzPbEAPTcC3h6fBUvLy4B+vn662qGkfQ8DeQ8AWVNJ3AMBgbAAgcQC+bTw/3O0wAADwAAAzZPIvX6/gpA40RjLnM+Yn8AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Pet_Damage.abf18032.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIUlEQVR4nGMsL2l69OPrT1YGBoY/QAwHjAyMjP/+//sHALNwCjRdimYwAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:20,label:"Pet Dmg.",unlock:14,key:"CowShopPetDamageBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.3+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(1e11,t).floor();return i},weight:A=>100},pet_exp:{img:{src:"/_next/static/media/ShopUpgrade17PetExpSelected.d5641f22.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCklEQVR42g3FXStDYQAH8D9u3biRtF1QKE4LkWU3cyOLTQk3kivKaI21aYQzOrRpnbYhNi+JNLaWl7bznI9xznybZ/V3Ln79MOWCBMBYJMxapczP9zfnD6a1c6YOYxKaeszC9S3viyWqqTOmM1cUpsnwboSFXJYQ9V82m39UT1UCoMtRKt7RsmzWf76I71qVlm3TaDS45le4MTtOYTRoCJOJvQiRjO+3EgdJ+fryLEcAqTjyela2d/XITqAFN0A4dF1n5vKCN/kchRCcXwjS424jFv0eDd3DAQDLRyfqdrlSDT88Pq10DEwE5iZ7NWwGh6LRJWU0vj7jWx2Etx/wTgO+nVDf2FZIif4DNdODPJ0zthAAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Pet_Level_Exp.7c272942.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIUlEQVR4nGMszC17/P8vG8v/////MCABRgZGxn////0DAN4cDDSzmdoyAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:13,label:"Pet Exp.",unlock:5,key:"CowShopPetLevelExp",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.095+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(2500,t).floor();return i},weight:A=>A>=15?10:50},pet_rank:{img:{src:"/_next/static/media/ShopUpgrade18PetRankSelected.9b592b76.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATgeAPvI4gAEcWtoADs/QAD8/PwABQQEAN3d3AD59PD8AYSAfP8PFBoADg4OAOvk4AADAwIALTM2AKusrQAqJiMAAby5tv8IDA8Ag047AP/tAAAAAAAAHnifAFZGKgD58eEAAbazr/8PFBwAeIrFAPvYsgAEBssAF0OQAEMsFADp3L8AAXtzY/zvBUH/JEJRAK+stAD9rFcAGXvdAK2vnwATxIQBARgAAP/oADAAVnJ3ADQg/gAeFPwA8wImAKakmQDy0qAAAVBBMoWwv87EAAAAC3p4bBUoLTwBCP/l62p6c/QzFyA8AWVNJnAMBxDA/QYaC+nVsP3Z0QAA9QAAA0VOK/b8AAA/X55gYg+4pk4AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Pet_Rank_Exp.12cf3eb5.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIUlEQVR4nGOMS657LMD6l4WJkeHPfwYEYGRgZPz3/98/AI+4CTTcgQW6AAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:17,label:"Pet Rank",unlock:9,key:"CowShopPetRankExp",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.175+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(1e6,t).floor();return i},weight:A=>A>=15?10:20},card_pow:{img:{src:"/_next/static/media/ShopUpgrade19CardPowerSelected.f3667ec3.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATccAPvJ5AAEa2lmADE2QQAIBPwADAkEANra3AD49O/8AYWBfP8KEhoAGxAKAD0j4gDU4PsA7wk9AL+8sgApIx4AAby6t/8DBg0AJfo8AA4bAACAiwAAY1ZdAPUTbQDl5OAAAbOysv8bFRIAMRU8AMPiJgDi4AkAWz7RAKzIowDN09IAAXx3cvzs9AH/dU7qABMYowAPFQAA18xFACpOuwAkAgABAR8AAP/hAAAAiIaJADwl9QAEBgwA6wEpAJufoQDhyqwAAU9AL4WxzvLEAPLfCz1hghVOOiwBFAf062R+i/REFe48AWVNJ3ALBQbABQkPC/noxP3fvQAA7gAAAzBOIvb7AAo/SAZeWiHnW1EAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Card_Power.2e9efb5c.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAJUlEQVR4nGNcMiXj8Zmrwiz/GRj+MDIwMABpMGBkYGT89//fPwDCSAs0Qa/+IAAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:1},order:16,label:"Card Pow.",unlock:8,key:"CowShopCardPowerBonus",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.15+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(1e5,t).floor();return i},weight:A=>A>=15?100:5},card_exp:{img:{src:"/_next/static/media/ShopUpgrade20CardExpSelected.41935c49.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR4nAEIAff+ATcbAPvJ5QAEd3JuAC0uLgD6+foAExUWANnZ2AD49PD8AYWBff8MEhcA5uTkAMbT2wD69/MAX1VQAMvO0QAxKyUAAby4tv8HCw4APT08AIZeHgD+++YAKlWoAB0eIQDj4NwAAbOvrP8eJCkA2dDEAATZlgAC//4AETt+APD+DADGvbYAAXl0cPz7Awr/QjgvABDdjwAJBf0A2wZSAFZpeQAfAAABAR4AAP/iAAAAiIqMABcA6gARDQwABB40AJubmwDey68AAU9ALoWx0vrEAO7YC2NyfBUzMC4BCP3262KCkPRIFOo8AWVNJ3ALBgbABAkTC/DbwP3fyQAA9gAAAzJOIfb7AAs/VSZlRWT15P0AAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},label_img:{src:"/_next/static/media/Card_Exp.aabb9773.png",height:70,width:604,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAYAAADjAO9DAAAAIUlEQVR4nGOsLy57/PEbG8t/hv9/GJAAIwMj47////4BAMdoCzTXw7cWAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},order:18,label:"Card Exp.",unlock:10,key:"CowShopCardExp",highestKey:A=>"CowShopHighest"+A.split("CowShop")[1],bonus:A=>{let e=r.Z.pow(1.01,A),t=r.Z.subtractDecimal(e,1),i=r.Z.multiplyDecimal(t,100);return i},cost:A=>{let e=1.2+2e-4*A,t=r.Z.pow(e,A),i=r.Z.multiplyDecimal(1e7,t).floor();return i},weight:A=>A>=15?10:5},locked:{img:{src:"/_next/static/media/locked.1e79c35c.png",height:211,width:211,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA80lEQVR42hXJQS8DQRgG4He+ndndtszEgW6FJvRAkx6R+Aki0Qu9iT/Yo4ufQBwaLhIOSIP0UqndTmVnv0+dnsOjrg43y1mVakOMqlyAGRAyUArIGhz05DfWN0UCt8xpoQBSsAaYqRh9BK0jIrQjhmGGrREEQC0xWBGFKCIQVyVex18QRagE+Je0xsfbJ2R5lLoNGfRPUZaBPRC8SPDe8/nFGRLXFL3V2VP1Zsa+16WXu3sCC3aPDtDZbnGoE2lr3dN3ke83nB1e7nSvqWL1uOZO8nk+WF91z9FxlvQUC7fz0TBNH0aLeDwxxc9caduKp++3f7oHZZtm4jLcAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8}}};var g=t(65438);let n={src:"/_next/static/media/info_white_thick.d541c30c.svg",height:123,width:123,blurWidth:0,blurHeight:0},d={src:"/_next/static/media/refresh_lightgray.98c77792.svg",height:24,width:24,blurWidth:0,blurHeight:0},h={src:"/_next/static/media/ShopUpgradeSelected.be416c08.png",height:199,width:224,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAV1BMVEUUtwATsQASpgAHbwAHagAGZwACUQACSQABRAAAAAAUswAIcAACSgAQnAAEVwATswACSAAPlwAPlgADWgATsQACSQATsQAHbwACSQALgQAFYQAUrAADTQCsAhBIAAAAHXRSTlMAAAAAAAAAAAAAAgICBQU9PT8/P0VFRkZGSEh1dZllgAcAAAA7SURBVHjaBUCFDcAgACvusuHy/50EJ/Vaezr4KAgB/bF4sDbwhcGcMY4NbBG9j2KjSK2UlgU3z9Zmvg9bsQMKRLDPgQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:7},c={src:"/_next/static/media/StillBuying.13ef7711.png",height:199,width:224,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAUVBMVEWzigCtiACsiACshwCigxGafheZfRmNeh8AAACviQCafhmohgujhBCtiACsiACshwCtiACRfR6tiACtiACYfRmfgROWfhqvigOwigCuigOvigCiWalaAAAAG3RSTlMAAAAAAAAAAAACAgUFPT09Pz9FRkZISHV1dXVemcRYAAAAP0lEQVR42hXLRxKAIBAEwBklLSCSDf9/KEXfG09qtbbrQ1EgoQqmjSLRTnTjnfOmY+ggEvRA5kGezHjvvdK/AFJZApxrvvrmAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:7};var u=t(39262),p=t(27428),m=t(35877),D=t.n(m),b=t(52451),w=t.n(b);l.ZP.initialize([{trackingId:"G-GGLPK02VH8"}]);let ResidueCard=({data:A,params:e,desiredLevels:t,setDesiredLevels:u,forceReinc:p})=>{let[m,b]=D()(`${e.label}_residue_weight`,-1),[C,E]=(0,a.useState)(1);(0,a.useEffect)(()=>{E(m)},[m]);let[x,B]=(0,a.useState)(!1),R=A[e.key],U=A.AscensionCount,f=-1===C?e.weight(U):C,y=!x&&U<e.unlock;e.cost(R);let S=o.reinc,[P,v]=D()(`${S.label}_residue_weight`,-1),[Q,k]=(0,a.useState)(A[S.key]);(0,a.useEffect)(()=>{let A=o.reinc;k(-1===P?A.weight(U):P)},[P,U]);let I=A[e.highestKey(e.key)],O=R>=I,Z=R,V=p&&"reinc"===e.key_inner,G=(0,a.useMemo)(()=>{let t=[],i=!0,a=o[e.key_inner],l=A.AscensionCount,s=-1===C?a.weight(l):C,g=A[e.key],n=g,d=o.reinc,h=A[d.key],c=d.cost(h),u=s/Q,p=r.Z.multiplyDecimal(c,u);if(V)return[[],n];for(;i;){i=!1;let A=a.cost(n);A.lessThan(p)&&(n++,i=!0,t.push({desiredLevel:n,newCost:A,weightedCost:r.Z.divideDecimal(A,s),weight:s,params:a}))}return[t,n]},[e.key,e.key_inner,A,Q,C,V]),L=G[0],K=(Z=G[1])>R;return(0,a.useEffect)(()=>{let A=p&&"reinc"===e.key_inner;if(y)return u(A=>{if(!A[e.key])return A;let t={...A};return delete t[e.key],t});K&&!t[e.key]?u(A=>{let t={...A};return t[e.key]={...e,purchaseOrders:L,desiredLevel:Z,level:R,weight:f},t}):t[e.key]?.desiredLevel===Z||A||u(A=>{let t={...A};return t[e.key]={...e,purchaseOrders:L,desiredLevel:Z,level:R,weight:f},t})},[p,t,Z,R,e,u,K,L,m,C,f,y]),(0,i.jsxs)("div",{className:"importantText residueCard",onMouseEnter:()=>{B(!0)},onMouseLeave:()=>{B(!1)},children:[(0,i.jsxs)("div",{className:"residueCardHeader",children:[i.jsx("div",{children:y?"?????":`${e.label}: ${R}`}),(O&&K||O&&V)&&!y&&(0,i.jsxs)("div",{className:"futurePurchase",children:[i.jsx("div",{children:`${V?1+Z:Z}`}),i.jsx("div",{children:`+${V?Z-R+1:Z-R}`})]})]}),(0,i.jsxs)("div",{className:"residueCardBody",children:[i.jsx("div",{style:{position:"absolute",right:"9px",top:"9px",zIndex:"2"},children:i.jsx(g.Z,{tooltip:(0,i.jsxs)("div",{children:[i.jsx("div",{children:`Cost: ${e.cost(R).toExponential(2)}`}),i.jsx("div",{children:`Bonus: ${s.Z.numberWithCommas(e.bonus(R).ceil().toString())}%`})]}),children:i.jsx("div",{style:{position:"relative",width:"30px",height:"30px"},children:i.jsx(w(),{src:n,fill:!0,unoptimized:!0,alt:"letter i in a circle"})})})}),!y&&(0,i.jsxs)("div",{style:{position:"absolute",left:"8px",bottom:"8px",zIndex:"2",display:"flex",alignItems:"center"},children:[i.jsx("div",{children:"Weight:"}),i.jsx("div",{style:{marginLeft:"6px"},children:i.jsx("input",{"aria-label":"Specify how important this bonus is",className:"importantText textMedium2",style:{borderRadius:"4px",width:"48px",height:"12px",backgroundColor:"#1D1D1D"},type:"number",value:f,onChange:A=>{try{let t=Number(A.target.value);if(t<0||t>9999)return;b(t),l.ZP.event({category:"residue_interaction",action:"changed_residue_weight",label:`${e.label}`,value:t})}catch(A){console.log(A)}},min:"0",max:"9999"})}),f!==e.weight(U)&&i.jsx("div",{className:"hover",style:{position:"relative",width:"18px",height:"18px",marginLeft:"6px"},onClick:()=>{b(-1)},children:i.jsx(w(),{src:d,fill:!0,unoptimized:!0,alt:"reset, 2 arrows in a circle"})})]}),!!y&&i.jsx(w(),{src:o.locked.img,fill:!0,unoptimized:!0,alt:"locked bonus image from in game"}),!y&&i.jsx(w(),{src:e.img,fill:!0,unoptimized:!0,alt:`${e.key} bonus from in game`}),(!!K||V)&&!y&&i.jsx(w(),{src:h,fill:!0,unoptimized:!0,alt:"Green border to indicate an upgrade should be purchased"}),!O&&i.jsx(w(),{src:c,fill:!0,unoptimized:!0,alt:"Yellow border to indicate an upgrade is still autobuying"})]}),i.jsx("div",{className:"residueCardFooter"})]})},ResideOrderCard=({data:A})=>(0,i.jsxs)("div",{className:"importantText suggestionCard",children:[(0,i.jsxs)("div",{className:"suggestionCardHeader",children:[i.jsx("div",{children:`${A.params.label}`}),i.jsx("div",{style:{marginLeft:"auto"},children:`Cost: ${A.totalCost.toExponential(2).toString()}`})]}),i.jsx("div",{className:"suggestionCardBody",children:(0,i.jsxs)("div",{style:{position:"relative",height:"45px"},children:[i.jsx(w(),{alt:`${A.params.label} bonus holder`,style:{width:"auto",height:"100%"},src:A.params.label_img,unoptimized:!0}),(0,i.jsxs)("div",{className:"blackTextStroke1",style:{display:"flex",alignItems:"center",position:"absolute",top:"calc(50% - 14px)",left:"48px",fontSize:"27px",fontWeight:"bold",width:"calc(100% - 52px)"},children:[i.jsx("div",{children:`${A.start}`}),i.jsx("div",{style:{height:"32px",width:"32px",position:"relative",margin:"0 3px"},children:i.jsx(w(),{alt:"arrow point to the left",src:u.Z,fill:!0,unoptimized:!0})}),i.jsx("div",{children:`${A.desiredLevel}`}),i.jsx("div",{style:{marginLeft:"auto"},children:`+${A.desiredLevel-A.start}`})]})]})})]});function Residue(){let[A,e]=D()("userData",p),[t,s]=(0,a.useState)(p),g=(0,a.useRef)(!1);(0,a.useEffect)(()=>{s(A),g.current=!0},[A]);let[n,d]=(0,a.useState)({}),[h,c]=(0,a.useState)(!1),u=[],m=o.reinc;Object.entries(h?{reinc:{...m,purchaseOrders:[{desiredLevel:t[m.key]+1,newCost:m.cost(t[m.key]),weightedCost:r.Z.divideDecimal(m.cost(t[m.key]),m.weight(t.AscensionCount)),weight:m.weight(t.AscensionCount),params:m}],desiredLevel:t[m.key]+1,level:t[m.key],weight:m.weight(t.AscensionCount)}}:n).map(A=>(A[1].purchaseOrders.forEach(A=>u.push(A)),A[1]));let b=t[m.highestKey(m.key)]>t[m.key],w=r.Z.createDecimal(t.CurrentResidueBD),C=r.Z.createDecimal(0),E=r.Z.createDecimal(0),x=[],B=[];u.sort((A,e)=>A.weightedCost.lessThan(e.weightedCost)?-1:1);let R={};return u.forEach(A=>{if((C=r.Z.addDecimal(C,A.newCost)).lessThan(w)){if(E=r.Z.addDecimal(E,A.newCost),0===x.length)x.push({...A,start:A.desiredLevel-1,totalCost:A.newCost}),R[A.params.key]=A.desiredLevel;else{let e=x[x.length-1];e.params.key===A.params.key?(e.desiredLevel++,e.totalCost=r.Z.addDecimal(e.totalCost,A.newCost),R[A.params.key]=e.desiredLevel):(x.push({...A,start:A.desiredLevel-1,totalCost:A.newCost}),R[A.params.key]=A.desiredLevel)}}else if(0===B.length)B.push({...A,start:R[A.params.key]?R[A.params.key]:A.desiredLevel-1,totalCost:A.newCost});else{let e=B[B.length-1];e.params.key===A.params.key?(e.desiredLevel++,e.totalCost=r.Z.addDecimal(e.totalCost,A.newCost)):B.push({...A,start:R[A.params.key]?R[A.params.key]:A.desiredLevel-1,totalCost:A.newCost})}}),(0,a.useEffect)(()=>{if(!g.current)return;let A=[];Object.entries(n).map(e=>(e[1].purchaseOrders.forEach(e=>A.push(e)),e[1])),0===A.length?c(!0):c(!1)},[n,g]),i.jsx("div",{style:{display:"flex",flex:"1",backgroundColor:"black",position:"relative"},children:(0,i.jsxs)("div",{style:{display:"flex",flex:"1",backgroundColor:"rgba(255,255,255, 0.05)",paddingLeft:"12px"},children:[(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignSelf:"start",width:"900px",border:"2px solid rgba(255,255,255,0.8)",margin:"12px 36px 0 0px",borderRadius:"12px",height:"calc(100vh - 68px)",paddingBottom:"12px"},children:[i.jsx("div",{style:{backgroundColor:"rgba(255,255,255, 0.05)"},children:i.jsx("div",{className:"importantText",style:{fontSize:"36px",display:"flex",alignItems:"center",justifyContent:"center",margin:"12px 0"},children:`Current Residue${b?" - STILL BUYING":""}`})}),i.jsx("div",{style:{height:"calc(100% - 42px)",padding:"0 6px 0 0"},children:i.jsx("div",{style:{display:"flex",flexWrap:"wrap",maxHeight:"100%",overflowY:"auto"},children:Object.entries(o).filter(A=>"locked"!==A[0]).sort((A,e)=>A[1].order-e[1].order).map((A,e)=>{let a=A[0],l=A[1];return i.jsx(ResidueCard,{data:t,desiredLevels:n,setDesiredLevels:d,params:{...l,key_inner:a,currentResidue:w},forceReinc:h},e)})})})]}),(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignSelf:"start",width:"445px",border:"2px solid rgba(255,255,255,0.8)",margin:"12px 36px 12px 0px",borderRadius:"12px",height:"calc(100vh - 68px)",paddingBottom:"12px",overflow:"hidden"},children:[i.jsx("div",{style:{backgroundColor:"rgba(255,255,255, 0.05)"},children:i.jsx("div",{className:"importantText",style:{fontSize:"36px",display:"flex",alignItems:"center",justifyContent:"center",margin:"12px 0"},children:"Suggested Purchase Order"})}),i.jsx("div",{style:{height:"calc(100% - 42px)",padding:"0 6px 0 0"},children:!b&&(0,i.jsxs)("div",{className:"suggestedOrder importantText",style:{display:"flex",flexDirection:"column",height:"calc(100% - 11px)",overflowY:"auto",alignItems:"center"},children:[i.jsx("h2",{style:{marginBottom:"3px"},children:"Affordable Purchase Order"}),i.jsx("button",{onClick:()=>{l.ZP.event({category:"residue_interaction",action:"accept_affordable_order"});let A={};x.forEach(e=>{A[e.params.key]=e.desiredLevel}),d({}),s(e=>{let t={...e},i=r.Z.subtractDecimal(w,E);for(let[e,a]of(t.CurrentResidueBD={mantissa:i.mantissa,exponent:i.exponent},Object.entries(A)))t[e]=a;return t})},children:"Accept"}),x.map((A,e)=>i.jsx(ResideOrderCard,{data:A},e)),i.jsx("h2",{style:{marginBottom:"3px"},children:"Future Purchase Order"}),i.jsx("button",{onClick:()=>{l.ZP.event({category:"residue_interaction",action:"accept_future_order"});let A={};B.forEach(e=>{A[e.params.key]=e.desiredLevel}),d({}),s(e=>{let t={...e},i=r.Z.subtractDecimal(w,C);for(let[e,a]of(t.CurrentResidueBD={mantissa:i.mantissa,exponent:i.exponent},Object.entries(A)))t[e]=a;return t})},children:"Accept"}),B.map((A,e)=>i.jsx(ResideOrderCard,{data:A},e))]})})]})]})})}},70583:(A,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>Page,generateMetadata:()=>generateMetadata,viewport:()=>g});var i=t(4656),a=t(95153);let l=(0,a.createProxy)(String.raw`C:\Users\denys\Documents\GitHub\gameplay-planner\src\app\residue\page_content.jsx`),{__esModule:r,$$typeof:s}=l,o=l.default;async function generateMetadata({params:A,searchParams:e},t){return{title:"Residue / Milk Guide - Gameplay Planner",description:"Residue + Milk - Help you build, plan and optimise your milk / residue purchases. Includes a weight list to prioritise stats bonuses. Displays cost, time to purchase, level, hidden and future bonuses"}}let g={width:"device-width",initialScale:1};function Page(){return i.jsx(o,{})}},39262:(A,e,t)=>{"use strict";t.d(e,{Z:()=>i});let i={src:"/_next/static/media/right_arrow_white.77bfe840.svg",height:25,width:25,blurWidth:0,blurHeight:0}},16467:()=>{}};var e=require("../../webpack-runtime.js");e.C(A);var __webpack_exec__=A=>e(e.s=A),t=e.X(0,[3367,1843,6990,5877,7419,5492,755,5340,5438,5628,2989,1263],()=>__webpack_exec__(61259));module.exports=t})();