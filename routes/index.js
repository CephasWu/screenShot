import express from 'express';

const app = express();
import {takeScreenshot} from '../public/javascripts/screenShotApi.js';

app.use(express.json());

/**
 * @swagger
 * /screenShot:
 *   post:
 *     summary: 接收 URL 並生成螢幕截圖
 *     description: 根據提供的URL生成網頁截圖並直接返回圖片
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: 需要截圖的網頁URL
 *                 example: "https://www.example.com"
 *               _sysusersession:
 *                 type: string
 *                 description: tokem
 *                 example: "xMDY5MDM0LCJzZXNzaW9uS2V5"
 *               sysusersession:
 *                 type: string
 *                 description: tokem
 *                 example: "iOjE3NDEwNjkwMzQsInVzZ"
 *     responses:
 *       200:
 *         description: 成功返回螢幕截圖
 *       400:
 *         description: URL 並未提供
 *       500:
 *         description: 伺服器錯誤
 */
/* API: 接收 URL 並生成螢幕截圖 */
app.post('/', function (req, res, next) {
    screenShot(req, res, '');
});

/**
 * @swagger
 * /screenShot/base64:
 *   post:
 *     summary: 接收 URL 並生成螢幕截圖轉成 Base64
 *     description: 根據提供的URL生成網頁截圖並直接返回圖片的Base64格式
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: 需要截圖的網頁URL
 *                 example: "https://www.example.com"
 *               _sysusersession:
 *                 type: string
 *                 description: tokem
 *                 example: "xMDY5MDM0LCJzZXNzaW9uS2V5"
 *               sysusersession:
 *                 type: string
 *                 description: tokem
 *                 example: "iOjE3NDEwNjkwMzQsInVzZ"
 *     responses:
 *       200:
 *         description: 成功返回螢幕截圖的base64格式
 *       400:
 *         description: URL 並未提供
 *       500:
 *         description: 伺服器錯誤
 */
/* API: 接收 URL 並生成螢幕截圖 */
app.post('/base64', function (req, res, next) {
    screenShot(req, res, 'base64');
});

async function screenShot(req, res, type) {
    const url = req.body.url;
    const data = req.body;
    let _sysusersession, sysusersession;
    _sysusersession = data._sysusersession;
    sysusersession = data.sysusersession;

    console.log(data.url);
    // 檢查 URL 是否存在
    if (!url) {
        return res.status(400).json({error: 'URL is required'});
    }
    try {
        // 使用 screenshot.js 中的 takeScreenshot 函式
        const screenshotData = await takeScreenshot(_sysusersession, sysusersession, url, type);
        if (type === 'base64') {
            return res.status(200).json({
                message: '螢幕截圖成功',
                screenshotData: screenshotData
            });
        }
        // 鍊式調用示例
        return res
            .status(200)
            .set('Content-Type', 'image/png')
            .set('Content-Length', screenshotData.length)
            .set('Content-Disposition', 'inline; filename="screenshot.png"')
            .send(screenshotData);
    } catch (error) {
        console.error('處理截圖時發生錯誤:', error);
        res.status(500).json({error: '伺服器內部錯誤'});
    }
}

export default app;

