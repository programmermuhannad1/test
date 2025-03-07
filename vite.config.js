import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',  // تحديد مجلد البناء
    terserOptions: {
      compress: {
        drop_console: true,  // لإزالة الـ console.logs في ملفات الإنتاج
      },
    },
  },
  base: '/',

})
