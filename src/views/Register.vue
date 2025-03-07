<template>
  <div id="register">
    <img :src="logo" alt="CodeAvenueMap Logo" />
    <p class="register-text">
      لديك حساب من قبل؟ <router-link to="/Login">تسجيل الدخول</router-link>
    </p>
    <form class="Rform" @submit.prevent="handleSignup">
      <input type="text" v-model="firstName" placeholder="الاسم الأول" required />
      <input type="text" v-model="lastName" placeholder="الاسم الأخير" required />
      <input type="email" v-model="email" placeholder="البريد الإلكتروني" required />
      <input type="password" v-model="password" placeholder="كلمة المرور" required />
      <input type="password" v-model="confirmPassword" placeholder="تأكيد كلمة المرور" required />
      <input type="date" v-model="dateOfBirth" required />
      <input type="text" v-model="country" placeholder="الدولة" required />
      <input type="text" v-model="city" placeholder="المدينة" />

      <button type="submit">تسجيل</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../assets/logo.svg";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      country: "",
      city: "",
      errorMessage: "",
      successMessage: "",
      logo,
    };
  },
  methods: {
    async handleSignup() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "كلمة المرور غير متطابقة!";
        return;
      }

      this.errorMessage = "";

      try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          dateOfBirth: this.dateOfBirth,
          country: this.country,
          city: this.city,
        });

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.successMessage = "تم التسجيل بنجاح!";
          this.$router.push("/dashboard"); 
        } else {
          this.errorMessage = response.data.message || "فشل التسجيل، يرجى المحاولة مرة أخرى.";
        }
      } catch (error) {
        this.errorMessage = "حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى.";
        console.error("API Error:", error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Tajawal", sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e7efff;
}

.Rform {
  width: 500px;
}

form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #b2c8ff;
  border-radius: 10px;
  background-color: #f1f3f9;
  font-size: 14px;
  color: #333;
}

form button {
  width: 100%;
  padding: 12px;
  background-color: #0056d6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #0041b5;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
