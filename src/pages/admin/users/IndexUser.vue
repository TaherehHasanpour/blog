<template>
  <div>
    <h1>مدیریت کاربران</h1>
    <hr>
    <v-btn @click="router.push({name:'AddUser'})" density="compact" icon="mdi-plus" class="ma-5" color="info"></v-btn>
    <v-table class="elevation-2">
      <thead>
      <tr>
        <th class="text-left text-center">
          نام کاربری
        </th>
        <th class="text-left text-center">
          نام و نام خانوادگی
        </th>
        <th class="text-left text-center">
          نقش کاربر
        </th>
        <th class="text-left text-center">
          عملیات
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in users.users" :key="index">
        <td v-text="item.userName" class="text-center"></td>
        <td v-text="item.fullName" class="text-center"></td>
        <td class="text-center">
          <span v-if="item.role===1">ادمین</span>
          <span v-if="item.role===0">کاربر</span>
        </td>
        <td class="text-center">
          <v-btn density="compact" @click="router.push(`/admin/users/edit/${item.userId}`)" class="ma-3 pa-3" color="info">
            ویرایش
          </v-btn>
        </td>
      </tr>
      <tr v-if="users.entityCount==0">
        <td colspan="4">کاربری برای نمایش وجود ندارد</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useStore();
const users = computed(() => store.state.userModule.users);
onMounted(() => {
  store.dispatch("getUsers", {pageId: 1, take: 20})
});

</script>

<style>

</style>