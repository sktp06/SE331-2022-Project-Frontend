<template>
  <router-link
    class="event-link"
    :to="{ name: 'UserDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <img src="../assets/icon.png" alt="" srcset="" /> <br />
      <span>{{ event.name }} {{ event.surname }}</span> <br />
      <span v-for="event in event.vaccine" :key="event">
        Dose{{ event.dose }}: {{ event.type }} <br
      /></span>
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
.event-card {
  padding: 20px;
  width: 200px;
  height: 150px;
  cursor: pointer;
  border: 5px solid #002a5e;
  margin-bottom: 18px;
  margin: auto;
  background-color: #7694b9;
  font-size: large;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
  background-color: #add8e6;
}

.event-link {
  color: #034689;
  text-decoration: none;
  margin: auto;
}

img {
  width: 100px;
  height: 100px;
}
</style>
