import { makeAutoObservable } from 'mobx'

import RootStore from "./store";
import {UserInfo} from "../models/UserInfo";
import {Chat} from "../models/Chat";
import {Message} from "../models/Message";
import ChatsService from "../services/chatsService";

export default class ChatsStore {
    root: RootStore

    constructor(root: RootStore) {
        this.root = root
        makeAutoObservable(this)
    }

    userInfo?: UserInfo
    allChats?: Chat[]
    showedChat?: Chat

    joinModer(email: string) {
        this.root.socket.emit("joinModer", {email})
    }
    joinClient() {
        this.root.socket.emit("joinClient", {userInfo: this.userInfo})
    }
    chatModer(text: string) {
        this.root.socket.emit("chatModer", {text})
    }
    chatClient(text: string) {
        this.root.socket.emit("chatClient", {text})
    }
    getData() {
        this.root.socket.on("message", (message: Message) => {
            this.showedChat?.messages.push(message)
        })
        this.root.socket.on("newChat", (chat: Chat) => {
            this.allChats?.push(chat)
            if (this.userInfo !== undefined) {
                this.showedChat = chat
            }
        })
    }
    async getAllChats() {
        try {
            await ChatsService.getAllChats()
                .then(response => {
                    this.allChats = response.data
                })
        } catch (e) {
            console.log("Ошибка при получении всех чатов")
        }
    }
    async getCurrentChat(email: string) {
        try {
            await ChatsService.getCurrentChat(email)
                .then(response => {
                    this.showedChat = response.data
                })
        } catch (e) {
            console.log("Ошибка при получении всех чатов")
        }
    }

}