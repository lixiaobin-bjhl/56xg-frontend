const { ccclass } = cc._decorator
import Utils from '../Utils'
import { add } from  '../../Service/room'

@ccclass
export default class AddRoom extends cc.Component {
    name = ''
    onLoad() {
        this.bindEvent()
    }

    bindEvent() {
        let createRoomNameInputer =  cc.find('Canvas/createBtn/createDialog/createRoomNameInputer')
        createRoomNameInputer.on('text-changed', this.handleRoomNameChange, this)

        let submitBtn  = cc.find('Canvas/createBtn/createDialog/submit')
        Utils.addClickEvent(submitBtn, this.node, 'AddRoom', 'handleSubmitRoom')
    }

    /**
     *  输入房间名称
     */
    handleRoomNameChange(inputer) {
        this.name = inputer.string
    }

    /**
     *  提交创建新房间
     */
    handleSubmitRoom() {
        add({
            name: this.name
        })
            .then((res) => {
                this.node.emit('submit-room-success')
            })
    }
}