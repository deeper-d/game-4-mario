class GuaTileMap {
    constructor(game) {
        this.game = game
        // 8 x 5
        this.tiles = [
            1, 1, 1, 1, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 0, 1,
            2, 2, 3, 3, 0,
            1, 2, 3, 0, 1,
        ]
        this.th = 5
        this.tw = this.tiles.length / this.th // tw 应该是一个整数
        this.tileImages = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
        this.tileSize = 32 // 本来是16个像素，把像素放大两倍
    }

    static new(...args) {
        return new this(...args)
    }

    update() {

    }

    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i];
            let h = this.th
            if (index !== 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
            
        }

    }
}


class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.gameover = false


        // tile map
        let map = GuaTileMap.new(game)
        this.addElement(map)


         // mario
         let mario = GuaNesSprite.new(game)
         mario.x = 100
         mario.y = 100
         this.addElement(mario)
         this.mario = mario

        // // bg
        // var sky = GuaImage.new(game, 'sky')
        // this.addElement(sky) 

        //  // 拼合地面（实际可以改为一个 Ground 类）
        //  this.grounds = []
        //  for (let i = 0; i < 30; i++) {
        //      var g = GuaImage.new(game, 'ground')
        //      g.x = i * 19
        //      g.y = 540
        //      this.addElement(g)
        //      this.grounds.push(g)
        //  }
        //  this.skipCount = 5

        // player
        // var b = GuaAnimation.new(game)
        // b.x = 80
        // b.y = 100
        // this.bird = b
        // this.birdSpeed = 5
        // this.addElement(b)

        // set input event
        this.setupInputs()

    }
    
    setupInputs() {
        var self = this
        var b = this.mario //this.bird
        let playerSpeed = 10
        self.game.registerAction('a', function (keyStatus) {
            b.move(-playerSpeed , keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(playerSpeed, keyStatus)
        })
        self.game.registerAction('j', function (keyStatus) {
            b.jump()
        })
    }

    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        if (this.gameover) {
            this.bird.falldown()
            return
        }

        // TODO:为什么这里让地面滚动需要调用父类的update??
        super.update()

        // 地面移动
        // this.skipCount--
        // var offset = -5
        // if (this.skipCount === 0) {
        //     this.skipCount = 5
        //     offset = 20
        // }
        // for (let i = 0; i < 30; i++) {
        //     var g = this.grounds[i]
        //     g.x += offset
        // }
        
        // // 判断相撞
        // if (this.pipe.collide(this.bird)){
        //     this.gameover = true
        //     return
        // }
    }
}
