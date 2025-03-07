<template>
  <div class="test">
    <h1>إختبار تحديد المجال البرمجي</h1>
    <ParentComponent />
  </div>
</template>

<script>
import ParentComponent from "../components/ParentComponent.vue";
import Header from "../components/Header.vue";
export default {
  name: "Test",
  components: {
    Header,
    ParentComponent,
  },
};
</script>
