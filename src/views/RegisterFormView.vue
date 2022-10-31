<template>
  <div class="col-md-12">
    <div clas="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegiter" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="firstname">FirstName</label>
            <Field name="firstname" type="text" class="form-control" />
            <ErrorMessage name="firstname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="lastname">Lastname</label>
            <Field name="lastname" type="text" class="form-control" />
            <ErrorMessage name="lastname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <Field name="username" type="text" class="form-control" />
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" />
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <div><h3>The image of the Event</h3>
          <UploadImages @changed="handleImages" />
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Register
            </button>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import UploadImages from 'vue-upload-drop-images'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'RegisterView',
  components: {
    UploadImages,
    Form,
    Field,
    ErrorMessage
  },
  //eslint-disable-next-line
    inject:['GStore'],
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 charaacter!')
        .max(20, 'Must be maximum 20 characters!'),
      email: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(50, 'Must be maxi,u, 50 characters!'),
      password: yup
        .string()
        .required('Password is required!')
        .min(6, 'Must be at least 6 characters!')
        .max(40, 'Must be maximum 40 characters!')
    })
    return {
      successful: false,
      loading: false,
      message: '',
      schema,
      patient: {
        firstname:'',
        lastname:'',
        imageUrls: []
    },
    files:[]
    }
    
  },
  mounted() {
    if (this.GStore.currentUser) {
      this.$router.push('/event')
    }
  },
  methods: {
    // eslint-disable-next-line
        handleRegiter(user){
      AuthService.register(user)
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          this.message = 'could not register'
        })
      this.message = ''
      this.successful = false
      this.loading = true
    }, saveEvent() {
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
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: red;
}

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
