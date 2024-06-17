let accountId;
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
    if (pushData.title && pushData.content) {
        // Создаем уведомление с использованием только поля title
        self.registration.showNotification(pushData.title, { body: pushData.content });
    } else {
        console.error('Полученные данные не содержат обязательных полей title и/or content');
    }
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