<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      height="100px"
    >
    <h1 class="text-center ma-auto">Amigo Secreto<br><small>Dos Pereiras</small></h1>

    </v-app-bar>

    <v-main>
      <Login/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/login';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
