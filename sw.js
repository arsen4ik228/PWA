`use strict`;
importScripts(`https://24academy.ru/PWA/sw-toolbox.js`); 
toolbox.precache(["https://24academy.ru/PWA/index.html"]); 
toolbox.router.get(`https://24academy.ru/PWA/static/media/*`, toolbox.cacheFirst); 
toolbox.router.get(`https://24academy.ru/PWA/*`, toolbox.networkFirst, { networkTimeoutSeconds: 5});