
const { ccclass } = cc._decorator
import Utils from '../Utils'
import Net from '../Net'

@ccclass
export default class Login extends cc.Component {
    onLoad() {
        let loginBtn = cc.find('Canvas/loginBtn')
        Utils.addClickEvent(loginBtn, this.node, 'login', 'handleLogin')
    }
    handleLogin() {
        Net.socket.emit('login', {
            name: 'xiaobin'
        })
        cc.director.loadScene('hall')
    }
}
