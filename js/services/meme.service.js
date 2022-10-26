var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
var gImgs = [{id: 1, url: 'meme-imgs(square)/1.jpg', keywords: ['funny', 'cat']},
{id: 2, url: 'meme-imgs(square)/2.jpg', keywords: ['funny', 'cat']}];

var gMeme = {
 selectedImgId: 1,
 selectedLineIdx: 0,
 lines: [
 {
 txt: 'I sometimes eat Falafel',
 size: 20,
 align: 'left',
 color: 'red'
 }
 ]
}


function getMeme(){
    return gMeme
}

function getImages(){
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

function setTextColor(color){
    gMeme.lines[0].color = color
}

function setTextSize(size){
    gMeme.lines[0].size = size
}

function addLine(){
    gMeme.lines.push(
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
            }
    )
}