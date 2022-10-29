<template>
  <div id="details-card">
      <img v-for="url in event.imageUrls" :key="url" :src="url" />
    <br/>
    <p>{{ event.name }} {{ event.surname }}</p>
    <p>Age: {{ event.age }}</p>
    <p>Home Town: {{ event.homeTown }}</p>
    <p>Dose1: {{ event.first_dose }} </p>
    <p>Dose2: {{ event.second_dose }}</p>
    <h3 v-if="event.description"> {{event.description}} </h3>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style scoped>
#details-card{
  background-color: bisque ;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1%;
  border: 3px solid #ddd;
  border-radius: 10px;
}

img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
}
/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
