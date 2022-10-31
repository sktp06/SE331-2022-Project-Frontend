<template>
  <!-- <div id="vaccine-card" v-for="event in event.vaccine" :key="event">
    Dose{{ event.dose }}: {{ event.type }} when {{ event.date }}
  </div> -->

  <BaseSelect
        :options="GStore.vaccines"
        v-model="event.vaccine.id"
        label="Select a Vaccine"
      />
      <button type="submit">Submit</button>
</template>

<script>
import VaccineService from '@/services/VaccineService.js'
export default {
  inject: ['GStore'],
  data() {
    return {
      event: {

        vaccine: { id: '', name: '' },
      
      },
     
    }
  },
  methods: {
    saveEvent() {
      then((response) => {
        this.event.imageUrls = response.map((r) => r.data)
        VaccineService.saveEvent(this.event)
          .then((response) => {
            console.log(response)
            this.$router.push({
              name: 'EventDetails',
              params: { id: response.data.id }
            })
            this.GStore.flashMessage =
              'You are successfully add a new event for ' + response.data.title
            setTimeout(() => {
              this.GStore.flashMessage = ''
            }, 3000)
          })
          .catch(() => {
            this.$router.push('NetworkError')
          })
      })
    },
    handleImages(files) {
      this.files = files
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
