<template>
<div>
  <v-row>
    <v-col cols="4" v-for="(item, index) in posts" :key="index">
      <v-card color="primary">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">
              {{ item.title }}
            </v-card-title>

            <v-card-subtitle>{{item.category.title}}</v-card-subtitle>

            <v-card-actions>
              <v-btn
                  class="ms-2"
                  variant="outlined"
                  @click="router.push(`/singlePost/${item.slug}`)"
              >
                show more
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar
              class="ma-3"
              rounded="0"
              size="125"
          >
            <v-img :src="`${PostImageUrl}${item.imageName}`"></v-img>
          </v-avatar>
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