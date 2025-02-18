import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { openDB } from "idb";

const API_URL = "http://localhost:5000/posts";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.pathname.startsWith('/posts') || url.pathname.startsWith('/users'),
  new NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  new CacheFirst({
    cacheName: 'static-assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://cdn.jsdelivr.net' && url.pathname.startsWith('/npm/bootstrap-icons@'),
  new CacheFirst({
    cacheName: 'bootstrap-icons',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-posts') {
    event.waitUntil(
      (async () => {
        const db = await openDB('offline-sync', 1);
        const keys = await db.getAllKeys('posts') || [];
        if (keys.length > 0) {
          await Promise.all(
            keys.map(async (key) => {
              const post = await db.get('posts', key);
              if (post) {
                await sendPost(db, key, JSON.parse(post));
              }
            })
          );
        }
      })()
    );
  }
});

async function sendPost(db, key, post) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${post.token}`,
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      await db.delete('posts', key);
    } else {
      console.error("Failed to send post:", await response.text());
    }
  } catch (error) {
    console.error("Error sending data", error);
  }
}