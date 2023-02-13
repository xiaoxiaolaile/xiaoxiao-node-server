
import TelegramBot from 'node-telegram-bot-api'
import Sender from "../src/sender";
import {handleMessage} from "../src/plugins";

class Message {
    chat!: Chat
    from!: From
    text: string = ""

}

class From {
    id!: number 
}

class Chat {
    id!: number 
}

function tgBot() {
    const botToken = "5874251047:AAFQ_tSdxbAERFFuK_USBzD_tRAXEegdlV0"

    const bot = new TelegramBot(botToken, { polling: true })

    bot.on('message', async (msg: Message | unknown) => {
        //接受所有消息回调函数
        //chatId = msg.chat.chatId
        const sender = new Sender("tg")
        if (typeof (msg) == "object") {
            const  m = msg as Message
            sender.chatId = m.chat.id
            sender.userId = m.from.id
            sender.message = m.text
            handleMessage(sender)
        }
    })

    console.log("开启测试tg")
}

export default tgBot