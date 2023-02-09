/**
 * 作者
 * @author 猫咪
 * @name 小爱同学
 * @description 👑插件开发demo，基础操作演示，能懂多少看悟性。
 * @version v1.1.4
 * @rule 小爱?
 * @rule ?小爱
 * @public false
 */

// module.exports = async sender => {
//     const s = sender
// }

const mod = require("./utils/mod")
console.log("mod.k:",mod.k)


let s = sender
console.log(s)
console.log('来自平台:',s.getForm())
// console.log('消息文本:', s.getMsg())

let test = new Sender("test")
console.log(test)