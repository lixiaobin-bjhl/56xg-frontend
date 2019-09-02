const { ccclass } = cc._decorator

import { deal } from '../../Service/game'

@ccclass
export default class GameClass extends cc.Component {
    onLoad() {
        deal()
            .then((res) => {
                let data = res.data
                if (data) {
                    console.log(data)
                } else {
                    cc.director.loadScene('hall')
                }
            })
    }
}