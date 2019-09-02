export default class MjMgr {

    /**
     * 手牌排序
     */
    static sort(holds) {
        holds.sort(function(a, b) {
            return a - b
        })
        return holds
    }
}