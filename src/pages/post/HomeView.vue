<template>
  <div style="width: 100%">

      <card-post :posts="posts"></card-post>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {getPopularPost} from "@/services/postServices";
import CardPost from "@/components/CardPost";
import {useStore} from "vuex";

const posts = ref([]);
const store = useStore();
onMounted(() => {
  store.commit("setLoading",true);
  getPopularPost().then((res) => {
    posts.value = res.data;
    store.commit("setLoading",false);
  })
})
</script>
<style>
</style>
