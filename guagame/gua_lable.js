class GuaLable {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text, x, y) {
        return new this(game, text)
    }

    draw() {
        this.game.context.fillText(this.text, 140, 500)
    }

    update() {

    }
}