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

    if (!loadFromStorage('saved-memes')) {
        saveToStorage('saved-memes', [])
    }

    renderSavedMemes()
    addListeners()
    renderCategorys()
    icreaseCategorysOnLoad()
}
var gDefaultLine1Set = false
var gDefaultLine2Set = false
function renderMeme() {

    var meme = getMeme()
    console.log(meme);
    var img = makeImg(meme)
    const { selectedImgId: id, selectedLineIdx: lineIdx, lines ,stickers} = meme


    setTimeout(() => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        lines.forEach((line, idx) => {
            var { txt, size, align, color, isFocused, stroke ,pos, linewidth, font} = line
            return drawText(txt, size, align, color, idx, isFocused, stroke, pos, linewidth, font)
        })

        stickers.forEach((sticker)=> drawSticker(sticker.sticker, sticker.pos.x, sticker.pos.y))
    }, 30)
}
function drawText(txt, size, align, color, idx, isFocused, stroke, pos, linewidth, font) {
    console.log(idx);

    var meme = getMeme()

    gCtx.lineWidth = `${linewidth}`
    gCtx.strokeStyle = `${stroke}`
    gCtx.fillStyle = color
    gCtx.textAlign = `${align}`
    gCtx.font = `${size}px ${font}`

    if (isFocused) {
        txt.strokeStyle = 'cyan'
    }

    var diff
    switch (align) {
        case 'left':
            diff = gElCanvas.width / 4 * -0.8
            break;
        case 'right':
            console.log('here');
            diff = gElCanvas.width  / 1.8
            break;
        case 'center':
            diff = gElCanvas.width /5.5
            break;

        default:
            break;
    }

    var x = gElCanvas.width / 2 + diff
    
    if (idx === 0) {
        console.log(diff);
            setStartPosLine1(meme)
            
            function setStartPosLine1(meme){
                if(gDefaultLine1Set) return
                meme.lines[0].pos = {x: x, y: gElCanvas.height / 5}
                gDefaultLine1Set = true
            }
            
            gCtx.fillText(txt, pos.x + diff, pos.y)
            gCtx.strokeText(txt, pos.x + diff, pos.y)
      
        

        if (isFocused) {
            gCtx.beginPath()
            var length = txt.length * size /2.5
            gCtx.lineWidth = 8
            gCtx.moveTo(pos.x - 70, pos.y+20)
            gCtx.lineTo(pos.x + length + 15, pos.y+20)
            gCtx.lineTo(pos.x + length + 15 , pos.y-60)
            gCtx.lineTo(pos.x -70, pos.y-60)
            gCtx.closePath()
            gCtx.strokeStyle = 'orange'
            gCtx.stroke()
        }
        else {
            gCtx.beginPath()
            gCtx.stroke()
        }

    } else if (idx === 1) {

        setStartPosLine2(meme)
            
            function setStartPosLine2(meme){
                if(gDefaultLine2Set) return
                meme.lines[1].pos = {x: x, y: gElCanvas.height - gElCanvas.height / 5}
                gDefaultLine2Set = true
            }
            console.log(pos);

            gCtx.fillText(txt, pos.x + diff, pos.y)
            gCtx.strokeText(txt, pos.x + diff, pos.y)


        
        if (isFocused) {
            gCtx.beginPath()
            var length = txt.length * size /2.5
            gCtx.lineWidth = 8
            gCtx.moveTo(pos.x - 70, pos.y+20)
            gCtx.lineTo(pos.x + length + 15, pos.y+20)
            gCtx.lineTo(pos.x + length + 15 , pos.y-60)
            gCtx.lineTo(pos.x -70, pos.y-60)
            gCtx.closePath()
            gCtx.strokeStyle = 'orange'
            gCtx.stroke()
        } else {
            gCtx.beginPath()
            gCtx.stroke()
        }



    }
     else {
        gCtx.fillText(txt, gElCanvas.width /3.5 + diff, gElCanvas.height / 2)
        gCtx.strokeText(txt, gElCanvas.width / 3.5 + diff, gElCanvas.height / 2)

        if (isFocused) {
            gCtx.beginPath()
            var length = txt.length * size /2.5
            gCtx.lineWidth = 8
            gCtx.moveTo(x - 70,  gElCanvas.height / 2 + 20)
            gCtx.lineTo(x + length + 15, gElCanvas.height / 2 + 20)
            gCtx.lineTo(x + length + 15 , gElCanvas.height / 2 -60)
            gCtx.lineTo(x -70, gElCanvas.height / 2 - 60)
            gCtx.closePath()
            gCtx.strokeStyle = 'orange'
            gCtx.stroke()
        } else {
            gCtx.beginPath()
            gCtx.stroke()
        }
    }


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
    setTextSize(+size, gFocus)
    renderMeme()
}

