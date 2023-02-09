// import Koa from 'koa'

// const app = new Koa()
// const msg: string = 'Hello World -- 22'

// app.use(async (ctx: Koa.Context): Promise<void> => {
//   ctx.body = msg
// })

// app.listen(7070)

import fs from "fs"
import Sender from "./sender"
import { NodeVM,VMScript } from 'vm2'
import Plugin from "./plugins";
let plugins: Plugin[] = []

const vm = new NodeVM({
    require: {
        external: true,
        root: './'
    }
});
console.log('>>> 小小启动成功')
console.log('> 正在初始化......')
loadPlugins()

console.log('> 初始化成功......')

// console.log(plugins)

const tgSender = new Sender("tg")
runMessage(tgSender, plugins[1].script)

function loadPlugins(){
	plugins = []
	let pluginsArr = fs.readdirSync('plugins')
	pluginsArr = pluginsArr.filter((word:string) => word.indexOf(".js") > -1);
	console.log('加载插件：', pluginsArr)
	initPlugins(pluginsArr)
} 

function initPlugins(files : string[]){
	files.forEach(element => {
		const pathName = `plugins/${element}`
		const stat = fs.lstatSync(pathName)
		if (stat.isFile()){
			plugins.push(createPlugin(pathName))
		}
	})
}


function runMessage(sender:any, script:any){
	vm.freeze(sender, 'sender');
	vm.freeze(Sender, 'Sender');
	vm.run(script)  
}


function createPlugin(pathName :string) {
	const str = fs.readFileSync(pathName, "utf8")
	const script = new VMScript(str, {filename: pathName})
    const reg = "/\\*(.|\\r\\n|\\n)*?\\*/"
    const res = str.match(reg); //没有使用g选项  
    const data = res?.[0]

    const d = data?.match(/@rule.*/g)
    const plugin = new Plugin()

    d?.forEach((element:string) => {
        plugin.rules.push(element.replace(/@rule\s+/, "").trim())
    })

    plugin.author = getString("author", data)
    plugin.name = getString("name", data)
    plugin.description = getString("description", data)
    plugin.version = getString("version", data)
    plugin.public = getBoolean("public", data)
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