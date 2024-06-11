// `use strict`;
// importScripts(`https://24academy.ru/PWA/sw-toolbox.js`); 
// toolbox.precache(["https://24academy.ru/PWA/index.html"]); 
// toolbox.router.get(`https://24academy.ru/PWA/static/media/*`, toolbox.cacheFirst); 
// toolbox.router.get(`https://24academy.ru/PWA/*`, toolbox.networkFirst, { networkTimeoutSeconds: 5});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// self.addEventListener('install', function(event) {
//     console.log('Service Worker installing.');
//     // Здесь можно выполнить асинхронные операции, например, очистить кэш
// });

// self.addEventListener('activate', function(event) {
//     console.log('Service Worker activating.');
//     // Здесь можно выполнить асинхронные операции, например, удалить устаревшие кэшированные ресурсы
// });

// self.addEventListener('push', function(event) {
//     const options = {
//         body: 'Это ваше уведомление',
//         icon: '/path/to/icon.png',
//         badge: '/path/to/badge.png'
//     };

//     event.waitUntil(
//         self.registration.showNotification('Title of Notification', options)
//     );
// });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

self.addEventListener("activate", async (e) => {

    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BJpu-o7kq-OiFNc0HA-JUru2KD6jmvuIuKJ7VKkmTiFD5kr_9ScQ0V70O9DreSBJoXNI9P3pGL7_ssdYt4QLAJg")
    })
    console.log(subscription)
})




// Public Key:
// BJpu-o7kq-OiFNc0HA-JUru2KD6jmvuIuKJ7VKkmTiFD5kr_9ScQ0V70O9DreSBJoXNI9P3pGL7_ssdYt4QLAJg

// Private Key:
// _qzOFBUdFvMpVDZc4OsU39Nfgyi21-zntSYJg7RIbSs