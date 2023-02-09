
import Plugin from "./plugins";


const str = `

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

`
createPlugin(str)

function createPlugin(str: string) {
    const reg = "/\\*(.|\\r\\n|\\n)*?\\*/"
    const res = str.match(reg); //没有使用g选项  
    const data = res?.[0]

    const d = data?.match(/@rule.*/g)
    const plugin = new Plugin()

    d?.forEach(element => {
        plugin.rules.push(element.replace(/@rule\s+/, "").trim())
    })

    plugin.author = getString("author", data)
    plugin.name = getString("name", data)
    plugin.description = getString("description", data)
    plugin.version = getString("version", data)
    plugin.public = getBoolean("public", data)
    console.log(plugin)
}


function getString(key: string, data: string | undefined) {
    const d = data?.match(`@${key}.*`)
    return d?.[0].replace(`@${key}`, "").trim()
}

function getBoolean(key: string, data: string | undefined) {
    return getString(key, data) == "true"
}