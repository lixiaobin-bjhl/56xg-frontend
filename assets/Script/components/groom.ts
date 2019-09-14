const { ccclass } = cc._decorator

import { start } from '../../Service/game'
import { detail, leave } from '../../Service/room'
import { getUser, setUserGameNumber, setUserRoomId } from '../User'
import Net from '../Net'

@ccclass
export default class HallClass extends cc.Component {
    onLoad() {
        let user = getUser()
        if (!user) {
            cc.director.loadScene('login')
            return
        } else {
            cc.find('Canvas/user').getComponent(cc.Label).string = user.name
        }
        this.getRoomDetail()
        this.bindEvent()
    }

    getRoomDetail() {
        let user = getUser()
        let roomId = user.roomId
        detail({
            roomId
        })
            .then((res) => {
                let room = res.data

                let user1 =  room.seats[0]
                let seat1 = cc.find('Canvas/seat1')
                if (user1.userId) {
                    seat1.getChildByName('name').getComponent(cc.Label).string = user1.userId
                    let statusNode = seat1.getChildByName('status')
                    if (user1.online) {
                        statusNode.getComponent(cc.Label).string = '在线'
                        statusNode.active = true
                    }
                } else {
                    seat1.getChildByName('name').getComponent(cc.Label).string = '空坐'
                    seat1.getChildByName('status').active = false
                }

                let user2 = room.seats[1]
                let seat2 = cc.find('Canvas/seat2')
                if (user2.userId) {
                    seat2.getChildByName('name').getComponent(cc.Label).string = user2.userId
                    let statusNode = seat2.getChildByName('status')
                    if (user2.online) {
                        statusNode.getComponent(cc.Label).string = '在线'
                        statusNode.active = true
                    }
                } else {
                    seat2.getChildByName('name').getComponent(cc.Label).string = '空坐'
                    seat2.getChildByName('status').active = false
                }

                let user3 = room.seats[2]
                let seat3 = cc.find('Canvas/seat3')
                if (user3.userId) {
                    seat3.getChildByName('name').getComponent(cc.Label).string = user3.userId
                    let statusNode = seat3.getChildByName('status')
                    if (user3.online) {
                        statusNode.getComponent(cc.Label).string = '在线'
                        statusNode.active = true
                    }
                } else {
                    seat3.getChildByName('status').active = false
                    seat3.getChildByName('name').getComponent(cc.Label).string = '空坐'
                }
            })
    }

    bindEvent() {
        Net.init(this.node)
        console.log('init groom event')
        this.node.on('message', (res) => {
            let type = res.type
            console.log('get a message from groom', res)
            // 有人离开或者加入房间
            if (type === 'leave-room' || type === 'join-room') {
                this.getRoomDetail()
            }
            // 人员满了, 开始游戏
            else if (type === 'start-game') {
                cc.director.loadScene('home')
            }
        })
    }

    /**
     * 返回游戏大厅
     */
    backHall() {
        leave()
            .then(() => {
                setUserRoomId(null)
                cc.director.loadScene('hall')
            })
    }

    /**
     * 开始游戏
     */
    startGame() {
        console.log('start game')
        // let user = getUser()
        // if (user.roomId) {
        //     start()
        //         .then((res) => {
        //             let data = res.data
        //             if (data) {
        //                 setUserGameNumber(data.number)
        //                 cc.director.loadScene('home')
        //             }
        //         })
        // } else {
        //     console.log('你还没有选择房间')
        // }
    }
}