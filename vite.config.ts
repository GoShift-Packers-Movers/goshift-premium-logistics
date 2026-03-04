import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const projectRoot = path.resolve(__dirname, ".");
  const env = loadEnv(mode, projectRoot, "");
  const apiUrl = env.VITE_APP_WEBSITE_API_URL ?? "";
  const tawkPropertyId = env.VITE_TAWK_PROPERTY_ID ?? "";
  const tawkWidgetId = env.VITE_TAWK_WIDGET_ID ?? "";

  return {
    root: projectRoot,
    envDir: projectRoot,
    define: {
      "import.meta.env.VITE_APP_WEBSITE_API_URL": JSON.stringify(apiUrl),
      "import.meta.env.VITE_TAWK_PROPERTY_ID": JSON.stringify(tawkPropertyId),
      "import.meta.env.VITE_TAWK_WIDGET_ID": JSON.stringify(tawkWidgetId),
    },
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
