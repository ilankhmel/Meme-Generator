var gElCanvas
var gCtx
var gFocus = 0


function onInit() {
    createImages()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    setFocus()
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    if(!loadFromStorage('saved-memes')){
        saveToStorage('saved-memes', [])
    }

    renderSavedMemes()
}

function renderMeme() {

    var meme = getMeme()
    console.log(meme);
    var img = makeImg(meme)
    const { selectedImgId: id, selectedLineIdx: lineIdx, lines } = meme
    // const {txt, size, align, color} = lines[0]
    // var text = meme.lines[0].txt

    setTimeout(() => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            var { txt, size, align, color, isFocused, stroke } = line
            return drawText(txt, size, align, color, idx, isFocused, stroke)
        })
    }, 30)
}
function drawText(txt, size, align, color, idx, isFocused, stroke) {
    console.log(idx);

    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${stroke}`
    gCtx.fillStyle = color
    gCtx.textAlign = `${align}`
    // gCtx.textAlign = `right`
    gCtx.font = `${size}px Arial`


    if (isFocused) {
        gCtx.strokeStyle = 'cyan'
    }
    
    var diff
    switch (align) {
        case 'left':
            diff = gElCanvas.width / 4 * -1
            break;
            case 'right':
                console.log('here');
                diff = gElCanvas.width / 4
                break;
        case 'center':
            diff = 0
            break;

        default:
            break;
    }

    var x = gElCanvas.width / 2 + diff


    if (idx === 0) {
        console.log(diff);
        gCtx.fillText(txt, x, gElCanvas.height / 5)
        gCtx.strokeText(txt, x, gElCanvas.height / 5)
       
    } else if (idx === 1) {
        gCtx.fillText(txt, x, gElCanvas.height - gElCanvas.height / 5)
        gCtx.strokeText(txt, x, gElCanvas.height - gElCanvas.height / 5)

        
    } else {
        gCtx.fillText(txt, gElCanvas.width / 2, gElCanvas.height / 2)
        gCtx.strokeText(txt, gElCanvas.width / 2, gElCanvas.height / 2)
    }
    
    console.log(isFocused);
    
    // if (isFocused) {
    //     console.log('here');
    //     gCtx.beginPath()
    //     gCtx.lineWidth = 5
    //     gCtx.moveTo(x, gElCanvas.height / 5 + size/2)
    //     gCtx.lineTo(x + 100, gElCanvas.height / 5 + size/2)
    //     gCtx.strokeStyle = 'cyan'
    //     gCtx.stroke()
    //     }


}


function makeImg(meme) {
    const img = new Image()
    img.src = getImageById(meme.selectedImgId).url
    console.log(img);
    return img
}

function onSetLineText(newText) {
    setLineText(newText, gFocus)
    renderMeme()
}

function onSetTextColor(color) {
    setTextColor(color, gFocus)
    renderMeme()
}
function onSetStrokeColor(color) {
    setStrokeColor(color, gFocus)
    renderMeme()
}

function onSetTextSize(size) {
    setTextSize(size, gFocus)
    renderMeme()
}

function onAddLine() {
    // gElLineId++
    document.querySelector('.text-input').value = ''
    addLine()
    onChangeFocus()
    // renderLine()

}

function onChangeFocus() {
    var numOfLines = getNumOfLines()
    gFocus++
    if (gFocus > numOfLines - 1) gFocus = 0
    const { lines } = getMeme()
    const { txt } = lines[gFocus]
    document.querySelector('.text-input').value = txt
    setFocus()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 20
}

function onImFlexible() {
    var randStings = ['moneky', 'kuala', 'elephant', 'funny', 'angry', 'popcorn', 'pizza', 'mouse', 'gym', 'sleep']
    var randColors = ['red', 'blue', 'yellow', 'green', 'white', 'black', 'brown', 'tomato', 'purple', 'pink', 'gray', 'lightblue']
    var images = getImages()
    var meme = getMeme()

    function getRandImgId() {
        return images[getRandomIntInclusive(0, images.length - 1)].id
    }

    function getRandColor() {
        return randColors[getRandomIntInclusive(0, randStings.length - 1)]
    }

    function getRandString() {
        return randStings[getRandomIntInclusive(0, randStings.length - 1)]
    }

    function gerRandStringSize(randString) {
        var maxTextSize = gElCanvas.width / randString.length
        return getRandomIntInclusive(20, maxTextSize)
    }

    var randId = getRandImgId()
    var randStr = getRandString()

    
    setImg(randId)
    setLineText(randStr, 0)
    setTextSize(gerRandStringSize(randStr), 0)
    setTextColor(getRandColor(), 0)
    setStrokeColor(getRandColor(), 0)

    if (randId % 2 === 0) {
        if (meme.lines.length !== 1) {
            meme.lines.pop()
            renderMeme()
            return
        } else {

            addLine()
            randStr = getRandString()
            setLineText(randStr, 1)
            setTextSize(gerRandStringSize(randStr), 1)
            setTextColor(getRandColor(), 1)
            setStrokeColor(getRandColor(), 1)
        }
    }
    renderMeme()
}

function onSaveMeme(){
    var dataURL = gElCanvas.toDataURL()
    var meme = getMeme()
    meme['dataURL'] = dataURL
    // console.log(meme);
    saveMeme(meme)
    renderSavedMemes()
}

function renderSavedMemes(){
    var savedMemes = loadFromStorage('saved-memes')
    var strHTMLs = savedMemes.map(meme=>
       `<img class="saved-meme-img" src="${meme.dataURL}" onclick="onSetAndEditSavedMeme(${meme.selectedImgId})">` 
        )
        document.querySelector('.saved-memes').innerHTML = strHTMLs
}

function onSetAndEditSavedMeme(id){
    setMeme(id)
    renderMeme()
}