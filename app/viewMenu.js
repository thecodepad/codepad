module.exports = {
  viewMenu
}

// 'View' Menu Buttons
function viewMenu () {
  document.getElementById('dev').addEventListener('click', () => {
    remote.getCurrentWindow().toggleDevTools()
  })
  document.getElementById('full').addEventListener('click', () => {
     if (!remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().maximize()
    } else {
     remote.getCurrentWindow().unmaximize()
    }
  })
}
