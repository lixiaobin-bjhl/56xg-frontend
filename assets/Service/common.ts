import axios from 'axios'

/**
 * 登录
 *
 * params {string} user 登录用户
 *
 * @return Promise
 */
export function login(params) {
    return axios.post('/login.json', params)
}

/**
 * 获取登录人信息
 *
 *
 * @return Promise
 */
export function info() {
    return axios.post('/info.json')
}