const { nativeImage } = require('electron');
const path = require('path');

const cursorImagePath = path.join(__dirname, 'PR_cursor.png');
const cursorImage = nativeImage.createFromPath(cursorImagePath);
const cursorDataURL = cursorImage.toDataURL();

let cursorTimeout;

function setupMouseMoveHandler(defaultCursor) {
    const cursor = defaultCursor ? 'default' : `url(${cursorDataURL}), auto`;
    document.body.style.cursor = cursor;

    const startCursorTimer = () => {
        cursorTimeout = setTimeout(() => {
            document.body.style.cursor = 'none';
        }, 3000);
    };

    const resetCursorTimer = () => {
        clearTimeout(cursorTimeout);
        document.body.style.cursor = cursor;
        startCursorTimer();
    };

    document.addEventListener('mousemove', resetCursorTimer);
    document.addEventListener('mouseenter', resetCursorTimer);
}

module.exports = {
    setupMouseMoveHandler,
};
