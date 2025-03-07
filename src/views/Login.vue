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

    <!-- الرجل الجري -->
    <div class="running-man">
      <div class="man-head"></div>
      <div class="man-body"></div>
      <div class="man-leg left-leg"></div>
      <div class="man-leg right-leg"></div>
    </div>
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
        const response = await axios.post("http://localhost:8080/api/auth/login", {
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
  animation: fadeIn 1s ease-out;
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

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.running-man {
  position: absolute;
  bottom: 0;
  left: -100px;
  width: 50px;
  height: 100px;
  animation: runAnimation 5s linear infinite; 
}

.man-head {
  position: absolute;
  top: 5px;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: #f1c40f; 
  border-radius: 50%;
  transform: translateX(-50%);
}

.man-body {
  position: absolute;
  top: 35px;
  left: 50%;
  width: 30px;
  height: 40px;
  background-color: #00bcd4; 
  border-radius: 5px;
  transform: translateX(-50%);
}

.man-leg {
  position: absolute;
  width: 10px;
  height: 20px;
  background-color: #e74c3c;
  border-radius: 5px;
}

.left-leg {
  top: 70px;
  left: 10px;
  transform-origin: top left;
  animation: legMove 1s infinite alternate;
}

.right-leg {
  top: 70px;
  right: 10px;
  transform-origin: top right;
  animation: legMove 1s infinite alternate-reverse;
}

@keyframes runAnimation {
  0% {
    left: -100px;
  }
  100% {
    left: 100%; 
  }
}

@keyframes legMove {
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-20deg);
  }
}
</style>
