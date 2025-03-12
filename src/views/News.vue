<template>
  <div class="page-container">
    <!-- Banner Section with News Images -->
    <div class="banner-container">
      <div class="banner-images">
        <div v-for="(article, index) in news" :key="index" class="banner-image-item">
          <img v-if="article.image" :src="article.image" class="banner-image" alt="news image" />
          <img v-else src="https://via.placeholder.com/1200x400?text=No+Image" class="banner-image" alt="No image available" />
        </div>
      </div>
    </div>

    <div class="search-wrapper">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 ابحث عن الأخبار التقنية..."
          class="search-box"
        />
      </div>
    </div>

    <h2 class="title">📰 آخر الأخبار التقنية</h2>

    <div v-if="loading && page === 1" class="loading">جاري تحميل الأخبار...</div>
    <div v-if="errorMessage" class="error">⚠️ {{ errorMessage }}</div>

    <div v-else>
      <div class="articles-container">
        <div v-for="(article, index) in filteredNews" :key="index" class="article-item">
          <div class="article-image-container">
            <img v-if="article.image" :src="article.image" class="article-image" alt="news image" />
            <img v-else src="https://via.placeholder.com/300" class="article-image" alt="Placeholder image" />
          </div>
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-description">{{ article.description }}</p>
            <div class="read-more-container">
              <a :href="article.url" target="_blank" class="article-link">اقرأ المزيد</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && news.length > 0" class="load-more-container">
      <button @click="loadMoreNews" class="load-more-btn">🔄 تحميل المزيد</button>
    </div>
  </div>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const news = ref([]);
    const loading = ref(false);
    const errorMessage = ref("");
    const searchQuery = ref("");
    const page = ref(1);

    const fetchNews = async (page = 1) => {
      loading.value = true;
      errorMessage.value = "";
      try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines`, {
          params: {
            category: "technology",  // أخبار التقنية
            lang: "en",  // أخبار باللغة الإنجليزية
            token: "a31572b692e0700234402e8e770a5184"
          }
        });
        
        news.value = page === 1 ? response.data.articles : [...news.value, ...response.data.articles];
        if (news.value.length === 0) {
          errorMessage.value = "⚠️ No news available at the moment.";
        }
      } catch (error) {
        errorMessage.value = `⚠️ Error: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => fetchNews());

    const loadMoreNews = () => {
      page.value += 1;
      fetchNews(page.value);
    };

    const filteredNews = computed(() => {
      return news.value.filter((article) => {
        return (
          article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          (article.description && article.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
      });
    });

    return { news, loading, errorMessage, searchQuery, filteredNews, loadMoreNews, page };
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.page-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  width: 100vw;
  height: 100vh;
  background-color: #f4f7f9;
}

/* Banner section styles */
.banner-container {
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
}

.banner-images {
  display: flex;
  animation: scrollBanner 12s infinite ease-in-out;
}

.banner-image-item {
  flex-shrink: 0;
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 1s ease-in-out;
  opacity: 0;
  animation: fadeInOut 12s infinite ease-in-out;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Animation for scrolling banner images */
@keyframes scrollBanner {
  0% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(-100%);
  }
  66% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Fade in and out effect for images */
@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
  }
  33%, 66% {
    opacity: 1;
  }
}

/* Search bar styles */
.search-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.search-container {
  width: 100%;
  background-color: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-box {
  width: 100%;
  padding: 15px 20px;
  border: none;
  font-size: 16px;
  outline: none;
  background-color: transparent;
}

/* Title styles */
.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Articles container styles */
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.article-item {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.article-item:hover {
  transform: translateY(-5px);
}

.article-image-container {
  height: 200px;
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 20px;
}

.article-title {
  margin-bottom: 10px;
  color: #333;
}

.article-description {
  color: #666;
  margin-bottom: 15px;
}

.read-more-container {
  text-align: right;
}

.article-link {
  color: #007bff;
  text-decoration: none;
}

/* Load more button styles */
.load-more-container {
  text-align: center;
  margin-top: 20px;
}

.load-more-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #0056b3;
}

/* Media Queries for responsivenes
