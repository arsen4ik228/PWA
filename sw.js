`use strict`;
importScripts(`PWA/sw-toolbox.js`); 
toolbox.precache(["PWA/index.html"]); 
toolbox.router.get(`/images/*`, toolbox.cacheFirst); 
toolbox.router.get(`/*`, toolbox.networkFirst, { networkTimeoutSeconds: 5});