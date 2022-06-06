
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)


        // bg
        var title = GuaImage.new(game, 'title', 'strech')
        this.addElement(title) 

        var start = GuaImage.new(game, 'game-start')
        start.x = 150
        start.y= 520
        this.addElement(start) 

        var label = GuaLable.new(game, 'Game Bird. Press k to start')
        this.addElement(label)

        game.registerAction('k', function () {
            let scene = Scene.new(game)
            game.replaceScene(scene)
        })
    }

    // draw() {
    //     this.game.context.fillText('Game Bird, press k to start', 100, 180)
    // }


}