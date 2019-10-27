<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'GuestLayout',

  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>
