/**
 * @title Telegram Bot
 * @origin 傻妞官方
 * @on_start true
 * @create_at 2022-11-30 22:47:06
 * @description 🍉 仅作学术探讨，开发文档 https://core.telegram.org/bots/api
 * @author 猫咪
 * @version v1.1.6
 * @public false
 * @icon https://core.telegram.org/img/website_icon.svg?4
 * @disable false
 */

const tg = new Bucket("tg")
const tgbot = new Sender("tg")
const cq = require("CQ码")
let token = tg.get("token")// 🧧设置Tgbot token指令：set tg token ?
let url = tg.get("url", "https://api.telegram.org")// 🧧设置代理地址指令：set tg url ? 默认直连官方服务器


tg.watch("token", function (old, now, key) {
    token = now
})

tg.watch("url", function (old, now, key) {
    url = now
})

const addr = function () {
    return `${url}/bot${token}`
}

// tgbot.recall(function (message_id) {
//     return
// if (!message_id) {
//     return
// }
// let kv = message_id.split(".")
// if (kv.length != 2) {
//     return
// }
// let [k, v] = kv
// request({//
//     url: `${addr()}/deleteMessage`,
//     method: "post",
//     goroutine: true,
//     body: {
//         k,
//         v,
//     },
//     json: true,
// })
// })

sender.listen(["ttest ?"], function (s) {
    console.log(running)
    s.recallMessage(s.getMessageId())
})

tgbot.send(function (msg) {
    console.log("msg => " + JSON.stringify(msg))
    let [a, reply_to_message_id] = msg.message_id.split(".")
    let body = {}
    let items = cq.toItems(msg.content)
    let contents = []
    let images = []
    let videos = []
    let chat_id = msg.chat_id ? msg.chat_id : msg.user_id
    for (let item of items) {
        if (item.type == "text") {
            contents.push(item.value)
        }
        if (item.type == "image") {
            images.push(item.value)
        }
        if (item.type == "video") {
            videos.push(item.value)
        }
    }
    // console.log(JSON.stringify({contents, images, videos}))
    let options = undefined
    if (images.length) {
        options = {
            url: `${addr()}/sendPhoto`,
            method: "post",
            body: {
                reply_to_message_id,
                photo: images[0],
                chat_id,
                caption: contents.join("\n"),
            },
            json: true,
        }
    } else if (videos.length) {
        options = {
            url: `${addr()}/sendvideo`,
            method: "post",
            body: {
                reply_to_message_id,
                video: videos[0],
                chat_id,
                caption: contents.join("\n"),
            },
            json: true,
        }

    } else if (contents.length) {
        options = {
            url: `${addr()}/sendMessage`,
            method: "post",
            body: {
                reply_to_message_id,
                chat_id,
                text: contents.join("\n"),
            },
            json: true,
        }
    }
    if (options) {
        options["goroutine"] = true //此行代码将会导致无法使用撤回等功能，境外机器可以将这行代码注释
        options["proxyUrl"] = "http://172.16.8.131:1087"
        let resp = request(options)
        if (resp && resp.body) {
            console.log(JSON.stringify(resp.body))
            if (resp.body["ok"]) {
                return chat_id + "." + resp.body["result"]["message_id"]
            }
            if (resp.body["ok"] == false) {
                console.log("Tgbot消息发送失败，" + body["description"])
            }
        }

    }
})

tgbot.request(running, {
    url: function () {
        if (token == "") {
            time.sleep(2000)
            console.log("未设置Tgbot token")
            return "http://127.0.0.1:8080/admin"
        }
        let offset = tg.get("offset")
        return `${addr()}/getUpdates?allowed_updates=${encodeURIComponent(`["message"]`)}&offset=${offset}&timeout=8`
    },
    json: true,
    timeout: 10000,
    proxyUrl: "http://172.16.8.131:1087",
}, function (error, rsp) {
    const { body, status } = rsp
    let offset = tg.get("offset")
    if (error) {
        console.log(error)
    }
    // console.log("status = " + status)
    // console.log(JSON.stringify(body))
    if (status != 200) {//
        
    }
    if (body && body["result"] && body["result"].length) {
        for (let record of body["result"]) {
            if (record.update_id >= offset) {
                offset = record.update_id + 1
                tg.set("offset", offset)
            }
            let data = {
                message_id: record.message.chat.id + "." + record.message.message_id,
                user_name: record.message.from.username,
                user_id: record.message.from.id,
                chat_id: record.message.chat.type != "private" ? record.message.chat.id : 0,
                content: record.message.text,
            }
            tgbot.receive(data)
        }
    } else if (body && body.error_code == 409) {//
        console.log("Tgbot在多处运行，如果持续出现此报错，请更换token")
    } else if (body && body["description"]) {
        console.log("Tgbot错误：%s", body["description"])
    }
})



