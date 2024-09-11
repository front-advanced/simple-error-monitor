import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sourcemapUploadPlugin from "./plugins/vite-plugin-sourcemap-upload";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sourcemapUploadPlugin({
      projectId: "your-project-id",
      uploadUrl: "http://localhost:8080/api/sourcemaps/upload",
    }),
  ],
  build: {
    sourcemap: true,
  },
  define: {
    'import.meta.env.VITE_GIT_COMMIT_HASH': JSON.stringify(process.env.GIT_COMMIT_HASH),
  },
});
