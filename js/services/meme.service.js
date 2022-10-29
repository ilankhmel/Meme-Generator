var gKeywordSearchCountMap = 
{'funny': 12,
// 'cat': 0,
'baby': 3,
'dogs': 0,
'cats': 4,
'science': 0,
'politics': 0,
'movies': 8,
'animals': 4,
}
var gImgs = [
    // {id: 1, url: 'meme-imgs(square)/1.jpg', keywords: ['funny', 'cat']},
    // {id: 2, url: 'meme-imgs(square)/2.jpg', keywords: ['funny', 'cat']}
];
var gId = 0
var gFilter = ''
var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'My Text',
 size: 70,
 align: 'left',
 color: 'white',
 stroke: 'black',
 isFocused: false,
 isDrag: false,
 linewidth: 1,
 font: 'Arial',
 },
],
stickers: [],
}
var keyMap = {
    1: ['funny', 'trump'],
    2: ['animals', 'dogs'],
    3: ['animals', 'dogs', 'babys'],
    4: ['animals', 'cats'],
    5: ['funny', 'babys'],
    6: ['funny', 'science'],
    7: ['funny', 'babys'],
    8: ['funny'],
    9: ['evil', 'baby'],
    10: ['funny', 'obama', 'politics'],
    11: ['funny', 'basketball'],
    12: ['funny', 'tv shows'],
    13: ['funny', 'leonardo decaprio'],
    14: ['movies'],
    15: ['movies'],
    16: ['funny', 'movies'],
    17: ['politics', 'putin'],
    18: ['movies'],
    19: ['dogg'],
}
function createImages(){
     for (const key in keyMap) {
        gImgs.push(
            createImage(`meme-imgs(square)/${key}.jpg`, keyMap[key])
        )
        }
}



function createImage(url, keysArray){
    return {
        id: gId++,
        url,
        keywords: keysArray
    }
}


function getMeme(){
    return gMeme
}

function getImages(){
    return gImgs.filter((img)=> img.keywords.join('').includes(gFilter))
    return gImgs
}

function getImageById(id){
    return gImgs.find(img=>img.id===id)
}

function setLineText(text, lineId){
    console.log(lineId);
    console.log(gMeme.lines[lineId].txt);
    console.log(text);
    gMeme.lines[lineId].txt = text
    console.log(gMeme.lines[lineId].txt);
}

function setImg(id){
    gMeme.selectedImgId = id
}

function setTextColor(color, idx){
    gMeme.lines[idx].color = color
}

function setStrokeColor(color, idx){
    console.log(idx);
    gMeme.lines[idx].stroke = color
}

function setTextSize(size, idx){
    gMeme.lines[idx].size += size
}

function addLine(txt = ''){
    var idx = gMeme.lines.length - 1
    gMeme.lines.push(
        {
            txt,
            size: 50,
            align: 'left',
            color: 'white',
            stroke: 'black',
            isFocused: false,
            isDrag: false,
            linewidth: 1,
            font: 'Arial',
            }
    )
}

function getNumOfLines(){
    return gMeme.lines.length
}


function setFocus(){
    gMeme.lines.forEach((line, idx)=>{
        if(idx === gFocus){
           return line.isFocused = true
        } else return line.isFocused = false
    })
}

function saveMeme(meme){
    console.log(meme);
    var memory = loadFromStorage('saved-memes')
    memory.push(meme)
    console.log(memory);
    saveToStorage('saved-memes', memory)
}

function convertCanvasToImage() {
    let image = new Image();
    console.log(gElCanvas.toDataURL());
    image.src = gElCanvas.toDataURL();
    console.log(image);
    return image;
  }


function setMeme(idx){
    var memory = loadFromStorage('saved-memes')
    var meme = memory[idx]
    gMeme = meme
}

function setFilterBy(val){
    gFilter = val
}

