const { ccclass, property } = cc._decorator

@ccclass
export default class StartClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null
    onLoad() {
        this.label.string = 'welcome 卡5星'
        setTimeout(() => {
            cc.director.loadScene('login')
        }, 2000)
    }

    start() {}
    // update (dt) {}
}
