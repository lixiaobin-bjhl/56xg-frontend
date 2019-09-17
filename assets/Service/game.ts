
import axios from 'axios'

export function start(params) {
    return axios.post('/game/start.json', params)
}

export function deal() {
    return axios.post('/game/deal.json', {})
}