function renderGallery(){
    var images = getImages()
    var strHTMLS = images.map(img=>
      `<img class="gallery-img" src="${img.url}" onclick="onImgSelect(${img.id})">`  
        )
    document.querySelector('.image-gallery').innerHTML = strHTMLS.join('')
}

function onImgSelect(id){
    setImg(id)
    renderMeme()
}