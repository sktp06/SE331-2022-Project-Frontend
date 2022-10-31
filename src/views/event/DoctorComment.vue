<template>
  <div class="temp">
  <div class="covv">
    <h1>Commentation</h1>
    <form @submit.prevent="addComment">
      <pre>{{ GStore.comment }}</pre>
      <!-- <BaseInput
        v-model="event.category"
        type="text"
        label="Category"
        class="field"
      /> -->

      <!-- <h3>Name & describe your event</h3>

      <BaseInput v-model="event.title" type="text" label="Title" /> -->

      <BaseInput v-model="event.comment" type="text" label="Commentation.." />

      <!-- <h3>Where is your event?</h3>

      <label>Location</label>

      <BaseInput v-model="event.location" type="text" label="Location" /> -->

      <!-- <h3>Vaccine</h3>

      <BaseSelect
        :options="GStore.organizers"
        v-model="event.organizer.id"
        label="Select a Vaccine"
      /> -->
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
import CommentService from '@/services/CommentService.js'
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
      files: [],comment: ''
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
    },
    addComment(){
      if (this.comment === '') {
        alert('This Form is incomplete. Please fill out evert field.')
        return
      }
      this.GStore.flashMessage = "Doctor's suggestion successfully! "
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
   
      // this.$emit('comment-submited', doctorComment)
      // this.comment = ''
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
