<template>
  <router-link
    class="event-link"
    :to="{ name: 'UserDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <!-- <img id="card" v-if=" " src="../assets/icon.png" alt="" srcset="" /> <br /> -->
      <img id="add" :src="event.image" /><br />
      <span>{{ event.name }} {{ event.surname }}</span> <br />
      <span>{{ event.first_dose}}</span> <br />
      <span>{{ event.second_dose }}</span> <br />
      <!-- <span v-for="event in event.vaccine" :key="event">
        Dose{{ event.first_dose_date }}: {{ event.second_dose_date }} <br
      /></span> -->
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
#add{
  padding: 5px;
}

.event-card{
  margin: auto;
  padding: 10px;
  width: 280px;
  height: 250px;
  border: 5px solid #002a5e;
  border-radius: 25px;
  background: #ffffff;
}


.event-card:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #add8e6;
}

.event-link {
  color: #034689;
  text-decoration: none;
}

img {
  width: 150px;
  height: 150px;
  padding-top: 5px;
  margin-top: 5px;
}
</style>
