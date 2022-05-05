import {UserInfo} from "./UserInfo";

export interface Chat {
    userInfo: UserInfo
    messages: {
        username: string
        text: string
    }[]
}