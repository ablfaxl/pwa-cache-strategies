// import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// const pwaVersion = "1.0.0"; // Update this version as needed
// // https://vitejs.dev/config/
// const manifestForPlugin: Partial<VitePWAOptions> = {
//   registerType: "prompt",
//   includeAssets: ["vite.svg"],
//   injectRegister: "auto",
//   devOptions: {
//     enabled: true,
//   },
//   manifest: {
//     name: "react vite pwa",
//     description: "react vite app cache strategies",
//     icons: [
//       {
//         src: "/maskable_icon_x72.png",
//         sizes: "72x72",
//         type: "image/png",
//       },
//       {
//         src: "/maskable_icon_x96.png",
//         sizes: "96x96",
//         type: "image/png",
//       },
//       {
//         src: "/maskable_icon_x128.png",
//         sizes: "128x128",
//         type: "image/png",
//       },
//       {
//         src: "/maskable_icon_x192.png",
//         sizes: "192x192",
//         type: "image/png",
//         purpose: "any",
//       },
//       {
//         src: "/maskable_icon_x384.png",
//         sizes: "384x384",
//         type: "image/png",
//       },
//       {
//         src: "/maskable_icon_x512.png",
//         sizes: "512x512",
//         type: "image/png",
//       },
//     ],
//     theme_color: "#213547",
//     background_color: "#242424",
//     display: "standalone",
//     scope: "/",
//     start_url: "/",
//     orientation: "portrait",
//   },
//   workbox: {
//     globPatterns: ["**/*.{js,css,html,png}"],
//     runtimeCaching: [
//       {
//         urlPattern: /\/images\/pwa\.png$/,
//         handler: "CacheFirst",
//         options: {
//           cacheName: `images-cache-v${pwaVersion}`,
//           expiration: {
//             maxEntries: 1,
//             maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//           },
//         },
//       },
//     ],
//   },
// };
// export default defineConfig({
//   plugins: [react(), VitePWA(manifestForPlugin)],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "react vite pwa",
        description: "react vite app cache strategies",
        icons: [
          {
            src: "/maskable_icon_x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/maskable_icon_x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/maskable_icon_x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/maskable_icon_x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#213547",
        background_color: "#242424",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "css-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "CacheFirst",
            options: {
              cacheName: "js-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 Day
              },
              networkTimeoutSeconds: 10, // fallback to cache after 10 seconds
            },
          },
        ],
      },
    }),
  ],
});
