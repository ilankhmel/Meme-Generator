var gElCanvas
var gCtx
// var gElLineId = 0
var gFocus = 0


function onInit() {
    createImages()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    setFocus()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
}

function renderMeme(){
    var meme = getMeme()
    console.log(meme);
    var img = makeImg(meme)
    const {selectedImgId:id, selectedLineIdx:lineIdx, lines} =  meme
    // const {txt, size, align, color} = lines[0]
    // var text = meme.lines[0].txt

    setTimeout(()=>{
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx)=>{
            var {txt, size, align, color, isFocused, stroke} = line
          return  drawText(txt, size, align, color, idx, isFocused, stroke) 
        })
    },30)
}
function drawText(txt, size, align, color, idx, isFocused, stroke){
    console.log(idx);

    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${stroke}`
    gCtx.fillStyle = color
    gCtx.textAlign = `${align}`
    // gCtx.textAlign = `right`
    gCtx.font = `${size}px Arial`
    

    if(isFocused){
        gCtx.strokeStyle = 'cyan'
    }
    
    var diff
    switch (align) {
        case 'left':
            diff = gElCanvas.width/4 * -1
            break;
        case 'right':
            console.log('here');
            diff = gElCanvas.width/4 
            break;
        case 'center':
            diff = 0
            break;
    
        default:
            break;
    }

    var x = gElCanvas.width /2 + diff
    

    if(idx === 0){
        console.log(diff);
        gCtx.fillText(txt, x,  gElCanvas.height /5)
        gCtx.strokeText(txt, x,  gElCanvas.height /5)
    }else if(idx === 1){
        console.log('here');
        gCtx.fillText(txt, x, gElCanvas.height - gElCanvas.height /5)
        gCtx.strokeText(txt, x, gElCanvas.height - gElCanvas.height /5)
    }else{
        gCtx.fillText(txt, gElCanvas.width /2,  gElCanvas.height /2)
        gCtx.strokeText(txt, gElCanvas.width /2,  gElCanvas.height /2)
    }

   
}
function makeImg(meme){
    const img = new Image()
    img.src = getImageById(meme.selectedImgId).url
    console.log(img);
    return img
}


function onSetLineText(newText){
    setLineText(newText, gFocus)
    renderMeme()
}

function onSetTextColor(color){
    setTextColor(color, gFocus)
    renderMeme()
}
function onSetStrokeColor(color){
    setStrokeColor(color, gFocus)
    renderMeme()
}

function onSetTextSize(size){
    setTextSize(size, gFocus)
    renderMeme()
}

function onAddLine(){
    // gElLineId++
    document.querySelector('.text-input').value = ''
    addLine()
    onChangeFocus()
    // renderLine()

}

// function renderLine(){
//     var str = `<input type="text" placeholder="Your Text" oninput="onSetLineText((this.value), '${gElLineId}')">`
//     document.querySelector(".meme-controls").innerHTML += str
// }

function onChangeFocus(){
    var numOfLines = getNumOfLines()
    gFocus++
    if(gFocus > numOfLines - 1) gFocus = 0
    const {lines} = getMeme()
    const {txt} = lines[gFocus]
    document.querySelector('.text-input').value = txt
    setFocus()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 20
}

function onImFlexible(){
    var randStings = ['moneky', 'kuala', 'elephant', 'funny', 'angry', 'popcorn', 'pizza','mouse','gym','sleep']
    var randColors = ['red', 'blue', 'yellow', 'green', 'white', 'black','brown','tomato','purple','pink','gray','lightblue']
    var images = getImages()
    var meme = getMeme()
    var randId = images[getRandomIntInclusive(0, images.length - 1)].id
    var randColor = randColors[getRandomIntInclusive(0, randStings.length - 1)]
    var randString = randStings[getRandomIntInclusive(0, randStings.length - 1)]

    var maxTextSize = gElCanvas.width / randString.length

    var randStringSize = getRandomIntInclusive(20, maxTextSize)

    // console.log(randId);
    setImg(randId)
    setTextColor(randColor, 0)
    setTextSize(randStringSize, 0)
    setLineText(randString, 0)
    randColor = randColors[getRandomIntInclusive(0, randStings.length - 1)]
    setStrokeColor(randColor)

    if(randId % 2 === 0){
        if(meme.lines.length === 1){
            addLine(randString)
        }else{
            meme.lines.pop()
            renderMeme()
            return
        } 
        randString = randStings[getRandomIntInclusive(0, randStings.length - 1)]
        randColor = randColors[getRandomIntInclusive(0, randColors.length - 1)]
        randStringSize = getRandomIntInclusive(20, maxTextSize)
        setLineText(randString, 1)
        setTextColor(randColor, 1)
        setTextSize(randStringSize, 1)
        randColor = randColors[getRandomIntInclusive(0, randStings.length - 1)]
        setStrokeColor(randColor)
    } 
    console.log(randId)
    console.log(randColor);
    console.log(randString);
    console.log(randStringSize);
    renderMeme()
}