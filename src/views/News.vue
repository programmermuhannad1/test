<template>
  <div class="page-container">
    <div class="top-background"></div>

    <div class="search-wrapper">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 ابحث عن الأخبار..."
          class="search-box"
        />
      </div>
    </div>

    <h2 class="title">📰 آخر الأخبار التقنية</h2>

    <div v-if="loading && page === 1" class="loading">جاري التحميل...</div>

    <div v-else class="articles-container">
      <div v-for="(article, index) in filteredNews" :key="index" class="article-card">
        <div class="article-image-container">
          <img v-if="article.urlToImage" :src="article.urlToImage" class="article-image" alt="news image" />
          <img v-else src="https://via.placeholder.com/150" class="article-image" alt="Placeholder image" />
        </div>
        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-description">{{ article.description }}</p>
        </div>
        <div class="read-more-container">
          <a :href="article.url" target="_blank" class="article-link">اقرأ المزيد</a>
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

export default {
  setup() {
    const news = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const page = ref(1);
    const pageSize = 20;

    const fetchNews = async () => {
      loading.value = true;
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=tesla&from=2025-02-12&sortBy=publishedAt&apiKey=1c2ecdeba1734a91abac029b03aceebd`
        );
        const data = await response.json();
        news.value = [...news.value, ...data.articles];
      } catch (error) {
        console.error("خطأ في جلب الأخبار:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchNews);

    const loadMoreNews = () => {
      page.value += 1;
      fetchNews();
    };

    const filteredNews = computed(() =>
      news.value.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          (article.description &&
            article.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
      )
    );

    return { news, loading, searchQuery, filteredNews, loadMoreNews, page };
  },
};
</script>

<style>
.page-container {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  padding: 20px;
}

.top-background {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  height: 300px;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-container {
  width: 80%;
  max-width: 600px;
}

.search-box {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #4a90e2;
}

.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: #777;
}

.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.article-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.article-card:hover {
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
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.article-description {
  font-size: 16px;
  color: #666;
}

.read-more-container {
  padding: 10px 20px 20px;
  text-align: right;
}

.article-link {
  background-color: #4a90e2;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.article-link:hover {
  background-color: #357abd;
}

.load-more-container {
  text-align: center;
  margin-top: 30px;
}

.load-more-btn {
  background-color: #4a90e2;
  color: #fff;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-more-btn:hover {
  background-color: #357abd;
}

</style>