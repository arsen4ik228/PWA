// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {  
//       navigator.serviceWorker.register('/PWA/sw.js').then(
//         function(registration) {
//           // Registration was successful
//           console.log('ServiceWorker registration successful with scope: ', registration.scope); },
//         function(err) {
//           // registration failed :(
//           console.log('ServiceWorker registration failed: ', err);
//         });
//     });
//    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// В вашем основном JavaScript файле
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//     navigator.serviceWorker.register('/PWA/sw.js')
//     .then(function(registration) {
//         console.log('ServiceWorker registration successful with scope: ', registration.scope); 
//         return registration.pushManager;
//       })
//     .then(function(pushManager) {
//         if (pushManager) {
//             // Теперь мы уверены, что pushManager существует
//             return pushManager.requestPermission();
//         } else {
//             throw new Error('pushManager is not available');
//         }
//       })
//     .then(function(permission) {
//         if (permission === 'granted') {
//           console.log('Разрешено показывать уведомления');
//           // Здесь вы можете добавить логику для отправки уведомлений через Service Worker
//         } else {
//           console.log('Не разрешено показывать уведомления');
//         }
//       })
//     .catch(function(error) {
//         console.error('Ошибка при запросе разрешения на уведомления:', error);
//       });
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const checkPermission = () => {
    if(!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }
}

const registers = async () => {
    const registration = await navigator.serviceWorker.register('/PWA/sw.js');
    return registration;
}
const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    };
}
const main = async () => {
    checkPermission()
    await registers()
    await requestNotificationPermission()
    
}

main()