import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === "library";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      globals: true,
    },
    build: isLibraryBuild
      ? {
          copyPublicDir: false,
          lib: {
            entry: resolve(__dirname, "src/lib/index.ts"),
            name: "AllMightUI",
            formats: ["es", "cjs"],
            fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
            cssFileName: "styles",
          },
          cssCodeSplit: false,
          rollupOptions: {
            external: (id) =>
              ["react", "react-dom", "react/jsx-runtime"].includes(id) ||
              id === "lucide-react" ||
              id.startsWith("lucide-react/"),
          },
        }
      : undefined,
  };
});
