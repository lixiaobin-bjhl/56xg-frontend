const { ccclass } = cc._decorator

import { deal } from '../../Service/game'
import GameMgr from '../../classes/GameMgr'

@ccclass
export default class GameClass extends cc.Component {
    gameMgr: null
    onLoad() {
        deal()
            .then((res) => {
                let data = res.data
                if (data) {
                    let gameMgr: GameMgr = new GameMgr({
                        gameInfo: data
                    })
                    this.gameMgr = gameMgr
                    gameMgr.initMyMahjongs()
                } else {
                    cc.director.loadScene('hall')
                }
            })
    }
}