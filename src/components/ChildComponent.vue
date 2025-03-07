<template>
  <div class="question-container">
    <h2 class="question-title">السؤال {{ currentIndex + 1 }}</h2>
    <p class="question-text">{{ question ? question.text : 'جاري تحميل السؤال...' }}</p>

    <div class="options">
      <label v-for="(option, index) in options" :key="index" class="option">
        <input type="radio" v-model="selectedAnswer" :value="option.value" />
        {{ option.text }}
      </label>
    </div>

    <div class="buttons">
      <button v-if="currentIndex > 0" class="btn prev" @click="$emit('previous')">
        ← السؤال السابق
      </button>

      <button v-if="currentIndex < totalQuestions - 1" class="btn next" @click="$emit('next', selectedAnswer)">
        السؤال التالي →
      </button>

      <button class="btn save" @click="$emit('save', selectedAnswer)">
        حفظ التقدم
      </button>

      <button v-if="currentIndex === totalQuestions - 1" class="btn result" @click="$emit('showResults', selectedAnswer)">
        عرض النتيجة
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    totalQuestions: Number,
    currentIndex: Number,
  },
  data() {
    return {
      selectedAnswer: null,
      options: [ 
        { text: "غير موافق تمامًا", value: 1 },
        { text: "غير موافق", value: 2 },
        { text: "محايد", value: 3 },
        { text: "موافق", value: 4 },
        { text: "موافق تمامًا", value: 5 },
      ],
    };
  },
  watch: {
    question(newVal) {
      console.log("Received question in ChildComponent:", newVal);
      if (newVal && newVal.options) {
        this.options = newVal.options; 
      }
    },
  },
};
</script>

<style scoped>
.question-container {
  background-color: #0047ff;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.question-title {
  font-size: 22px;
  margin-bottom: 10px;
  color: darkred;
  text-align: right;
  margin-bottom: 20px;
}

.question-text {
  font-size: 18px;
  margin-bottom: 15px;
  color: #28a745;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.option {
  display: flex;
  align-items: center;
  gap: 5px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.prev {
  background-color: #f2f2f2;
  color: #0047ff;
}

.next {
  background-color: #ffffff;
  color: #0047ff;
}

.save {
  background-color: #ffdd57;
  color: black;
}

.result {
  background-color: #28a745;
  color: white;
}
</style>
