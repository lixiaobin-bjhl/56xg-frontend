import axios from 'axios'

/**
 * 获取房间列表
 *
 * @return Promise
 */
export function roomList() {
    return axios.post('/room/list.json')
}

/**
 * 创建房间
 *
 * @param {string} name 房间名称
 *
 * @return Promise
 */
export function add(params) {
    return axios.post('/room/add.json', params)
}