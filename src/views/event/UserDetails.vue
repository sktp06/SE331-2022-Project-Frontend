<template>
  <div id="details-card">
    <p>Name: {{ event.name }} {{ event.surname }}</p>
    <p>Age: {{ event.age }}</p>
    <p>Home Town: {{ event.homeTown }}</p>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style>
#details-card {
  background-color: #add8e6;
  padding: 20px;
  margin: auto;
  border: 2px solid #000000;
  width: 425px;
}
</style>
