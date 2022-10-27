import { reactive } from 'vue'
export default reactive({
  flashMessage: '',
  event: null,
  organizers: null,
  reviews:[],
  currentUser: JSON.parse(localStorage.getItem('user'))
})
