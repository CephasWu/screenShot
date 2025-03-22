import puppeteer from "puppeteer-core";
import {cookies} from './authentication.js';
import {getPath} from "../config/config.js";
import {saveBase64} from "./saveBase64.js";

// 函式來進行截圖
export async function takeScreenshot(_sysusersession, sysusersession, url, type) {
    if (!url) {
        throw new Error('URL is required');
    }
    let browser;
    let executablePath = getPath();
    try {
        browser = await puppeteer.launch({
            headless: 'new', // 使用新的 headless 模式
            executablePath,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--start-maximized',
                '--disable-extensions',
                '--disable-audio-output',
                '--disable-background-networking',
                '--disable-background-timer-throttling',
                '--disable-default-apps',
                '--disable-hang-monitor',
                '--disable-ipc-flooding-protection',
                '--disable-popup-blocking',
                '--disable-prompt-on-repost',
                '--disable-renderer-backgrounding',
                '--disable-sync',
                '--disable-translate',
                '--metrics-recording-only',
                '--mute-audio',
                '--no-first-run'
            ]
        });
        const page = await browser.newPage();

        const cookiesData = cookies(_sysusersession, sysusersession);
        await page.setCookie(...cookiesData);

        //確保頁面加載完成
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 60000  // 增加超時設置
        });

        // 獲取所有 cookie
        const getCookies = await page.cookies();
        console.log('所有 Cookie:', getCookies);

        // 設置視口大小（這裡設置為桌面模式）
        await page.setViewport({
            width: 1280,   // 頁面寬度
            height: 1024   // 頁面高度
        });

        if (type === 'base64') {
            return await page.screenshot({
                encoding: 'base64',// 這樣就會將圖片轉換為 Base64 編碼
            });
        }

        //全頁面
        let screenshotData = await page.screenshot({
            type: 'png',
        });
        //儲存base64
        saveBase64(screenshotData);

        return Buffer.from(screenshotData);;

    } catch (error) {
        console.error('截圖失敗:', error);
        throw error;
    } finally {
        await browser.close();
    }
}