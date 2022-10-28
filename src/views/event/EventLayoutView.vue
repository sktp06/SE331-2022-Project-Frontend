<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link id="tex" :to="{ name: 'UserDetails' }">User details</router-link>
      |
      <!-- <router-link :to="{ name: 'VaccineInjection' }">Vaccine injection</router-link> -->
      <router-link id="tex" :to="{ name: 'DoctorComment' }">Doctor's recommentation</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
<style scoped>
#tex{
  color: white;
}
#nav{
  color: white;
  background-color: rgb(218, 124, 124);
  padding: 1%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1%;
  border-radius: 10px;
}
</style>
