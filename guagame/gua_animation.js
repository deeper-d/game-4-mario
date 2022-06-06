class GuaAnimation {
    constructor(game, w, h) {
        this.game = game
        // 为了省事，这里硬编码 hard code一套动画
        this.animations = {
            bird: []
        }

        for (let index = 1; index <= 3; index++) {
            var name = `bird${index}`;
            var t = game.textureByName(name);
            this.animations['bird'].push(t)
        }

        this.animationName = 'bird'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3
        // 反转图片
        this.flipX = false
        this.ratation = 0
        this.alpha = 1 // 透明度
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }

    static new(game) {
        var instance = new this(game)
        return instance
    }

    frames() {
        return this.animations[this.animationName]
    }

    update() {
        // 更新alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.05
        var h = 500
        if (this.y > h) {
            this.y = h
        }
        // 更新角度
        if (this.ratation < 45) {
            this.ratation += 5
        }

        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }

    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.ratation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()
    }

    jump() {
        this.vy = -4
        this.ratation = -45
    }

    move(x, keyStatus) {
        this.x += x
        this.flipX = x < 0
    }

    falldown() {
        this.y += 20
        if (this.y > 500) {
            var scene_end = new SceneEnd(this.game)
            this.game.replaceScene(scene_end)
            return
        }
    }

    changeAnimation(name) {
        this.animationName = name

    }
}