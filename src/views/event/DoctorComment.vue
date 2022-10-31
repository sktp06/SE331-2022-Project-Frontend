<template>
  <div>
    <form class="review-form" @submit.prevent="onSubmit">
      <h3>Doctor Comment</h3>
      <label for="comment">Comment:</label>
      <textarea id="comment" v-model="comment"></textarea>
      <input class="button" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import GStore from '@/store'
import CommentService from '@/services/CommentService'
export default {
  inject: ['GStore'],
  data() {
    return {
      patient_id: '',
      comment: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.comment === '') {
        alert('This Form is incomplete. Please fill out evert field.')
        return
      }
      this.GStore.flashMessage = "Doctor's suggestion successfully! "
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      let doctorComment = {
        patient_id: GStore.event.id,
        comment: this.comment
      }
      CommentService.addComment(GStore.event.id,this.comment)
      this.$emit('comment-submited', doctorComment)
      this.patient_id = ''
      this.comment = ''
    }
  }
}
</script>
