module.exports = {
  addScript,
  getJsLibs
}

function getJsLibs () {
  var jsHtml = ''
  for (var i = 0; i < jsLib.length; i++) {
    if (scrFlags[i] === 1) {
      jsHtml += jsLib[i][1].replace('lib/', '')
    }
  }
  return jsHtml
}

function addScript () {
  var jsMenu = document.getElementById('js-menu')
  var jsButtons = jsMenu.getElementsByTagName('a')
  let jsSpan = jsMenu.querySelectorAll('span')
  jsButtons[0].addEventListener('click', function (e) {
    var jqScr = jsLib[0][1]
    if (scrFlags[0] === 0) {
      scripts += jqScr
      scrFlags[0] = 1
      toggleStatus(0, jsSpan)
    } else if (scrFlags[2] === 0) {
      scripts = scripts.replace(jqScr, '')
      scrFlags[0] = 0
      toggleStatus(0, jsSpan)
    }
  })
  jsButtons[1].addEventListener('click', function (e) {
    var aniScr = jsLib[1][1]
    if (scrFlags[1] === 0) {
      scripts += aniScr
      scrFlags[1] = 1
      toggleStatus(1, jsSpan)
    } else {
      scripts = scripts.replace(aniScr, '')
      scrFlags[1] = 0
      toggleStatus(1, jsSpan)
    }
  })
  jsButtons[2].addEventListener('click', function (e) {
    var jqScr = jsLib[0][1]
    var boScr = jsLib[2][1]
    if (scrFlags[0] === 0) {
      toggleStatus(0, jsSpan)
      scripts += jqScr
      scrFlags[0] = 1
    }
    if (scrFlags[2] === 0) {
      scripts += boScr
      scrFlags[2] = 1
      toggleStatus(2, jsSpan)
    } else {
      scripts = scripts.replace(boScr, '')
      scrFlags[2] = 0
      toggleStatus(2, jsSpan)
    }
  })
  jsButtons[3].addEventListener('click', function (e) {
    var p5Scr = jsLib[3][1]
    if (scrFlags[3] === 0) {
      scripts += p5Scr
      scrFlags[3] = 1
      toggleStatus(3, jsSpan)
    } else {
      scripts = scripts.replace(p5Scr, '')
      scrFlags[3] = 0
      toggleStatus(3, jsSpan)
    }
  })
  jsButtons[4].addEventListener('click', function (e) {
    var thScr = jsLib[4][1]
    if (scrFlags[4] === 0) {
      scripts += thScr
      scrFlags[4] = 1
      toggleStatus(4, jsSpan)
    } else {
      scripts = scripts.replace(thScr, '')
      scrFlags[4] = 0
      toggleStatus(4, jsSpan)
    }
  })
}
