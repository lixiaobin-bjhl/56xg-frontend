
import axios from 'axios'

export function start() {
    return axios.post('/game/start.json', {})
}

export function deal() {
    return axios.post('/game/deal.json', {})
}