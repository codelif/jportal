if(!self.define){let e,i={};const s=(s,c)=>(s=new URL(s+".js",c).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,r)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let d={};const o=e=>s(e,n),a={module:{uri:n},exports:d,require:o};i[n]=Promise.all(c.map((e=>a[e]||o(e)))).then((e=>(r(...e),d)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BqtaE6h-.js",revision:null},{url:"assets/index-DD97Gh6i.css",revision:null},{url:"icons/attendance.svg",revision:"8ffd153d972cb862984438c5bc5165e7"},{url:"icons/exams.svg",revision:"6e5c5f82b53e673b86cac371457304d9"},{url:"icons/grades.svg",revision:"1f4d07527b5485429a4e30cc43b29b09"},{url:"icons/logout.svg",revision:"8286d6af6723e3f88806f4314a6375c9"},{url:"icons/profile.svg",revision:"59aa494bab285fad5adcdb202595cb31"},{url:"icons/subjects.svg",revision:"fc5c55b8aa367910794dbfc938a34d25"},{url:"icons/subjects1.svg",revision:"2d7134a1a19d7608c16cbc74593a8a34"},{url:"index.html",revision:"dc3b0be8f078113d95ba8ef8ab13bcec"},{url:"pwa-icons/circle.ico",revision:"915c7ddc238c84c75eb73e112db5ea03"},{url:"pwa-icons/circle.svg",revision:"0e05540a5d08269c5ecdae1de85a8356"},{url:"pwa-icons/tire.svg",revision:"92ea1c0b4aaebd48ddb44cdb36cdea8b"},{url:"pwa-icons/wheel.svg",revision:"aa17dd07424933df7713f03f1d6ee189"},{url:"registerSW.js",revision:"232976946134c1b599ed996e5fef13ce"},{url:"pwa-icons/circle.ico",revision:"915c7ddc238c84c75eb73e112db5ea03"},{url:"pwa-icons/circle.svg",revision:"0e05540a5d08269c5ecdae1de85a8356"},{url:"pwa-icons/tire.svg",revision:"92ea1c0b4aaebd48ddb44cdb36cdea8b"},{url:"pwa-icons/wheel.svg",revision:"aa17dd07424933df7713f03f1d6ee189"},{url:"manifest.webmanifest",revision:"cc205d72a8749f00a82038bf1440d796"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
