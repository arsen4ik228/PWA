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

let accountId; // Переменная для хранения accountId

self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    if (type === 'SET_ACCOUNT_ID') {
        // Сохраняем accountId в переменную
        accountId = data.accountId;
        
        
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ type: 'ACCOUNT_ID_SET' }));
        });
    }
});

const saveSubscription = async (subscription) => {
    console.log(`не преобразовання ${accountId}`);
    
    const response = await fetch(`https://24academy.ru/api/${accountId}/save-subscription`, {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })

    return response.json()
}

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BJHxrYJR3WgpNrUYXpuAR6ZdIwTuC09dkzJH6Ca427K6Q1lEmqgFAQeNkvEwh8ZfAgyUbMJyD6FuJZqb_SX9WeE")
    })

    const response = await saveSubscription(subscription)
    console.log(response)
})


self.addEventListener("push", e => {
    self.registration.showNotification("Уведомление", { body: e.data.text() })
})



// Public Key:
// BJHxrYJR3WgpNrUYXpuAR6ZdIwTuC09dkzJH6Ca427K6Q1lEmqgFAQeNkvEwh8ZfAgyUbMJyD6FuJZqb_SX9WeE


// Private Key:
// _qzOFBUdFvMpVDZc4OsU39Nfgyi21-zntSYJg7RIbSs