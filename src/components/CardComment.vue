<template>
  <div>
    <v-col>
      <v-card
          class="mx-auto">
        <v-card-item>
          <div>

            <div class="text-h6 mb-1 ">
             <p> {{ props.comment.userFullName }}</p>
            </div>
            <div class="text-caption text-xl-subtitle-1">{{ props.comment.text }}</div>
            <div class="text-overline mb-1">
              {{ props.comment.creationDate }}
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn>
            btn
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  comment: {type: Object, required: false}
});
</script>

<style scoped>

</style>