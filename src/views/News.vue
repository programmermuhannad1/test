<template>
  <div class="page-container">
    <!-- خلفية متحركة تمتد على عرض الشاشة بالكامل -->
    <div class="top-background" :style="backgroundStyle"></div>

    <!-- مربع البحث بدون زر، يتم البحث مباشرة عند الكتابة -->
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
        <!-- إضافة صورة المقال إذا كانت موجودة -->
        <img v-if="article.urlToImage" :src="article.urlToImage" class="article-image" alt="news image" />
        <div v-else class="article-image-placeholder"></div> <!-- Placeholder إذا لم توجد صورة -->

        <div class="article-content">
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-description">{{ article.description }}</p>
        </div>
        <div class="read-more-container">
          <a :href="article.url" target="_blank" class="article-link">اقرأ المزيد</a>
        </div>
      </div>
    </div>

    <!-- زر تحميل المزيد -->
    <div v-if="!loading && news.length > 0" class="load-more-container">
      <button @click="loadMoreNews" class="load-more-btn">🔄 اضغط للمزيد</button>
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
    const currentBackground = ref(
      "https://source.unsplash.com/1600x900/?technology"
    );

    const fetchNews = async () => {
      loading.value = true;
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=a31572b692e0700234402e8e770a5184`
        );
        const data = await response.json();
        news.value = [...news.value, ...data.articles];
        updateBackground();
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

    const updateBackground = () => {
      if (news.value.length > 0) {
        setInterval(() => {
          const randomArticle = news.value[Math.floor(Math.random() * news.value.length)];
          currentBackground.value = randomArticle.urlToImage || "https://source.unsplash.com/1600x900/?technology";
        }, 10000);
      }
    };

    onMounted(updateBackground);

    const backgroundStyle = computed(() => ({
      backgroundImage: `url(${currentBackground.value})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "400px",
      transition: "background-image 1s ease-in-out",
    }));

    return { news, loading, searchQuery, filteredNews, loadMoreNews, page, backgroundStyle };
  },
};
</script>

<style scoped>
/* الصفحة الرئيسية */
.page-container {
  width: 100%;
  min-height: 100vh;
  background: #f4f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

/* الخلفية العلوية */
.top-background {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: background-image 1s ease-in-out;
}

/* مربع البحث */
.search-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 280px;
}

.search-container {
  width: 80%;
  max-width: 500px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.search-box {
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  color: #333;
  text-align: center;
  background: transparent;
}

.search-box::placeholder {
  color: #777;
}

/* تحسين المقالات */
.articles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 30px auto;
  padding: 20px;
}

.article-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.article-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.article-image-placeholder {
  width: 100%;
  height: 180px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 16px;
}

.article-content {
  padding: 15px;
  text-align: center;
  color: #333;
}

.article-title {
  font-size: 18px;
  font-weight: bold;
}

.article-description {
  font-size: 14px;
  color: #777;
}

/* زر اقرأ المزيد داخل حاوية موحدة لكل المقالات */
.read-more-container {
  margin: 10px;
  padding: 12px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  text-align: center;
}

.article-link {
  display: inline-block;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s ease-in-out;
}

.article-link:hover {
  background: #007bff;
  color: #fff;
}

/* زر تحميل المزيد */
.load-more-container {
  margin-top: 20px;
}

.load-more-btn {
  padding: 12px 20px;
  font-size: 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.load-more-btn:hover {
  background: #0056b3;
}

/* تصغير المقالات للهواتف */
@media (max-width: 768px) {
  .articles-container {
    grid-template-columns: 1fr;
  }

  .article-image {
    height: 150px;
  }

  .article-title {
    font-size: 16px;
  }

  .article-description {
    font-size: 12px;
  }
}
</style>
