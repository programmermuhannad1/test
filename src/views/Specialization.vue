<template>
  <div class="specialization-container">
    <h2 class="title">المجالات</h2>

    <!-- رسالة التحميل -->
    <div v-if="loading" class="loading-message">جاري تحميل البيانات...</div>
    
    <!-- رسالة الخطأ -->
    <div v-else>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      
      <!-- رسالة لا توجد بيانات -->
      <div v-else-if="fields.length === 0" class="no-data-message">لا توجد بيانات متاحة</div>

      <!-- عرض البيانات بعد تحميلها بنجاح -->
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
        // الحصول على التوكن من التخزين المحلي
        let token = localStorage.getItem("token")?.trim();
        console.log("Token:", token);  // تأكد من وجود التوكن

        if (!token) {
          errorMessage.value = "لم يتم العثور على توكن، الرجاء تسجيل الدخول مجددًا.";
          return;
        }

        // إرسال الطلب للحصول على البيانات
        const response = await axios.get(
          "http://localhost:8080/api/fields",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true", // تجاوز تحذيرات ngrok
              "Content-Type": "application/json",
            },
          }
        );

        // التحقق من نوع الاستجابة
        console.log("Content-Type:", response.headers['content-type']);  // تحقق من نوع الاستجابة

        // التحقق من البيانات المسترجعة
        console.log("Fetched fields:", response.data);

        // تصفية البيانات من القيم الفارغة
        fields.value = response.data.filter(field => field.name && field.id);  // تصفية البيانات الفارغة

      } catch (error) {
        handleError(error);
      } finally {
        // عند الانتهاء من التحميل
        loading.value = false;
      }
    };

    const handleError = (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage.value = "غير مصرح بالوصول، يرجى تسجيل الدخول";
            break;
          case 403:
            errorMessage.value = "ليس لديك الصلاحية لعرض المحتوى";
            break;
          case 404:
            errorMessage.value = "البيانات غير متوفرة حالياً";
            break;
          default:
            errorMessage.value = "حدث خطأ غير متوقع";
        }
      } else if (error.request) {
        errorMessage.value = "تعذر الاتصال بالخادم";
      } else {
        errorMessage.value = "خطأ في إعداد الطلب";
      }
      
      console.error("تفاصيل الخطأ:", error);
    };

    // جلب البيانات عند تحميل الصفحة
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
  border: 1px solid rgba(168, 216, 255, 0.3);
}
</style>