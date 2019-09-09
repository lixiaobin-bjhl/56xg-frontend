const { ccclass } = cc._decorator

import Utils from '../Utils'
import { start } from '../../Service/game'
import { getUser, setUserGameNumber } from '../User'
import { join } from '../../Service/room'

@ccclass
export default class HallClass extends cc.Component {
    createRoomDialog = null
    joinRoomDialog = null
    onLoad() {
        let user = getUser()
        if (!user) {
            cc.director.loadScene('login')
            return
        } else {
            cc.find('Canvas/user').getComponent(cc.Label).string = user.name
        }
        this.addComponent('AddRoom')
        // this.addComponent('JoinGameInput')
        this.bindEvent()
    }

    bindEvent() {
        console.log('hall bind event')
        this.createRoomDialog = cc.find('Canvas/createBtn/createDialog')
        this.joinRoomDialog = cc.find('Canvas/joinRoom')
        let createBtn = cc.find('Canvas/createBtn')

        Utils.addClickEvent(createBtn, this.node, 'hall', 'showCreateRoomDialog')
        this.node.on('submit-room-success', this.hideCreateRoomDialog, this)

        let startBtn = cc.find('Canvas/startBtn')
        Utils.addClickEvent(startBtn, this.node, 'hall', 'startGame')

        let joinBtn = cc.find('Canvas/joinBtn')
        Utils.addClickEvent(joinBtn, this.node, 'hall', 'joinRoom')

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
     * 加入房间
     */
    joinRoom() {
        this.joinRoomDialog.active = true
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