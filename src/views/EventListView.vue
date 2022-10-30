<template>
  <h1 class="head">List of people who has been vaccinated for COVID-19</h1>

  <div class="events">
    <div class="search-box">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>
  </div>

  <div class="row" >
    <EventCard id="cd" v-for="event in events" :key="event.id" :event="event" />
  </div>

    <div class="pagination">
      <router-link id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page != 1">
        Prev Page
      </router-link>

      <router-link id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next" v-if="hasNextPage">
        Next Page
      </router-link>
    </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import AuthService from '@/services/AuthService.js'

export default {
  name: 'EventListView',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentUser() {
      return localStorage.getItem('user')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isDoctor(){
      return AuthService.hasRoles('ROLE_DOCTOR')
    }
    // isAdmin() {
    //   return AuthService.hasRoles('ROLE_ADMIN')
    // }
  },
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
      keyword: null
    }
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(routeTo) {
    var queryFunction
    if (this.keyword == null || this.keyword === '') {
      queryFunction = EventService.getEvents(
        3,
        parseInt(routeTo.query.page) || 1
      )
    } else {
      queryFunction = EventService.getEventByKeyword(
        this.keyword,
        3,
        parseInt(routeTo.query.page) || 1
      )
    }

    queryFunction
      .then((response) => {
        this.events = response.data // <---
        this.totalEvents = response.headers['x-total-count'] // <---
      })
      .catch(() => {
        return { name: 'NetworkError' } // <---
      })
  },
  methods: {
    updateKeyword() {
      var queryFunction
      if (this.keyword === '') {
        queryFunction = EventService.getEvents(3, 1)
      } else {
        queryFunction = EventService.getEventByKeyword(this.keyword, 3, 1)
      }

      queryFunction
        .then((response) => {
          this.events = response.data
          console.log(this.events)
          this.totalEvents = response.headers['x-total-count']
          console.log(this.totalEvents)
        })
        .catch(() => {
          return { name: 'NetworkError' }
        })
    }
  },

  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 3)
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
#cd{
  overflow: hidden;
  position: relative;
  display: inline-block;
}
#cd::before,
#cd::after{
  content: '';
  position: absolute;
  width: 100%;
  left: 0;
}

.head{
  text-shadow: #2c3e50;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#cd{
  padding: 30px;
  align-items: center;
  margin: auto;
}

.event-cd{
  display: flex;
  flex-direction: row;
}

.pagination {
  display: flex;
  padding: 25px;
  width: auto;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.search-box {
  width: 300px;
}
</style>
