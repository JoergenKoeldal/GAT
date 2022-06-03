const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));

    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('will-redirect', (event, url) => {
        mainWindow.loadFile(path.join(__dirname, "../dist/index.html"), {
            hash: url.split("#")[1]
        } );
    });
});




