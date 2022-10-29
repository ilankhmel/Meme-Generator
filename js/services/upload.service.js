
function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")
    document.querySelector('.share-container').style.display = 'block'
    document.querySelector('.upload').style.display = 'block'
    function onSuccess(uploadedImgUrl) {
      const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      console.log(encodedUploadedImgUrl)
      document.querySelector('.upload').innerText = `Your photo is available here: ${uploadedImgUrl}`
      document.querySelector('.share-container').innerHTML = `
          <button class="share-link" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
             Share   
          </button>`
    }
    doUploadImg(imgDataUrl, onSuccess)
  }
  
  function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
  
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
      if (XHR.readyState !== XMLHttpRequest.DONE) return
      if (XHR.status !== 200) return console.error('Error uploading image')
      const { responseText: url } = XHR
      console.log('Got back live url:', url)
      onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
      console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
  }
  
  
  
  
  