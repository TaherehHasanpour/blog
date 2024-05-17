<template>
<div>
  <v-progress-linear v-if="isLoading"
      active
      indeterminate
      color="deep-purple-accent-4"
      absolute
      bottom
  ></v-progress-linear>
</div>
</template>

<script setup>

import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const isLoading=computed(()=>store.state.loading)
</script>

<style scoped>

</style>