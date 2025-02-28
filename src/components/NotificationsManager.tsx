import { useState } from "react";
import { urlB64ToUint8Array } from "../utils/urlB64ToUint8Array";

const PUBLIC_PUSH_KEY = import.meta.env.VITE_PUBLIC_PUSH_KEY as string;

function NotificationsManager() {
    const [subscribed, setSubscribed] = useState<Boolean>(false);

    async function testNotification() {
        await Notification.requestPermission();
        new Notification("Test notification");
    }

    async function subscribe() {
        const perm = await Notification.requestPermission();

        if (perm === 'granted') {
            const serviceWorker: any = await navigator.serviceWorker.ready;

            let subscription = await serviceWorker.pushManager.getSubscription();

            if (subscription == null) {
                subscription = await serviceWorker.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array(PUBLIC_PUSH_KEY),
                });
            }

            setSubscribed(true);
        }
    }

    if (subscribed) {
        return (
            <div className="p-3 fixed-bottom fs-3">
                <button className="btn btn-info" onClick={() => testNotification()}>
                    Test notification
                </button>
            </div>
        );
    }

    return (
        <div className="p-3 fixed-bottom fs-3">
            <button className="btn btn-info" onClick={() => subscribe()}>
                S'abonner
            </button>
        </div>
    );
}

export default NotificationsManager;