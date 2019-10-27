<template>
  <div id="q-app">
    isConnected: {{ isConnected }}
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
    ...mapGetters('global', ['isLoading', 'isConnected'])
  },
  methods: {
    ...mapMutations('global', ['setIsConnected', 'setIsLoading']),
    ...mapActions('auth', ['authorize'])
  },
  async created() {
    this.setIsConnected(navigator.onLine);

    window.addEventListener('offline', () => { this.setIsConnected(navigator.onLine) });
    window.addEventListener('online', () => { this.setIsConnected(navigator.onLine) });

    this.setIsLoading(true);
    const result = await this.authorize();
    if (result) {
      this.$router.push({ path: '/' });
    }
    this.setIsLoading(false);
  }
}
</script>
