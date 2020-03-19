 const electron = require("electron");

const {
    app,
    BrowserWindow, 
    Menu, 
    ipcMain
} = electron;

let todayWindow;
let createWindow;
let listWindow;
let aboutWindow;



app.on("ready", () => {
    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title: "Aplikasi Dokter"
    });

    todayWindow.loadURL(`file://${ __dirname}/today.html`);
    todayWindow.on("closed", () => {
        app.quit();
        todayWindow = null;
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
        title: "All Appointments"
    });
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${ __dirname}/list.html`);
    listWindow.on("clsed", () => (listWindow = null))
}; 
const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appointments"
    });
    createWindow.setMenu(null);
    createWindow.loadURL(`file://${ __dirname}/create.html`);
    createWindow.on("clsed", () => (createWindow = null))
}; 

const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create about"
    });
    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${ __dirname}/about.html`);
    aboutWindow.on("clsed", () => (aboutWindow = null))
}; 

ipcMain.on("appointment:create", (event, appointment) => {
    console.log(appointment);
});

ipcMain.on("appointment:repuest:list", event => {
    console.log("here");
});

ipcMain.on("appointment:repuest:today", event => {
    console.log("here2");
});

ipcMain.on("appointment:done", (event, id) => {
    console.log("here3")
});


const menuTemplate = [{
    label: "File",
    submenu: [{
        label: "New Appointment",
        click() {
            createWindowCreator();
        }
    },
    {
        label: "All Appointment",
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
},

{
    label: "about",
    click() {
    aboutWindowCreator();
    }

}
]



