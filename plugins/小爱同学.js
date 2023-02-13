/**
 * 作者
 * @author 猫咪
 * @name 小爱同学
 * @description 👑插件开发demo，基础操作演示，能懂多少看悟性。
 * @version v1.1.4
 * @rule 小爱 ? ?
 * @rule ? ?小爱
 * @rule 你好 [姓名:佩奇,乔治] [good:xiao,jian]
 * @public false
 */

// module.exports = async sender => {
//     const s = sender
// }

const mod = require("./utils/mod")
console.log("mod.k:",mod.k)

let s = sender
console.log('来自平台:',s.getForm())
console.log('消息文本:', s.getMsg())
console.log('提取触发词:', s.param("姓名"))
console.log('提取触发词2:', s.param("good"))
