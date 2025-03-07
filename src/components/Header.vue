<template>
  <div class="page-container">
    <nav ref="navbar" class="header">
      <!-- روابط القسم الأيسر -->
      <div class="nav-links">
        <RouterLink to="/Welcome">الصفحة الرئيسية</RouterLink>
        <RouterLink to="/Test">الاختبار</RouterLink>
      </div>

      <!-- اللوجو في المنتصف -->
      <div class="logo-container">
        <img :src="logo2" alt="CodeAvenueMap Logo" class="logo" />
        <span class="logo-text"></span>
      </div>

      <!-- روابط القسم الأيمن -->
      <div class="nav-links">
        <RouterLink to="/Specialization">المجالات</RouterLink>
        <RouterLink to="/Result">النتيجة</RouterLink>
        <RouterLink to="/Profile">معلوماتي</RouterLink>
      </div>
    </nav>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import logo2 from "../assets/logo2.png";

export default {
  setup() {
    const navbar = ref(null);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.value.classList.add("scrolled");
      } else {
        navbar.value.classList.remove("scrolled");
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      logo2,
      navbar,
    };
  },
};
</script>

<style scoped>
/* 🌟 تحسين تصميم الـ Navbar ليكون شفافًا (Glassmorphism) */
.header {
  width: 100%;
  height: 80px;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1); /* 🔥 تأثير زجاجي */
  backdrop-filter: blur(10px);
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

/* 🌟 تأثير عند التمرير */
.header.scrolled {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  padding: 18px 50px;
}

/* 🔷 توزيع الروابط بشكل متوازن */
.nav-links {
  display: flex;
  gap: 35px;
  align-items: center;
  flex: 1;
  justify-content: center;
}

/* 🌟 تحسين اللوجو وجعله في المنتصف */
.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
}

/* 🔥 تكبير اللوجو وتحسين مظهره */
.logo {
  height: 55px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

/* 🔥 تحسين النص بجانب اللوجو */
.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

/* 🎨 ألوان واضحة ومتناسقة */
.nav-links a {
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  color: white;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* ✨ تأثير عند تحويم الماوس */
.nav-links a:hover {
  color: #00ffff;
}

/* ✨ خط سفلي عند التحويم */
.nav-links a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background: #00ffff;
  bottom: -5px;
  left: 50%;
  transition: width 0.3s, left 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
  left: 0;
}

/* 🔷 محتوى الصفحة */
.content {
  margin-top: 100px;
  padding: 20px;
  font-family: "Tajawal", sans-serif;
  text-align: center;
  color: white;
}

/* 🔥 أنيميشن عند فتح الصفحة */
@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.content {
  animation: slideDown 0.4s ease-out;
}

/* 📱 تصميم متجاوب */
@media (max-width: 900px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 15px;
  }

  .logo-container {
    position: static;
    transform: none;
    margin: 10px 0;
  }

  .nav-links {
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .nav-links a {
    font-size: 16px;
  }

  .logo {
    height: 45px;
  }
}
</style>
