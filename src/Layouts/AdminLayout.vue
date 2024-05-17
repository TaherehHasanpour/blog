<template>
  <div>
    <v-card>
      <v-layout>
        <v-app-bar
            color="primary"
            prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <router-link :to="({name:'home'})">My files</router-link>

          <v-spacer></v-spacer>

          <v-btn variant="text" icon="mdi-magnify"></v-btn>

          <v-btn variant="text" icon="mdi-filter"></v-btn>

          <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            bottom
            theme="dark"
            position="right"
            permanent
        >
          <v-list color="transparent">
            <router-link to="/admin">
              <v-list-item prepend-icon="mdi-view-dashboard" v-ripple title="داشبورد"></v-list-item>
            </router-link>
            <router-link to="/admin/users">
              <v-list-item prepend-icon="mdi-account-box" title="مدیریت کاربران"></v-list-item>
            </router-link>
            <router-link :to="{name:'IndexCategory'}">
              <v-list-item prepend-icon="mdi-card-outline" title="مدیریت دسته بندی ها"></v-list-item>
            </router-link>
            <router-link :to="{name:'IndexPosts'}">
              <v-list-item prepend-icon="mdi-file-outline" title="مدیریت پست ها"></v-list-item>
            </router-link>
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

<script>
export default {
  data: () => ({
    drawer: true,
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
