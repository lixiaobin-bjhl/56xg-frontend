const { ccclass, property } = cc._decorator
import Net from '../Net'

@ccclass
export default class StartClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null
    onLoad() {
        this.label.string = 'welcome 卡5星'
        setTimeout(() => {
            cc.director.loadScene('login')
        })
        Net.connect()
    }

    start() {}
    // update (dt) {}
}
