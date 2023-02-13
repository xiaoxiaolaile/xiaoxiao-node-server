import fs from "fs"
import Sender from "./sender"
import Logger from "./logger"
import { NodeVM, VMScript } from 'vm2'


const vm = new NodeVM({
    require: {
        external: true, 
        root: './'
    }
});

export default class Plugin {
    // * @author 猫咪
    // * @name 小爱同学
    // * @description 👑插件开发demo，基础操作演示，能懂多少看悟性。
    // * @version v1.1.4
    // * @rule 小爱?
    // * @rule ?小爱
    // * @public false
    author!: string | undefined
    name!: string | undefined
    description!: string | undefined
    version!: string | undefined
    rules: string[] = []
    public!: boolean | undefined
    script!: any
    disable: boolean = false
    handle!: (s: Sender) => void
    on_start :boolean = false
}

// NewPlugin 新建一个插件
export function newPlugin(plugin: Plugin) {
    plugins.push(plugin)
	addCommand(plugin)
}

function addCommand(plugin: Plugin) {
    if (plugin.disable) {
        return
    }

    addRules(plugin) 
}

export function handleMessage(s: Sender) {
    // console.log(s)
    const message = s.getMsg() as string
    Logger.info(`来自 ${s.form} 收到消息：${message}`)
    plugins.forEach(value => {
        value.rules.forEach(rule => {
            const r = customRule(rule)
            // console.log(rule)
            // console.log(r)  
            const regExp = new RegExp(r, "g")  
            // console.log(regExp.exec(message))
            const arr = regExp.exec(message)
            if (arr){ 
                Logger.info(`匹配到规则：${rule}`)
                s.ruleContent = rule
                Logger.info(`匹配到规则-修改：${r}`) 
                // console.log(arr)
                s.matches = arr
                value.handle(s)
            } 
        })
    })
 
}

let plugins: Plugin[] = []

export function loadPlugins() {
    plugins = []
    let pluginsArr = fs.readdirSync('plugins')
    pluginsArr = pluginsArr.filter((word: string) => word.indexOf(".js") > -1);
    console.log('加载插件：', pluginsArr)
    initPlugins(pluginsArr) 
}

function initPlugins(files: string[]) {
    files.forEach(element => {
        const pathName = `plugins/${element}`
        const stat = fs.lstatSync(pathName)
        if (stat.isFile()) {
            const plugin = createPlugin(pathName)
            plugins.push(plugin)
            addCommand(plugin) 

            if (plugin.on_start){
                //执行 服务 
                // plugin.handle()
                const sender = new Sender("WebServer")
                sender.chatId = 0
                sender.userId = 0
                runMessage(sender, plugin.script)  
            }
        }
    })
} 

function createPlugin(pathName: string) {
    const str = fs.readFileSync(pathName, "utf8")
    const script = new VMScript(str, { filename: pathName })
    const reg = "/\\*(.|\\r\\n|\\n)*?\\*/"
    const res = str.match(reg); //没有使用g选项  
    const data = res?.[0]

    const d = data?.match(/@rule.*/g)
    const plugin = new Plugin()

    d?.forEach((element: string) => {
        plugin.rules.push(element.replace(/@rule\s+/, "").trim())
    })

    plugin.author = getString("author", data)
    plugin.name = getString("name", data)
    plugin.description = getString("description", data)
    plugin.version = getString("version", data)
    plugin.public = getBoolean("public", data)
    plugin.on_start = getBoolean("on_start", data)
    plugin.script = script
    // console.log(plugin)
    return plugin
}


function getString(key: string, data: string | undefined) {
    const d = data?.match(`@${key}.*`)
    return d?.[0].replace(`@${key}`, "").trim()
}

function getBoolean(key: string, data: string | undefined) {
    return getString(key, data) == "true"
}


function runMessage(sender: Sender, script: any) {
    vm.freeze(sender, 's');
    vm.freeze(sender, 'sender');
    vm.freeze(Sender, 'Sender');
    vm.run(script)
}

function addRules(plugin: Plugin) {
    if (plugin.rules) {
        plugin.rules.forEach((rule, index) => {
            rule = rule.trim()
            rule = rule.replace(/^\?/, "()?")
            rule = rule.replaceAll(" ", "\\s+")
            rule = rule.replaceAll("?", "[.*]")
            rule = `^${rule}$`
            plugin.rules[index] = rule
        })
    }
    if (!plugin.handle) { 
        plugin.handle = (s: Sender) => {
            runMessage(s, plugin.script)
        }
    }

}
function customRule(rule: string) {
    rule = rule.replaceAll("^", "")
    rule = rule.replaceAll("$", "")
    const arr = rule.split("\\s+")

    // Logger.info(rule)
    // Logger.info(arr)
    const myArr: string[]  = []
    arr.forEach(s => {
        let str = ""
        // let reg = ""
        if (s.indexOf(":") > -1) {
            str = s.replace(/\[.*:/,"(")
            str = str.replace("]",")")
            str = str.replace(",","|")
            // str = `(${str})`
        }else {
            const regExp = new RegExp("\\[.*\\]", "g")  
            // console.log("【内容】", s)
            if (s.match(regExp) != null){
                str = s.replaceAll(regExp,"(.*)")
            }else {
                str = "(" + s + ")"
            }
        }
        myArr.push(str)
    })
    // Logger.info(myArr) 
    return "^" + myArr.join("\\s+") + "$"  
}

