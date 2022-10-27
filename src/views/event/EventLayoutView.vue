<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'UserDetails' }">User details</router-link>
      |
      <router-link :to="{ name: 'VaccineInjection' }">Vaccine injection</router-link>
      |
      <router-link :to="{ name: 'DoctorComment' }">Doctor's recommentation</router-link>
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>
<script>
export default {
  inject: ['GStore']
}
</script>
