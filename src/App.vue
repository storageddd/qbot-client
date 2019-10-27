<template>
  <div id="q-app">
    <q-inner-loading :showing="isLoading">
      <q-spinner-ball size="50px" color="primary"></q-spinner-ball>
    </q-inner-loading>
    <router-view v-if="!isLoading"/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('global', ['isLoading', 'isConnected']),
    ...mapGetters('auth', ['isAuthorized'])
  },
  methods: {
    ...mapMutations('global', ['setIsConnected']),
    ...mapActions('auth', ['authorizeByCookies']),
    async authorize() {
      if (!this.isLoading && this.isConnected && !this.isAuthorized) {
        await this.authorizeByCookies();
      }
    }
  },
  watch: {
    isAuthorized(value) {
      if (value) {
        this.$router.push('/');
      } else {
        this.$router.push('/login');
      }
    },
    '$route': 'authorize'
  },
  async created() {
    window.addEventListener('offline', () => { this.setIsConnected(navigator.onLine) });
    window.addEventListener('online', () => { this.setIsConnected(navigator.onLine) });

    await this.authorizeByCookies();
  }
}
</script>
