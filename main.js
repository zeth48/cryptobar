var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var path = require('path');
const {app, menu, Tray} = require('electron');
//No frameless API for macOS https://github.com/electron/electron/blob/master/docs/api/frameless-window.md
//For more option check https://github.com/electron/electron/blob/master/docs/api/browser-window.md
function createWindow(){
	window = new BrowserWindow({
		width: 600,
		height: 400,
		transparent: true,
		frame: false,			//removes title bar --> Frameless on Ubuntu
		show: false				//set to false for dock
	});
	window.loadURL('file://'+__dirname+'/index.html');
	window.on('close', function(){
		window = null;
	})
	window.on('blur', function(){
   		window.hide();			//Window hides when you click somewhere else
 	})
 	const iconPath = path.join(__dirname, 'img/bitcoin.png');
 	tray = new Tray(iconPath);
}
app.on('ready', createWindow);
