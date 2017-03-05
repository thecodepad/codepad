var editor = []
var menu
var output, html, css, js

const electron = require('electron')
const remote = electron.remote
const clipboard = electron.clipboard

const {
  Menu,
  MenuItem
} = remote

// Global variables
var scripts = ''
var styles = ''
var currentEditor = ''

// Functions for AddIns
const getScr = () => scripts
const getSty = () => styles
const getCurEditor = () => {
  getEditor()
  return currentEditor
}

function getEditor() {
  if (html.hasFocus()) {
    currentEditor = html
    console.warn('html')
  }
  if (css.hasFocus()) {
    currentEditor = css
    console.warn('css')
  }
  if (js.hasFocus()) {
    currentEditor = js
    console.warn('js')
  }
}

function newFile() {
  fileEntry = null
  hasWriteAccess = false
}

function handleNewButton(i) {
  if (false) {
    newFile()
    editor[i].setValue('')
  } else {
    window.open('file://' + __dirname + '/index.html')
  }
}

// Context menu init()
function initContextMenu() {
  menu = new Menu()
  menu.append(new MenuItem({
    label: 'Copy',
    click: function () {
      var editor = getCurEditor()
      console.info(editor)
      var text = editor.getSelection()
      clipboard.writeText(text)
    }
  }))
  menu.append(new MenuItem({
    label: 'Cut',
    click: function () {
      var editor = getCurEditor()
      console.info(editor)
      var text = editor.getSelection()
      clipboard.writeText(text)
      editor.replaceSelection('')
    }
  }))
  menu.append(new MenuItem({
    label: 'Paste',
    click: function () {
      var editor = getCurEditor()
      console.info(editor)
      editor.replaceSelection(clipboard.readText())
    }
  }))

  window.addEventListener('contextmenu', function (ev) {
    ev.preventDefault()
    menu.popup(remote.getCurrentWindow(), ev.x, ev.y)
  }, false)
}

// Main Functions for Electron
onload = function () {
  initContextMenu()

  document.getElementById('min-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.minimize()
    console.log('Minimize Triggered!')
  })

  document.getElementById('max-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
    console.log('Maximize Triggered!')
    console.log(document.getElementById('close-button'))
  })

  document.getElementById('close-button').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.close()
  })

  document.getElementById('close-window').addEventListener('click', function (e) {
    const window = remote.getCurrentWindow()
    window.close()
  })
  document.getElementById('new').addEventListener('click', handleNewButton)

  editor[0] = CodeMirror(
    document.getElementById('html-editor'), {
      mode: {
        name: 'htmlmixed'
      },
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentWithTabs: false,
      indentUnit: 2,
      smartIndent: true,
      scrollbarStyle: 'overlay',
      theme: 'base16-ocean-dark'
    })

  editor[1] = CodeMirror(
    document.getElementById('css-editor'), {
      mode: {
        name: 'css'
      },
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: false,
      indentUnit: 2,
      smartIndent: true,
      scrollbarStyle: 'overlay',
      theme: 'base16-ocean-dark'
    })

  editor[2] = CodeMirror(
    document.getElementById('js-editor'), {
      mode: {
        name: 'javascript',
        json: true
      },
      lineNumbers: true,
      lineWrapping: true,
      indentWithTabs: false,
      indentUnit: 2,
      smartIndent: true,
      scrollbarStyle: 'overlay',
      theme: 'base16-ocean-dark'
    })

  output = document.getElementById('output')
  editorLabels = document.getElementsByClassName('editor-label')
  html = editor[0]
  css = editor[1]
  js = editor[2]

  html.on('change', function (change) {
    paint()
  })

  css.on('change', function (change) {
    paint()
  })

  js.on('change', function (change) {
    paint()
  })

  html.on('focus', function (change) {
    removeFocus(editorLabels)
    editorLabels[0].classList.add('editor-focus')
  })

  css.on('focus', function (change) {
    removeFocus(editorLabels)
    editorLabels[1].classList.add('editor-focus')
  })

  js.on('focus', function (change) {
    removeFocus(editorLabels)
    editorLabels[2].classList.add('editor-focus')
  })

  addScript()
  addStyle()
  newFile()
  onresize()
}

