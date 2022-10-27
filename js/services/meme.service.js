var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
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
 size: 50,
 align: 'left',
 color: 'white',
 stroke: 'black',
 isFocused: false,
 }
 ]
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
    gMeme.lines[idx].size = size
}

function addLine(txt = ''){
    gMeme.lines.push(
        {
            txt,
            size: 50,
            align: 'left',
            color: 'white',
            stroke: 'black'
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