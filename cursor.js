const { nativeImage } = require('electron');
const path = require('path');

const cursorImagePath = path.join(__dirname, 'PR_cursor.png');
const cursorImage = nativeImage.createFromPath(cursorImagePath);
const cursorDataURL = cursorImage.toDataURL();

function setCustomCursor() {
    document.body.style.cursor = `url(${cursorDataURL}), auto`;
}

function setupMouseMoveHandler() {
    let startCursorTimer = () => {
        cursorTimeout = setTimeout(() => {
            document.body.style.cursor = 'none';
        }, 3000);
    };

    let cursorTimeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(cursorTimeout);
        document.body.style.cursor = `url(${cursorDataURL}), auto`;
        startCursorTimer();
    });
}

module.exports = {
    setCustomCursor,
    setupMouseMoveHandler,
};