function whatIsClicked(clickedPos){
    return gMeme.lines.findIndex((line, idx)=>isTextClicked(clickedPos, idx))
     
}
//Check if the click is inside the Text 
function isTextClicked(clickedPos, idx) {
    // const { pos } = gCircle
    var linePos = gMeme.lines[idx].pos
    // console.log('linePos', linePos);
    var spaceTaken = gMeme.lines[idx].txt.length * gMeme.lines[idx].size
    // Calc the distance between two dots
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    var wordSpaceOnCanvas = linePos.x + spaceTaken

    // console.log('lineX', linePos.x, 'SpaceTaken', wordSpaceOnCanvas);
    // if(window.innerWidth < 560 ){
    //     if(idx === 0){

    //         if(clickedPos.x >= linePos.x -150 && clickedPos.x <= wordSpaceOnCanvas - 100 && clickedPos.y  >= linePos.y -100 && clickedPos.y  <= linePos.y ){
    //             return true
    //         }
    //         return false
    //     }else if(idx === 1){
    //         if(clickedPos.x >= linePos.x -150 && clickedPos.x <= wordSpaceOnCanvas - 100 && clickedPos.y  >= linePos.y -250 && clickedPos.y  <= linePos.y ){
    //             return true
    //         }
    //         return false
            
    //     }
    // }else

    if(clickedPos.x >= linePos.x -150 && clickedPos.x <= wordSpaceOnCanvas - 100 && clickedPos.y  >= linePos.y -50 && clickedPos.y  <= linePos.y ){
        return true
    }
    return false
  }


function whatStickerClicked(clickedPos){
    return gMeme.stickers.findIndex((sticker, idx)=>isStickerClicked(clickedPos, idx))
     
}
//Check if the click is inside the Text 
function isStickerClicked(clickedPos, idx) {
    // const { pos } = gCircle
    var stickerPos = gMeme.stickers[idx].pos
    // console.log('linePos', linePos);
    // var spaceTaken = 50
    // Calc the distance between two dots
    // const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    //If its smaller then the radius of the circle we are inside
    var wordSpaceOnCanvas = 50

    // console.log('lineX', linePos.x, 'SpaceTaken', wordSpaceOnCanvas);
    // if(window.innerWidth < 560){
    //     if(clickedPos.x >= stickerPos.x -150 && clickedPos.x  < stickerPos.x + 50 && clickedPos.y  >= stickerPos.y -150 && clickedPos.y   <= stickerPos.y -100){
    //         return true
    //     }
    //     return false
    // }else

    if(clickedPos.x >= stickerPos.x -50 && clickedPos.x  < stickerPos.x + 150 && clickedPos.y  >= stickerPos.y -50 && clickedPos.y   <= stickerPos.y + 50){
        return true
    }
    return false
  }

function setTextDrag(bool, idx){
    gMeme.lines[idx].isDrag = bool
}



//Move the Text in a delta, diff from the pervious pos
function moveText(dx, dy, idx) {
    console.log(gMeme.lines[idx].pos.x);
    gMeme.lines[idx].pos.x += dx
    console.log(gMeme.lines[idx].pos.x);
    gMeme.lines[idx].pos.y += dy 
  }


// function findLineIdxByText(txt){
//     return gMeme.lines.find(line=>line.txt === txt)
// }

function changeAlign(dir){
    gMeme.lines.forEach(line=>line.align = dir)
}

function deleteLine(){
    gMeme.lines.forEach((line)=>{
    line.txt = ''
    line.linewidth = 1
    return
})
    
}

function setLineWidth(){
    gMeme.lines.forEach((line)=>line.linewidth++)
}

function setFont(val){
    gMeme.lines.forEach((line)=>line.font = val)

}

function saveSticker(sticker,x,y){
    gMeme.stickers.push({
        sticker,
        pos:{x, y},
        isDrag: false,
    })
}

function setStickerDrag(bool,idx){
    gMeme.stickers[idx].isDrag = bool
}

function moveSticker(dx, dy, idx) {
    console.log(gMeme.stickers[idx].pos.x);
    gMeme.stickers[idx].pos.x += dx
    console.log(gMeme.stickers[idx].pos.x);
    gMeme.stickers[idx].pos.y += dy 
  }


function getKeywordsMap(){
    return gKeywordSearchCountMap
}