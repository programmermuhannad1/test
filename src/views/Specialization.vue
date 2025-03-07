<template>
  <div class="specialization-container">
    <h2 class="title">جميع المجالات</h2>

    <div v-if="loading" class="loading-message">جاري تحميل البيانات...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="fields.length === 0" class="no-data-message">لا توجد بيانات متاحة</div>

    <div v-else class="specialization-grid">
      <div v-for="(field, index) in fields" :key="index" class="specialization-card">
        <h3 class="field-name">{{ field.name }}</h3>
        <p class="field-description">اكتشف المزيد عن {{ field.name }}</p>
        <router-link :to="'/field/' + field.id">
          <button class="explore-button">استكشاف</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const fields = ref([]);
    const loading = ref(true);
    const errorMessage = ref("");

    const fetchFields = async () => {
      try {
        let token = localStorage.getItem("token")?.trim();
        if (!token) {
          errorMessage.value = "لم يتم العثور على توكن، الرجاء تسجيل الدخول مجددًا.";
          return;
        }

        const response = await axios.get("http://localhost:8080/api/fields", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        fields.value = response.data;
      } catch (error) {
        errorMessage.value = "فشل في تحميل البيانات، حاول مرة أخرى لاحقًا.";
        console.error("Error fetching fields:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchFields);

    return { fields, loading, errorMessage };
  },
};
</script>

<style scoped>
/* ✅ جعل الصفحة ثابتة وعدم السماح بأي تمرير */
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* 🔥 يمنع التمرير بالكامل */
}

/* ✅ خلفية زرقاء ثابتة بتدرج عصري */
.specialization-container {
  width: 100vw;
  height: 100vh;
  position: fixed; /* 🔥 تثبيت الخلفية والمحتوى */
  top: 0;
  left: 0;
  background: linear-gradient(135deg, #0a1f44, #1e3c72, #2a5298);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  overflow: hidden;
}

/* 🌟 تأثير للخلفية */
.specialization-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 10%, rgba(0,0,0,0) 80%);
  z-index: -1;
  animation: floatingBackground 8s infinite alternate ease-in-out;
}

/* 🔥 عنوان الصفحة */
.title {
  font-size: 3rem;
  font-weight: bold;
  color: #00eaff;
  margin-bottom: 30px;
  text-transform: uppercase;
  animation: fadeInDown 1s ease-out;
}

/* 🔥 شبكة التخصصات */
.specialization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 90%;
  max-width: 1200px;
  padding-bottom: 50px;
}

/* ✨ تصميم الكروت */
.specialization-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 8px 25px rgba(0, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.specialization-card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 15px 30px rgba(0, 255, 255, 0.3);
}

/* 🔥 أسماء المجالات */
.field-name {
  font-size: 24px;
  font-weight: 600;
  color: #00eaff;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.field-name:hover {
  color: #ffcc00;
}

/* 📝 وصف المجال */
.field-description {
  font-size: 16px;
  color: #ddd;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

.field-description:hover {
  color: #fff;
}

/* 🚀 زر الاستكشاف */
.explore-button {
  width: 160px;
  padding: 12px;
  background: #00eaff;
  color: #04293A;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  box-shadow: 0px 0px 15px #00eaff;
}

.explore-button:hover {
  background: #04293A;
  color: #00eaff;
  transform: scale(1.1);
  box-shadow: 0px 0px 25px #00eaff;
}

/* 🔥 أنيميشن عند فتح الصفحة */
@keyframes fadeInDown {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 🎭 أنيميشن للخلفية */
@keyframes floatingBackground {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-20px);
  }
}

/* 📱 تحسين التصميم للشاشات الصغيرة */
@media (max-width: 768px) {
  .specialization-grid {
    grid-template-columns: 1fr;
  }

  .explore-button {
    width: 100%;
  }
}
</style>
