import apiClient from '@/services/AxiosClient.js'

export default {
  getDoctors(perPage, page) {
    return apiClient.get('/patient?_limit=' + perPage + '&_page=' + page)
  },
  getDoctor(id) {
    return apiClient.get('/patient/' + id)
  },
  saveDoctor(doctor) {
    return apiClient.post('/patient', docrtor)
  },
  getDoctorByKeyword(keyword, perPage, page) {
    return apiClient.get(
      'patient?_limit=' + perPage + '&_page=' + page + '&title=' + keyword
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
