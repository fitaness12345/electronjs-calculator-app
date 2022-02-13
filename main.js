const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

let main;

app.on('ready', function(){

    // Create window
    main = new BrowserWindow({
        transparent: true.valueOf,
        frame: false,
        fullscreen: true,
    });

    // Load html file
    main.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true 
    }));

    main.setIcon(path.join(__dirname, './icon/calculator-icon.jpg'))
    
});

