class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)

        // game.registerAction('r', function () {
        //     console.log('dddd !!', game)
        //     var s = SceneTitle.new(game)
        //     game.runWithScene(s)
        // })
    }
    
    draw() {
        this.game.context.fillText('game over! 按 r 返回标题界面', 100, 180)
    }
}