
const { ccclass, property } = cc._decorator
import Net from '../Net'
import { getUser, setUserRoomId } from '../User'
import { join } from '../../Service/room'

@ccclass
export default class JoinGameInput extends cc.Component {
    @property([cc.Label])
    nums = []
    inputIndex = 0
    onLoad() {
        let user = getUser()
        if (user) {
            this.onResetClicked()
        }
    }
    onInput(num) {
        if (this.inputIndex >= this.nums.length) {
            return
        }
        this.nums[this.inputIndex].string = num
        this.inputIndex += 1
        if (this.inputIndex == this.nums.length) {
            let roomId = this.parseRoomId()
            this.onInputFinished(roomId)
        }
    }
    onInputFinished(roomId) {
        join({
            roomId
        })
            .then((res) => {
                let self = this
                setUserRoomId(roomId)
                Net.socket.emit('join-room', {
                    roomId: roomId
                }, function() {
                    cc.director.loadScene('groom')
                    self.onCloseClicked()
                })
            })
    }
    parseRoomId() {
        let str = ''
        for (let i = 0; i < this.nums.length; ++i) {
            str += this.nums[i].string
        }
        return str
    }
    onN0Clicked() {
        this.onInput(0)
    }
    onN1Clicked() {
        this.onInput(1)
    }
    onN2Clicked() {
        this.onInput(2)
    }
    onN3Clicked() {
        this.onInput(3)
    }
    onN4Clicked() {
        this.onInput(4)
    }
    onN5Clicked() {
        this.onInput(5)
    }
    onN6Clicked() {
        this.onInput(6)
    }
    onN7Clicked() {
        this.onInput(7)
    }
    onN8Clicked() {
        this.onInput(8)
    }
    onN9Clicked() {
        this.onInput(9)
    }
    onResetClicked() {
        for (let i = 0; i < this.nums.length; ++i) {
            this.nums[i].string = ''
        }
        this.inputIndex = 0
    }
    onDelClicked() {
        if (this.inputIndex > 0) {
            this.inputIndex -= 1
            this.nums[this.inputIndex].string = ''
        }
    }
    onCloseClicked() {
        this.node.active = false
    }
}