<template>
  <div>
    <h1>افزودن پست جدید</h1>
    <hr/>
    <v-form
        ref="form"
        lazy-validation
        @submit.prevent="addPost"
    >
      <v-row>
        <v-col cols="12" md="6" class="pt-5">
          <v-text-field v-model="formData.title"
                        :rules="[v=>!!v||'نام دسته بندی را وارد کنید']"
                        required label="عنوان را وارد کنید"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-5">
          <v-text-field
              :rules="[v=>!!v||'نماد slug را وارد کنید']"
              v-model="formData.slug"
              required label="نماد slug را وارد کنید"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 mt-0">
          <v-textarea slot v-model="formData.Description" :rules="[v=>!!v||'ایدی والد را وارد کنید']" required
                      label="توضیحات را وارد کنید"></v-textarea>
        </v-col>
        <v-col cols="12" md="3">
          <label>نویسنده : </label>
          <select v-model="formData.UserId" class="w-66  elevation-1">
            <option v-for="(item,index) in users.users" :key="index" :value="item.userId">{{ item.fullName }}</option>

          </select>
        </v-col>
        <v-col cols="12" md="3">
          <label>دسته بندی : </label>
          <select v-model="formData.CategoryId" class="w-66 elevation-1">
            <option v-for="(item,index) in category.filter(f=>f.parentId===0)" :key="index" :value="item.id">
              {{ item.title }}
            </option>
          </select>
        </v-col>
        <v-col cols="12" md="3">
          <label>ساب : </label>
          <select v-model="formData.SubCategoryId" class="w-66 elevation-1">
            <option v-for="(item,index) in subCategory" :key="index" :value="item.id">{{ item.title }}</option>
          </select>
        </v-col>
        <v-col cols="6" md="3">
          <v-radio label="پست ویژه" v-model="formData.IsSpecial"
                   @click="formData.IsSpecial=!formData.IsSpecial"></v-radio>
        </v-col>
        <v-col cols="12" md="5">
          <v-file-input

              v-model="files"
              label="تصویر پست"
              show-size
          ></v-file-input>
        </v-col>
      </v-row>

      <btn-submit></btn-submit>
    </v-form>
  </div>
</template>

<script setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
import {useStore} from "vuex";
import BtnSubmit from "@/components/BtnSubmit";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const formData = reactive({
  UserId: "",
  CategoryId: "",
  SubCategoryId: "",
  Title: "",
  Slug: "",
  Description: "",
  IsSpecial: false,
});
const form = ref(null);
const store = useStore();
const toast = useToast();
const users = computed(() => store.state.userModule.users);
const category = computed(() => store.state.categoryModule.category);
const subCategory = ref([]);
const files = ref([]);
const router=useRouter();
function addPost() {
  form.value.validate().then(res => {
    if (res.valid === false) {
      toast.error("مقادیر وارد شده معتبر نمیباشند")
    }
    if (formData.UserId <= 0 || formData.CategoryId <= 0 || formData.SubCategoryId <= 0 || files.value.length === 0) {
      toast.error("اطلاعات نا معتبر");
    }
    const postData = new FormData();
    postData.append("UserId", formData.UserId.toString());
    postData.append("CategoryId", formData.CategoryId.toString());
    postData.append("SubCategoryId", formData.SubCategoryId.toString());
    postData.append("Title", formData.Title);
    postData.append("Slug", formData.Slug);
    postData.append("Description", formData.Description);
    postData.append("IsSpecial", formData.IsSpecial);
    postData.append("ImageFile", files.value[0]);
    store.dispatch("addPost",postData).then((r)=>{
      if (r.status===200){
        toast.success("پست اضافه شد")
        router.push({name:"IndexPosts"});
      }
    }).catch((e)=>{
      toast.error("مشکلی رخ داده است");
      console.log(postData);
      console.log(e);
    });
  });

}

watch(() => formData.CategoryId, () => subCategory.value = category.value.filter(f => f.parentId === formData.CategoryId
))
onMounted(() => {
  store.dispatch("getUsers", {pageId: 1, take: 100});
  store.dispatch("getCategory");
});

</script>

<style scoped>

</style>