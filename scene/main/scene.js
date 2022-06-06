class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.gameover = false

        // bg
        var sky = GuaImage.new(game, 'sky')
        this.addElement(sky) 

         // 拼合地面（实际可以改为一个 Ground 类）
         this.grounds = []
         for (let i = 0; i < 30; i++) {
             var g = GuaImage.new(game, 'ground')
             g.x = i * 19
             g.y = 540
             this.addElement(g)
             this.grounds.push(g)
         }
         this.skipCount = 5

         // mario
         let mario = GuaNesSprite.new(game)
         mario.x = 100
         mario.y = 480
         this.addElement(mario)
         this.mario = mario

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
        let playerSpeed = 5
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
