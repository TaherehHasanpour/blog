<template>
  <div>
    <h3>جست و جو:</h3>
    <CardCategory v-if="router.currentRoute.value.query.valueSearch ===undefined" :posts="category"></CardCategory>
    <template v-else>
      <template v-if="entityCount===0">
        <v-col>
          <v-alert>پستی به این نام وجود ندارد</v-alert>
        </v-col>
      </template>
      <card-post v-else :posts="posts"></card-post>
    </template>



  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import CardPost from "@/components/CardPost";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {getCategoryBySlug} from "@/services/catgoryServices";
import CardCategory from "@/components/CardCatgory";

const router = useRouter();
const entityCount = ref(0);
const toast = useToast();
const postsInput = reactive({pageId: 1, take: 1, title: ''});
const posts = ref([]);
const category = ref({});
const store = useStore();
const categorySlug = ref("");
watch(
    () => router.currentRoute.value.query.valueSearch
    , async (newValue) => {
      console.log("post   " + newValue);
      await setPostSearched(newValue);
    });

watch(
    () => router.currentRoute.value.query.categorySlug
    , async (newValue) => {
      console.log("category   " + newValue);
      await setCategorySearched(newValue);
    });

function setPostSearched(newTitle) {
  postsInput.title = newTitle;
  store.dispatch("getPostsFilter", postsInput).then((res) => {
    posts.value = res.data.posts;
    console.log(res.data);
    entityCount.value=res.data.entityCount;
    console.log(entityCount.value);
  }).catch((e) => {
    console.log(e);
    toast.error("مشکلی رخ داده است");
  });
  posts.value = store.state.postModule.postsFilter.posts;
  console.log(posts.value);
}

function setCategorySearched(categorySlug) {
  getCategoryBySlug(categorySlug).then((res) => {
    console.log(res);
    category.value = res.data
  }).catch((e) => {
    console.log(e);
    toast.error("مشکلی رخ داده است");
  });
}

onMounted(() => {
  postsInput.title = router.currentRoute.value.query.valueSearch;
  categorySlug.value = router.currentRoute.value.query.categorySlug;

  if (postsInput.title === undefined) {
    console.log(categorySlug.value);
    setCategorySearched(categorySlug.value);
  } else {
    console.log(postsInput.title);
    postsInput.pageId = 1;
    postsInput.take =10;
    setPostSearched();
  }

})


</script>

<style scoped>

</style>