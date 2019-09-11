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

/**
 * 加入房间
 *
 * @param {number} roomid 房间id
 *
 * @return Promise
 */
export function join(params) {
    return axios.post('/room/join.json', params)
}
export function detail(params) {
    return axios.post('/room/detail.json', params)
}