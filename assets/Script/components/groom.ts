const { ccclass } = cc._decorator

import { start } from '../../Service/game'
import { detail } from '../../Service/room'
import { getUser, setUserGameNumber } from '../User'
import Net from '../Net'

@ccclass
export default class HallClass extends cc.Component {
    onLoad() {
        let user = getUser()
        if (!user) {
            cc.director.loadScene('login')
            return
        } else {
            let roomId = user.roomId
            cc.find('Canvas/user').getComponent(cc.Label).string = user.name
            detail({
                roomId
            })
                .then((res) => {
                    let room = res.data
                    cc.find('Canvas/seat1/name').getComponent(cc.Label).string = room.seats[0].userId || '空座'
                    cc.find('Canvas/seat2/name').getComponent(cc.Label).string = room.seats[1].userId || '空座'
                    cc.find('Canvas/seat3/name').getComponent(cc.Label).string = room.seats[2].userId || '空座'
                })
        }
        this.bindEvent()
    }

    bindEvent() {
        Net.init(this.node)
        console.log('init hall event')
        this.node.on('message', (res) => {
            console.log('get a message from hall', res)
        })
    }

    /**
     * 返回游戏大厅
     */
    backHall() {
        cc.director.loadScene('hall')
    }

    /**
     * 开始游戏
     */
    startGame() {
        let user = getUser()
        if (user.roomId) {
            start()
                .then((res) => {
                    let data = res.data
                    if (data) {
                        setUserGameNumber(data.number)
                        cc.director.loadScene('home')
                    }
                })
        } else {
            console.log('你还没有选择房间')
        }
    }
}