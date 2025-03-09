<template>
  <div class="navbar">
    <!-- الأيقونة في اليسار -->
    <div class="logo">
      <img :src="logo2" alt="Logo" class="logo-icon" />
    </div>

    <!-- الروابط -->
    <div class="nav-links">
      <RouterLink to="/Welcome">الرئيسية</RouterLink>
      <RouterLink to="/Test">الاختبار</RouterLink>
      <RouterLink to="/Specialization">المجالات</RouterLink>
      <RouterLink to="/Result">النتيجة</RouterLink>
      <RouterLink to="/Profile">معلوماتي</RouterLink>
      <RouterLink to="/news">الاخبار</RouterLink>
    </div>
  </div>
</template>

<script>
import logo2 from "../assets/logo2.png"

export default {
  setup() {
    return {
      logo2
    }
  }
}
</script>

<style scoped>
/* الـ Navbar */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a3658, #2a5298);
  padding: 10px 40px;
  border-radius: 50px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: auto;
  height: 50px;
  max-width: 1000px;
  transition: all 0.3s ease;
}

/* الأيقونة في اليسار */
.logo {
  margin-right: 20px;
}

.logo-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #2a5298;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-align: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.logo-icon:hover {
  transform: scale(1.1);
}

/* الروابط */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: #00ffff;
}

.nav-links a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background: #00ffff;
  bottom: -5px;
  left: 50%;
  transition: width 0.3s ease, left 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
  left: 0;
}

/* تصغير الـ Navbar وتكبير الروابط عند الشاشات الصغيرة */
@media (max-width: 768px) {
  .navbar {
    width: 90%;
    max-width: 100%;
    padding: 8px 20px;
    border-radius: 30px;
  }

  .nav-links {
    gap: 10px;
  }

  .nav-links a {
    font-size: 14px;
  }

  .logo-icon {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
}
</style>
