<template>
  <div class="profile-container">
    <h1 class="page-title">معلوماتي</h1>
    
    <div v-if="user" class="form-container">
      <form @submit.prevent="updateUserProfile">
        
        <div class="form-group">
          <label for="firstName">الاسم الأول</label>
          <input type="text" id="firstName" v-model="user.firstName" disabled />
        </div>

        <div class="form-group">
          <label for="lastName">الاسم الأخير</label>
          <input type="text" id="lastName" v-model="user.lastName" disabled />
        </div>

        <div class="form-group">
          <label for="email">البريد الإلكتروني</label>
          <input type="email" id="email" v-model="user.email" disabled />
        </div>

        <div class="form-group">
          <label for="country">الدولة</label>
          <select v-model="selectedCountry" @change="fetchCities">
            <option v-for="(name, code) in countries" :key="code" :value="code">
              {{ name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="city">المدينة</label>
          <select v-model="selectedCity">
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
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
      countries: {}, // لتخزين الدول
      cities: [], // لتخزين المدن بناءً على الدولة المحددة
      selectedCountry: '', // لتخزين الدولة المحددة
      selectedCity: '', // لتخزين المدينة المحددة
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchCountries();
  },
  methods: {
    fetchUserData() {
      const token = localStorage.getItem('token');
      axios.get('https://2025-2001-16a2-f17d-4a00-81c0-b3ec-38c-a182.ngrok-free.app/api/users/me', {
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

    fetchCountries() {
      axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        // ترتيب الدول حسب الحروف الأبجدية
        const sortedCountries = response.data
          .map(country => ({
            code: country.cca2,
            name: country.name.common
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // ترتيب حسب الاسم
          
        this.countries = sortedCountries.reduce((acc, { code, name }) => {
          acc[code] = name;
          return acc;
        }, {});
      })
      .catch(error => {
        console.error("حدث خطأ أثناء جلب الدول:", error);
      });
    },

    fetchCities() {
      if (!this.selectedCountry) return;

      // إرسال استعلام للـ API بناءً على الدولة المحددة
      axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        params: { country: this.selectedCountry },
        headers: {
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',  // ضع مفتاح الـ API هنا
        }
      })
      .then(response => {
        console.log('المدن المسترجعة:', response.data); // عرض الاستجابة في الـ console
        if (response.data && response.data.data && response.data.data.length > 0) {
          this.cities = response.data.data.map(city => city.city).sort();
        } else {
          this.cities = [];
          console.log('لا توجد مدن للاختيار');
        }
      })
      .catch(error => {
        console.error("حدث خطأ أثناء جلب المدن:", error);
        this.cities = [];  // التأكد من أن المدن فارغة في حال الخطأ
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
        country: this.selectedCountry,
        city: this.selectedCity,
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
  height: 100%;
  background: #ffffff; /* خلفية بيضاء */
  color: #333; /* نص داكن */
  font-family: "Tajawal", sans-serif;
  overflow-x: hidden; /* منع التمرير الأفقي */
  display: flex; /* تموضع المحتوى في المنتصف */
  justify-content: center;
  align-items: center;
}

/* 🌟 تحسين خلفية الصفحة */
.profile-container {
  width: 100%;
  min-height: 100vh; /* الحاوية تغطي كامل ارتفاع الشاشة */
  padding: 40px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  background: #ffffff; /* خلفية بيضاء */
}

/* 🔥 تأكد من أن الخلفية تمتد دائمًا */
.profile-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff; /* خلفية بيضاء */
  z-index: -1;
}

/* 🔥 عنوان الصفحة */
.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #2a5298; /* لون أزرق داكن */
  margin-bottom: 30px;
  text-shadow: 0 0 15px rgba(168, 216, 255, 0.6); /* تأثير الظل */
}

/* ✅ تحسين تصميم النموذج */
.form-container {
  max-width: 500px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9); /* خلفية شفافة بيضاء */
  padding: 30px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
}

/* 🔥 حقول الإدخال */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* تنسيق حقل الـ label */
label {
  text-align: center;
  font-size: 16px;
  color: #333; /* نص داكن */
  margin-bottom: 5px;
  font-weight: bold;
}

/* تنسيق الحقول المدخلة */
input, select {
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  transition: border 0.3s ease, background 0.3s ease;
  text-align: center; /* النص في المنتصف */
}

input:focus, select:focus {
  border-color: #5ab9ff;
  background: rgba(90, 185, 255, 0.1);
  outline: none;
}

/* 🚀 زر الحفظ */
button {
  padding: 12px 20px;
  border: none;
  background: linear-gradient(135deg, rgba(90, 185, 255, 0.9) 0%, rgba(42, 130, 255, 0.9) 100%);
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

button:hover {
  background: #5ab9ff;
  color: #001f3d;
  transform: scale(1.05);
}

/* 🚀 زر تسجيل الخروج */
.logout-btn {
  margin-top: 30px;
  padding: 12px 20px;
  background: #5ab9ff;
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

/* تنسيق القوائم المنسدلة */
select {
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  text-align: center;
  transition: border 0.3s ease, background 0.3s ease;
}

select:focus {
  border-color: #5ab9ff;
  background: rgba(90, 185, 255, 0.1);
  outline: none;
}
</style>
