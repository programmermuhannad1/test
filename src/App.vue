<script setup>
import Header from './components/Header.vue';  // ناف بار المستخدمين
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="app-container">
    <!-- إظهار ناف بار المستخدمين فقط إذا كان المستخدم في صفحات غير تسجيل الدخول أو التسجيل -->
    <Header v-if="route.path !== '/Login' && route.path !== '/Register'" />

    <!-- عرض المحتوى بناءً على التوجيه -->
    <router-view />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px; /* لترك مساحة بين الـ Header والمحتوى */
}
</style>
