<template>
  <v-app>
    <v-main>
      <line-loading></line-loading>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script setup>
import LineLoading from "@/components/LineLoading";
</script>
<style>
.v-application{
  direction: rtl !important;
}
</style>
