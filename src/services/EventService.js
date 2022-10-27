import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage, page) {
        return apiClient.get('/people?_limit=' + perPage + '&_page=' + page)
    },
    //Added new call
    getEvent(id) {
        return apiClient.get('/people/' + id)
    }
}