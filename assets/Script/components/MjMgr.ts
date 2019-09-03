const { ccclass, property } = cc._decorator

import { deal } from '../../Service/game'
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
    // 游戏信息
    gameInfo
    // 坐次
    sides: ['my', 'right', 'left']
    foldPres = ['B_', 'R_', 'L_']

    async onLoad() {
        let user = getUser()
        if (!user) {
            cc.director.loadScene('login')
            return
        }
        this.initView()
        await this.fetchGameInfo()
        this.gameBegin()
    }
    fetchGameInfo() {
        return deal()
            .then((res) => {
                let data = res.data
                if (data) {
                    this.gameInfo = data
                } else {
                    cc.director.loadScene('hall')
                }
            })
    }
    initView() {
        let gameChild = this.node.getChildByName('game')
        let my = gameChild.getChildByName('my')
        let myholds = my.getChildByName('holds')
        for (let i = 0; i < myholds.children.length; ++i) {
            let sprite: cc.Sprite = myholds.children[i].getComponent(cc.Sprite)
            this.myMj.push(sprite)
            sprite.spriteFrame = null
            // this.initDragStuffs(sprite.node)
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
        for (let i = 0; i < gameInfo.room.seats.length; i++) {
            if (gameInfo.room.seats[i].userId === user.id) {
                this.myIndex = i
            }
            gameInfo.gameUsers[gameInfo.room.seats[i].userId].seatindex = i
        }
        for (let key in gameInfo.gameUsers) {
            if (this.myIndex == gameInfo.gameUsers[key].seatindex) {
                this.initMahjong()
            } else {
                this.initOtherMahjongs(gameInfo.gameUsers[key])
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
        let pre = this.getFoldPre(localIndex)
        let holds = this.sort(seat.holds)
        if (holds != null && holds.length > 0) {
            for (let i = 0; i < holds.length; ++i) {
                let idx = this.getMJIndex(side, i + num)
                let sprite = sideHolds.children[idx].getComponent(cc.Sprite)
                sprite.node.active = true
                sprite.spriteFrame = cc.vv.mahjongmgr.getSpriteFrameByMJID(pre, holds[i])
            }
        }
        console.log(localIndex, seat)
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