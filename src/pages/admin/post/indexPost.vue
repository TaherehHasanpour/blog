<template>
  <div>
    <h1>مدیریت پست</h1>
    <hr/>
    <v-form
        ref="form"
        lazy-validation
        @submit.prevent="getPosts"
    >
      <v-row>
        <v-col cols="3">
          <v-text-field
              required label="عنوان" v-model="postsInput.title"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
              required label="شماره صفحه" v-model="postsInput.pageId"></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field required label="تعداد"  v-model="postsInput.take"></v-text-field>
        </v-col>
        <v-col cols="12" md="3" class="pl-16 pt-7">
          <btn-submit></btn-submit>
        </v-col>
      </v-row>


    </v-form>
    <hr>
    <v-btn @click="router.push({name:'AddPost'})" density="compact" icon="mdi-plus" class="ma-5" color="info"></v-btn>
    <v-table class="elevation-2">
      <thead>
      <tr>
        <th class="text-left text-center">
         عکس
        </th>
        <th class="text-left text-center">
          عنوان
        </th>
        <th class="text-left text-center">
        slug
        </th>
        <th class="text-left text-center">
        نویسنده
        </th>
        <th class="text-left text-center">
          عملیات
        </th>
      </tr>
      </thead>
            <tbody>
            <tr v-for="(item,index) in posts.posts" :key="index">
              <td class="text-center"><img :src="`${PostImageUrl}${item.imageName}`" style="max-width: 100px"></td>
              <td v-text="item.title" class="text-center"></td>
              <td v-text="item.slug" class="text-center"></td>
              <td v-text="item.userFullName" class="text-center"></td>
              <td class="text-center">
                <v-btn  @click="router.push(`/admin/post/edit/${item.postId}`)" color="info">ویرایش</v-btn>
                <v-btn  class="mr-1" color="error">حذف</v-btn>
              </td>
            </tr>
            <tr v-if="posts.entityCount===0">
              <td colspan="4">کاربری برای نمایش وجود ندارد</td>
            </tr>
            </tbody>
    </v-table>
    <v-pagination
        v-model="postsInput.pageId"
        :length="posts.pageCount"
        class="my-4"
        :total-visible="3"
        @update:modelValue="updateItemsPage"
        next-icon="mdi-chevron-left"
        prev-icon="mdi-chevron-right"
    ></v-pagination>
  </div>
</template>

<script setup>
import BtnSubmit from "@/components/BtnSubmit";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, reactive, ref} from "vue";
import {PostImageUrl} from "@/util/ImageUrls"

const store = useStore();
const page = ref(1);
const router = useRouter();
const postsInput = reactive({pageId: 1, take: 1, title: ''});
const posts= ref([])
function getPosts() {
  store.dispatch("getPostsFilter", postsInput)
}
onMounted(()=>{
  store.dispatch("getPostsFilter", postsInput)
});
function updateItemsPage(pageNumber){
  console.log(pageNumber)
  postsInput.pageId=pageNumber;
  store.dispatch("getPostsFilter", postsInput).then((res)=>{
    posts.value=res.data.posts
  })

}
</script>

<style scoped>

</style>