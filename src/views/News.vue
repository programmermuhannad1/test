<template>
  <div class="page-container">
    <div class="top-background"></div>

    <div class="search-wrapper">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder=" ابحث عن الأخبار..."
          class="search-box"
        />
      </div>
    </div>

    <h2 class="title"> آخر الأخبار التقنية</h2>

    <div v-if="loading && page === 1" class="loading">جاري التحميل...</div>
    <div v-if="errorMessage" class="error">⚠️ {{ errorMessage }}</div>

    <div v-else>
      <div class="categories-container">
        <button 
          v-for="category in categories" 
          :key="category" 
          @click="filterByCategory(category)"
          :class="{ 'active-category': selectedCategory === category }"
          class="category-button">
          {{ category }}
        </button>
      </div>

      <div v-if="news.length === 0 && !loading" class="no-news"> لا توجد أخبار متاحة حاليًا.</div>

      <div class="articles-container">
        <div v-for="(article, index) in filteredNews" :key="index" class="article-item">
          <div class="article-image-container">
            <img v-if="article.urlToImage" :src="article.urlToImage" class="article-image" alt="news image" />
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
      <button @click="loadMoreNews" class="load-more-btn"> تحميل المزيد</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const news = ref([]);
    const loading = ref(false);
    const errorMessage = ref("");
    const searchQuery = ref("");
    const page = ref(1);
    const selectedCategory = ref("All News");
    const categories = [
      "All News", "Artificial Intelligence", "Cybersecurity", "Programming and Software Development", "Cloud Computing", "Space and Astronomy", "Emerging Technologies"
    ];

    const fetchNews = async (category = "technology", page = 1) => {
      loading.value = true;
      errorMessage.value = "";
      let apiCategory = "technology"; // القيمة الافتراضية

      // تحويل التصنيفات إلى القيم التي يدعمها API
      if (category === "Artificial Intelligence") {
        apiCategory = "technology";
      } else if (category === "Cybersecurity") {
        apiCategory = "technology";
      } else if (category === "Programming and Software Development") {
        apiCategory = "technology";
      } else if (category === "Cloud Computing") {
        apiCategory = "technology";
      } else if (category === "Space and Astronomy") {
        apiCategory = "science";
      } else if (category === "Emerging Technologies") {
        apiCategory = "technology";
      } else if (category === "All News") {
        apiCategory = "technology";
      }

      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=${apiCategory}&language=en&country=us&apiKey=1c2ecdeba1734a91abac029b03aceebd&page=${page}`
        );
        const data = await response.json();
        
        if (data.status !== "ok") {
          throw new Error(data.message || "حدث خطأ أثناء جلب الأخبار");
        }
        
        news.value = page === 1 ? data.articles : [...news.value, ...data.articles];
        if (news.value.length === 0) {
          errorMessage.value = "⚠️ لا توجد أخبار متاحة حاليًا.";
        }
      } catch (error) {
        errorMessage.value = `⚠️ خطأ: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => fetchNews());

    const loadMoreNews = () => {
      page.value += 1;
      fetchNews(selectedCategory.value, page.value);
    };

    const filterByCategory = (category) => {
      selectedCategory.value = category;
      page.value = 1; // reset page number when changing category
      fetchNews(category, page.value);
    };

    const filteredNews = computed(() => {
      return news.value.filter((article) => {
        return (
          article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          (article.description && article.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
      });
    });

    return { news, loading, errorMessage, searchQuery, filteredNews, loadMoreNews, page, selectedCategory, categories, filterByCategory };
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

.top-background {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  height: 150px;
  width: 100%;
  position: relative;
  border-radius: 0 0 20px 20px;
  margin-bottom: 20px;
}

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

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.loading, .error, .no-news {
  text-align: center;
  margin-top: 20px;
}

.loading {
  color: #007bff;
}

.error {
  color: #ff4d4d;
}

.no-news {
  color: #999;
}

.categories-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.category-button {
  background-color: #e9ecef;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #333;
}

.category-button:hover, .active-category {
  background-color: #007bff;
  color: white;
}

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
</style>