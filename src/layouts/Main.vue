<template>
  <q-layout view="hHh Lpr fFf">
    <q-btn @click="logout" label="Выйти" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MainLayout',
  methods: {
    logout() {
      const result = this.unauthorize();
      if (result) {
        this.$router.push({ path: '/login' });
      }
    },
    ...mapActions('auth', ['unauthorize'])
  }
}
</script>
