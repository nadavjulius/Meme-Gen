'use strict'


// way to many globals :/
var gCanvas;
var gCtx;
var gCurrImg;
var gEditing = false;
var gMemeTxts = []
var gIndexCounter = 0


function onInit() {
    setImgsForDisplay()
    renderImgs()

    gCanvas = document.getElementById('meme-content')
    gCtx = gCanvas.getContext('2d')
}

function onOpenEditorModal(elImg) {
    gCurrImg = elImg

    displayModalCanvas()
    resizeImgandContainer()
    genCurrMeme(gCurrImg.id, 0, 'Your Text Here', 40, 'center', '#ffffff', '#000000', 'impact');
    renderMeme()
}

function updateTextOutline(coord, diff) {
    var meme = getCurrMeme()
    switch (coord) {
        case 'x':
            gMemeTxts[meme.selectedLineIdx].x = gMemeTxts[meme.selectedLineIdx].x + diff * 2.5
            break
        case 'y':
            gMemeTxts[meme.selectedLineIdx].y = gMemeTxts[meme.selectedLineIdx].y + diff
            break
    }
}

// TODO make imges also show up on backspace
// TODO identify when input is empty (?)
// TODO remove setimout
function searchInMemes(){
    var displayedImgs = getImgsForDisplay()
    displayedImgs.forEach(img => {
        var typedTxt = document.querySelector('.main-search-bar')
        // debugger  
        if(!img.keywords.includes(typedTxt.value)) {
            var imgc = document.getElementById(img.id)
            imgc.style.display = "none"
            setTimeout(() => {
                imgc.style.display = "block"
                
            }, 5000);
        } 
        
    });
    
}



// Editor Functions
function onTextTyped() {
    if (event.keyCode === 40 || event.keyCode === 39 || event.keyCode === 38 || event.keyCode === 37) {
        // eventually this will be when you click on the text box
        setMemeCoords(event.keyCode)
    }

    var currtext = getTypedText()
    setMemeTxt(currtext)
    // fitOutline()
    renderMeme()
}

function getTypedText() {
    // This is unnecisary
    var elMemeTxt = document.querySelector('#meme-text')
    return elMemeTxt.value
}

function onFontFamily() {
    var elFontSelector = document.querySelector('.fonts')
    setFontFamily(elFontSelector.value)
    renderMeme()
}

function onTxtColor() {
    var elTxtColor = document.querySelector('#txt-color')
    setTxtColor(elTxtColor.value)
    renderMeme()
}

function onTxtBorderColor() {
    var elTxtColor = document.querySelector('#txt-bord-color')
    setTxtBordColor(elTxtColor.value)
    renderMeme()
}

function handleFontSize(size) {
    setFontSize(size)
    renderMeme()
}

function onClearText() {

    var elMemeTxt = document.querySelector('#meme-text')
    elMemeTxt.value = ''
    setMemeTxt(elMemeTxt.value)
    renderMeme()
}

function handleTxtDirection(direction) {
    setTxtDirection(direction)
    renderMeme()
}

function handleTxtLineToggle() {
    setToggleTxtLine()
    var elMemeTxt = document.querySelector('#meme-text')
    var meme = getCurrMeme()
    var text = meme.lines[meme.selectedLineIdx].txt
    elMemeTxt.value = text
    renderMeme()
}

function handleNewTxtLine() {
    var canvas = document.querySelector('.meme-content')
    createNewLine(canvas.height, canvas.width)

    var textLength = gCtx.measureText('Your Text Here').width
    createTextObj(textLength, canvas.width / 2 / 2.5, canvas.height / 2)
    renderMeme()
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

// 150% 50%
function selectCtx(ev) {
    var pos = getMousePos(ev)
    gMemeTxts.map(line => {
        // TODO make more accurite its like 70% at best
        if (pos.x >= line.x && pos.x <= line.x + line.textLength &&
            pos.y * 1.5 >= line.y && pos.y <= line.y + line.txtHeight) {                
            setSelectedTxt(line.selectedLineIdx)
        }
    })
    renderMeme()
}

function getMousePos(ev) {
    var r = gCanvas.getBoundingClientRect();
    return {
        x: ev.clientX - r.left,
        y: ev.clientY - r.top
    };
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

    var textLength = gCtx.measureText(text).width

    if (!gEditing) {
        createTextObj(textLength, x / 2.5, y)
    } else {
        updateTextObj(textLength, x, y)
    }
}


// these are here because the html leans heavily on them while the
// service has its own copy of text alignment on canvas
function updateTextObj(textLength, x, y) {
    var txtHeight = parseInt(gCtx.font);
    var meme = getCurrMeme()
    gMemeTxts[meme.selectedLineIdx].x = x - textLength / 2
    gMemeTxts[meme.selectedLineIdx].y = y
    gMemeTxts[meme.selectedLineIdx].txtHeight = txtHeight
    gMemeTxts[meme.selectedLineIdx].textLength = textLength
}

function createTextObj(textLength, x, y) {
    var txtHeight = parseInt(gCtx.font);
    // debugger
    var newTxt = {
        x,
        y,
        txtHeight,
        textLength,
        selectedLineIdx: gIndexCounter
    }
    gMemeTxts.push(newTxt)
    gIndexCounter++
}

function drawRect(x, y, txtHeight, textLength) {

    gCtx.beginPath()
    gCtx.rect(x, y - txtHeight * 0.9, textLength * 1.05, txtHeight)
    gCtx.strokeStyle = 'grey'
    gCtx.stroke()

}

function resizeImgandContainer() {
    var canvasContainer = document.querySelector('.canvas-container')
    var scale = Math.min(canvasContainer.offsetWidth / gCurrImg.width, canvasContainer.offsetHeight / gCurrImg.height);
    canvasContainer.style.width = `${gCurrImg.width * scale}px`
    canvasContainer.style.height = `${gCurrImg.height * scale}px`
    canvasContainer.style.alignSelf = 'center'
}

function setCanvasSize() {
    var canvas = document.querySelector('.meme-content')
    var canvasContainer = document.querySelector('.canvas-container')
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    setLineCoords(canvas.height, canvas.width)
}

// Rendering
function renderMeme() {
    if (!gEditing) setCanvasSize()
    var lineCount = 0
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
        if (lineCount === meme.selectedLineIdx) {

            drawRect(gMemeTxts[meme.selectedLineIdx].x, gMemeTxts[meme.selectedLineIdx].y,
                gMemeTxts[meme.selectedLineIdx].txtHeight, gMemeTxts[meme.selectedLineIdx].textLength)
        }
        lineCount++
    })
    gEditing = true;
    lineCount = 0
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


function displayModalCanvas() {
    var modal = document.querySelector('.editor-modal-container')
    modal.style.display = 'flex'
    var imgs = document.querySelector('.pre-editor-container')
    imgs.style.display = 'none'
}

