
/* eslint-disable */
require('dotenv').config();
const { app, BrowserWindow } = require('electron');


require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

console.log(process.env.NODE_ENV)
let url;
// url = 'http://localhost:8080/'
if (process.env.NODE_ENV === 'DEV') {
    url = 'http://localhost:8080/'
} else {

    url = `file://${process.cwd()}/dist/index.html`
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    win.loadURL(url);


    //   win.webContents.openDevTools()


    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
