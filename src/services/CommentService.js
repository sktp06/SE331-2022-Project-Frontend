import apiClient from '@/services/AxiosClient.js'

export default{
    addComment(id,comment){
        apiClient.post('/comment/patient/'+id,comment)
    }
}