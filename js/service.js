'use strict'

var gImgs = [];
var gMeme;



function setImgsForDisplay() {
    gImgs = _createImgs()
}

// This function moves the text with arrow keys - bad function name
function setMemeCoords(evKeycode) {
    switch (evKeycode) {
        case 37:
            gMeme.lines[gMeme.selectedLineIdx].coords.x = gMeme.lines[gMeme.selectedLineIdx].coords.x - 5
            updateTextOutline('x', - 5)
            break;
        case 38:
            gMeme.lines[gMeme.selectedLineIdx].coords.y = gMeme.lines[gMeme.selectedLineIdx].coords.y - 5
            updateTextOutline('y', - 5)
            break;
        case 39:
            gMeme.lines[gMeme.selectedLineIdx].coords.x = gMeme.lines[gMeme.selectedLineIdx].coords.x + 5
            updateTextOutline('x', + 5)
            break;
        case 40:
            gMeme.lines[gMeme.selectedLineIdx].coords.y = gMeme.lines[gMeme.selectedLineIdx].coords.y + 5
            updateTextOutline('y', + 5)
            break;
    }
}

function setLineCoords(height, width) {
    gMeme.lines[0].coords.y = height - (height - 50)
    gMeme.lines[0].coords.x = width - (width / 2)
    gMeme.lines[1].coords.y = height - 50
    gMeme.lines[1].coords.x = width - (width / 2)
    resizeText(width)
}

function resizeText(width) {
    gMeme.lines[0].size = width / 10
    gMeme.lines[1].size = width / 10
}

function setFontFamily(newFont) {

    gMeme.lines.map(line => {
        line.fontFamily = newFont
    })
}

function setSelectedTxt(newSelection){
    gMeme.selectedLineIdx = newSelection
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


function getCurrMeme() {
    return gMeme;
}

function getImgsForDisplay() {
    return gImgs;
}

function addNewLine(newLine) {
    gMeme.lines.push(newLine)
}

// Creating things | Playing god

function createNewLine(height, width) {
    var newLine = {
        txt: 'Your Text Here',
        size: width / 10,
        fontFamily: 'Impact',
        align: 'center',
        color: '#ffffff',
        bordColor: '#000000',
        coords: {
            y: height / 2,
            x: width / 2
        }
    }
    addNewLine(newLine)
}

// this creates the initial gMemes - bad function name
function genCurrMeme(id, lineIdx, txt, size, align, color, bordColor, fontFamily) {
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

// function _createImgs() {
//     var imgs = []
//     for (var i = 1; i < 19; i++) {
//            imgs.push({url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/${i}.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'undefined'})
//         }
//         return imgs;
// }

function _createImgs() {
    // TODO add storage
    // needs to be like this for keywords
    var imgs = [
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/1.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'songs, music' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/2.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'money, boss, trump' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/3.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'puppys, dogs, cute' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/4.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'puppys, dogs, cute, baby' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/5.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'baby, fuck yes' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/6.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'cat, sleeping, funny' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/7.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'no way, tell me more' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/8.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'evil' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/9.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'you, finger' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/10.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'what, WHAT, ?' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/11.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'alines' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/12.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'billion $' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/13.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'dancing, funny' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/14.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'money, boss, trump, obama' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/15.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'cute, baby' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/16.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'puppys, dogs, cute, funny' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/17.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'presadent, obama, usa' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/18.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'celtics, paul, kiss' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/19.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'toy story, buzz, movies' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/20.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'cheers, movie, star' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/21.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'matrix, glasses, cool' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/22.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'one dose not simply walk into mordor' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/23.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'operah, you get a car' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/24.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'facepalm, startrek' },
        { url: `<img id="${parseInt(Math.random() * 1000)}" class="meme-img" src="img/meme-imgs/25.jpg" onclick="onOpenEditorModal(this)" alt="oops! img failed to load">`, keywords: 'russia' },
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

