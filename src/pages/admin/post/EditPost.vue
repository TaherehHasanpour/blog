<template>
<div>
  <h1>افزودن کاربر جدید</h1>
  <hr/>
  <v-form
      ref="form"
      lazy-validation
      @submit.prevent="editPost"
  >
    <v-row>
      <v-col cols="12" md="6" class="pb-0">
        <v-text-field v-model="postData.title"
                      :rules="[v=>!!v||'عنوان را وارد کنید']"
                      required
                      label="عنوان">

        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            :rules="[v=>!!v||'slug را وارد کنید']"
            v-model="postData.slug"
            required
            label="slug">
        </v-text-field>
      </v-col>
      <v-col cols="12" class="pb-0">
        <v-textarea solo v-model="postData.description" required label="توضیحات"
                    :rules="[v=>!!v||'توضیحات را وارد کنید']">
        </v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <label>دسته بندی</label>
        <select v-model="postData.categoryId" class="custom-select">
          <option v-for="item in categories.filter(f=>f.parentId==0)" :key="item.id" :value="item.id">{{
              item.title
            }}
          </option>
        </select>
      </v-col>

      <v-col cols="12" md="6">
        <label>زیر دسته بندی</label>
        <select v-model="postData.subCategoryId" class="custom-select">
          <option v-for="item in subCategories" :key="item.id" :value="item.id">{{ item.title }}</option>
        </select>
      </v-col>
      <v-col cols="12" md="6">
        <v-switch
            v-model="postData.isSpecial"
            hide-details
            color="primary"
            label="آیا این پست ویژه است ؟"
        ></v-switch>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
            v-model="files"
            show-size
            accept="image/png, image/jpeg, image/bmp"
            label="تصویر پست"
        ></v-file-input>
      </v-col>
      <v-col cols="12" md="6">
        <img style="width: 100%;height: 400px" :src="`${PostImageUrl}${imageName}`" alt="imge">
      </v-col>
    </v-row>
 <btn-submit></btn-submit>
  </v-form>
</div>
</template>


<script setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import {PostImageUrl} from "@/util/ImageUrls"
import BtnSubmit from "@/components/BtnSubmit";


const postData = reactive({
  categoryId: 0,
  subCategoryId: 0,
  title: "",
  slug: "",
  description: "",
  isSpecial: false
});
const imageName = ref("");
const store = useStore();
const toast = useToast();
const router = useRouter();
const form = ref(null);
const categories = computed(() => store.state.categoryModule.category);
const subCategories = ref([]);
const files = ref([]);
watch(
    () => postData.categoryId,
    () => {
      subCategories.value = categories.value.filter(f => f.parentId == postData.categoryId);
    });


async function editPost() {
  const result = await form.value.validate();
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }
  if (postData.subCategoryId <= 0) {
    toast.error("اطلاعات نامعتبر است")
    return;
  }

  const formData = new FormData();
  formData.append("CategoryId", postData.categoryId.toString());
  formData.append("PostId", router.currentRoute.value.params.id);
  formData.append("SubCategoryId", postData.subCategoryId.toString());
  formData.append("Title", postData.title);
  formData.append("Slug", postData.slug);
  if (files.value.length > 0)
    formData.append("ImageFile", files.value[0]);
  formData.append("Description", postData.description);
  formData.append("IsSpecial", postData.isSpecial.toString());

  store.dispatch("editPost", formData).then(res => {
    if (res.status  == 200) {
      router.push("/admin/posts");
      toast.success("عملیات با موفقیت انجام شد")
    }
  });
}

onMounted(() => {

  const postId = router.currentRoute.value.params.id;
  if (postId) {
    store.dispatch("getPostById", postId).then(res => {

      if (res.status  == 200) {
        postData.title = res.data.title;
        postData.slug = res.data.slug;
        postData.categoryId = res.data.categoryId;
        postData.subCategoryId = res.data.subCategoryId;
        postData.description = res.data.description;
        postData.isSpecial = res.data.isSpecial;
        imageName.value = res.data.imageName;
      }
    }).catch(e=>{
      console.log(e)
    });
    store.dispatch("getCategory")
  } else {
    router.push("/admin/posts");
  }
})

</script>
