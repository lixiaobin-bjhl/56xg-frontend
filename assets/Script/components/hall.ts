const { ccclass } = cc._decorator

import Utils from '../Utils'

@ccclass
export default class NewClass extends cc.Component {
    createRoomDialog = null
    onLoad() {
        this.addComponent('AddRoom')
        // this.addComponent('RoomList')
        this.bindEvent()
    }
    bindEvent() {
        this.createRoomDialog = cc.find('Canvas/createBtn/createDialog')
        let createBtn = cc.find('Canvas/createBtn')

        Utils.addClickEvent(createBtn, this.node, 'hall', 'showCreateRoomDialog')
        this.node.on('submit-room-success', this.hideCreateRoomDialog, this)
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
}