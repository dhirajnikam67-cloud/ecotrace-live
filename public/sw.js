// public/sw.js
// ---------------------------------------------------------------------------
// EcoTrace India — Service Worker (PWA, Aug 2026)
//
// मुद्दाम v1 मध्ये कुठलाही offline-cache ठेवलेला नाही — कारण pilot दरम्यान रोज नवीन
// बदल deploy होतायत, आणि जुनं cached UI दाखवणं (जे नवीन fixes लपवेल) हे कच्चा डेटा न
// साठवण्यापेक्षाही जास्त confusing ठरू शकतं. सध्या हा service worker फक्त
// "installability" चं तांत्रिक निकष पूर्ण करतो (Chrome ला install-prompt दाखवण्यासाठी
// एक fetch handler असणं सक्तीचं असतं) — प्रत्येक request सरळ नेटवर्ककडेच जाते.
//
// पुढे pilot स्थिर झाल्यावर, फक्त स्थिर static assets (logo, fonts) साठी
// cache-first strategy जोडता येईल — daily_logs/API कॉल्स कधीच cache करू नयेत.
// ---------------------------------------------------------------------------

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
