/**
 * @title 老版命令
 * @origin 傻妞官方
 * @on_start true
 * @description  🌞指令如存储操作、重启、myuid和groupCode等，默认安装本插件。
 * @create_at 2033-09-12 19:14:24
 * @author 猫咪
 * @version v2.0.0
 * @public false
 * @icon https://cdn.heweather.com/img/plugin/190516/icon/c/100d.png
 */

const s = sender
var moment = require('moment');

//个人ID
s.listen([
    `myuid`,
], function (s) {
    s.reply(s.getUserId())
})

//群号
s.listen([
    `groupCode`,
], function (s) {
    s.reply(s.getChatId())
})

//昵称
s.listen([
    `name`,
], function (s) {
    s.reply(nick())
})

//时间
s.listen([
    `time`,
], async function (s) {
    s.reply(moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"))
    await sleep(3000)
    s.reply(moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"))
})

/*
休眠函数sleep
调用 await sleep(1500)
 */
async function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

// 存储管理
s.listen([
    `[存储操作:get,delete] [桶] [键]`,
    `[存储操作:set] [桶] [键] [值]`,
    `[存储操作:list,empty,lenof] [桶]`,
], function (s) {
    // if (!s.isAdmin()) {
    //     return
    // }
    // var bucket = new Bucket(s.param("桶"))
    var key = s.param("键")
    var bucket = s.param("桶")
    var value = s.param("值")
    var stact = s.param("存储操作")
    console.log(stact)
    console.log(bucket)
    console.log(key)
    console.log(value)
    
})