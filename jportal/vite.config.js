import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  base: "/jportal/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: {
        name: "JPortal",
        short_name: "JPortal",
        description: "A web portal for students to view attendance and grades.",
        start_url: "/jportal/",
        display: "standalone",
        background_color: "#191c20",
        theme_color: "#242a32",
        orientation: "portrait",
        icons: [
          {
            src: "pwa-icons/circle.ico",
            sizes: "48x48",
          },
          {
            src: "pwa-icons/circle.svg",
            sizes: "72x72 96x96",
            purpose: "maskable",
          },
          {
            src: "pwa-icons/tire.svg",
            sizes: "128x128 256x256",
          },
          {
            src: "pwa-icons/wheel.svg",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
