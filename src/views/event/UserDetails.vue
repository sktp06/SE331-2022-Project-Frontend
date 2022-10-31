<template>
<!-- {{ GStore.event.vaccineList }} -->
  <div id="details-card">
      <img :src="event.image" />
    <br/>
    <p>{{ event.name }} {{ event.surname }}</p>
    <p>Age: {{ event.age }}</p>
    <p>Home Town: {{ event.homeTown }}</p>
    <p>Dose: {{ event.first_dose }} </p>
    <p>Dose: {{ event.second_dose }}</p>
    <p v-for="vaccineI in GStore.event.vaccineList" :key="vaccineI.id" :vaccineI="vaccineI">Dose: {{vaccineI.name}}<br/> </p>
    <p v-for="commentI in GStore.event.commentList" :key="commentI.id" :commentI="commentI">Comment: {{commentI.comment}}<br/> </p>
    
  </div>
</template>
<script>
// import GStore from '@/store'
import CommentService from '@/services/CommentService'
import VaccineService from '@/services/VaccineService'
export default {
  inject: ['GStore'],
  props: ['event','comment', 'vaccine']
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
