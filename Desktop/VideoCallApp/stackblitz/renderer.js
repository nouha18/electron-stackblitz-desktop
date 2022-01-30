// main.js
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true;
// Modules to control application life and create native browser window
const { app, BrowserView,BrowserWindow,ipcMain, nativeTheme } = require('electron')
const path = require('path')
const node_abi = require('node-abi');
//import sdk from '@stackblitz/sdk';



function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
     
     // const view = BroroutView();
      // win.setBrowserView(view);
     //view.setBounds({x:0,y:0,width:400,height:400})
      //view.webContents.loadURL('https://stackblitz.com/')
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }

    })
     win.loadFile('loading.html');
     setTimeout(()=>{win.loadURL('https://stackblitz.com/')},2900);
    ;
    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
      })
    
      ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
      })
    }
    
  
  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        
          const {session} = require('electron')
          session.defaultSession.webRequest.onHeadersReceived((detail,callback)=>{
            callback({responseHeaders:`default-src 'self'`})

          })
          createWindow()
      }
    })
  })
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
