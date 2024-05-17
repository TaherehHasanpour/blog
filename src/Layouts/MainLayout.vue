<template>
  <div>
    <v-card>
      <v-layout>
        <v-app-bar
            color="primary"
            prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>
            <router-link :to="({name:'home'})">My files</router-link>
          </v-toolbar-title>

          <v-spacer>

          </v-spacer>
          <v-text-field class="mt-10" v-model="valueSearch" @keydown.enter="search"></v-text-field>
          <v-btn variant="text" icon="mdi-magnify"></v-btn>

          <v-btn variant="text" icon="mdi-account" @click="router.push({name:'IndexAdmin'})"></v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            bottom
            theme="dark"
            position="right"
            permanent
        >
          <v-list color="transparent">
            <template  v-for="item in category" :key="item.id">
              <router-link :to="`/search?categorySlug=${item.slug}`">
                <v-list-item v-ripple :title="item.title"></v-list-item>
              </router-link>
            </template>

          </v-list>
        </v-navigation-drawer>
        <v-main style="min-height: 100vh">
          <div class="pa-5">
            <router-view></router-view>
          </div>
        </v-main>
      </v-layout>
    </v-card>
  </div>

</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {getCategory} from "@/services/catgoryServices";

const drawer = ref(false);
const router = useRouter();
const category = ref([]);
const valueSearch = ref("");
watch(drawer.value, () => {
  drawer.value = false
});

function search() {
  router.push(`/search?valueSearch=${valueSearch.value}`)
}

onMounted(() => {
  getCategory().then((res) => {
    category.value = res.data
  })
});
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
