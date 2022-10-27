import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'

import AboutView from '../views/AboutView.vue'

import NotFoundView from '@/views/NotFoundView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import AddEvent from '@/views/EventForm.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import EventService from '@/services/EventService'
import OrganizerService from '@/services/OrganizerService.js'
import Login from '@/views/LoginFormView.vue'
import Register from '@/views/RegisterFormView.vue'
const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/patient/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
        return EventService.getEvent(to.params.id) // Return and params.id
            .then((response) => {
                // Still need to set the data here
                GStore.event = response.data // <--- Store the event
                GStore.event.doctor_com = GStore.reviews.filter((event) => GStore.event.id == event.patient_id)
                    //   console.log(GStore.event.doctor_com)
                    //   console.log(GStore.reviews.patient_id)
            })
            .catch((error) => {
                if (error.response && error.response.status == 404) {
                    return {
                        // <--- Return
                        name: '404Resource',
                        params: { resource: 'event' }
                    }
                } else {
                    return { name: 'NetworkError' } // <--- Return
                }
            })
    },
    children: [{
            path: '',
            name: 'UserDetails',
            component: UserDetails
        },
        {
            path: 'vaccineinjection',
            name: 'VaccineInjection',
            props: true,
            component: VaccineInjection
        },
        {
            path: 'doctorcomment',
            name: 'DoctorComment',
            props: true,
            component: DoctorComment
        }
    ]
},
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/add-event',
    name: 'AddEvent',
    component: AddEvent,
    beforeEnter: () => {
      return OrganizerService.getOrganizers()
        .then((response) => {
          GStore.organizers = response.data
        })
        .catch(() => {
          GStore.organizers = null
          console.log('cannot load organizer')
        })
    }
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
