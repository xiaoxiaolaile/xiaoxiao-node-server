
import TelegramBot from 'node-telegram-bot-api'
import Sender from "../src/sender";
import { handleMessage } from "../src/plugins";

class Message {
    chat!: Chat
    from!: From
    text: string = ""
    message_id!: number

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
    class TgSender extends Sender {

        reply_to_message_id!: number

        reply(...args: any[]): void {
            super.reply(...args)
            args.forEach(v => {
                bot.sendMessage(this.chatId, v, {reply_to_message_id: this.reply_to_message_id});
            })
        }

    }
    bot.on('message', async (msg: Message | unknown) => {
        //接受所有消息回调函数
        //chatId = msg.chat.chatId
        const sender = new TgSender("tg")
        if (typeof (msg) == "object") {
            const m = msg as Message
            sender.reply_to_message_id = m.message_id
            sender.chatId = m.chat.id
            sender.userId = m.from.id
            sender.message = m.text
            handleMessage(sender)
        }
    })

    console.log("开启测试tg")

}

export default tgBot