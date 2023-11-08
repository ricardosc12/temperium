import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidSvg from 'vite-plugin-solid-svg'
import viteCompression from 'vite-plugin-compression';

const path = require('path')

export default defineConfig({

  plugins: [
    // viteCompression(
    //   {
    //     algorithm: "brotliCompress",
    //     deleteOriginFile: true
    //   }
    // ),
    solidPlugin(), solidSvg()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "chrome105",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    cssMinify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
