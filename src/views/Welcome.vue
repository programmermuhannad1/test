<template>
  <div :class="['welcome', currentBackground]">
    <button @click="startExam" class="start-button">🚀 إبدأ الاختبار</button>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      backgrounds: [
        "background-1",
        "background-2",
      ],
      currentIndex: 0,
      currentBackground: "background-1",
    };
  },
  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgrounds.length;
      this.currentBackground = this.backgrounds[this.currentIndex];
    }, 3000); // 🔄 تغيير الصورة كل 3 ثوانٍ
  },
  methods: {
    startExam() {
      this.$router.push("/Test");
    },
  },
};
</script>

<style scoped>
/* ✅ جعل الصفحة ثابتة وعدم السماح بأي تمرير */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 🔥 يمنع التمرير بالكامل */
}

/* ✅ ضبط الخلفية بحيث تغطي الشاشة بالكامل بدون أي تحرك */
.welcome {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end; /* 🔥 جعل الزر في الأسفل */
  justify-content: center;
  padding-bottom: 50px;
  transition: background-image 1s ease-in-out; /* 🔥 تأثير سلس لتغيير الخلفية */
}

/* ✅ الخلفية الأولى */
.background-1 {
  background-image: url('/Users/muhannadali/Documents/code-avenue-map 2/src/assets/Blue Futuristic Artificial Intelligence Presentation.png');
}

/* ✅ الخلفية الثانية */
.background-2 {
  background-image: url('/Users/muhannadali/Documents/code-avenue-map 2/src/assets/Black and Blue Modern Technology Presentation.png');
}

/* 🚀 زر بدء الاختبار */
.start-button {
  background: #00ffff;
  color: #04293A;
  border: none;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 10px #00ffff;
}

.start-button:hover {
  background: #04293A;
  color: #00ffff;
  transform: scale(1.05);
}
</style>
