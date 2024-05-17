<template>
  <div>
    <h1>افزودن پست جدید</h1>
    <hr/>
    <v-form
        ref="form"
        lazy-validation
        @submit.prevent="editCategory"
    >
      <v-row>
        <v-col cols="12" md="6" class="pt-5">
          <v-text-field v-model="title"
                        :rules="[v=>!!v||'نام دسته بندی را وارد کنید']"
                        required label="نام دسته بندی را وارد کنید"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-5">
          <v-text-field
              :rules="[v=>!!v||'نماد slug را وارد کنید']"
              v-model="slug"
              required label="نماد slug را وارد کنید"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 mt-0">
          <v-text-field v-model="parentId" :rules="[v=>!!v||'ایدی والد را وارد کنید']" required
                        label="ایدی والد را وارد کنید"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 mt-0">
          <v-text-field v-model="metaTag"  :rules="[v=>!!v||'متا تگ را وارد کنید']"
                        required label="نام دسته بندی را وارد کنید" ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 mt-0">
          <v-text-field v-model="metaDescription"  :rules="[v=>!!v||'توضیحات متا را وارد کنید']"
                        required label="نام دسته بندی را وارد کنید"></v-text-field>
        </v-col>
      </v-row>

      <btn-submit></btn-submit>
    </v-form>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import BtnSubmit from "@/components/BtnSubmit";

const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref(null);
const idCategory = ref(0);
const title = ref("");
const slug = ref("");
const parentId = ref(0);
const metaTag = ref("");
const metaDescription = ref("");
const singleCategory = ref({});

async function editCategory() {
  const result = await form.value.validate()
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است.");

  }
  store.dispatch("editCategory", {
    id:  idCategory.value,
    title: title.value,
    slug: slug.value,
    metaTag: metaTag.value,
    metaDescription: metaDescription.value,
  })
      .then(res => {
        if (res.status === 200) {
          toast.success("عملیات با موفقیت انجام شد")
          router.push({name: "IndexCategory"})
        }
      }).catch(error => {
    toast.error("مشکلی در عملیات رخ داده است");
    console.log(error)
  });
}

onMounted(async () => {
  idCategory.value = router.currentRoute.value.params.id;
  await store.dispatch("getCategoryById", idCategory);
  singleCategory.value = store.state.categoryModule.singleCategory;
  title.value=singleCategory.value.title;
  slug.value=singleCategory.value.slug;
  parentId.value=singleCategory.value.parentId;
  metaTag.value=singleCategory.value.metaTag;
  metaDescription.value=singleCategory.value.metaDescription;
})

</script>

<style scoped>

</style>
