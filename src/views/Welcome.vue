<template>
  <div class="welcome">
    <!-- رسالة الترحيب -->
    <div class="welcome-card">
      <h1>مرحبًا بك في الاختبار!</h1>
      <p>استعد لاختبار مهاراتك البرمجية مع Code Avenue 🌟</p>
      <!-- زر بدء الاختبار -->
      <button @click="startExam" class="start-button">🚀 إبدأ الاختبار</button>
    </div>

    <!-- تأثير خلفية -->
    <div class="background-circles">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  methods: {
    startExam() {
      this.$router.push("/Test");
    },
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.welcome {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  background: linear-gradient(135deg, #2a5298, #1a3658);
  overflow: hidden;
}

.welcome-card {
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  max-width: 600px;
  width: 90%;
}

.welcome-card h1 {
  font-size: 40px;
  margin-bottom: 15px;
}

.welcome-card p {
  font-size: 18px;
  margin-bottom: 25px;
}

.start-button {
  background: linear-gradient(145deg, #00ffff, #04293A);
  color: white;
  border: none;
  padding: 14px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 25px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.start-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.3);
}

.background-circles .circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
}

.circle1 {
  width: 300px;
  height: 300px;
  top: -50px;
  left: -50px;
}

.circle2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -100px;
}

.circle3 {
  width: 200px;
  height: 200px;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .welcome-card h1 {
    font-size: 32px;
  }
  .welcome-card p {
    font-size: 16px;
  }
  .start-button {
    padding: 12px 25px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .welcome-card {
    padding: 20px;
  }
  .welcome-card h1 {
    font-size: 26px;
  }
  .welcome-card p {
    font-size: 14px;
  }
  .start-button {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
}
</style>
