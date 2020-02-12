'use strict'

var gCanvas;
var gCtx;
var gCurrImg;


function onInit() {
    setImgsForDisplay()
    renderImgs()

    gCanvas = document.getElementById('meme-content')
    gCtx = gCanvas.getContext('2d')

}

function onOpenEditorModal(elImg) {

    //TODO show modal and hide imgs(?)
    renderModalCanvas();
    drawImg(elImg);
    gCurrImg = elImg
    var txt = 'Start Typing'

    updateCurrMeme(gCurrImg.id, 0, txt, 50, 'center', '#ffffff', '#000000',  'impact');
    // Todo set to fit actual lines
    renderNewMeme()
}


// Editor Functions
function onTextTyped() {
    if (event.keyCode === 40 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 37) {
        // eventually this will be when you click on the text box
        setMemeCoords(event.keyCode)

    }

    var currtext = getTypedText()
    setMemeTxt(currtext)
    renderNewMeme()
}

function getTypedText() {
    // This is unnecisary
    var elMemeTxt = document.querySelector('#meme-text')
    return elMemeTxt.value
}

function onFontFamily() {
    var elFontSelector = document.querySelector('.fonts')    
    setFontFamily(elFontSelector.value)
    renderNewMeme()
}

function onTxtColor() {
    var elTxtColor = document.querySelector('#txt-color')
    setTxtColor(elTxtColor.value)
    renderNewMeme()
}

function onTxtBorderColor() {
    var elTxtColor = document.querySelector('#txt-bord-color')
    setTxtBordColor(elTxtColor.value)
    renderNewMeme()
}

function handleFontSize(size) {
    setFontSize(size)
    renderNewMeme()
}

function onClearText() {
    //TODO this needs to zero out everything
    drawImg(gCurrImg)
    gCtx.save()
    var elMemeTxt = document.querySelector('#meme-text')
    elMemeTxt.value = ''
}

function handleTxtDirection(direction) {
    setTxtDirection(direction)
    renderNewMeme()
}

function handleTxtLineToggle() {
    setToggleTxtLine()
    var elMemeTxt = document.querySelector('#meme-text')
    var meme = getCurrMeme()
    // debugger
    var text = meme.lines[meme.selectedLineIdx].txt
    elMemeTxt.value = text

}

function handleNewTxtLine() {
    createNewLine()
    renderNewMeme()
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'myMeme-by-BlackCoffeeProductions'
}

function closeModal() {
    var modal = document.querySelector('.editor-modal-container')
    modal.style.display = 'none'
    var imgs = document.querySelector('.pre-editor-container')
    imgs.style.display = 'block'
}

// Canvas Functions

function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function drawText(text, color, bordColor, direction, size, fontFamily, x, y) {

    gCtx.lineWidth = '2'
    gCtx.strokeStyle = bordColor
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${fontFamily}`
    gCtx.textAlign = direction
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


// Rendering
function renderNewMeme() {
    var meme = getCurrMeme()
    drawImg(gCurrImg)
    meme.lines.map(line => {
        var text = line.txt
        var color = line.color
        var bordColor = line.bordColor
        var size = line.size
        var direction = line.align
        var fontFamily = line.fontFamily
        var x = line.coords.x
        var y = line.coords.y

        gCtx.restore()
        drawText(text, color, bordColor, direction, size, fontFamily, x, y)
        gCtx.save()
    })

}

function renderImgs() {
    let imgs = getImgsForDisplay();
    let fullStrHtml = imgs.map(img => {
        let strHtml = `${img.url}`
        return strHtml
    })
    let elImgsDisplay = document.querySelector('.meme-imgs-container')
    elImgsDisplay.innerHTML = fullStrHtml.join('')
}


function renderModalCanvas() {
    var modal = document.querySelector('.editor-modal-container')
    modal.style.display = 'flex'
    var imgs = document.querySelector('.pre-editor-container')
    imgs.style.display = 'none'
}