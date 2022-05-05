import {io} from "socket.io-client";

import ChatsStore from "./chatsStore"
import {API_URL} from "../http";

export default class RootStore {
    chatsStore: ChatsStore

    constructor() {
        this.chatsStore = new ChatsStore(this)
    }

    socket = io(API_URL)

}