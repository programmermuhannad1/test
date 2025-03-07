<template>
  <div class="field-details">
    <div class="header">
      <h1 class="field-title">{{ field.name }}</h1>
      <p v-if="field.description" class="field-intro">{{ field.description }}</p>
      <p v-else class="field-intro placeholder">⚠️ لا يوجد مقدمة متاحة لهذا المجال.</p>
    </div>

    <section class="section">
      <h2 class="section-title">🛤️ مسار التعلم</h2>
      <p v-if="roadmap" class="roadmap-description">{{ roadmap.roadmapStages }}</p>
      <p v-else class="no-data">⚠️ لا يوجد مسار تعلم متاح لهذا المجال.</p>
    </section>

    <section class="section">
      <h2 class="section-title">📚 أفضل الدورات</h2>
      <div v-if="courses.length" class="cards-container">
        <div v-for="course in courses" :key="course.id" class="card">
          <h3>{{ course.name }}</h3>
          <p>{{ course.description }}</p>
          <a :href="course.link" target="_blank" class="btn">🔗 عرض الدورة</a>
        </div>
      </div>
      <p v-else class="no-data">⚠️ لا توجد دورات متاحة لهذا المجال.</p>
    </section>

    <section class="section">
      <h2 class="section-title">🎓 أفضل الشهادات</h2>
      <div v-if="certifications.length" class="cards-container">
        <div v-for="cert in certifications" :key="cert.id" class="card">
          <h3>{{ cert.name }}</h3>
          <p>{{ cert.description }}</p>
          <a :href="cert.link" target="_blank" class="btn">🔗 تفاصيل الشهادة</a>
        </div>
      </div>
      <p v-else class="no-data">⚠️ لا توجد شهادات متاحة لهذا المجال.</p>
    </section>

    <router-link to="/Specialization">
      <button class="back-button">🔙 العودة</button>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const field = ref({});
    const roadmap = ref(null);
    const courses = ref([]);
    const certifications = ref([]);
    const errorMessage = ref("");

    const fetchFieldDetails = async () => {
      try {
        let token = localStorage.getItem("token")?.trim();
        if (!token) {
          errorMessage.value = "⚠️ لم يتم العثور على توكن، الرجاء تسجيل الدخول مجددًا.";
          return;
        }

        const fieldId = route.params.id;

        const fieldResponse = await axios.get(`http://localhost:8080/api/fields/${fieldId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        field.value = fieldResponse.data;

        const roadmapResponse = await axios.get(`http://localhost:8080/api/roadmaps/field/${fieldId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        roadmap.value = roadmapResponse.data.length ? roadmapResponse.data[0] : null;

        const coursesResponse = await axios.get(`http://localhost:8080/api/courses/field/${fieldId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        courses.value = coursesResponse.data;

        const certsResponse = await axios.get(`http://localhost:8080/api/certifications/field/${fieldId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        certifications.value = certsResponse.data;
      } catch (error) {
        errorMessage.value = "⚠️ حدث خطأ أثناء تحميل البيانات.";
        console.error("Error fetching field details:", error);
      }
    };

    onMounted(fetchFieldDetails);

    return { field, roadmap, courses, certifications, errorMessage };
  },
};
</script>

<style scoped>
/* 🌌 خلفية متحركة نيون */
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(circle, #001f3f, #003366, #004080);
  color: white;
  font-family: "Tajawal", sans-serif;
  overflow-y: auto;
}

/* 🎇 إضافة تأثيرات نيون */
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://source.unsplash.com/1920x1080/?technology,abstract') no-repeat center center/cover;
  filter: blur(10px);
  opacity: 0.3;
  z-index: -1;
}

/* 💎 تأثير زجاجي عصري */
.field-details {
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

.section {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 20px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0px 5px 20px rgba(0, 195, 255, 0.3);
  transition: transform 0.3s ease-in-out;
}

.section:hover {
  transform: translateY(-5px);
}

/* 🔥 تحسين العناوين */
.field-title, .section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #00c3ff;
  text-shadow: 0px 0px 20px #00c3ff;
  margin-bottom: 20px;
}

/* 🌟 تصميم الأزرار */
.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #00c3ff;
  color: #04293A;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background: #04293A;
  color: #00c3ff;
  transform: scale(1.05);
}

/* 🚀 زر العودة */
.back-button {
  margin-top: 30px;
  padding: 12px 24px;
  background: #00c3ff;
  color: #04293A;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 15px #00c3ff;
}

.back-button:hover {
  background: #04293A;
  color: #00c3ff;
  transform: scale(1.05);
}
</style>
