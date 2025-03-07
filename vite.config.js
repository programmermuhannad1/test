import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,  // يمكنك تحديد المنفذ الذي تريد تشغيله محليًا
    open: true,  // لفتح المتصفح تلقائيًا عند تشغيل المشروع
  },
  build: {
    outDir: 'dist',  // تحديد مجلد البناء
    terserOptions: {
      compress: {
        drop_console: true,  // لإزالة الـ console.logs في ملفات الإنتاج
      },
    },
    assetsDir: 'assets',  // لتحديد مجلد الصور والملفات الثابتة
  },
  base: process.env.NODE_ENV === 'production' ? '/front/' : '/',  // تغيير base حسب البيئة
})
