import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
 plugins: [react()],
 resolve: {
    alias: {
      'emoji-mart/css': '/node_modules/emoji-mart/css',
    },
 },
});



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '10.4.4.161', // Allow external access
//     port: 2000,      // Set the port number
//   },
// });