import url from 'url'
import path from 'path'
import { app, BrowserWindow, shell, Menu } from 'electron'
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
  var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
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
