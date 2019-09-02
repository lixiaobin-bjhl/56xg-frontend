
import MJMgr from '../classes/MJMgr'
import { getUser } from '../User'

export default class GameMgr {
    gameInfo

    constructor(option) {
        this.gameInfo = option.gameInfo
    }
    onGameBeign() {
        console.log('onGameBegin')
    }
    /**
     * 初始化我的手牌
     */
    initMyMahjongs() {
        let gameInfo = this.gameInfo
        let user = getUser()
        let my = gameInfo.gameUsers[user.id]
        let holds = this.sortHolds(my)
        console.log('holds', holds)
    }
    sortHolds(seat) {
        let holds = seat.holds
        if (holds == null) {
            return null
        }
        return MJMgr.sort(holds)
    }
}