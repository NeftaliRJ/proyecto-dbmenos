<template>
  <v-app>
    <LoadingScreen :isLoading="isLoading" />
    <v-main v-if="!isLoading">
      <v-app-bar
        app
        color="#0484eb"
        dark
      >
        <div class="d-flex align-center">
          <v-img
            href="https://github.com/vuetifyjs/vuetify/releases/latest"
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://static1.gamerantimages.com/wordpress/wp-content/uploads/2020/06/studio-ghibli-logo.jpg"
            transition="scale-transition"
            width="120"
          />
        </div>
      </v-app-bar>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import LoadingScreen from './components/LoadingScreen.vue'

export default {
  name: 'App',

  components: {
    LoadingScreen
  },

  data() {
    return { isLoading: true };
  },

   mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
};
</script>
