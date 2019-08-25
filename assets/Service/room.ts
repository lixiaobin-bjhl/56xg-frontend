import axios from 'axios'

/**
 * 获取房间列表
 *
 * @return Promise
 */
export function roomList() {
    return axios.post('/room/list.json')
}