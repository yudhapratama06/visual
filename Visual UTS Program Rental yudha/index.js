const electron = require("electron");
const {v4 : uuidv4} = require('uuid');
uuidv4();

const {
    app,
    BrowserWindow, 
    Menu, 
    ipcMain
} = electron;

let halamanWindow;
let inputWindow;
let listWindow;

let outputdata = [];

app.on("ready", () => {
    halamanWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Aplikasi Rental Mobil"
    });
    
    halamanWindow.loadURL(`file://${ __dirname}/halaman.html`);
    halamanWindow.on("closed", () => {
        app.quit();
        halamanWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "List Data Pelamggan"
    });
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${ __dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = null))
}; 
const inputWindowCreator = () => {
    inputWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Input Data Pelanggan"
    });
    inputWindow.setMenu(null);
    inputWindow.loadURL(`file://${ __dirname}/input.html`);
    inputWindow.on("closed", () => (inputWindow = null))
}; 


ipcMain.on("inputdata:create", (event, mobil) => {
    mobil["id"] = uuidv4();
    mobil["done"] = 0;
    outputdata.push(mobil);

    inputWindow.close();

    console.log(outputdata);

});
ipcMain.on("rental:request:lis", event => {
    listWindow.webContents.send('rental:request:lis' ,outputdata);
});

ipcMain.on("rental:request:halaman", event => {
    console.log("here2");
});

ipcMain.on("mobil:done", (event, id) => {
    console.log("here3");
});

const menuTemplate = [{
    label: "Data Rental",
    submenu: [{
        label: "Input Data Pelanggan",
        click() {
            inputWindowCreator();
        }
    },
    {
        label: "List Data Pelanggan",
        click() {
            listWindowCreator();
        }
    },
    {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" :
        "ctrl + Q",
        click() {
            app.quit();
        }
    }
]
},

{   

    label: "View",
    submenu: [{ 
        role: "reload" 
    }, { 
    role: "toggledevtools" 
}]
}

]