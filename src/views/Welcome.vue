<template>
  <body>
    <h1>مرحبًا بك في الاختبار!</h1>
    <p>استعد لاختبار مهاراتك البرمجية مع Code Avenue </p>
    <button @click="startExam" class="start-button"> إبدأ الاختبار</button>

    <div class="background-circles">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
    </div>
  </body>
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
/* إزالة الهوامش والحواف البيضاء */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* لمنع ظهور أشرطة التمرير */
  display: flex; /* لترتيب المحتوى في المنتصف */
  flex-direction: column; /* لترتيب العناصر عمودياً */
  justify-content: center; /* لترتيب المحتوى في المنتصف عمودياً */
  align-items: center; /* لترتيب المحتوى في المنتصف أفقياً */
  color: white; /* لون النص */
  text-align: center; /* توسيط النص */
  background: linear-gradient(135deg, #2a5298, #1a3658); /* خلفية زجاجية */
}

/* أنماط المحتوى */
h1 {
  font-size: 40px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1); /* إضافة خلفية زجاجية للعناوين */
  backdrop-filter: blur(10px); /* إضافة تأثير الضبابية */
  padding: 20px;
  border-radius: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.1); /* إضافة خلفية زجاجية للفقرات */
  backdrop-filter: blur(10px); /* إضافة تأثير الضبابية */
  padding: 15px;
  border-radius: 8px;
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
  background: rgba(255, 255, 255, 0.1); /* إضافة خلفية زجاجية للأزرار */
  backdrop-filter: blur(10px); /* إضافة تأثير الضبابية */
}

.start-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.3);
}

/* أنماط الدوائر */
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
  h1 {
    font-size: 32px;
  }
  p {
    font-size: 16px;
  }
  .start-button {
    padding: 12px 25px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 26px;
  }
  p {
    font-size: 14px;
  }
  .start-button {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
}
</style>