
const { ccclass } = cc._decorator
import Utils from '../Utils'
import Net from '../Net'
import urlParse from '../functions/urlParse'
import { login, info } from '../../Service/common'
import { setUser } from '../User'

@ccclass
export default class Login extends cc.Component {
    onLoad() {
        this.getUserInfo()
        let loginBtn = cc.find('Canvas/loginBtn')
        Utils.addClickEvent(loginBtn, this.node, 'login', 'handleLogin')
    }
    getUserInfo() {
        info()
            .then((res) => {
                if (res.data) {
                    setUser(res.data)
                    cc.director.loadScene('hall')
                }
            })
    }
    handleLogin() {
        login({
            user: urlParse()['user'] || 'xiaobin'
        })
            .then(() => {
                Net.connect()
                cc.director.loadScene('hall')
            })
    }
}