const electron = require('electron');
const { v4 : uuidv4 } = require('uuid');
uuidv4();
const fs = require ('fs'); 

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    ipcRenderer
} = electron;

let kameraWindow;
let data_camera_Window;
let data_flash_Window;
let data_lensa_Window;
let data_pilihan_Window
let data_sewa_alat = [];
let riwayat_pembayaran = [];

var data_camera= [];
var data_flash= [];
var data_lensa= [];


fs.readFile("pembayaran.json", (err, jsonpembayaran) => {
    if(!err){
        const oldpembayaran =JSON.parse(jsonpembayaran);
        riwayat_pembayaran = oldpembayaran;
    }
});


fs.readFile("daftar.json", (err, jsondaftar) => {
    if(!err){
        const olddaftar =JSON.parse(jsondaftar);
        data_sewa_alat = olddaftar;
    }
});



process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on("ready", () => {
    kameraWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }, 
        title : "Sewa kamara murah dan berkualitas"
    });

    kameraWindow.loadURL(`file://${__dirname}/home.html`);
    kameraWindow.on("closed", () => {

       const jsonpembayaran = JSON.stringify(riwayat_pembayaran);
        fs.writeFileSync("pembayaran.json", jsonpembayaran);

        const jsondaftar = JSON.stringify(data_sewa_alat);
        fs.writeFileSync("daftar.json", jsondaftar);

        app.quit();
        kameraWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});


const data_camera_WindowCreator = () => {
    data_camera_Window = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 600,
        title: "Data Alat"
    });

    data_camera_Window.setMenu(null);
    data_camera_Window.loadURL(`file://${__dirname}/data_camera.html`);
    data_camera_Window.on("closed", () => (data_camera_Window = null));
};


const data_flash_WindowCreator = () => {
    data_flash_Window = new BrowserWindow({
    webPreferences: {
    nodeIntegration : true
    },
        width: 600,
        height: 600,
        title: "Data flash"
    });

    data_flash_Window.setMenu(null);
    data_flash_Window.loadURL(`file://${__dirname}/data_flash.html`);
    data_flash_Window.on("closed", () => (data_flash_Window = null));
};

const data_lensa_WindowCreator = () => {
    data_lensa_Window = new BrowserWindow({
    webPreferences: {
    nodeIntegration : true
      },
        width: 600,
        height: 600,
        title: "Data lensa"
    });

    data_lensa_Window.setMenu(null);
    data_lensa_Window.loadURL(`file://${__dirname}/data_lensa.html`);
    data_lensa_Window.on("closed", () => (data_lensa_Window = null));
};

const data_pilihan_WindowCreator = () => {
    data_pilihan_Window = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },
        width: 600,
        height: 600,
        title: "Data Alat"
    });

   data_pilihan_Window.setMenu(null);
    data_pilihan_Window.loadURL(`file://${__dirname}/pilihan.html`);
    data_pilihan_Window.on("closed", () => (data_pilihan_Window = null));
};



ipcMain.on('tampil_alat', (event, sewa) =>{
    kameraWindow.webContents.send('tampilkan', sewa);
});

ipcMain.on('status_alat', (event, sewa) =>{
    data_camera.push(sewa);
    console.log(data_camera);
    kameraWindow.loadURL(`file://${__dirname}/bayar.html`);
});

ipcMain.on('status_alat', (event, sewa) =>{
    data_flash.push(sewa);
    console.log(data_flash);
    kameraWindow.loadURL(`file://${__dirname}/bayar.html`);
});

ipcMain.on('status_alat', (event, sewa) =>{
    data_lensa.push(sewa);
    console.log(data_lensa);
    kameraWindow.loadURL(`file://${__dirname}/bayar.html`);
});



ipcMain.on("nexfom", function(){
    kameraWindow.loadURL(`file://${__dirname}/new_boking.html`);
});

ipcMain.on("pilihalat", function(){
    data_pilihan_WindowCreator();
});


ipcMain.on("kamera", function(){
    data_camera_WindowCreator();
});

ipcMain.on("flash", function(){
    data_flash_WindowCreator();
});

ipcMain.on("lensa", function(){
    data_lensa_WindowCreator();
});

ipcMain.on("sewa:create", (event, mysewa) => {
    mysewa["id"] = uuidv4();
    data_sewa_alat.push(mysewa);
    console.log(data_sewa_alat);


});


ipcMain.on("pembayaran", (event, mysewa) => {
    mysewa["id"] = uuidv4();
    riwayat_pembayaran.push(mysewa)
    console.log(riwayat_pembayaran);
    kameraWindow.loadURL(`file://${__dirname}/riwayat_pembayaran.html`);
});

ipcMain.on("transaksi:request:list", event =>{
    kameraWindow.webContents.send('transaksi:response:list', riwayat_pembayaran)
});

ipcMain.on("sewa_kamera:request:list", event =>{
    kameraWindow.webContents.send('sewa_kamera:response:list', data_camera)
});

ipcMain.on("sewa_kamera:request:list", event =>{
    kameraWindow.webContents.send('sewa_kamera:response:list', data_flash)
});

ipcMain.on("sewa_kamera:request:list", event =>{
    kameraWindow.webContents.send('sewa_kamera:response:list', data_lensa)
});

ipcMain.on("daftar_penyewaan:request:list", event => {
    kameraWindow.webContents.send('daftar_penyewaan:response:list', data_sewa_alat)
});



const menuTemplate = [{
        label : "Beranda",
        submenu:[{
            label : "Home",
            click(){
                kameraWindow.loadURL(`file://${__dirname}/home.html`);  
            }
         },

         
         {label: "Quit",
         accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl + Q",
         click() {
             app.quit();
         }
     }

    ]
    },

    {
        label : "Sewa Alat",
        click(){
            kameraWindow.loadURL(`file://${__dirname}/new_boking.html`);
        }
    },

    {
        label : "Transaksi",
        submenu:[ {
            label: "Data Pesanan",
            click(){
                kameraWindow.loadURL(`file://${__dirname}/daftarsewa.html`);
            }
        },
        {
            label: "Data Transaksi",
            click(){
                kameraWindow.loadURL(`file://${__dirname}/riwayat_pembayaran.html`);
            }
        },
        ]
    },

    
    {
        label : "Alat yang disewakan",
        submenu:[{
            label: "Kamera",
            click(){
                kameraWindow.loadURL(`file://${__dirname}/list_camera.html`);
            }
        },
        {
            label: "Flash Internal",
            click(){
                kameraWindow.loadURL(`file://${__dirname}/list_flash.html`);
            }
       
        },
        {
            label: "Lensa Kamera",
            click(){
                kameraWindow.loadURL(`file://${__dirname}/list_lensa.html`);
            }
       
        },
        ]
    },

    {
        label: "View",
        submenu: [
            { role: "reload" },
             { role: "toggledevtools" }]
    }
]