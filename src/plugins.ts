export default class Plugin {
    // * @author 猫咪
    // * @name 小爱同学
    // * @description 👑插件开发demo，基础操作演示，能懂多少看悟性。
    // * @version v1.1.4
    // * @rule 小爱?
    // * @rule ?小爱
    // * @public false
    author!: string | undefined
    name!: string| undefined
    description!: string | undefined
    version!: string | undefined
    rules: string[] = []
    public!: boolean | undefined
    script!: any
}

