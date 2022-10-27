<template>
  <ReviewForm @review-submited="addReview" />
  <ReviewList v-if="GStore.reviews" :reviews="GStore.event.doctor_com" />
</template>

<script>
import ReviewForm from '@/components/ReviewForm.vue'
import ReviewList from '@/components/ReviewList.vue'
import GStore from '@/store'

export default {
  inject: ['GStore'],
  components: { ReviewForm, ReviewList },
  methods: {
    addReview(review) {
      this.GStore.reviews.push(review)  
      GStore.event.doctor_com = GStore.reviews.filter((event) => GStore.event.id == event.patient_id)
      console.log(GStore.reviews.patient_id)
    }
  }
}
</script>
