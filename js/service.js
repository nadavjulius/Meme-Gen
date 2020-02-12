'use strict'

var gImgs = [];
var gMeme;



// Getting and Setting things

function setMemeCoords(evKeycode) {
    switch (evKeycode) {
        case 37:
            gMeme.lines[gMeme.selectedLineIdx].coords.x = gMeme.lines[gMeme.selectedLineIdx].coords.x - 5
            break;
        case 38:
            gMeme.lines[gMeme.selectedLineIdx].coords.y = gMeme.lines[gMeme.selectedLineIdx].coords.y - 5
            break;
        case 39:
            gMeme.lines[gMeme.selectedLineIdx].coords.x = gMeme.lines[gMeme.selectedLineIdx].coords.x + 5
            break;
        case 40:
            gMeme.lines[gMeme.selectedLineIdx].coords.y = gMeme.lines[gMeme.selectedLineIdx].coords.y + 5
            break;
    }
}

function setFontFamily(newFont) {

    gMeme.lines.map(line =>{
        line.fontFamily = newFont
    })
}

function setToggleTxtLine() {
    gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1
    if (gMeme.selectedLineIdx === gMeme.lines.length) gMeme.selectedLineIdx = 0;
}

function setTxtDirection(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}

function setFontSize(sizeDirection) {
    gMeme.lines[gMeme.selectedLineIdx].size = gMeme.lines[gMeme.selectedLineIdx].size + sizeDirection
}

function setTxtBordColor(newBordColor) {
    gMeme.lines[gMeme.selectedLineIdx].bordColor = newBordColor
}

function setTxtColor(newTxtColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newTxtColor
}

function setMemeTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}


function setImgsForDisplay() {
    gImgs = _createImgs()
}

function getCurrMeme() {
    return gMeme;
}

function getImgsForDisplay() {
    return gImgs;
}

// Creating things | Playing god

function createNewLine() {
    var newLine = {
        txt: 'Your Text Here',
        size: 50,
        fontFamily: 'Impact',
        align: 'center',
        color: '#ffffff',
        bordColor: '#000000',
        coords: {
            x: 250,
            y: 250
        }
    }
    addNewLine(newLine)
}

function addNewLine(newLine) {
    gMeme.lines.push(newLine)
}

// this creates teh initial gmemes - bad function name
function updateCurrMeme(id, lineIdx, txt, size, align, color, bordColor, fontFamily) {
    gMeme = {
        selectedImgId: id,
        selectedLineIdx: lineIdx,
        lines: [
            {
                txt,
                size,
                fontFamily,
                align,
                color,
                bordColor,
                coords: {
                    x: 250,
                    y: 50
                }
            },
            {
                txt,
                size,
                fontFamily,
                align,
                color,
                bordColor,
                coords: {
                    x: 250,
                    y: 450
                }
            }
        ]
    }
}

function _createImgs() {
    // TODO add storage
    // BONUS this can be done in a for loup and a counter instead of all these objects hard coded
    var imgs = [
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/1.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/2.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/3.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/4.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/5.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/6.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/7.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/8.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/9.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/10.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/11.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/12.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/13.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/14.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/15.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/16.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/17.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/18.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined' },
    ]
        .map(_createImg)
    return imgs;
}

function _createImg(obj) {
    var id = obj.url.split('"')
    id = id[1]
    return {
        id,
        url: obj.url,
        keywords: obj.keywords
    }
}

