class GuaNesSprite {
    constructor(game) {
        this.game = game
        this.tileOffset = 32784
        this.data = window.bytes.slice(this.tileOffset)

        // 为了省事，这里硬编码 hard code一套动画
        this.animations = {
            bird: []
        }

        this.pixelWidth = 2
        this.rowsOfSprite = 4
        this.columnsOfSprite = 2
        // 像素的宽度 * 像素的个数 * 列数
        this.w = this.pixelWidth * 8 * this.columnsOfSprite 
        this.h = this.pixelWidth * 8 * this.rowsOfSprite 
        this.frameIndex = 0
        this.frameCount = 3
        // 反转图片
        this.flipX = false
        this.ratation = 0
        this.alpha = 1 // 透明度
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        // 加速和摩擦
        this.vx = 0
        this.mx = 0
    }

    static new(game) {
        var instance = new this(game)
        return instance
    }


    drawBlocks(context, data, x, y, pixelWidth) {
        const colors = [
            'white',
            '#FE1008',
            '#FFB010',
            '#AA3030'
        ]

        let w = pixelWidth
        let h = pixelWidth

        for (let i = 0; i < 8; i++) {
            let p1 = data[i]
            let p2 = data[i + 8]
            for (let j = 0; j < 8; j++) {
                // 8 bits per line
                // 78 69  0100 1110  0100 0101
                // 在 j 循环中，每次画一个像素点
                let c1 = (p1 >> (7 - j)) & 0b00000001 // ?? 啥意思 ？
                let c2 = (p2 >> (7 - j)) & 0b00000001 // ?? 啥意思 ？
                let pixel = (c2 << 1) + c1  // ???
                if (pixel === 0) {
                    // 不画白色
                    continue
                }
                let color = colors[pixel]
                context.fillStyle = color
                let px = x + j * w
                let py = y + i * h
                context.fillRect(px, py, w, h)

                // 这里是画了 16 * 64 = 1024 字节 
            }
        }

    }

    drawSprite() {
        let bytesPerBlock = 16 // 动起来
        let dataOffset = this.frameIndex * bytesPerBlock * 8 // 动起来 8: 一个sprite由8个block组成
        let data = this.data.slice(dataOffset)
        let context = this.game.context
        // 一个方块是像素的尺寸 * 像素的宽度
        let pixelsPerBlock = 8
        let pixelWidth = this.pixelWidth
        let blockSize = pixelsPerBlock * pixelWidth // ??? 
        let offset = 0 // 偏移量
        for (let i = 0; i < this.rowsOfSprite; i++) { // 竖着
            for (let j = 0; j < this.columnsOfSprite; j++) { // 横着
                let x = j * blockSize
                let y = i * blockSize
                let pixels = data.slice(offset)
                // 一行马里奥拼成
                this.drawBlocks(context, pixels, x, y, pixelWidth)
                offset += 16
            }
        }


    }


    frames() {
        return this.animations[this.animationName]
    }

    update() {
        // 更新 x 加速和摩擦
        this.vx += this.mx
        // 说明摩擦力已经把速度降至 0 以下， 停止摩擦
        if (this.vx * this.mx > 0) {
            this.vx = 0
            this.mx = 0
        } else {
            this.x += this.vx
        }

        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.05
        // 落地了
        var h = 100
        if (this.y > h) {
            this.y = h
        }
        

        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 6
            this.frameIndex ++ 
            this.frameIndex %= 3
        }


        // // 更新alpha
        // if (this.alpha > 0) {
        //     this.alpha -= 0.05
        // }
        // // 更新角度
        // if (this.ratation < 45) {
        //     this.ratation += 5
        // }
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

        // draw mario
        this.drawSprite()

        // context.drawImage(this.texture, 0, 0)
        context.restore()
    }

    jump() {
        this.vy = -4
        // this.ratation = -45
    }

    move(x, keyStatus) {
        this.flipX = x < 0
        // this.x += x
        let s = 0.5 * x
        if (keyStatus == 'down') {
            this.vx += s
            this.mx = -s/3
        }

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