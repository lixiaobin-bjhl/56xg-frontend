import { Toast, Duration, Position } from './Toast'

export class ToastObject {
    text: string
    duration: number = null
    position: Position = null
    x = 0
    y = 0

    private bgSpriteFrame: cc.SpriteFrame = null


    constructor(_text: string, _duration: number) {
        this.text = _text
        this.duration = _duration
    }

    setPosition(pos: Position, _x: number, _y: number): void {
        if (pos == null || pos == undefined) {
            pos = Position.BOTTOM
        }
        this.position = pos
        this.x = _x
        this.y = _y
    }

    show(): void {
        // 加载背景纹理
        if (this.bgSpriteFrame == null) {
            this.loadBg()
            return
        }
        let canvas = cc.director.getScene().getComponentInChildren(cc.Canvas)
        let width = canvas.node.width
        let height = canvas.node.height
        // 默认使用短时间提示
        if (this.duration == null || this.duration == undefined) {
            this.duration = Duration.SHORT
        }

        // 背景图片设置
        let bgNode = new cc.Node()
        bgNode.opacity = 200// 设置背景图片透明度
        let bgSprite = bgNode.addComponent(cc.Sprite)
        bgSprite.type = cc.Sprite.Type.SLICED
        let bgLayout = bgNode.addComponent(cc.Layout)
        bgLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER

        // Label文字设置
        let textNode = new cc.Node()
        let textLabel = textNode.addComponent(cc.Label)
        textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER
        textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER
        textLabel.fontSize = 24
        textLabel.string = this.text

        // 背景图片和文本内容间距
        let hPadding = textLabel.fontSize / 8
        let vPadding = 2
        bgLayout.paddingLeft = hPadding
        bgLayout.paddingRight = hPadding
        bgLayout.paddingTop = vPadding
        bgLayout.paddingBottom = vPadding

        // 文本过长时，设置为自动换行
        if (this.text.length * textLabel.fontSize > width / 3) {
            textNode.width = width / 3
            textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT
        }

        bgNode.addChild(textNode)

        if (this.bgSpriteFrame) {
            bgSprite.spriteFrame = this.bgSpriteFrame
        }

        // 根据gravity设置Toast显示位置
        if (this.position == Position.CENTER) {
            textNode.y = 0
            textNode.x = 0
        } else if (this.position == Position.TOP) {
            textNode.y = textNode.y + (height / 5) * 2
        } else if (this.position == Position.TOP_LEFT) {
            textNode.y = textNode.y + (height / 5) * 2
            textNode.x = textNode.x + (width / 5)
        } else if (this.position == Position.LEFT) {
            textNode.x = textNode.x + (width / 5)
        } else if (this.position == Position.BOTTOM_LEFT) {
            textNode.y = textNode.y - (height / 5) * 2
            textNode.x = textNode.x + (width / 5)
        } else if (this.position == Position.BOTTOM) {
            textNode.y = textNode.y - (height / 5) * 2
        } else if (this.position == Position.BOTTOM_RIGHT) {
            textNode.y = textNode.y - (height / 5) * 2
            textNode.x = textNode.x - (width / 5)
        } else if (this.position == Position.RIGHT) {
            textNode.x = textNode.x - (width / 5)
        } else if (this.position == Position.TOP_RIGHT) {
            textNode.y = textNode.y + (height / 5) * 2
            textNode.x = textNode.x - (width / 5)
        } else {
            // 默认情况 BOTTOM
            textNode.y = textNode.y - (height / 5) * 2
        }
        textNode.x = textNode.x + this.x
        textNode.y = textNode.y + this.y

        canvas.node.addChild(bgNode)

        let finished = cc.callFunc((target) => {
            bgNode.destroy()
        }, this)
        let action = cc.sequence(cc.moveBy(this.duration, cc.v2(0, 0)), cc.fadeOut(0.3), finished)
        bgNode.runAction(action)

    }

    private loadBg(): void {
        cc.loader.load(
            { 'uuid': 'b43ff3c2-02bb-4874-81f7-f2dea6970f18' },
            function (error, result) {
                if (error) {
                    console.error('error:' + error)
                    return
                }
                this.bgSpriteFrame = new cc.SpriteFrame(result)
                this.bgSpriteFrame.insetTop = 3
                this.bgSpriteFrame.insetBottom = 3
                this.bgSpriteFrame.insetLeft = 4
                this.bgSpriteFrame.insetRight = 4
                // 加载完成再调用
                this.show()
            }.bind(this)
        )
    }
}