import {AxiosResponse} from "axios";
import {Chat} from "../models/Chat";
import {$chats_api} from "../http";

export default class ChatsService {
    static async getAllChats(): Promise<AxiosResponse<Chat[]>> {
        return $chats_api.get<Chat[]>('')
    }
    static async getCurrentChat(email: string): Promise<AxiosResponse<Chat | undefined>> {
        return $chats_api.post<Chat | undefined>('/current', {email})
    }
}