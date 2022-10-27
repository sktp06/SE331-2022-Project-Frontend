import apiClient from '@/services/AxiosClient.js'

export default {
  getEvents(perPage, page) {
    return apiClient.get('/people?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/people/' + id)
  },
  saveEvent(event) {
    return apiClient.post('/people', event)
  },
  getEventByKeyword(keyword, perPage, page) {
    return apiClient.get(
      'people?_limit=' + perPage + '&_page=' + page + '&title=' + keyword
    )
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
