<template>
  <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Add Vaccine</h3>
      <label for="vaccine">Vaccine:</label>
      <textarea id="vaccine" v-model="vaccine"></textarea>
      <input class="button" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import GStore from '@/store'
import VaccineService from '@/services/VaccineService'
export default {
  inject: ['GStore'],
  data() {
    return {
      patient_id: '',
      vaccine:''
    }
  },
  methods: {
    onSubmit() {
      if (this.vaccine === '') {
        alert('This Form is incomplete. Please fill out evert field.')
        return
      }
      this.GStore.flashMessage = "Doctor's suggestion successfully! "
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      let addVaccine = {
        patient_id: GStore.event.id,
        vaccine: this.vaccine
      }
      VaccineService.addVaccine(GStore.event.id,this.vaccine)
      this.$emit('Vaccine-submited', addVaccine)
      this.patient_id = ''
      this.vaccine = ''
    }
  }
}
</script>
