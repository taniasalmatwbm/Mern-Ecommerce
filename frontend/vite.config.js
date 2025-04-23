// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server:{
//     proxy: {
//       '/api': {
//         target: 'http://localhost:7000', // Adjust to your backend's URL
//         changeOrigin: true,               // Needed for virtual hosted sites
//         secure: false,                    // Set to true if using HTTPS
//         // Optionally, you can add pathRewrite if your backend has a different structure
//         // pathRewrite: { '^/api': '' },   // Uncomment this line if needed
//       },
//     },
//     //  proxy:{
//     //   '/api/v1' : 'http://localhost:7000'
//     //  },
//   },
//   plugins: [react()],
// })



import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); //  Correct env loading

  return {
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    server: {
      proxy:  mode === 'development'? {
        '/api': {
          target: env.BACKEND_URL || 'http://localhost:7000',
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, '/api/v1') // Add this line
        }
      }: {}
    },
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            stripe: ['@stripe/stripe-js']
          }
        }
      }
    }
  }
});