<template>
  <div class="profile-container">
    <h1 class="page-title">معلوماتي</h1>
    
    <div v-if="user" class="form-container">
      <form @submit.prevent="updateUserProfile">
        
        <div class="form-group">
          <label for="firstName">الاسم الأول</label>
          <input type="text" id="firstName" v-model="user.firstName" />
        </div>

        <div class="form-group">
          <label for="lastName">الاسم الأخير</label>
          <input type="text" id="lastName" v-model="user.lastName" />
        </div>

        <div class="form-group">
          <label for="email">البريد الإلكتروني</label>
          <input type="email" id="email" v-model="user.email" />
        </div>

        <div class="form-group">
          <label for="country">الدولة</label>
          <input type="text" id="country" v-model="user.country" />
        </div>

        <div class="form-group">
          <label for="city">المدينة</label>
          <input type="text" id="city" v-model="user.city" />
        </div>

        <div class="form-group">
          <label for="password">كلمة المرور</label>
          <input type="password" id="password" v-model="password" />
        </div>

        <div class="form-group">
          <label for="confirmPassword">تأكيد كلمة المرور</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" />
        </div>

        <button type="submit">حفظ التعديلات</button>
      </form>
    </div>

    <div v-else>
      <p>جاري تحميل البيانات...</p>
    </div>

    <button @click="logout" class="logout-btn">تسجيل الخروج</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      password: '',
      confirmPassword: '',
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:8080/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      });
    },

    updateUserProfile() {
      const token = localStorage.getItem('token');
      
      if (this.password !== this.confirmPassword) {
        alert('كلمة المرور غير متطابقة');
        return;
      }

      const updatedUser = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        country: this.user.country,
        city: this.user.city,
        password: this.password ? this.password : null,
      };

      axios.put(`http://localhost:8080/api/users/${this.user.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        alert('تم تحديث البيانات بنجاح');
        this.user = response.data;
      })
      .catch(error => {
        console.error("حدث خطأ أثناء تحديث البيانات:", error);
        alert('حدث خطأ أثناء تحديث البيانات');
      });
    },

    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    }
  }
};
</script>

<style scoped>
/* ✅ تغطية الشاشة بالكامل دائمًا */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  background-attachment: fixed;
  color: white;
  font-family: "Tajawal", sans-serif;
  overflow-x: hidden;
}

/* 🌟 تحسين خلفية الصفحة */
.profile-container {
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 🔥 تأكد من أن الخلفية تمتد دائمًا */
.profile-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
  z-index: -1;
}

/* 🔥 عنوان الصفحة */
.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #00ffff;
  margin-bottom: 30px;
}

/* ✅ تحسين تصميم النموذج */
.form-container {
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 6px 20px rgba(255, 255, 255, 0.1);
}

/* 🔥 حقول الإدخال */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  text-align: left;
  font-size: 16px;
  color: #ddd;
  margin-bottom: 5px;
}

input {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: border 0.3s ease, background 0.3s ease;
}

input:focus {
  border-color: #00ffff;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
}

/* 🚀 زر الحفظ */
button {
  padding: 12px 20px;
  border: none;
  background: #00ffff;
  color: #04293A;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

button:hover {
  background: #04293A;
  color: #00ffff;
  transform: scale(1.05);
}

/* 🚀 زر تسجيل الخروج */
.logout-btn {
  margin-top: 30px;
  padding: 12px 20px;
  background: #ff4b5c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #d43f50;
  transform: scale(1.05);
}
</style>
