<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="700"
    >
      <v-img
          class="align-end text-white"
          height="300"
          :src="`${PostImageUrl}/${post.imageName}`"
          cover
      >
        <v-card-title>Top 10 Australian beaches</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        {{ post.creationDate }}
      </v-card-subtitle>

      <v-card-text>
        <div>{{ post.title }}</div>

        <div>{{ post.description }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text="Share"></v-btn>

        <v-btn color="orange" text="Explore"></v-btn>
      </v-card-actions>
      <v-card title="ثبت نظر">
        <div style="width: 80% ; margin: auto;">
          <form
              ref="form"
              lazy-validation
              @submit.prevent="addPost">
            <v-textarea slot v-model="textComment" :rules="[v=>!!v||'ایدی والد را وارد کنید']" required
                        label="توضیحات را وارد کنید"></v-textarea>

            <btn-submit></btn-submit>
          </form>

        </div>

      </v-card>
      <v-card title="نظرات">

        <div v-if="comment.length>0">
          <template v-for="(item,index) in comment" :key="index">
            <card-comment :comment="item"></card-comment>
          </template>
        </div>
        <v-alert v-else>
          نظری ثبت نشده
        </v-alert>
      </v-card>
    </v-card>

  </div>
</template>

<script setup>
import {PostImageUrl} from "@/util/ImageUrls"
import {onMounted, ref} from "vue";
import {getPostBySlug} from "@/services/postServices";
import {getComment, addComment} from "@/services/commentServices";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import CardComment from "@/components/CardComment";
import BtnSubmit from "@/components/BtnSubmit";
import {useToast} from "vue-toastification";

const form = ref(null);
const post = ref({});
const comment = ref([]);
const store = useStore();
const router = useRouter();
const toast = useToast();
const idPost = ref(0);
const textComment = ref("");

function addPost() {

  addComment({userId: 3448, postId: idPost.value, text: textComment.value}).then((res) => {
    if (res.status === 200) {
      toast.success("نظر اضافه شد");
      getComments(idPost.value);
      textComment.value = "";
    }
  })


};

function getComments(idPost) {
  getComment(idPost).then((res) => {
    if (res.status === 200) {
      comment.value = res.data;
      console.log(res.data);
    }
  }).catch((e) => {
    router.back();
    console.log(e);
  }).finally(() => {
    store.commit("setLoading", false);
  });
}

onMounted(() => {
  store.commit("setLoading", true);
  const slug = router.currentRoute.value.params.slug;

  getPostBySlug(slug).then((res) => {
    if (res.status === 200) {
      post.value = res.data;
      idPost.value = post.value.postId;

      getComments(idPost.value);
    } else {
      router.back();
    }

  }).catch((e) => {
    router.back();
    console.log(e);
  }).finally(() => {
    store.commit("setLoading", false);
  });

})
</script>

<style scoped>

</style>