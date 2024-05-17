<template>
 <div>
   <h1>افزودن کاربر جدید</h1>
   <hr/>
   <v-form
       ref="form"
       lazy-validation
   >
     <v-row>
       <v-col cols="12" class="pt-5" md="6">
         <v-text-field v-model="fullName"
                       :rules="[v=>!!v||'نام و نام خانوادگی را وارد کنید']"
                       required label="نام و نام خانوادگی"></v-text-field>
       </v-col>
       <v-col cols="12" md="6">
         <v-container fluid class="pt-0">
           <v-radio-group v-model="role">
             <v-radio label="ادمین" :value="1"></v-radio>
             <v-radio label="کاربر" :value="2"></v-radio>
           </v-radio-group>
         </v-container>
       </v-col>
     </v-row>

     <v-btn @click="editUser" color="success" class="float-left">اعمال اطلاعات</v-btn>
   </v-form>
 </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";
import userModule from "@/store/modules/userModule";

const toast = useToast();
const store = useStore();
const router = useRouter();

const form = ref(null);
const fullName = ref("");
const role = ref(2);
const roleFinally = ref(0);

const userId = ref(router.currentRoute.value.params.id);
const user = ref({})

function editUser() {
  form.value.validate().then(res => {
    if (res.valid === true) {
      if (role.value === 1) {
        roleFinally.value = 1
      } else {
        roleFinally.value = 0
      }
      store.dispatch("editUser", {
        userId: userId.value,
        fullName: fullName.value,
        role: roleFinally.value
      }).then(res => {
        if (res.status === 200) {
          toast.success("عملیات با موفقیت انجام شد")
          router.push("/admin/users")
        }
      }).catch(error => {
        toast.error("مشکلی در عملیات رخ داده است");
        console.log(error)
      })
    }
  });
};
onMounted(async () => {

  await store.dispatch("getSingleUser", userId.value);
  user.value = store.state.userModule.singleUser;

  fullName.value = user.value.fullName;
  console.log(user.value.role);
  if (user.value.role === 1) {
    role.value = 1
  } else {
    role.value = 2
  }

})
</script>

<style scoped>

</style>