function onAddLine() {
    document.querySelector('.text-input').value = ''
    addLine()
    onChangeFocus()
    renderMeme()
}

function onChangeFocus() {
    var numOfLines = getNumOfLines()
    gFocus++
    if (gFocus > numOfLines - 1) gFocus = 0
    const { lines } = getMeme()
    const { txt } = lines[gFocus]
    document.querySelector('.text-input').value = txt
    setFocus()
    console.log(gMeme);
    renderMeme()
}

function resizeCanvas() {
   
    if(window.innerWidth < 560){

        gCtx.canvas.width  = screen.width - 1050;
      gCtx.canvas.height = screen.height - 550;
        renderMeme()
    }
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

function onSaveMeme() {
    var dataURL = gElCanvas.toDataURL()
    var meme = getMeme()
    meme['dataURL'] = dataURL
    saveMeme(meme)
    renderSavedMemes()
}

function renderSavedMemes() {
    var savedMemes = loadFromStorage('saved-memes')
    var strHTMLs = savedMemes.map((meme, idx) =>
        `<img class="saved-meme-img" src="${meme.dataURL}" onclick="onSetAndEditSavedMeme(${idx})">`
    )
    strHTMLs.unshift(`<h1 class="saved-memes-header">Your Saved Memes</h1>`)
    document.querySelector('.saved-memes').innerHTML = strHTMLs.join('')

}

function onSetAndEditSavedMeme(idx) {
    setMeme(idx)
    showEditor()
    renderMeme()
    const meme = getMeme()
    document.querySelector('.text-input').value = meme.lines[0].txt
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

var gStartPos
var gClickedTextIdx = 0
function onDown(ev) {
   onDownText(ev)
    onDownSticker(ev)
}

function onMove(ev) {
    onMoveText(ev)
    onMoveSticker(ev)

}
function onUp() {
    onUpText()
    onUpSticker()
}

function onDownText(ev){
    console.log('Im from onDown')
    const pos = getEvPos(ev)
    console.log(pos);
     gClickedTextIdx = whatIsClicked(pos)
    if (gClickedTextIdx < 0) return
    console.log(gClickedTextIdx);
    console.log(gClickedTextIdx, 'is clicked');
    setTextDrag(true, gClickedTextIdx)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMoveText(ev){
  
    if(gClickedTextIdx === 'undefined' || gClickedTextIdx < 0) return
    const { isDrag } = gMeme.lines[gClickedTextIdx]
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy, gClickedTextIdx)
    gStartPos = pos
    renderMeme()
}

function onUpText(){
    console.log('Im from onUp')
    document.body.style.cursor = 'grab'
    if (gClickedTextIdx < 0) return

    setTextDrag(false, gClickedTextIdx)
}

var gClickedStickerIdx

function onDownSticker(ev){
    console.log('Im from onDown')
    const pos = getEvPos(ev)
    console.log(pos);
     gClickedStickerIdx = whatStickerClicked(pos)
    if (gClickedStickerIdx < 0) return
    console.log(gClickedStickerIdx, 'sticker is clicked');
    setStickerDrag(true, gClickedStickerIdx)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMoveSticker(ev){
    
    if(gClickedStickerIdx === 'undefined' || gClickedStickerIdx < 0) return
    const { isDrag } = gMeme.stickers[gClickedStickerIdx]
    if (!isDrag) return
    console.log('dragged');
    const pos = getEvPos(ev)
   
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    
    moveSticker(dx, dy, gClickedStickerIdx)
    gStartPos = pos
    renderMeme()  
}

function onUpSticker(){
    console.log('Im from onUp')
    document.body.style.cursor = 'grab'
    if (gClickedStickerIdx < 0) return

    setStickerDrag(false, gClickedStickerIdx)
}


function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
    let pos = {
      x: ev.offsetX,
      y: ev.offsetY
    }
   
    if (TOUCH_EVS.includes(ev.type)) {
      
      ev.preventDefault()
     
      ev = ev.changedTouches[0]
     
      pos = {
        x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
        y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
      }
    }
    return pos
  }


function onChangeAlign(dir){
    changeAlign(dir)
    renderMeme()
}

function showEditor(){
    document.querySelector('.image-gallery').style.display = 'none'
    document.querySelector('.share-container').style.display = 'none'
    document.querySelector('.about-me').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.share-container').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.section2').style.display = 'none'
    
}

function onShowGallery(){
    document.querySelector('.image-gallery').style.display = 'block'
    document.querySelector('.share-container').style.display = 'block'
    document.querySelector('.about-me').style.display = 'flex'
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'none'
    document.querySelector('.share-container').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'flex'
    document.querySelector('.section2').style.display = 'flex'
    onSetFilterBy('')
    onDeleteLine()
    
}

function onShowMemes(){
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.image-gallery').style.display = 'none'
    document.querySelector('.share-container').style.display = 'none'
    document.querySelector('.about-me').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.saved-memes').style.display = 'block'
    document.querySelector('.share-container').style.display = 'none'
    document.querySelector('.section2').style.display = 'none'

}

function onDeleteLine(){
    deleteLine()
    document.querySelector('.text-input').value = ''
    renderMeme()
}

function onSetFont(val){
    setFont(val)
    renderMeme()
}

function onSetSticker(span){

    gCtx.fillText(span.innerText, 200 , 200)
    saveSticker(span.innerText, 200, 200)
}

function drawSticker(sticker, x, y){
    gCtx.fillText(sticker, x , y)

}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
  }
  
 
  function loadImageFromInput(ev, onImageReady) {
    showEditor()
    const reader = new FileReader()
   
    reader.onload = function (event) {
      let img = new Image() 
      img.src = event.target.result 
     
      img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) 
  
    
  }
  
  
  function renderImg(img) {
   
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    var id = +makeId()
    console.log(id);
    gImgs.push({id: id, url: img.src, keywords: []})
    gMeme.selectedImgId = id

    renderMeme()
  } 


