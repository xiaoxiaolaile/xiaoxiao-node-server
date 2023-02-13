// import Koa from 'koa'

// const app = new Koa()
// const msg: string = 'Hello World -- 22'

// app.use(async (ctx: Koa.Context): Promise<void> => {
//   ctx.body = msg
// })

// app.listen(7070)


// import Sender from "./sender"
import {loadPlugins} from "./plugins";
import tgBot from "../Adapter/Telegram"  
tgBot()  


console.log('>>> 小小启动成功')
console.log('> 正在初始化......')
loadPlugins()

console.log('> 初始化成功......')
 
// console.log(plugins)

// const tgSender = new Sender("tg")
// runMessage(tgSender, plugins[1].script)






