import apiClient from '@/services/AxiosClient.js'

export default{
    addVaccine(id,vaccine){
        apiClient.post('/vaccine/patient/'+id,{name:vaccine})
    }

}