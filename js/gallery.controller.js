function renderGallery(){
    var images = getImages()
    var strHTMLS = images.map(img=>
      `<img class="gallery-img" src="${img.url}" onclick="onImgSelect(${img.id})">`  
        )
    document.querySelector('.image-gallery').innerHTML = strHTMLS.join('')
}

function onImgSelect(id){
    console.log(id);
    setImg(id)
    renderMeme()
}

function onSetFilterBy(val){
    console.log(val);
    setFilterBy(val)
    renderGallery()
    // document.querySelector('.filter').value = ''
}