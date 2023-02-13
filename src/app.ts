// import Koa from 'koa'

// const app = new Koa()
// const msg: string = 'Hello World -- 22'

// app.use(async (ctx: Koa.Context): Promise<void> => {
//   ctx.body = msg
// })

// app.listen(7070)


// import Sender from "./sender"
import { loadPlugins, handleMessage } from "./plugins"
import Sender from "./sender"
import tgBot from "../Adapter/Telegram"
import readline from "readline"
tgBot()
 
console.log('>>> 小小启动成功')
console.log('> 正在初始化......')
debugging()
loadPlugins()

console.log('> 初始化成功......')




function debugging() {
    console.log('> 可在控制台输入调试信息')
    console.log('> 结束程序： bye')
    // 创建接口实例
    const r1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    // 方法方法setPromat(promat) ，就是给每一行设置一个提示符，
    // 就好比window命令行的> ，这里设置的是Test>
    r1.setPrompt("> ");
    // prompt()是最重要的方法，因为它体现了readline的核心作用，
    // 以行为单位读取数据，prompt方法就是在等待用户输入数据
    r1.prompt();

    // 调用接口方法
    // 监听了'line' 事件，因为prompt方法调用一次就只会读取一次数据
    // 所以，在这个方法又调用了一次prompt方法，这样就可以继续读取用户输入
    // 从而达到一种命令行的效果
    r1.on("line", function (line) {
        switch (line.trim()) {
            case "bye":
                r1.close();
                break;
            default:
                {
                    const sender = new Sender("Terminal")
                    sender.chatId = 0
                    sender.userId = 0
                    sender.message = line.trim()
                    handleMessage(sender)
                }
                break;
        }
        r1.prompt(); 
    });

    // close事件监听
    r1.on("close", function () {
        console.log("再见");
        process.exit(0);
    })



}

