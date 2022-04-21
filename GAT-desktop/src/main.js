const path = require("path");
const { app, BrowserWindow } = require( 'electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    });

    win.loadFile(path.join(__dirname, "../dist/index.html"));
};

app.whenReady().then(() => {
    createWindow()
});

