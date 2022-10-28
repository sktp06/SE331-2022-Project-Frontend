<template>
  <div class="temp">
  <div class="covv">
    <h1>Commentation</h1>
    <form @submit.prevent="saveEvent">
      <!-- <BaseInput
        v-model="event.category"
        type="text"
        label="Category"
        class="field"
      /> -->

      <!-- <h3>Name & describe your event</h3>

      <BaseInput v-model="event.title" type="text" label="Title" /> -->

      <BaseInput v-model="event.description" type="text" label="Commentation.." />

      <!-- <h3>Where is your event?</h3>

      <label>Location</label>

      <BaseInput v-model="event.location" type="text" label="Location" /> -->

      <h3>Vaccine</h3>

      <BaseSelect
        :options="GStore.organizers"
        v-model="event.organizer.id"
        label="Select a Vaccine"
      />
      <!-- <h3>The image of the Event</h3>
      <UploadImages @changed="handleImages" /> -->

      <button type="submit">Submit</button>
    </form>

    <!-- <pre>{{ event }}</pre> -->
  </div></div>
</template>

<script>
import EventService from '@/services/EventService.js'
import UploadImages from 'vue-upload-drop-images'
export default {
  inject: ['GStore'],
  components: {
    UploadImages
  },
  data() {
    return {
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        organizer: { id: '', name: '' },
        imageUrls: []
      },
      files: []
    }
  },
  methods: {
    saveEvent() {
      Promise.all(
        this.files.map((file) => {
          return EventService.uploadFile(file)
        })
      ).then((response) => {
        this.event.imageUrls = response.map((r) => r.data)
        EventService.saveEvent(this.event)
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
<style scoped>
.temp{
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 1%;
}
.covv{
  background-color: bisque;
  padding: 10px;
  border-radius: 10px;
}
</style>
