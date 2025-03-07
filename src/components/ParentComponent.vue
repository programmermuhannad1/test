<template>
  <div v-if="loading" class="loading">جاري تحميل الأسئلة...</div>
  <div v-else class="quiz-container">
    <template v-if="questions.length > 0">
      <QuestionComponent
        :key="currentIndex" 
        :question="questions[currentIndex]"
        :totalQuestions="questions.length"
        :currentIndex="currentIndex"
        @next="nextQuestion"
        @previous="previousQuestion"
        @save="saveAnswer"
        @showResults="showResults"
      />
    </template>
    <div v-else class="error">لا توجد أسئلة متاحة</div>
  </div>
</template>

<script>
import QuestionComponent from "../components/ChildComponent.vue";
import axios from "axios";
import { toRaw } from "vue";

export default {
  components: {
    QuestionComponent,
  },
  data() {
    return {
      currentIndex: 0,
      questions: [],
      answers: {},
      loading: true,
    };
  },
  async created() {
    console.log("Component created, questions before fetch:", this.questions);
    await this.fetchQuestions();
    console.log("Questions after fetch:", this.questions);
  },
  methods: {
    async fetchQuestions() {
    try {
      const response = await axios.get("https://my.api.mockaroo.com/test.json", {
        headers: { "X-API-Key": "551c5db0" },
      });
      this.questions = [...response.data];
      console.log("Fetched questions:", this.questions);

      // Convert to non-reactive data
      const rawQuestions = toRaw(this.questions);
      console.log("Raw Questions (non-reactive):", rawQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      this.loading = false;
    }
    },
    nextQuestion(selectedAnswer) {
      this.answers[this.currentIndex] = selectedAnswer;
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
      console.log("Moved to next question. Current Index:", this.currentIndex);
    },
    previousQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      console.log("Moved to previous question. Current Index:", this.currentIndex);
    },
    async saveAnswer(selectedAnswer) {
      this.answers[this.currentIndex] = selectedAnswer;
      try {
        await axios.post("https://api.example.com/save-answer", {
          questionId: this.questions[this.currentIndex]?.id,
          answer: selectedAnswer,
        });
        alert("تم حفظ الإجابة!");
      } catch (error) {
        console.error("Error saving answer:", error);
      }
    },
    async showResults(selectedAnswer) {
      this.answers[this.currentIndex] = selectedAnswer;
      console.log("Final Answers:", this.answers);
      alert("عرض النتيجة!");
    },
  },
};
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.loading {
  text-align: center;
  font-size: 20px;
  color: blue;
}
</style>
