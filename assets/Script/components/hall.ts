const { ccclass } = cc._decorator

import Utils from '../Utils'
import { start } from '../../Service/game'
import { getUser, setUserRoomId } from '../User'

@ccclass
export default class NewClass extends cc.Component {
    createRoomDialog = null
    onLoad() {
        let user = getUser()
        if (!user) {
            cc.director.loadScene('login')
            return
        } else {
            cc.find('Canvas/user').getComponent(cc.Label).string = user.name
        }
        this.addComponent('AddRoom')
        // this.addComponent('RoomList')
        this.bindEvent()

    }

    bindEvent() {
        console.log('hall bind event')
        this.createRoomDialog = cc.find('Canvas/createBtn/createDialog')
        let createBtn = cc.find('Canvas/createBtn')

        Utils.addClickEvent(createBtn, this.node, 'hall', 'showCreateRoomDialog')
        this.node.on('submit-room-success', this.hideCreateRoomDialog, this)

        let startBtn = cc.find('Canvas/startBtn')
        Utils.addClickEvent(startBtn, this.node, 'hall', 'startGame')
    }
    /**
     * 显示创建房间弹层
     */
    showCreateRoomDialog() {
        this.createRoomDialog.active = true
    }
    /**
     * 隐藏创建房间弹层
     */
    hideCreateRoomDialog() {
        this.createRoomDialog.active = false
    }

    /**
     * 开始游戏
     */
    startGame(roomId) {
        start({
            roomId: roomId
        })
            .then((res) => {
                let data = res.data
                if (data.roomId) {
                    setUserRoomId(data.roomId)
                }
            })
    }
}