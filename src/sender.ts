
import Plugin,{newPlugin, addListenMap, removeListenMap} from "./plugins"


class NewSender {
    message: any
    constructor(message: any){
        this.message = message
    }

    getContent() {
        return this.message
    }
}

export default class Sender {
    form :string
    userId!: number 
    chatId!: number 
    message!: string | unknown
    matches !:any[] 
    ruleContent!: string
    constructor(form:string){
        this.form = form
    }

    getForm(){
        return this.form
    }

    getMsg(){
        return this.message
    }
    
    param(key : any){
        
        // console.log(key)
        // console.log(typeof(key))

        if (typeof(key) == "string"){
            // console.log(this.ruleContent.split("\\s+"))
            const arr = this.ruleContent.split("\\s+")
            for (let i = 0; i < arr.length; i++) {
                const s = arr[i]
                if (s.indexOf(key) > -1){
                    // console.log(s, key, this.matches)
                    return `${this.matches[i + 1]}`
                }
            }

        }else{
            return `${this.matches[key + 1]}`
        }
        return ""
    }
 
    listen(commands : string[], f:  ((s: Sender) => void)){
        const plugin = new Plugin()
        plugin.rules = commands
        plugin.handle = sender =>{
            f(sender)
        }
        newPlugin(plugin)
    }

    async listenS(ms : number, pattern:string){
        if (pattern == null || pattern == "") {
            pattern = "(.*)"
        }
        let timeoutId : NodeJS.Timeout
        const key = `${this.userId}_${this.chatId}_${this.form}`
        const delay = new Promise(function(resolve){
          timeoutId = setTimeout(function(){
            removeListenMap(key)
            resolve(null)
          }, ms)
        })
        
        // overall timeout
        const result =  await Promise.race([delay, new Promise(function(resolve){
            addListenMap(key,resolve)
          })])
          .then( (res) => {
            removeListenMap(key)
            clearTimeout(timeoutId)
            return res;
          })
 
        if (result){
            return new NewSender(result)
        }else {
            return null
        }
    }

    getUserId(){
        return this.userId
    }

    getChatId(){
        return this.chatId
    }

    reply(... args:unknown[]){
        console.log("> ",...args)

        
    }

}



