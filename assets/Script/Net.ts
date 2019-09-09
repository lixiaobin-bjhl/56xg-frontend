
const io = require('socket.io-client')

import { getUser } from './User'

export default class NetCtrl extends cc.Component {
    static socket: Object
    static connect() {
        let user = getUser()
        this.socket = io('http://127.0.0.1:7001', {
            query: {
                uid: user.id
            },
            transports: ['websocket']
        })

        this.socket.on('connect', () => {
            console.log('socket connected')
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect')
        })

        this.socket.on('error', function () {
            console.error('socket connect error')
        })

        this.socket.on('ping', () => {
            console.log('ping')
            this.socket.emit('heartbeat')
        })
    }
}