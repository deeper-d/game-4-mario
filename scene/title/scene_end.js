
class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game

        // bg
        var end = GuaImage.new(game, 'end', 'stretch')
        this.addElement(end) 

        var end = GuaImage.new(game, 'game-over')
        end.x = 150
        end.y= 520
        this.addElement(end) 

        var label = GuaLable.new(game, 'Game Over. Press r to replay')
        this.addElement(label)
        
        game.registerAction('r', function () {
            let scene = SceneTitle.new(game)
            game.replaceScene(scene)
        })
    }
    
    // draw() {
    //     this.game.context.fillText('Game Over, press r to replay', 100, 180)
    // }
}