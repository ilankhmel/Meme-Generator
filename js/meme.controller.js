var gElCanvas
var gCtx
var gElLineId = 0

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
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
        lines.forEach(line=>{
            var {txt, size, align, color} = line
          return  drawText(txt, size, align, color) 
        })
    },30)
}
function drawText(txt, size, align, color){
    console.log(txt);
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.textAlign = `${align}`
    gCtx.font = `${size}px Arial`
    if(gElLineId === 0){
        gCtx.fillText(txt, gElCanvas.width /4,  gElCanvas.height /4)
        gCtx.strokeText(txt, gElCanvas.width /4,  gElCanvas.height /4)
    }else if(gElLineId === 1){
        gCtx.fillText(txt, gElCanvas.width /0.25,  gElCanvas.height /0.25)
        gCtx.strokeText(txt, gElCanvas.width /4,  gElCanvas.height /4)
    }
   
}
function makeImg(meme){
    const img = new Image()
    img.src = getImageById(meme.selectedImgId).url
    console.log(img);
    return img
}


function onSetLineText(newText, id){

    setLineText(newText, +id)
    renderMeme()
}

function onSetTextColor(color){
    setTextColor(color)
    renderMeme()
}

function onSetTextSize(size){
    setTextSize(size)
    renderMeme()
}

function onAddLine(){
    gElLineId++
    addLine()
    renderLine()

}

function renderLine(){
    var str = `<input type="text" placeholder="Your Text" oninput="onSetLineText(${(this.value)}, '${gElLineId}')">`
    document.querySelector(".meme-controls").innerHTML += str
}