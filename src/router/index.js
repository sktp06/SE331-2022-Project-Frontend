import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import UserDetails from '@/views/event/UserDetails.vue'
import VaccineInjection from '@/views/event/VaccineInjection.vue'
import DoctorComment from '@/views/event/DoctorComment.vue'
import EventLayout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetWorkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'
const routes = [{
        path: '/',
        name: 'EventList',
        component: EventList,
        props: (route) => ({ page: parseInt(route.query.page) || 1 })
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
        path: '/404/:resource',
        name: '404Resource',
        component: NotFound,
        props: true
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/network-error',
        name: 'NetworkError',
        component: NetWorkError
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