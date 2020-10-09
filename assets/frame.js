const {remote} = require("electron")

var win = remote.getCurrentWindow()
document.querySelector(".hide").onclick = (e) =>{
	win.minimize()
}
document.querySelector(".size").onclick = (e) =>{
	win.isMaximized() ? win.unmaximize() : win.maximize()
}
document.querySelector(".close").onclick = (e) =>{
	win.close()
}