<template>
<div>
  <v-row>
    <v-col cols="4">
      <v-card color="primary">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">
              {{ posts.title }}
            </v-card-title>


          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

</div>
</template>

<script setup>
import {PostImageUrl} from "@/util/ImageUrls";
import { defineProps } from 'vue';
import {useRouter} from "vue-router";
const router=useRouter();
const props = defineProps({
  posts: { type: Object, required: false }
})
</script>

<style scoped>

</style>