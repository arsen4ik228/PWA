`use strict`;
importScripts(`https://24academy.ru/PWA/sw-toolbox.js`); 
toolbox.precache(["PWA/index.html"]); 
toolbox.router.get(`/images/*`, toolbox.cacheFirst); 
toolbox.router.get(`/*`, toolbox.networkFirst, { networkTimeoutSeconds: 5});