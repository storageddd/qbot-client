<template>
  <q-page class="flex flex-center">
    <q-form @submit="login">
      <q-input v-model="userName" :rules="[val => !!val || 'Введите имя пользователя']" placeholder="qbotacc"/>
      <q-input v-model="password" :rules="[val => !!val || 'Введите пароль']" type="password" placeholder="xf3z54dl"/>
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
    ...mapGetters('global', ['isConnected']),
    ...mapGetters('auth', ['errorMessage'])
  },
  methods: {
    async login() {
      await this.authorizeByCredentials({
        userName: this.userName,
        password: this.password
      });

      if (this.errorMessage) {
        this.$q.notify({
          message: this.errorMessage,
          color: 'negative'
        })
      }
    },
    ...mapActions('auth', ['authorizeByCredentials'])
  }
}
</script>
