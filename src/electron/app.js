import url from 'url'
import path from 'path'
import { app, BrowserWindow } from 'electron'

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1400, hight: 1400});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('close', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function() {
  if(mainWindow === null) {
    createWindow();
  }
});
