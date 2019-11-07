const { app, BrowserWindow, Menu } = require('electron')
const express = require('express')
const server = express()
const port = 3000

const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 600,
    icon: 'assets/ico.png',
    webPreferences: {
      nodeIntegration: true
    }
  });
  new Menu.setApplicationMenu(null);
  win.openDevTools()
  win.loadFile('index.html')

  server.get('/', (req, res) => {
    readSettings().then(obj => {
      res.send(obj)
    });
  });

  server.listen(port, () => console.log(`App is running on port ${port}!`))


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


async function readSettings(){

 let fileList =  await readFile('../folder-list.settings', 'utf8');
 fileList = fileList.split(",");
 let backupDestination =  await readFile('../backup-destination.settings', 'utf8');
 backupDestination = backupDestination.split(",");
 
 var obj = {
    'folders': fileList,
    'destination': backupDestination
  } 
  return obj;
}
