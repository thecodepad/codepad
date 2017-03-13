module.exports = {
  helpMenu
}

function helpMenu () {
  // Open links in the 'Help' menu in the default browser
  var helpa = document.getElementById('help-menu').getElementsByTagName('a')
  for (var i = 0; i < helpa.length; i++) {
    helpa[i].addEventListener('click', function (e) {
      e.preventDefault()
      shell.openExternal(this.href)
    })
  }
}
