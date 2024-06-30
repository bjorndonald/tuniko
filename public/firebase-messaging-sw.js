importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGR9WMffzxkE5sOE7cqLEca4Evn9OB_SY",
    authDomain: "tuniko.firebaseapp.com",
    projectId: "tuniko",
    storageBucket: "tuniko.appspot.com",
    messagingSenderId: "1085864700854",
    appId: "1:1085864700854:web:3b75e09a965f16c7766f17",
    measurementId: "G-4QM6Z01HMY"
};

firebase.initializeApp(firebaseConfig);

navigator.serviceWorker.register("sw.js");

const baseUrl = "http://localhost:3000"
const backendApiUrl = "http://localhost:8080"

const baseApiUrl = `${baseUrl}/api`

const setUpMessage = async () => {
    Notification.requestPermission().then(res => {
        if (Notification.permission == 'granted') {
            console.log("Granted permission")
            return
        }
        console.log(res)
    })
    if (typeof Notification === "undefined") return
    const permission = await Notification.requestPermission()
console.log(permission)
    if(permission === "denied") return

    const resp = await fetch(`${baseApiUrl}/auth/session`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (resp.ok) {
        const json = await resp.json()

        if (json?.user) {
            // save and return user
            const user = json.user
console.log(user)
            const resp = await fetch(`${backendApiUrl}/user/${user.email}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (resp.ok) {
                const json = await resp.json()
                const user = json.user
                var source = new EventSource(`${backendApiUrl}/stream/${user.email}`);

                source.addEventListener('message', function (e) {
                    sendAlert(e, user.id)
                })
            }
        }
    }
}

const sendAlert = (e, id) => {
    const message = JSON.parse(e.data)
    console.log(message)
    let title = "JavaScript Jeep";

    let icon = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';

    let body = "It's Your boarding time";

    var notification = new Notification(title, { body, icon });
    notification.onclick = () => {
        notification.close();
        window.parent.focus();
    }
    console.log(notification)
    return self.registration.showNotification(title, notificationOptions);
}


setUpMessage()

self.addEventListener('push', function (event) {
})

class CustomPushEvent extends Event {
    constructor(data) {
        super('push');

        Object.assign(this, data);
        this.custom = true;
    }
}


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const { title, body, image, icon, ...restPayload } = payload.data;
    const notificationOptions = {
        body,
        // icon: image, // path to your "fallback" firebase notification logo
        data: restPayload,
    };
    console.log(title)
    return self.registration.showNotification(title, notificationOptions);
});

messaging.onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});

self.addEventListener('notificationclick', (event) => {
    if (event?.notification?.data && event?.notification?.data?.link) {
        self.clients.openWindow(event.notification.data.link);
    }

    // close notification after click
    event.notification.close();
});