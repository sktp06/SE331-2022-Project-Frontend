<template>
    <div v-if="GStore.user">
        <router-view :user="GStore.user" />
        <!-- <h1>{{ GStore.event.title }}</h1> -->
        <div id="nav">
            <!-- <router-link id="tex" :to="{ name: 'UserDetails' }">User details</router-link>
        | -->
            <!-- <router-link :to="{ name: 'VaccineInjection' }">Vaccine injection</router-link> -->
            <!-- <router-link id="tex" :to="{ name: 'DoctorComment' }">Doctor's recommentation</router-link>
        |
        <router-link id="tex" :to="{name: 'VaccineInjection'}"> Add Vaccine</router-link> -->
        <button class="btn hvr-underline-from-center" @click="changeToDoctor">Set to doctor</button>
        <button class="btn hvr-underline-from-center" @click="changeToPeople">Set to people</button>
        </div>
        <!-- <router-view :event="GStore.event" /> -->
        <div class="name">{{ GStore.user.username }}, {{GStore.user.email}}</div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js'
import GStore from '@/store'
export default {
    inject: ['GStore'],
    props: ['id', 'user'],
    computed: {
        currentUser() {
            return localStorage.getItem('user')
        },
        isAdmin() {
            return AuthService.hasRoles('ROLE_ADMIN')
        },
        isDoctor() {
            return AuthService.hasRoles('ROLE_DOCTOR')
        }
    },
    data() {
    return {
      userData: {
        id: GStore.user.id,
        name: GStore.user.firstname,
        surname: GStore.user.lastname,
        image: GStore.user.image,

      }
    }
  },
  methods: {
    changeToPeople() {
      console.log(this.userData)
      AuthService.changeRoleToPeople(this.userData)
        .then(() => {
          this.$router.push({ path: '/home' })
        })
        .catch(() => {
          console.log('FAIL')
        })
    },
    changeToDoctor() {
      AuthService.changeRoleToDoctor(this.userData)
      .then(() => {
         this.$router.push({ path: '/doctorList' })
      })
      .catch(() => {
        console.log('FAIL')
      })
    },
}
}
</script>
<style scoped>
#tex {
    color: white;
}

#nav {
    color: white;
    background-color: rgb(218, 124, 124);
    padding: 1%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 1%;
    border-radius: 10px;
}
</style>
  