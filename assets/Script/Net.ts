
const io = require('socket.io-client')

export default class NetCtrl extends cc.Component {
    static socket: Object
    static connect() {
        this.socket = io('http://127.0.0.1:7001', {
            query: {
                name: 'xiaobin'
            },
            transports: ['websocket']
        })
        this.socket.on('connect', () => {
            console.log('socket connect')
        }
    }
}