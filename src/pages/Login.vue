<template>
  <q-page class="flex flex-center">
    <q-form v-if="!isLoading" @submit="login">
      <q-input v-model="userName" :rules="[val => !!val || 'Заполните поле']" placeholder="qbotacc"/>
      <q-input v-model="password" :rules="[val => !!val || 'Заполните поле']" type="password" placeholder="xf3z54dl"/>
      <q-btn type="submit" label="Войти" />
    </q-form>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'PageLogin',
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('global', ['isConnected', 'isLoading']),
    ...mapGetters('auth', ['errorMessage'])
  },
  methods: {
    async login() {
      if (!this.isConnected) {
        this.$router.push('/connection');
        return;
      }

      this.setIsLoading(true);
      const result = await this.authorizeByCredentials({
        userName: this.userName,
        password: this.password
      });

      this.setIsLoading(false);
      if (result) {
        this.$router.push({ path: '/' });
      }
      if (this.errorMessage) {
        this.$q.notify({
          message: this.errorMessage,
          color: 'negative'
        })
      }
    },
    ...mapMutations('global', ['setIsLoading']),
    ...mapActions('auth', ['authorizeByCredentials'])
  }
}
</script>
