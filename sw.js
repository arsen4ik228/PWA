// `use strict`;
// importScripts(`https://24academy.ru/PWA/sw-toolbox.js`); 
// toolbox.precache(["https://24academy.ru/PWA/index.html"]); 
// toolbox.router.get(`https://24academy.ru/PWA/static/media/*`, toolbox.cacheFirst); 
// toolbox.router.get(`https://24academy.ru/PWA/*`, toolbox.networkFirst, { networkTimeoutSeconds: 5});

self.addEventListener('install', function(event) {
    console.log('Service Worker installing.');
    // Здесь можно выполнить асинхронные операции, например, очистить кэш
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activating.');
    // Здесь можно выполнить асинхронные операции, например, удалить устаревшие кэшированные ресурсы
});

self.addEventListener('push', function(event) {
    const options = {
        body: 'Это ваше уведомление',
        icon: '/path/to/icon.png',
        badge: '/path/to/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('Title of Notification', options)
    );
});