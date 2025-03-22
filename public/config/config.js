import os from 'os';
import config from './executablePath.js';
export function getPath() {
    let browserPath;
    if (os.platform() === 'win32') {
        browserPath = config.puppeteer.executablePath.windows;
    } else if (os.platform() === 'darwin') {
        browserPath = config.puppeteer.executablePath.mac;
    } else {
        browserPath = config.puppeteer.executablePath.linux;
    }
    return browserPath;
}