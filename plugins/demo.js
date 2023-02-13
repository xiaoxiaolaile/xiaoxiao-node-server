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
], function (s) {
    s.reply(moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss"))
})



