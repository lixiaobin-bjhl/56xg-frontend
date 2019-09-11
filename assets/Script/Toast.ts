import { ToastObject } from './ToastObject'

export class Duration {
    static LONG_LARGE = 4
    static LONG = 2
    static SHORT = 1.2
}
export enum Position {
    CENTER = 0,
    TOP = 1,
    TOP_LEFT = 2,
    LEFT = 3,
    BOTTOM_LEFT = 4,
    BOTTOM = 5,
    BOTTOM_RIGHT = 6,
    RIGHT = 7,
    TOP_RIGHT = 8
}

export class Toast {

    private static toastObj: ToastObject = null

    /**
     *
     * @param text text you want to show
     * @param duration how long will the text be shown in seconds.you can use Duration.LONG or such predefined times.
     * you can also use a positive number as you like.
     * @param pos the position to show text,default is bottom.
     */
    static ShowText(text: string, duration?: number, pos?: Position): void {
        Toast.makeText(text, duration, pos)
    }

    private static makeText(text: string, duration?: number, pos?: Position): void {
        this.toastObj = new ToastObject(text, duration)
        this.toastObj.setPosition(pos, 0, 0)// 可以自定义Toast的位置
        this.toastObj.show()
    }
}