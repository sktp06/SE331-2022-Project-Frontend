<template>
  <div class="temp">
  <div class="covv">
    <h1>Create a new Patient</h1>
    <form @submit.prevent="saveEvent">
      <h3>The image of the Event</h3>
      <UploadImages id="addimg" @changed="handleImages" />
      <!-- <BaseInput
        v-model="event.category"
        type="text"
        label="Patient name"
        class="field"
      /> -->

      <!-- <h3>Name & describe your event</h3> -->

      <BaseInput v-model="event.name" type="text" label="Name" />

      <BaseInput v-model="event.surname" type="text" label="Surname" />

      <BaseInput v-model="event.age" type="text" label="Age" />

      <BaseInput v-model="event.hometown" type="text" label="Hometown" />

      <!-- <h3>Where is your event?</h3>

      <label>Location</label> -->

      <!-- <BaseInput v-model="event.location" type="text" label="Location" /> -->

      <!-- <h3>Who is your organizer?</h3> -->

      <!-- <BaseSelect
        :options="GStore.vaccines"
        v-model="event.vaccine.name"
        label="Select a first does vaccine"
      />

      <BaseSelect
        :options="GStore.vaccines"
        v-model="event.vaccine.name"
        label="Select a second does vaccine"
      /> -->
      

      <button type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
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
        // category: '',
        // title: '',
        // description: '',
        // location: '',
        vaccine: { id: '', name: '' },
        // imageUrls: []
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
  margin: 3%;
}
.covv{
  background-color: bisque;
  padding: 10px;
  border-radius: 10px;
  margin: auto;
}
#addimg{
  height: 350px;
  width: 280px;
}
</style>
