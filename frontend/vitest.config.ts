import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom so React components can render in Node
    environment: "jsdom",
    // Import @testing-library/jest-dom matchers globally
    setupFiles: ["./src/tests/setup.ts"],
    globals: true,
    include: ["src/tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/main.tsx",
        "src/**/*.d.ts",
        "src/index.css",
        "src/utils/Layout.tsx",
        "src/utils/ScrollToTop.tsx",
        "src/utils/RouterGuard.tsx",
        "src/utils/PersistentLogin.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
