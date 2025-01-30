import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(({ request }) => {
  return request.url.startsWith('http://127.0.0.1:5000') && request.method == 'GET';
}, new NetworkFirst());

self.addEventListener('sync', function(event) {
  console.log('sync event fired');
});