function removeFocus(editor) {
  for (var i = 0; i < editor.length; i++) {
    editor[i].classList.remove('editor-focus')
  }
}
onresize = function () {
  for (var i = 0; i < 3; i++) {
    editor[i].refresh()
  }
}

function paint() {
  output.srcdoc = '<html>' + '<head>' + getSty() + '<style>' + 'body{margin:0;border:0;padding:0}' + css.getValue() + '</style>' + '</head>' + '<body>' + html.getValue() + getScr() + '<script>' + js.getValue() + '</script>' + '</body>' + '</html>'
  console.log(output.srcdoc)
}

function toggleStatus(i, span) {
  if (span[i].classList.contains('status-active')) {
    span[i].classList.remove('status-active')
  } else {
    span[i].classList.add('status-active')
  }
}

function addScript() {
  var jsMenu = document.getElementById('js-menu')
  var jsButtons = jsMenu.getElementsByTagName('a')
  let jsSpan = jsMenu.querySelectorAll('span')
  var ScrFlags = [0, 0, 0, 0]
  jsButtons[0].addEventListener('click', function (e) {
    toggleStatus(0, jsSpan)
    if (ScrFlags[0] === 0) {
      var bootjsStr = "<script src='lib/anime.min.js'></script>"
      scripts += bootjsStr
      ScrFlags[0] = 1
      console.log('Anime added!')
    }
  })
  jsButtons[1].addEventListener('click', function (e) {
    toggleStatus(1, jsSpan)
    toggleStatus(2, jsSpan)
    if (ScrFlags[2] === 0) {
      var jQStr = "<script src='lib/jquery-3.1.1.min.js'>"
      scripts += jQStr
      ScrFlags[2] = 1
      console.log('jQuery added!')
    }
    if (ScrFlags[2] === 1) {
      var bootjsStr = "</script><script src='lib/bootstrap.min.js'></script>"
      scripts += bootjsStr
      ScrFlags[1] = 1
      console.log('Bootstrap added!')
    }
  })
  jsButtons[2].addEventListener('click', function (e) {
    toggleStatus(2, jsSpan)
    if (ScrFlags[2] === 0) {
      var jQStr = "<script src='lib/jquery-3.1.1.min.js'></script>"
      scripts += jQStr
      ScrFlags[2] = 1
      console.log('jQuery added!')
    }
  })
  jsButtons[3].addEventListener('click', function (e) {
    toggleStatus(3, jsSpan)
    if (ScrFlags[3] === 0) {
      var js3Str = "<script src='lib/three.min.js'></script>"
      scripts += js3Str
      ScrFlags[3] = 1
      console.log('Three.js added!')
    }
  })
};

function addStyle() {
  var cssMenu = document.getElementById('css-menu')
  var cssButtons = cssMenu.getElementsByTagName('a')
  let cssSpan = cssMenu.querySelectorAll('span')
  var StyFlags = [0, 0, 0]
  cssButtons[0].addEventListener('click', function (e) {
    toggleStatus(0, cssSpan)
    if (StyFlags[0] === 0) {
      var aniStr = "<link rel='stylesheet' type='text/css' href='lib/animate.css'>"
      styles += aniStr
      StyFlags[0] = 1
      console.log('Animate added!')
    }
  })
  cssButtons[1].addEventListener('click', function (e) {
    toggleStatus(1, cssSpan)
    if (StyFlags[1] === 0) {
      var bootStr = "<link rel='stylesheet' type='text/css' href='lib/bootstrap.min.css'>"
      styles += bootStr
      StyFlags[1] = 1
      console.log('Bootstrap added!')
    }
  })
  cssButtons[2].addEventListener('click', function (e) {
    toggleStatus(2, cssSpan)
    if (StyFlags[2] === 0) {
      var faStr = "<link rel='stylesheet' type='text/css' href='lib/font-awesome.min.css'>"
      styles += faStr
      StyFlags[2] = 1
      console.log('Font Awesome added!')
    }
  })
};