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