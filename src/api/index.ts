import axios from 'axios'

const api = axios.create({
    baseURL: 'https://abitus-api.pjc.mt.gov.br/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
