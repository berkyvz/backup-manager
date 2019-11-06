const { app, BrowserWindow, Menu } = require('electron')


let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'assets/ico.png',
    webPreferences: {
      nodeIntegration: true
    }
  });
  new Menu.setApplicationMenu(null);
  
  win.loadFile('index.html')
  win.on('closed', () => {
    win = null
  }); 
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});


