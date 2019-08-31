/**
 * 用户类
 */

class User {
    id: string|number
    name: string|number
    roomId: number
    gameNum: string
    constructor(option: any) {
        this.id = option.id
        this.name = option.name
        this.roomId = option.roomId
        this.gameNum = option.gameNum
    }
}

let user = null

export function getUser() {
    return user
}

export function setUserRoomId(roomId) {
    if (user) {
        user.roomId = roomId
    }
}

export function setUser(option: Object) {
    user = new User(option)
}