function renderCategorys(){
    var strHTMLs = ''
    for (const key in gKeywordSearchCountMap) {
        strHTMLs +=  `<div data-trans="${key}" class="category ${key}" onclick="onIncreaseCountAndFilter('${key}')">${key}</div>`
        }
        console.log(strHTMLs);
        document.querySelector('.categorys').innerHTML = strHTMLs
    }
   
    
function onIncreaseCountAndFilter(filter){
    onSetFilterBy(filter)
    var map = getKeywordsMap()
    console.log(map[filter]);
    map[filter]++
    console.log(map[filter]);
    console.dir(document.querySelector(`.${filter}`));
    document.querySelector(`.${filter}`).style.fontSize = `${map[filter] + 20}px`
    
}

function icreaseCategorysOnLoad(){
    var map = getKeywordsMap()
    for (const key in map) {
            onIncreaseCountAndFilter(key)
        }
        onSetFilterBy('')
    }
function onSetLang(lang){
    setLang(lang)
    doTrans()
    setDirection()
    updateLang()
}

function setDirection(){
    var lang = getCurrLang()
    if(lang === 'he'){
        document.querySelector('body').classList.add('rtl')
    }else{
        document.querySelector('body').classList.remove('rtl')
    }
}

function updateLang(){
    doTrans(getCurrLang())
    setDirection()
    setQueryParams()
}