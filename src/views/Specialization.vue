<template>
  <div class="specialization-container">
    <h2 class="title">جميع المجالات</h2>

    <div v-if="loading" class="loading-message">جاري تحميل البيانات...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="fields.length === 0" class="no-data-message">
      لا توجد بيانات متاحة
    </div>

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
.specialization-container {
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  text-align: center;
  padding: 30px;
  background: linear-gradient(135deg, #0096ff, #6a89cc); /* تدرج لوني عصري */
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 30px;
  letter-spacing: 2px;
  text-transform: uppercase;
  animation: fadeInDown 1s ease-out;
}

.specialization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 10px;
  transition: all 0.3s ease;
}

.specialization-card {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.specialization-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  background-color: #f0f8ff;
}

.field-name {
  font-size: 24px;
  font-weight: 600;
  color: #0056d6;
  margin-bottom: 15px;
  transition: color 0.3s ease;
}

.field-name:hover {
  color: #0041b5;
}

.field-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.field-description:hover {
  color: #333;
}

.explore-button {
  background-color: #0056d6;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.explore-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300%;
  height: 300%;
  background-color: #0041b5;
  transition: all 0.4s ease;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 0;
}

.explore-button:hover {
  background-color: #0041b5;
  transform: translateY(-5px);
}

.explore-button:hover::after {
  transform: translate(-50%, -50%) scale(1);
}

.explore-button span {
  position: relative;
  z-index: 1;
}

.loading-message,
.error-message,
.no-data-message {
  font-size: 18px;
  color: #fff;
  margin-top: 30px;
}

.error-message {
  color: #f44336;
}

.no-data-message {
  color: #ff9800;
}

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

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .specialization-grid {
    grid-template-columns: 1fr;
  }
}

</style>
