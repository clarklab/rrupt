/* RRUPT Service Worker */
/* eslint-disable no-restricted-globals */

const CACHE_NAME = "rrupt-cache-v1";
const PRECACHE_URLS = ["/", "/index.html", "/manifest.json", "/sw.js", "/assets/icon.svg", "/assets/presets.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;

      try {
        const res = await fetch(req);
        if (res && res.ok && new URL(req.url).origin === self.location.origin) {
          cache.put(req, res.clone());
        }
        return res;
      } catch (err) {
        // App shell fallback for SPA routes when offline.
        const url = new URL(req.url);
        if (url.origin === self.location.origin) {
          const shell = await cache.match("/index.html");
          if (shell) return shell;
        }
        throw err;
      }
    })()
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification?.data || {};
  const id = encodeURIComponent(data.id || "");

  const action = event.action;
  let target = `/#/rrupt?id=${id}`;
  if (action === "snooze5") target += "&action=snooze5";

  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const client of allClients) {
        if ("focus" in client) {
          await client.focus();
          try {
            client.postMessage({ type: "RRUPT_NAVIGATE", target });
            return;
          } catch {
            // fallthrough
          }
        }
      }
      await self.clients.openWindow(target);
    })()
  );
});


