<template>
  <div>
    <h1>مدیریت پست ها</h1>
    <hr>
    <v-btn @click="router.push({name:'AddCategory'})" density="compact" icon="mdi-plus" class="ma-5"
           color="info"></v-btn>
    <v-table class="elevation-2">
      <thead>
      <tr>
        <th class="text-left text-center">
          ایدی
        </th>
        <th class="text-left text-center">
          نام
        </th>
        <th class="text-left text-center">
          slug
        </th>
        <th class="text-left text-center">
          عملیات
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in category" :key="index">
        <td v-text="item.id" class="text-center"></td>
        <td v-text="item.title" class="text-center"></td>
        <td v-text="item.slug" class="text-center"></td>
        <td class="text-center">
          <v-btn density="compact" @click="router.push(`/admin/categories/edit/${item.id}`)" class="ma-3 pa-3"
                 color="info">
            ویرایش
          </v-btn>
          <v-btn @click="deleteCategory(item.id)" density="compact" class="ma-3 pa-3" color="error">
            حذف
          </v-btn>
          <v-btn density="compact" class="ma-3 pa-3" color="primary">
            افزودن زیرگروه
          </v-btn>
        </td>
      </tr>
      <tr v-if="category.isEmpty">
        <td colspan="4">پستی برای نمایش وجود ندارد</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Swal from 'sweetalert2';
import {useToast} from "vue-toastification";

const router = useRouter();
const store = useStore();
const toast = useToast();
const category = computed(() => store.state.categoryModule.category);
onMounted(() => {
  store.dispatch("getCategory");
});

function deleteCategory(id) {
  Swal.fire({
    title: "آیا از حذف خود اطمینان دارید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله, حذف شود!"
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("deleteCategory", id).then(r => {
        if (r.statusCode === 200) {
          toast.success("عملیات با موفقیت انجام شد");
        }
      }).catch(e =>{
        toast.error("مشکلی رخ داده است");
      })
    }
  });
}

</script>

<style>

</style>