const request = require('request'); 

export async function requestOptions(option : any){
    return new Promise((resolve, reject)=>{

        request(option, function(error:any, response:any, body:string) {
            if (!error && response.statusCode == 200) {
                resolve({body: body, response: response})   // 返回response的内容
            }else{
                reject(error)  // 返回错误信息
            }
        })

    })
}


    