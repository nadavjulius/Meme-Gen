'use strict'

var gCanvas;
var gCtx;
var gCurrImg;
var gEditing = false;


function onInit() {
    setImgsForDisplay()
    renderImgs()

    gCanvas = document.getElementById('meme-content')
    gCtx = gCanvas.getContext('2d')
}

function onOpenEditorModal(elImg) {

    renderModalCanvas();
    gCurrImg = elImg
    resizeImgandContaine()
    updateCurrMeme(gCurrImg.id, 0, 'Start Typing', 40, 'center', '#ffffff', '#000000', 'impact');
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

    var elMemeTxt = document.querySelector('#meme-text')
    elMemeTxt.value = ''
    setMemeTxt(elMemeTxt.value)
    renderNewMeme()
}

function handleTxtDirection(direction) {
    setTxtDirection(direction)
    renderNewMeme()
}

function handleTxtLineToggle() {
    setToggleTxtLine()
    var elMemeTxt = document.querySelector('#meme-text')
    var meme = getCurrMeme()
    var text = meme.lines[meme.selectedLineIdx].txt
    elMemeTxt.value = text

}

function handleNewTxtLine() {
    var canvas = document.querySelector('.meme-content')
    createNewLine(canvas.height, canvas.width)
    renderNewMeme()
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'myMeme-by-BlackCoffeeProductions'
}

function closeModal() {
    gEditing = false;
    var modal = document.querySelector('.editor-modal-container')
    modal.style.display = 'none'
    var imgs = document.querySelector('.pre-editor-container')
    imgs.style.display = 'block'
}

// Canvas Functions

function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}

function resizeImgandContaine() {
    var canvasContainer = document.querySelector('.canvas-container')
    var scale = Math.min(canvasContainer.offsetWidth / gCurrImg.width, canvasContainer.offsetHeight / gCurrImg.height);
    gCurrImg.width = gCurrImg.width * scale
    gCurrImg.height = gCurrImg.height * scale
    canvasContainer.style.width = `${gCurrImg.width}px`
    canvasContainer.style.height = `${gCurrImg.height}px`
    canvasContainer.style.alignSelf = 'center'
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

function setCanvasSize() {
    gEditing = true;
    var canvas = document.querySelector('.meme-content')
    var canvasContainer = document.querySelector('.canvas-container')
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    setLineCoords(canvas.height, canvas.width)
}

// Rendering
function renderNewMeme() {
    if (!gEditing) setCanvasSize()
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