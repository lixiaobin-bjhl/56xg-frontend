const { ccclass, property } = cc._decorator

import { deal } from '../../Service/game'
import { detail } from '../../Service/room'
import { getUser } from '../User'

@ccclass
export default class MjMgr extends cc.Component {
    @property(cc.SpriteAtlas)
    leftAtlas: cc.SpriteAtlas = null

    @property(cc.SpriteAtlas)
    rightAtlas: cc.SpriteAtlas = null

    @property(cc.SpriteAtlas)
    bottomAtlas: cc.SpriteAtlas = null

    @property(cc.SpriteAtlas)
    myAtlas: cc.SpriteAtlas = null
    // 我的手牌
    myMj: Array<cc.Sprite> = []
    // 我在房间的第几个位置
    myIndex
    // 麻将的图片
    mahjongSprites
    // 房间信息
    room
    // 游戏信息
    gameInfo
    // 当前出牌人
    turn = 0
    // 当前出的牌
    chupai
    // 选中的麻将
    selectedMJ = null
    // 坐次
    sides = ['my', 'right', 'left']
    foldPres = ['B_', 'R_', 'L_']

    async onLoad() {
        let user = getUser()
        if (!user) {
            cc.director.loadScene('login')
            return
        }
        this.initView()
        this.initMahjong()
        await this.dealPai()
        this.gameBegin()
    }
    async dealPai() {
        return deal()
            .then((res) => {
                let data = res.data
                if (data) {
                    this.room = data
                    this.gameInfo = data.game
                } else {
                    cc.director.loadScene('hall')
                }
            })
    }
    async fetchRoomDetail() {
        let user = getUser()
        let roomId = user.roomId
        return detail({
            roomId
        })
            .then((res) => {
                let data =  res.data
                this.room = data
                this.gameInfo = data.game
            })
    }
    initView() {
        let gameChild = this.node.getChildByName('game')
        let my = gameChild.getChildByName('my')
        let myholds = my.getChildByName('holds')
        this.chupai = gameChild.getChildByName('chupai')
        this.chupai.active = false
        for (let i = 0; i < myholds.children.length; ++i) {
            let sprite: cc.Sprite = myholds.children[i].getComponent(cc.Sprite)
            this.myMj.push(sprite)
            sprite.spriteFrame = null
            this.bindMyHoldsEvent(sprite.node)
        }
    }
    initMahjong() {
        let mahjongSprites = []
        // 筒
        for (let i = 1; i < 10; ++i) {
            mahjongSprites.push('dot_' + i)
        }

        // 条
        for (let i = 1; i < 10; ++i) {
            mahjongSprites.push('bamboo_' + i)
        }

        // 中、发、白
        mahjongSprites.push('red')
        mahjongSprites.push('green')
        mahjongSprites.push('white')
        this.mahjongSprites = mahjongSprites
    }
    /**
     * 开始游戏
     */
    gameBegin() {
        let gameInfo = this.gameInfo
        let user = getUser()
        // 找到自己坐位和其它玩家的坐位号
        for (let i = 0; i < this.room.seats.length; i++) {
            if (this.room.seats[i].userId === user.id) {
                this.myIndex = i
            }
            gameInfo.gameUsers[this.room.seats[i].userId].seatindex = i
        }
        for (let key in gameInfo.gameUsers) {
            // 把自己的手牌展示出来
            if (this.myIndex == gameInfo.gameUsers[key].seatindex) {
                this.initMyMahjongs()
            } else {
                // this.initOtherMahjongs(gameInfo.gameUsers[key])
            }
        }
    }
    /**
     * 绑定我的手牌事件
     */
    bindMyHoldsEvent(node) {
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('cc.Node.EventType.TOUCH_START')
            // 轮到我自己出牌时，才响应
            if (this.turn != this.myIndex) {
                return
            }
            node.interactable = node.getComponent(cc.Button).interactable
            if (!node.interactable) {
                return
            }
            node.opacity = 255
            this.chupai.active = false
            this.chupai.getComponent(cc.Sprite).spriteFrame = node.getComponent(cc.Sprite).spriteFrame
            this.chupai.x = event.getLocationX() - this.node.width / 2
            this.chupai.y = event.getLocationY() - this.node.height / 2
        }.bind(this))

        node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            console.log('cc.Node.EventType.TOUCH_MOVE')
            if (this.turn != this.myIndex) {
                return
            }
            if (!node.interactable) {
                return
            }
            if (Math.abs(event.getDeltaX()) + Math.abs(event.getDeltaY()) < 0.5) {
                return
            }
            this.chupai.active = true
            node.opacity = 150
            this.chupai.opacity = 255
            this.chupai.scaleX = 1
            this.chupai.scaleY = 1
            // this.chupai.x = event.getLocationX() - this.width / 2
            // this.chupai.y = event.getLocationY() - this.height / 2
            node.y = 0
        }.bind(this))

        node.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (this.turn != this.myIndex) {
                return
            }
            if (!node.interactable) {
                return
            }
            console.log('cc.Node.EventType.TOUCH_END')
            this.chupai.active = false
            node.opacity = 255
            if (event.getLocationY() >= 200) {
                this.shoot(node.mjId)
            }
        }.bind(this))

        node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            if (this.turn != this.myIndex) {
                return
            }
            if (!node.interactable) {
                return
            }
            console.log('cc.Node.EventType.TOUCH_CANCEL')
            this.chupai.active = false
            node.opacity = 255
            if (event.getLocationY() >= 200) {
                this.shoot(node.mjId)
            } else if (event.getLocationY() >= 150) {
                // this._huadongtishi.active = true;
                // this._huadongtishi.getComponent(cc.Animation).play('huadongtishi');
            }
        }.bind(this))
    }

    // 出牌
    shoot(mjId) {
        if (mjId == null) {
            return
        }
        console.log('shoot')
    }
    onMJClicked(event) {
        if (this.turn != this.myIndex) {
            return
        }
        for (let i = 0; i < this.myMj.length; ++i) {
            if (event.target == this.myMj[i].node) {
                // 如果是再次点击，则出牌
                if (event.target == this.selectedMJ) {
                    this.shoot(this.selectedMJ.mjId)
                    this.selectedMJ.y = 0
                    this.selectedMJ = null
                    return
                }
                if (this.selectedMJ != null) {
                    this.selectedMJ.y = 0
                }
                event.target.y = 15
                this.selectedMJ = event.target
                return
            }
        }
    }
    /**
     * 初始化我的手牌
     */
    initMyMahjongs() {
        let gameInfo = this.gameInfo
        let user = getUser()
        let my = gameInfo.gameUsers[user.id]
        let holds = this.sort(my.holds)
        for (let i = 0; i < holds.length; ++i) {
            let mjid = holds[i]
            let sprite = this.myMj[i]
            sprite.node.mjId = mjid
            sprite.node.y = 0
            this.setSpriteFrameByMJId('M_', sprite, mjid)
        }
    }
    initOtherMahjongs(seat) {
        let localIndex = this.getLocalIndex(seat.seatindex)
        if (localIndex == 0) {
            return
        }
        let side = this.getSide(localIndex)
        let game = this.node.getChildByName('game')
        let sideRoot = game.getChildByName(side)
        let sideHolds = sideRoot.getChildByName('holds')
        let pre = this.getFoldPre(localIndex)
        let holds = this.sort(seat.holds)

        if (holds != null && holds.length > 0) {
            for (let i = 0; i < holds.length; ++i) {
                let sprite = sideHolds.children[i].getComponent(cc.Sprite)
                sprite.node.active = true
                sprite.spriteFrame = this.getSpriteFrameByMJId(pre, holds[i])
            }
        }
    }
    getSide(localIndex) {
        return this.sides[localIndex]
    }

    getFoldPre(localIndex) {
        return this.foldPres[localIndex]
    }
    getLocalIndex(index) {
        // 自已做第0位
        let ret = (index - this.myIndex + 3) % 3
        return ret
    }
    setSpriteFrameByMJId(pre, sprite, mjid) {
        sprite.spriteFrame = this.getSpriteFrameByMJId(pre, mjid)
        sprite.node.active = true
    }
    getMJIndex(side, index) {
        if (side == 'right' || side == 'up') {
            return 13 - index
        }
        return index
    }
    /**
     * 手牌排序
     */
    sort(holds) {
        holds.sort(function(a, b) {
            return a - b
        })
        return holds
    }
    getMahjongSpriteById(id) {
        return this.mahjongSprites[id]
    }
    getSpriteFrameByMJId(pre, mjid) {
        let spriteFrameName = this.getMahjongSpriteById(mjid)
        spriteFrameName = pre + spriteFrameName
        if (pre == 'M_') {
            return this.myAtlas.getSpriteFrame(spriteFrameName)
        }
        else if (pre == 'B_') {
            return this.bottomAtlas.getSpriteFrame(spriteFrameName)
        }
        else if (pre == 'L_') {
            return this.leftAtlas.getSpriteFrame(spriteFrameName)
        }
        else if (pre == 'R_') {
            return this.rightAtlas.getSpriteFrame(spriteFrameName)
        }
    }
}