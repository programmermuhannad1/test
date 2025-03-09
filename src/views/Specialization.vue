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

        const response = await axios.get("https://d700-2001-16a2-f17d-4a00-81c0-b3ec-38c-a182.ngrok-free.app/api/fields", {
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
/* الأساسيات */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  background: #ffffff; /* الخلفية البيضاء */
  font-family: 'Tajawal', sans-serif;
  will-change: transform; /* تحسين الأداء */
  color: #333333; /* النصوص بلون داكن */
}

.specialization-container {
  width: 100%;
  min-height: 100vh;
  padding: 80px 20px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.specialization-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff; /* خلفية بيضاء */
  z-index: -1;
}

/* العنوان الرئيسي */
.title {
  font-size: 3rem;
  color: #1a3658; /* لون مناسب مع الخلفية البيضاء */
  text-shadow: 0 0 25px rgba(26, 54, 88, 0.6);
  margin: 0 0 60px 0;
  position: relative;
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
  font-weight: 300;
  letter-spacing: 2px;
}

.title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 4px;
  background: #5ab9ff;
  box-shadow: 0 0 15px #5ab9ff;
}

/* شبكة البطاقات */
.specialization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* تحسين توزيع الأعمدة */
  justify-content: center;
  gap: 30px; /* تقليص المسافة بين البطاقات */
  width: 100%;
  max-width: 1400px;
  padding: 30px 0;
  margin: 0 auto;
}

/* تصميم البطاقة الزجاجية */
.specialization-card {
  background: rgba(26, 54, 88, 0.1); /* خلفية أقل شفافية للبطاقات */
  color: #333333; /* نص البطاقة بلون داكن */
  border-radius: 20px;
  padding: 25px;
  border: 1px solid rgba(168, 216, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    0 0 30px rgba(90, 185, 255, 0.15);
  position: relative;
  overflow: hidden;
  transition: none;
}

.specialization-card:hover {
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.35),
    0 0 40px rgba(90, 185, 255, 0.25);
  transform: none;
}

/* النصوص داخل البطاقة */
.field-name {
  font-size: 1.8rem;
  color: #1a3658; /* تغيير اللون ليتناسب مع الخلفية البيضاء */
  margin: 0 0 15px;
  text-shadow: 0 0 15px rgba(26, 54, 88, 0.4);
  font-weight: 500;
  position: relative;
}

.field-description {
  font-size: 1rem;
  color: #5b6b8e; /* لون مناسب للنصوص الثانوية */
  line-height: 1.6;
  margin-bottom: 25px;
}

/* زر الاستكشاف الفاخر */
.explore-button {
  background: linear-gradient(135deg, 
    rgba(90, 185, 255, 0.9) 0%, 
    rgba(42, 130, 255, 0.9) 100%);
  color: #001f3d; /* النص داخل الزر يكون داكن ليتناسب مع الخلفية البيضاء */
  padding: 12px 30px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 
    0 4px 20px rgba(90, 185, 255, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.explore-button:hover {
  transform: none;
  box-shadow: 
    0 6px 25px rgba(90, 185, 255, 0.5),
    inset 0 3px 6px rgba(255, 255, 255, 0.3);
}

/* التصميم المتجاوب */
@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }

  .specialization-grid {
    grid-template-columns: 1fr; /* استخدام عمود واحد على الأجهزة الصغيرة */
    width: 95%;
  }

  .specialization-card {
    padding: 20px;
    margin: 0 10px;
  }

  .explore-button {
    padding: 10px 25px;
  }

  .field-name {
    font-size: 1.5rem;
  }

  .field-description {
    font-size: 0.9rem;
  }
}

/* الرسائل */
.loading-message,
.error-message,
.no-data-message {
  font-size: 1.3rem;
  color: #a8d8ff;
  text-align: center;
  padding: 25px 35px;
  background: rgba(26, 54, 88, 0.4);
  border-radius: 15px;
  margin: 30px 0;
  border: 1px solid rgba(168, 216, 255, 0.1);
}
</style>
