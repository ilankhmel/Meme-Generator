var gElCanvas
var gCtx
// var gElLineId = 0
var gFocus = 0

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    setFocus()
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
            var {txt, size, align, color, isFocused} = line
          return  drawText(txt, size, align, color, idx, isFocused) 
        })
    },30)
}
function drawText(txt, size, align, color, idx, isFocused){
    console.log(idx);

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.textAlign = `${align}`
    gCtx.font = `${size}px Arial`

    if(isFocused){
        gCtx.strokeStyle = 'cyan'
    }

    if(idx === 0){
        gCtx.fillText(txt, gElCanvas.width /4,  gElCanvas.height /4)
        gCtx.strokeText(txt, gElCanvas.width /4,  gElCanvas.height /4)
    }else if(idx === 1){
        console.log('here');
        gCtx.fillText(txt, 300, 300)
        gCtx.strokeText(txt, 300, 300)
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
    setTextColor(color)
    renderMeme()
}

function onSetTextSize(size){
    setTextSize(size)
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