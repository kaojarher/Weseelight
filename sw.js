const C='projmap-v5',F=['./','index.html','manifest.webmanifest','icon.svg'],X=['cdnjs.cloudflare.com','docs.opencv.org'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
// 快取優先；Three.js 與 OpenCV.js 首次載入後會被快取，之後可離線使用
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url),ok=u.origin===location.origin||X.includes(u.hostname);
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(ok&&res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res})))});
