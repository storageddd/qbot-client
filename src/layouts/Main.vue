<template>
  <q-layout view="hHh Lpr fFf">
    <q-btn @click="unauthorize" label="Выйти" />
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
    ...mapActions('auth', ['unauthorize'])
  }
}
</script>
