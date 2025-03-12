<template>
  <div class="navbar" :class="{ 'mobile-nav': isMobile }">
    <div class="logo">
      <img :src="logo2" alt="Logo" class="logo-icon" />
    </div>

    <div class="nav-links" :class="{ 'mobile-links': isMobile && showMenu }">
      <RouterLink to="/Welcome">الرئيسية</RouterLink>
      <RouterLink to="/Test">الاختبار</RouterLink>
      <RouterLink to="/Specialization">المجالات</RouterLink>
      <RouterLink to="/Result">النتيجة</RouterLink>
      <RouterLink to="/Profile">معلوماتي</RouterLink>
      <RouterLink to="/news">الاخبار</RouterLink>
    </div>

    <button v-if="isMobile" class="menu-button" @click="toggleMenu">
      ☰
    </button>
  </div>
</template>

<script>
import logo2 from "../assets/logo2.png";

export default {
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      showMenu: false,
    };
  },
  setup() {
    return {
      logo2,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.showMenu = false;
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped>
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

.menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: none;
}

@media (max-width: 768px) {
  .navbar {
    width: 90%;
    max-width: 100%;
    padding: 8px 20px;
    border-radius: 30px;
    justify-content: space-between;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #1a3658, #2a5298);
    width: 90%;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
  }

  .nav-links.mobile-links {
    display: flex;
  }

  .nav-links a {
    font-size: 14px;
    text-align: center;
  }

  .logo-icon {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }

  .menu-button {
    display: block;
  }
}
</style>