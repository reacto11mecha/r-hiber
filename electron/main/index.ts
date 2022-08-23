import { app, BrowserWindow, shell, ipcMain, screen } from "electron";
import { RegexParser } from "@serialport/parser-regex";
import { SerialPort } from "serialport";
import { release } from "os";
import { join } from "path";

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, "../.."),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? "../.." : "../../../public"),
};

let port: SerialPort | null = null;
let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env["VITE_DEV_SERVER_HOST"]}:${process.env["VITE_DEV_SERVER_PORT"]}`;
const indexHtml = join(ROOT_PATH.dist, "index.html");

async function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  win = new BrowserWindow({
    title: "Roket Hiber",
    icon: join(ROOT_PATH.public, "favicon.svg"),
    width: width - 50,
    height: height - 100,
    minWidth: (5 / 6) * width,
    minHeight: (3 / 4) * height,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();

  if (port) {
    if (port.isOpen) port.close();
    port = null;
  }
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// new window example arg: new windows url
ipcMain.handle("open-win", (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg });
  } else {
    childWindow.loadURL(`${url}/#${arg}`);
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
});

// ===== IPC MAIN FOR HANDLING ARDUINO RECIEVER THING ===== //
ipcMain.on("list-arduino-reciever", () =>
  SerialPort.list().then((ports, err) => {
    if (err)
      return win?.webContents.send("error-retrieving-arduino-reciever", err);

    win?.webContents.send("list-all-arduino-reciever", {
      list: ports.filter(
        (spec) =>
          spec.path &&
          spec.manufacturer &&
          spec.pnpId &&
          spec.vendorId &&
          spec.productId
      ),
    });
  })
);

function assignPortIfPossible(path: string) {
  port = new SerialPort({
    path,
    baudRate: 19200,
  });
  const parser = port.pipe(new RegexParser({ regex: /[\r\n]+/ }));

  port.on("open", () =>
    win?.webContents.send("ARCVR:connection-status", { connected: true })
  );
  port.on("close", () =>
    win?.webContents.send("ARCVR:connection-status", { connected: false })
  );

  parser.on("data", (data) => {
    const splittedData = data.split(";");

    const [flightState, altitude, AccX, AccY, AccZ, roll, pitch, yaw] =
      splittedData.map((value) => Number(value));

    win?.webContents.send("ARCVR:on-data", {
      time: Date.now(),
      data: {
        flightState,
        altitude,
        AccX,
        AccY,
        AccZ,
        roll,
        pitch,
        yaw,
      },
      isPartial: splittedData.length < 12,
    });
  });

  port.on("error", (error) => win?.webContents.send("ARCVR:on-error", error));
}

ipcMain.on("ARCVR:connect-arduino", (event, path: string) => {
  if (port) {
    if (port.path === path) {
      if (port.isOpen)
        win?.webContents.send("ARCVR:connection-status", { connected: true });
      else port.open();
    } else {
      port.close();

      assignPortIfPossible(path);
    }

    return;
  }

  assignPortIfPossible(path);
});

ipcMain.on("ARCVR:close-arduino", () => {
  if (port && port.isOpen) {
    port.close();
    port = null;
  }
});
