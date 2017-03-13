const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')

let mainWindow

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.setAppUserModelId('CodePad')

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'CodePad',
    width: 1024,
    height: 720,
    frame: false,
    minHeight: 600,
    minWidth: 600,
    icon: path.join(__dirname, '../build/CB.ico')
  })

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
})
