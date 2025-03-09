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
/* الأساسيات */
html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
  background: #ffffff; /* خلفية بيضاء */
  font-family: 'Tajawal', sans-serif;
  overflow-x: hidden;
  will-change: transform;
}

.field-details {
  width: 100%;
  min-height: 100vh;
  padding: 4rem 8% 8rem;
  background: transparent;
  color: #333; /* نص داكن ليتناسب مع الخلفية البيضاء */
  position: relative;
}

/* الخلفية الزجاجية */
.field-details::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8); /* خلفية بيضاء شفافة */
  z-index: -1;
}

/* القسم */
.section {
  margin: 4rem 0;
  padding: 3rem 5%;
  background: rgba(0, 0, 0, 0.1); /* خلفية داكنة خفيفة */
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

/* العنوان الفرعي */
.section-title {
  font-size: 2.5rem;
  color: #2a5298; /* لون أزرق يناسب الخلفية البيضاء */
  text-shadow: 0 0 15px rgba(168, 216, 255, 0.6);
}

/* النصوص */
.field-title {
  font-size: 3rem;
  color: #2a5298; /* لون أزرق داكن */
}

.field-intro,
.no-data {
  color: #555; /* نص بلون داكن أغمق */
}

/* الزر */
.btn {
  background: linear-gradient(135deg, rgba(42, 130, 255, 0.9) 0%, rgba(90, 185, 255, 0.9) 100%);
  color: #ffffff;
  padding: 14px 35px;
  border: none;
  border-radius: 12px;
  font-size: 1.15rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(90, 185, 255, 0.3);
}

.btn:hover {
  box-shadow: 0 6px 25px rgba(90, 185, 255, 0.5);
}

/* زر العودة */
.back-button {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: linear-gradient(135deg, rgba(42, 130, 255, 0.9) 0%, rgba(90, 185, 255, 0.9) 100%);
  color: #ffffff;
  padding: 14px 35px;
  border-radius: 12px;
  font-size: 1.15rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(90, 185, 255, 0.3);
}

.back-button:hover {
  box-shadow: 0 6px 25px rgba(90, 185, 255, 0.5);
}

@media (max-width: 768px) {
  .field-details {
    padding: 4rem 5% 8rem;
  }
  
  .section {
    margin: 3rem 0;
    padding: 2rem;
  }
}
</style>
