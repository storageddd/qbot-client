<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;">
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
}
</script>
