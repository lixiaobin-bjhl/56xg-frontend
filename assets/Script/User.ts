/**
 * 用户类
 */

class User {
    id: string|number
    name: string|number
    roomId: number
    gameNumber: string
    constructor(option: any) {
        this.id = option.id
        this.name = option.name
        this.roomId = option.roomId
        this.gameNumber = option.gameNumber
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

export function setUserGameNumber(number) {
    if (user) {
        user.gameNumber = number
    }
}

export function setUser(option: Object) {
    user = new User(option)
}
