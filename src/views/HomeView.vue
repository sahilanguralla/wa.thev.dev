<script setup lang="ts">
import InputForm from "../components/InputForm.vue";
</script>

<template>
  <header>
    <h1>WhatsApp DM</h1>
    <div>Send messages without saving number</div>
  </header>
  <main>
    <InputForm />
  </main>
</template>

<style scoped>
header {
  color: #fff;
}
main {
  background: #fff;
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 2px 25px rgb(0 0 0 / 20%);
  overflow: hidden;
}
</style>
