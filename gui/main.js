const { app, BrowserWindow, Menu } = require('electron')
const shell = require('shelljs')
const express = require('express')
const util = require("util");
const fs = require("fs");
const server = express()


const port = 3000
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


let win

function createWindow() {
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
  win.loadFile('index.html')

  server.use(express.json());
  server.get('/', (req, res) => {
    readSettings().then(obj => {
      res.send(obj)
    });
  });

  server.post('/remove-from-list', (req, res) => {
    readSettings().then(settingArray => {
      settingArray.folders.splice(req.body.index, 1);
      writeSettings("../folder-list.settings", settingArray.folders.toString()).then(
        res.send({ 'status': `${req.body.value} is removed.` })
      );
    });
  });

  server.post('/add-file', (req, res) => {
    readSettings().then(settingArray => {
      const newPath = req.body.path.toString();
      var newFileContent = ""
      if(`${settingArray.folders.toString()}`.length < 2){
         newFileContent = `${newPath}`.replace("\n", "");
      }else{
         newFileContent = `${settingArray.folders.toString()},${newPath}`.replace("\n", "");
      }
      
      writeSettings("../folder-list.settings", newFileContent).then(a => {
        res.send({ 'status': `${req.body.path} is added.` })
      })
    });
  });


  server.post('/save-destination', (req, res) => {
    const newPath = req.body.path.toString();
    writeSettings("../backup-destination.settings", newPath).then(a => {
      res.send({ 'status': `${req.body.path} is changed.` })
    });
  });

  server.post('/backup', (req, res) => {

    shell.config.execPath = shell.which('node');
    shell.exec('bash ../manager-gui.sh');
    res.send({ 'status': "Backup Complete." });
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


async function readSettings() {

  let fileList = await readFile('../folder-list.settings', 'utf8');
  fileList = fileList.split(",");
  let backupDestination = await readFile('../backup-destination.settings', 'utf8');
  backupDestination = backupDestination.split(",");

  var obj = {
    'folders': fileList,
    'destination': backupDestination
  }
  return obj;
}


async function writeSettings(path, content) {
  const writeResult = await writeFile(
    `${path}`, content);
  return true;
}
