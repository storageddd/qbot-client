<template>
  <q-page class="flex flex-center">
    <div>
      <h1>QBot</h1>
      <q-btn to="/asdads">to 404</q-btn>
      <p>...coming soon</p>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data() {
    return {
      text: ''
    }
  },
  methods: {
     login() {
      var credentials = {
        "username": "qbotacc",
        "password": "xf3z54dl"
      }

       //this.$q.localStorage.set('userName', 'qbotacc')

    },
    comment() {
      let res = this.$q.localStorage.getItem('userName')
      //const res = await InstagramApi.getInstance().media.comment({ mediaId: '2155908751587526730', text: this.text});
      console.log(res);
    }
  }
}
</script>
