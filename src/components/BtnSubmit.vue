<template>
  <div>
    <v-btn :disabled="isLoading" type="submit" color="success" >
      <slot>اعمال اطلاعات</slot>

    </v-btn>
  </div>
</template>

<script setup>

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const isLoading = computed(() => store.state.loading);
</script>

<style scoped>

</style>