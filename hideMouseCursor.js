let cursorTimeout;
function startCursorTimer() {
    cursorTimeout = setTimeout(() => {
        document.body.style.cursor = 'none';
    }, 3000);
}

document.addEventListener('mousemove', () => {
    clearTimeout(cursorTimeout);
    document.body.style.cursor = 'default';
    startCursorTimer();
});

startCursorTimer();
