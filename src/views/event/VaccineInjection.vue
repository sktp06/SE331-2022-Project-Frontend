<template>
  <div id="vaccine-card" v-for="event in event.vaccine" :key="event">
    Dose{{ event.dose }}: {{ event.type }} when {{ event.date }}
  </div>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'], // <---- Inject the Global Store
  methods: {
    register() {
      // Assuming successful API call to register them
      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title
      setTimeout(() => {
        // After 3 seconds remove it
        this.GStore.flashMessage = ''
      }, 3000)
      // Set a flash message to appear on the next page loaded which says
      // 'You are successfully registered for ' + this.event.title

      this.$router.push({
        name: 'UserDetails',
        params: { id: this.event.id }
      })
    }
  }
}
</script>

<style>
#vaccine-card {
  background-color: #add8e6;
  padding: 20px;
  margin: auto;
  border: 2px solid #000000;
  width: 425px;
  margin-bottom: 10px;
}
</style>
