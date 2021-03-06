
const { ccclass } = cc._decorator
import Utils from '../Utils'
import Net from '../Net'
import urlParse from '../functions/urlParse'
import { login, info } from '../../Service/common'
import { setUser } from '../User'
import { detail } from '../../Service/room'

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
                let data = res.data
                if (data) {
                    setUser(data)
                    Net.connect()
                    if (data.roomId) {
                        detail({
                            roomId: data.roomId
                        })
                            .then((res) => {
                                let data = res.data
                                if (data.game) {
                                    cc.director.loadScene('home')
                                } else {
                                    cc.director.loadScene('groom')
                                }
                            })
                    } else if (data.id) {
                        cc.director.loadScene('hall')
                    }
                }
            })
    }
    handleLogin() {
        login({
            user: urlParse()['user'] || 'xiaobin'
        })
            .then((res) => {
                setUser(res.data)
                Net.connect()
                cc.director.loadScene('hall')
            })
    }
}