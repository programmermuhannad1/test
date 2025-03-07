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
  },
  // هذا الاختيار يضمن أن Vercel يحدد بشكل صحيح بيئة الإنتاج
  base: '/',
})
