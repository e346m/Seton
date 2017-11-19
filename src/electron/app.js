import url from 'url'
import path from 'path'
import { app, BrowserWindow, shell } from 'electron'
import { client } from 'electron-connect'

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow();
	mainWindow.maximize();
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools();
    console.log('Looks like we are in development mode!');
  }

  mainWindow.on('close', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', (event, _url) => {
    event.preventDefault()
    const protocol = url.parse(_url).protocol
    if (protocol === 'http:' || protocol === 'https:') {
      shell.openExternal(_url)
    }
  })
}

if (process.env.NODE_ENV !== 'production') {
  app.on('ready', () => {
    client.create(createWindow)
  });
} else {
  app.on('ready', createWindow);
}

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
