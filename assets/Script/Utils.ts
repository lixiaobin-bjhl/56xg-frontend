import axios from 'axios'

let urlPrefix = 'http://127.0.0.1:7001'

axios.interceptors.request.use(function (config) {
    config.url = urlPrefix + config.url
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
}, function (error) {
    return Promise.reject(error)
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