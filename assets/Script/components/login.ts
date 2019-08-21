
const { ccclass } = cc._decorator
import Utils from '../Utils'

@ccclass
export default class Login extends cc.Component {
    onLoad() {
        let loginBtn = cc.find('Canvas/loginBtn')
        Utils.addClickEvent(loginBtn, this.node, 'login', 'handleLogin')
    }
    handleLogin(event) {
        console.log(event)
    }
}
