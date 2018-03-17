var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var path = require('path');
const {app, Menu, Tray, MenuItem} = require('electron');

const WIN_LEN = 300;
const WIN_WID = 200;

var window = null;
var tray = null;
//No frameless API for macOS https://github.com/electron/electron/blob/master/docs/api/frameless-window.md
//For more option check https://github.com/electron/electron/blob/master/docs/api/browser-window.md
//Use for Linux as the position is set according to linux.
function createWindow(){
	window = new BrowserWindow({
		width: WIN_LEN,		
		height: WIN_WID,
		transparent: true,
		frame: false,			//removes title bar --> Frameless on Ubuntu
		show: false				//set to false for dock
	});
	window.loadURL('file://'+__dirname+'/index.html');
	window.on('close', function(){
		window = null;
	});
	window.on('blur', function(){
   		window.hide();			//Window hides when you click somewhere else
 	});
 	const iconPath = path.join(__dirname, 'img/bitcoin.png');
 	tray = new Tray(iconPath);
 	//The click event is ignored when using an app indicator tray icon.
 	tray.on('click', (event) => {
 		var screen = electron.screen;		//Gets info about the display
    	const cursorPosition = screen.getCursorScreenPoint();
	    const primarySize = screen.getPrimaryDisplay().workAreaSize;  
	    window.setPosition(cursorPosition.x - (WIN_LEN/2),  cursorPosition.y);
		window.isVisible() ? window.hide() : window.show();
 	});
}
app.on('ready', createWindow);