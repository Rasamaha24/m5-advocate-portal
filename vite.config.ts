import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use relative base for assets to work properly with Cloudflare proxy
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Ensure proper output directory
    outDir: "dist",
    // Generate manifest for better caching
    manifest: false,
    // Optimize for production
    minify: "esbuild",
    sourcemap: false,
    // Handle large chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          radix: ['@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-toast']
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Ensure proper environment variable handling
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
