import axios from 'axios'

let urlPrefix = 'http://127.0.0.1:7001'

axios.interceptors.request.use(function (config) {
    config.url = urlPrefix + config.url
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
}, function (error) {
    return Promise.reject(error)
})

/**
 * 添加ajax response interceptor
 */
axios.interceptors.response.use(function (response) {
    let data = response.data
    if (typeof data === 'string') {
        data = JSON.parse(data)
    }
    if (data.code === 0 || data.status === 0) {
        return data
    } else {
        return Promise.reject(data)
    }
})

export default class Utils extends cc.Component {
    static addClickEvent(node, target, component, handler) {
        let eventHandler = new cc.Component.EventHandler()
        eventHandler.target = target
        eventHandler.component = component
        eventHandler.handler = handler
        let clickEvents = node.getComponent(cc.Button).clickEvents
        clickEvents.push(eventHandler)
    }
}