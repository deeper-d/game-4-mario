class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 260 
        this.管子横向间距 = 300
        this.columnsOfPipe = 3
        this.scoreCooldown = 10

        for (var i = 0; i < this.columnsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }

    }

    static new(game) {
        return new this(game)
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }

    update() {
        this.scoreCooldown--
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x <= -100) {
                p1.x += this.管子横向间距 * this.columnsOfPipe
            }
            if (p2.x <= -100) {
                p2.x += this.管子横向间距 * this.columnsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }

    }

    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.ratation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
       
    }

    collide(bird) {
        for (let p of this.pipes) {
            if (rectIntersects(bird, p)) {
                return true
            }
        }
    }

    score(bird, callback) {
        if (this.scoreCooldown <= 0) {
            this.scoreCooldown = 10
            for (let i = 0; i < this.pipes.length; i++) {
                let p = this.pipes[i]
                if (i % 2) {
                    if (bird.x > p.x && bird.x < p.x + p.w)  {
                        this.scene.score += 1
                    }
                } 
         
            }
        }
    }

    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
}

class Score {
    constructor(game) {
        this.game = game
        this.score = 0
        this.scoreCooldown = 10
    }

    static new(game) {
        return new this(game)
    }

    update() {
        this.scoreCooldown--
        this.addScore()
    }

    draw() {
        var canvas = document.querySelector('#id-score')
        var context = canvas.getContext('2d')
        context.clearRect(0, 0, 400, 600);  
        context.fillText('得分：' + this.score, 20, 580)
    }

    addScore() {
        if (this.scoreCooldown <= 0) {
            this.scoreCooldown = 10
            let pipes = this.scene.pipe.pipes
            let bird =  this.scene.bird
            for (let i = 0; i < pipes.length; i++) {
                let p = pipes[i]
                if (i % 2) {
                    if (bird.x > p.x && bird.x < p.x + p.w)  {
                        this.score += 1
                    }
                } 
         
            }
        }
    }
}

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
        
        // 水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // player
        var b = GuaAnimation.new(game)
        b.x = 80
        b.y = 100
        this.bird = b
        this.birdSpeed = 5
        this.addElement(b)

        // score
        // var 得分 = GuaLable.new(this.game, '得分：')
        // this.addElement(得分)
        var s = Score.new(game)
        this.addElement(s) 

        // set input event
        this.setupInputs()

    }
    
    setupInputs() {
        var self = this
        var b = this.bird
        self.game.registerAction('a', function (keyStatus) {
            b.move(-self.birdSpeed , keyStatus)
        })
        self.game.registerAction('d', function (keyStatus) {
            b.move(self.birdSpeed, keyStatus)
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
        this.skipCount--
        var offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 5
            offset = 20
        }
        for (let i = 0; i < 30; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        
        // 判断相撞
        if (this.pipe.collide(this.bird)){
            this.gameover = true
            return
        }
    }
}
