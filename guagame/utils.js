const log = console.log.bind(console)

const imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    // console.log('a ====', a)
    // if (b.y > a.y && b.y < a.y + a.w) {
    //     if (b.x > a.x && b.x < a.x + a.h) {
    //         return true
    //     }
    // }
    // return false
    let RectA = a
    RectA.left = a.x
    RectA.right = a.x + a.w
    RectA.top = a.y
    RectA.bottom = a.y + a.h
    let RectB = b
    RectB.left = b.x
    RectB.right = b.x + b.w
    RectB.top = b.y
    RectB.bottom = b.y + b.h 

    nonIntersect =
     (RectB.right < RectA.left) ||
     ( RectB.left > RectA.right ) ||
     ( RectB.bottom < RectA.top ) ||
     ( RectB.top > RectA.bottom )
     //相交
     intersect = !nonIntersect; 
     return intersect
}

const randomBetween = (start, end) => {
    var n  = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

const es = sel => {
    return document.querySelectorAll(sel)
}
const e = sel => {
    return document.querySelector(sel)
}

const ajax = request => {
     let r = new XMLHttpRequest()
     r.open(request.method, request.url, true)
     r.responseType = 'arraybuffer'
     r.onreadystatechange = event => {
          if (r.readyState === 4) {
               request.callback(r.response)
          }
     }
     r.send()
}

