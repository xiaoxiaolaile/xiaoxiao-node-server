/*
 * @author yml
 * @origin yml
 * @create_at 2022-11-28 23:03:34
 * @description 广汽传祺短信登录获取token
 * @version v0.0.1
 * @title 广汽传祺-取token
 * @platform qq wx tg pgm web cron
 * @rule xiao ?
 * @priority 100
 * @public false
 * @icon https://hi.kejiwanjia.com/wp-content/uploads/2021/12/favicon.ico
 * 启用脚本
 * @disable false
 */
var newS = await s.listenS(10 * 1000) //返回一个sender对象，超时后返回null
if (newS == null) {
  s.reply("超时, 60秒内未输入验证码。")
} else {
  // s.reply(`你回复了：${newS.getContent()}`)
  let code = newS.getContent()
  console.log("code", code)
}
