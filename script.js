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
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/PWA/sw.js')
     .then(function(registration) {
        // Получаем доступ к PushManager
        console.log('ServiceWorker registration successful with scope: ', registration.scope); 
        return registration.pushManager;
      })
     .then(function(pushManager) {
        // Запрашиваем разрешение на отображение уведомлений
        return pushManager.requestPermission();
      })
     .then(function(permission) {
        if (permission === 'granted') {
          console.log('Разрешено показывать уведомления');
          // Здесь вы можете добавить логику для отправки уведомлений через Service Worker
        } else {
          console.log('Не разрешено показывать уведомления');
        }
      })
     .catch(function(error) {
        console.error('Ошибка при запросе разрешения на уведомления:', error);
      });
  }
  








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const checkPermission = () => {
//     if (!('service Worker' in navigator)) {
//         throw new Error("No support for service worker!")
//     }
// }    

// const registers = async () => {
//     const registration = await navigator.serviceWorker.register('sw.js');
//     return registration;
// }

// checkPermission()
// registers()