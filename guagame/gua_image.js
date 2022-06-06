class GuaImage {
    constructor (game, name, stretch) {
        this.stretch = stretch
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.flipY = false
        this.rotation = 0
    }

    static new(game, name, strech) {
        var instance = new this(game, name, strech)
        return instance
    }

    draw() {
        this.game.drawImage(this, this.stretch)
    }

    update() {

    }
}