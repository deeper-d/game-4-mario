var blocks = []
var paused = false
var enableDrag = false
var loadLevel = function(n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var __mian = async function () {
    var enableDebugMode = function(enable) {
        if (!enable) {
            return
        }
        window.addEventListener('keydown', function(event) {
            let k = event.key
            if (k === 'p') {
                paused = !paused 
            } else if ('123456'.includes(k)) {
                console.log(k)
                blocks = loadLevel(Number(k))
            }
        })
        // 控制speed
        // document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        //     var fps = event.target.value
        //     window.fps = fps
        // })
    }

    var images = {
        // birds
        sky: 'img/bird/sky.png',
        end: 'img/bird/sky.jpg',
        title: 'img/bird/title.jpeg',
        bg: 'img/bird/bg.png',
        bird1: 'img/bird/b1.png',
        bird2: 'img/bird/b2.png',
        bird3: 'img/bird/b3.png',
        ground: 'img/bird/ground.png',
        pipe: 'img/bird/pipe_up.png',
        'game-start': 'img/bird/get-ready.png',
        'game-over': 'img/bird/game-over.png',
    }

    function loadImg(images, callback) {
        let promiseQueque = Object.keys(images).map(key => {
            return new Promise((resolve, reject) => {
                let imgSrc = images[key]
                var img = new Image()
                img.src = imgSrc
                img.addEventListener('load', () => {
                    resolve(img);
                })
            })
        })
        Promise.all(promiseQueque).then((result) => {
            console.log('---- 载入图片成功 ----', result)  
            callback()
          }).catch((error) => {
            console.log(error)
          })

    }

    await loadImg(images, () => {

        var game = Guagame.instance(20, images, (g) => {
            // var scene = Scene.new(g)
            var scene = SceneTitle.new(g)
            g.runWithScene(scene)
        })
    
        // enableDebugMode(true)

    })

}

__mian()