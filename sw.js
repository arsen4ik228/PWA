let accountId;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let STATIC_CACHE_NAME = "gfg-pwa";
// let DYNAMIC_CACHE_NAME = "dynamic-gfg-pwa";

// // Add Routes and pages using React Browser Router
// let urlsToCache =
// [
// '#/',
// '#/:accountId/user',
// '#/:accountId/user/new',
// '#/:accountId/user/new/start',
// '#/:accountId/user/new/main',
// '#/:accountId/user/new/personal',
// '#/:accountId/user/work',
// '#/:accountId/user/archive',
// ];

// // Install a service worker
// self.addEventListener("install", (event) => {
// // Perform install steps
// event.waitUntil(caches.open(STATIC_CACHE_NAME).then(function (cache) {
// console.log("Opened cache");
// return cache.addAll(urlsToCache);
// })
// );
// });

// // Cache and return requests
// self.addEventListener("fetch", (event) => {
// // Проверяем, есть ли соединение
// navigator.onLine? fetchFromNetwork(event) : fetchFromCache(event);

// // Функция для получения ресурса из сети
// function fetchFromNetwork(event) {
// return fetch(event.request).then((fetchRes) => {
// // Если ресурс получен успешно, сохраняем его в динамический кэш
// caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
// cache.put(event.request.url, fetchRes.clone());
// });
// // Возвращаем результат из сети
// return fetchRes;
// }).catch((error) => {
// // В случае ошибки в сети, пытаемся получить ресурс из кэша
// return caches.match(event.request);
// });
// }

// // Функция для получения ресурса из кэша
// function fetchFromCache(event) {
// return caches.match(event.request).then((cacheRes) => {
// // Если ресурс найден в кэше, возвращаем его
// return cacheRes || fetch(event.request);
// });
// }
// });

// // Update a service worker
// self.addEventListener("activate", (event) => {
// let cacheWhitelist = ["gfg-pwa"];
// event.waitUntil(caches.keys().then((cacheNames) => {
// return Promise.all(
// cacheNames.map((cacheName) => {
// if (cacheWhitelist.indexOf(cacheName) === -1) 
//     {
// return caches.delete(cacheName);
// }
// })
// );
// })
// );
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    if (type == 'SET_ACCOUNT_ID') {
        // Сохраняем accountId в переменную
        accountId = data.accountId;
        console.log(`сообщение слушатель ${accountId}`);
        
        // Вызываем асинхронную функцию subscribeAndNotify
        subscribeAndNotify();
    }
});

// Определяем асинхронную функцию
async function subscribeAndNotify() {
    try {
        const subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BJHxrYJR3WgpNrUYXpuAR6ZdIwTuC09dkzJH6Ca427K6Q1lEmqgFAQeNkvEwh8ZfAgyUbMJyD6FuJZqb_SX9WeE")
        });

        // Сохраняем подписку
        const response = await saveSubscription(subscription);
        console.log(response);

        // Уведомляем клиентов
        self.clients.matchAll().then(clients => {
            clients.forEach(client => client.postMessage({ type: 'ACCOUNT_ID_SET' }));
        });
    } catch (error) {
        console.error('Ошибка при подписке на push-уведомления:', error);
    }
}

// Функция для преобразования строки в массив uint8array
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
};

// Функция для сохранения подписки
async function saveSubscription(subscription) {
    console.log(`сохранение подписки ${accountId}`);
    
    const response = await fetch(`https://24academy.ru/api/${accountId}/save-subscription`, {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    });

    return response.json();
}

self.addEventListener("push", e => {
    // Преобразование текстового содержимого события в объект JSON
    let pushData = {};
    try {
        pushData = JSON.parse(e.data.text());
    } catch (error) {
        console.error('Ошибка при разборе JSON:', error);
        return; // Если JSON не может быть разобран, прекращаем выполнение
    }

    // Проверяем, что объект содержит поля title и content
    if (pushData.title) {
        // Создаем уведомление с использованием только поля title
        self.registration.showNotification("Уведомление", { body: pushData.title });
    } else {
        console.error('Полученные данные не содержат обязательных полей title и/or content');
    }
});
self.addEventListener('notificationclick', function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    const promiseChain = clients.openWindow('https://24academy.ru/PWA');
    event.waitUntil(promiseChain);
});

// const urlBase64ToUint8Array = base64String => {
//     const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//     const base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');

//     const rawData = atob(base64);
//     const outputArray = new Uint8Array(rawData.length);

//     for (let i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }

//     return outputArray;
// }

// let accountId; // Переменная для хранения accountId

// self.addEventListener('message', event => {
//     const { type, data } = event.data;
    
//     if (type === 'SET_ACCOUNT_ID') {
//         // Сохраняем accountId в переменную
//         accountId = data.accountId;
//         console.log(`сообщение слушатель ${accountId}`);
        
//         self.clients.matchAll().then(clients => {
//             clients.forEach(client => client.postMessage({ type: 'ACCOUNT_ID_SET' }));
//         });
//     }
// });

// const saveSubscription = async (subscription) => {
//     console.log(`сохранение подписки${accountId}`);
    
//     const response = await fetch(`https://24academy.ru/api/${accountId}/save-subscription`, {
//         method: 'post',
//         headers: { 'Content-type': "application/json" },
//         body: JSON.stringify(subscription)
//     })

//     return response.json()
// }

// self.addEventListener("activate", async (e) => {
//     const subscription = await self.registration.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array("BJHxrYJR3WgpNrUYXpuAR6ZdIwTuC09dkzJH6Ca427K6Q1lEmqgFAQeNkvEwh8ZfAgyUbMJyD6FuJZqb_SX9WeE")
//     })

//     const response = await saveSubscription(subscription)
//     console.log(response)
// })


// self.addEventListener("push", e => {
//     // Преобразование текстового содержимого события в объект JSON
//     let pushData = {};
//     try {
//         pushData = JSON.parse(e.data.text());
//     } catch (error) {
//         console.error('Ошибка при разборе JSON:', error);
//         return; // Если JSON не может быть разобран, прекращаем выполнение
//     }

//     // Проверяем, что объект содержит поля title и content
//     if (pushData.title && pushData.content) {
//         // Создаем уведомление с использованием только поля title
//         self.registration.showNotification(pushData.title, { body: pushData.content });
//     } else {
//         console.error('Полученные данные не содержат обязательных полей title и/or content');
//     }
// });




// Public Key:
// BJHxrYJR3WgpNrUYXpuAR6ZdIwTuC09dkzJH6Ca427K6Q1lEmqgFAQeNkvEwh8ZfAgyUbMJyD6FuJZqb_SX9WeE


// Private Key:
// _qzOFBUdFvMpVDZc4OsU39Nfgyi21-zntSYJg7RIbSs