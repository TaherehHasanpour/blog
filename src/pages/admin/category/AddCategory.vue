<template>
 <div>
   <h1>افزودن دسته بندی جدید</h1>
   <hr/>
   <v-form
       ref="form"
       lazy-validation
       @submit.prevent="addCategory"
   >
     <v-row>
       <v-col cols="12" md="6" class="pt-5">
         <v-text-field v-model="title"
                       :rules="[v=>!!v||'نام دسته بندی را وارد کنید']"
                       required label="نام دسته بندی را وارد کنید"></v-text-field>
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
         <v-text-field v-model="metaTag" :rules="[v=>!!v||'متا تگ را وارد کنید']" required
                       label="متا تگ را وارد کنید"></v-text-field>
       </v-col>
       <v-col cols="12" md="6" class="pt-0 mt-0">
         <v-text-field v-model="metaDescription" :rules="[v=>!!v||'توضیجات متا را وارد کنید']" required
                       label="توضیجات متا را وارد کنید"></v-text-field>
       </v-col>
     </v-row>

     <btn-submit></btn-submit>
   </v-form>
 </div>
</template>

<script setup>
import {ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import BtnSubmit from "@/components/BtnSubmit";

const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref(null);
const title = ref("");
const slug = ref("");
const parentId = ref(0);
const metaTag = ref("");
const metaDescription = ref("");

async function addCategory() {
  const result = await form.value.validate()
  if (result.valid === false) {
    toast.error("اطلاعات نامعتبر است.");

  }

  store.dispatch("addCategory", {
    title: title.value,
    slug: slug.value,
    parentId: parentId.value,
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
</script>

<style scoped>

</style>
