const { ccclass } = cc._decorator

import { roomList } from '../../service/room'

@ccclass
export default class RoomList extends cc.Component {
    content = null
    roomItemTemp = null
    onLoad() {
        let viewlist = cc.find('Canvas/roomList')
        this.content = cc.find('view/content', viewlist)
        this.roomItemTemp = this.content.children[0]
        this.fetchRoomList()
    }
    /**
     * 获取room列表
     */
    fetchRoomList() {
        roomList()
            .then((res) => {
                this.handelFetchRoomList(res.data)
            })
    }
    /**
     * 处理房间列表请求
     */
    handelFetchRoomList(list) {
        let index = 0
        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                let node = this.getRoomItem(index)
                let room = list[key]
                index++
                node.getChildByName('name').getComponent(cc.Label).string = room.name
                node.getChildByName('btn').rid = room.id
                node.getChildByName('seat1').getComponent(cc.Label).string = room.seats[0].userId || '空座'
                node.getChildByName('seat2').getComponent(cc.Label).string = room.seats[1].userId || '空座'
                node.getChildByName('seat3').getComponent(cc.Label).string = room.seats[2].userId || '空座'
            }
        }
    }
    getRoomItem(index) {
        let content = this.content
        if (content.childrenCount > index) {
            return content.children[index]
        }
        let node = cc.instantiate(this.roomItemTemp)
        content.addChild(node)
        return node
    }
    /**
     * 选择房间
     */
    selectRoom(event) {
        console.log(event.currentTarget.rid)
    }
}