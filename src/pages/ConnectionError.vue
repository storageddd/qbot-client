<template>
  <div>
      <p class="text-faded">Отсутствует соединение с&nbsp;интернетом. Проверьте подключение и&nbsp;нажмите «обновить».</p>
      <q-btn color="secondary" style="width:200px;" to="/" label="Обновить" />
  </div>
</template>

<script>
export default {
  name: 'ConnectionError'
}
</script>
