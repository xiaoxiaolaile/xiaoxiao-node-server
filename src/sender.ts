
import Plugin,{newPlugin} from "./plugins"

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

    getUserId(){
        return this.userId
    }

    reply(... args:any[]){
        console.log(">  ",...args)

        
    }

}



