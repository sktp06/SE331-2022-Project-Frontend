<template>
  <h1 class="head">List of people who has been vaccinated for COVID-19</h1>

  <div class="events">
    <div class="search-box">
      <BaseInput v-model="keyword" type="text" label="Search..." @input="updateKeyword" />
    </div>
  </div>
  <!-- {{GStore.currentUser}} -->
  <div v-if="GStore.currentUser.authorities[1] == 'ROLE_ADMIN' || GStore.currentUser.authorities[0]=='ROLE_DOCTOR'" >
  <div class="row" >
    <EventCard id="cd" v-for="event in events" :key="event.id" :event="event" />
  </div>

  <!-- <p>Hover <a href="#" id="style-2" data-replace="this link"><span>this link</span></a></p> -->
    <!-- <div data-replace="this link"><span>this link</span></div> -->
    <div class="pagination" >
      <router-link data-replace="Go to Prev Page" id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev" v-if="page != 1">
        <a href="#" id="style-2"><span>Go to Prev Page</span></a><br/>
         
      </router-link>
      <router-link  data-replace="Go to Next Page" id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next" v-if="hasNextPage">
        <!-- Go to <span>Next Page</span> -->
        <a href="#" id="style-2"><span>Go to Next Page</span> </a> 
      </router-link>
    </div>
    </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import AuthService from '@/services/AuthService.js'
import GStore from '@/store'

export default {
  inject: ['GStore'],
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
a {
  overflow: hidden;
  position: relative;
  display: inline-block;
}

a::before,
a::after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0;
}
a::before {
  background-color: white;
  height: 2px;
  bottom: 0;
  transform-origin: 100% 50%;
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}
a::after {
  content: attr(data-replace);
  height: 100%;
  top: 0;
  transform-origin: 100% 50%;
  transform: translate3d(200%, 0, 0);
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
  color: #ffffff;
}

a:hover::before {
  transform-origin: 0% 50%;
  transform: scaleX(1);
}
a:hover::after {
  transform: translate3d(0, 0, 0);
}

a span {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}

a:hover span {
  transform: translate3d(-200%, 0, 0);
}

/* Presentational Styles */
body {
  display: grid;
  font-family: "Poppins", sans-serif;
  font-size: 27px;
  line-height: 1.5;
  height: 100vh;
  place-items: center;
}

a {
  text-decoration: none;
  color: #18272f;
  font-weight: 700;
  vertical-align: top;
}

.head{
  text-shadow: 1px 1px 1px #957dad,
             1px 2px 1px #957dad,
             1px 3px 1px #957dad,
             1px 4px 1px #957dad,
             1px 5px 1px #957dad,
             1px 6px 1px #957dad,
             1px 10px 5px rgba(16, 16, 16, 0.5),
             1px 15px 10px rgba(16, 16, 16, 0.4),
             1px 20px 30px rgba(16, 16, 16, 0.3),
             1px 25px 50px rgba(16, 16, 16, 0.2);
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
