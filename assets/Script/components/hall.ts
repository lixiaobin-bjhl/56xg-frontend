const { ccclass } = cc._decorator

import { roomList } from '../../service/room'

@ccclass
export default class NewClass extends cc.Component {
    onLoad() {
        this.fetchRoomList()
    }
    fetchRoomList() {
        roomList()
            .then((res) => {
            })
    }
}