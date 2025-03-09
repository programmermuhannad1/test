<template>
  <div id="login">
    <img :src="logo" alt="CodeAvenueMap Logo" />
    <p class="register-text">
      ليس لديك حساب من قبل؟ <router-link to="/Register">تسجيل</router-link>
    </p>

    <form @submit.prevent="loginUser">
      <input
        type="email"
        v-model="email"
        placeholder="البريد الإلكتروني"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="كلمة المرور"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول" }}
      </button>
    </form>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../assets/logo.svg";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      errorMessage: "",
      logo,
    };
  },
  methods: {
    async loginUser() {
      this.errorMessage = "";
      this.loading = true;

      try {
        const response = await axios.post("https://d700-2001-16a2-f17d-4a00-81c0-b3ec-38c-a182.ngrok-free.app/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        let token = response.headers["authorization"];
        if (token) {
          token = token.replace("Bearer ", "").trim();
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          this.$router.push("/Welcome");
        } else {
          this.errorMessage = "فشل في استلام التوكن";
        }
      } catch (error) {
        this.errorMessage = "خطأ في تسجيل الدخول!";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
#login {
  max-width: 600px;
  margin: 100px auto;
  padding: 60px;
  background: linear-gradient(135deg, #1e3c72, #2a5298); /* تدرج لوني أزرق فضائي */
  border-radius: 30px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

#login:hover {
  box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.2);
}

#login img {
  max-width: 180px;
  margin-bottom: 40px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 30px;
}

input {
  padding: 18px;
  border: 2px solid #fff;
  border-radius: 10px;
  font-size: 18px;
  color: #333;
  background-color: #fff;
  transition: all 0.3s ease;
  width: 100%;
}

input:focus {
  border-color: #00bcd4;
  outline: none;
  transform: scale(1.1);
}

button {
  padding: 18px 30px;
  border: none;
  background-color: #00bcd4;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  width: 100%;
}

button:hover {
  background-color: #0097a7;
  transform: scale(1.1);
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: #f44336;
  margin-top: 30px;
  font-size: 16px;
}

.register-text {
  margin-top: 40px;
  font-size: 16px;
  color: white;
  display: block;
  font-weight: 600;
}

.register-text a {
  color: #00bcd4;
  text-decoration: none;
  font-weight: bold;
}

.register-text a:hover {
  text-decoration: underline;
}
</style>
